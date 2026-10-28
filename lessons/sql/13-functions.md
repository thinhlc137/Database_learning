# SQL 13 · Scalar function và table-valued function

> Nguồn: **4B slide 18–23**. Mục tiêu: tạo/gọi từng loại function, hiểu RETURNS/RETURN và biết giới hạn của function trong SQL Server.

## 1. Function trả kết quả để dùng trong query

Scalar function trả một giá trị, ví dụ `course.Get_Sal('333445555')`. Table-valued function (TVF) trả một quan hệ, dùng trong FROM. System functions do hệ cung cấp, ví dụ COALESCE, DATEADD, ERROR_MESSAGE, nhưng mỗi hàm có ngữ cảnh và quy tắc riêng.

| Loại | Khai báo đầu ra | Cách gọi | Ví dụ đầu ra |
|---|---|---|---|
| Scalar UDF | RETURNS decimal(12,2) | SELECT course.Get_Sal(...) | 40000 |
| Inline TVF | RETURNS TABLE AS RETURN (SELECT...) | FROM course.EmployeesByDept(5) | Các nhân viên phòng 5 |
| Multi-statement TVF | RETURNS @t TABLE(...) + BEGIN/END | FROM course.EmpAndDependent() | Các hàng đã chèn vào @t |

`RETURNS` khai báo kiểu, `RETURN` trả kết quả/hoàn tất body theo loại routine. RETURN trong procedure khác RETURN scalar trong function. SQL Server `timestamp` không phải kiểu ngày giờ và không dùng tùy ý làm kiểu scalar UDF trả về theo cú pháp trong slide.

## 2. Scalar function Get_Sal

```tsql
CREATE OR ALTER FUNCTION course.Get_Sal(@p_id char(9))
RETURNS decimal(12,2)
AS
BEGIN
 DECLARE @salary decimal(12,2);
 SET @salary=(SELECT Salary FROM course.EMPLOYEE WHERE Ssn=@p_id);
 RETURN @salary;
END;
GO
SELECT course.Get_Sal('333445555') AS FranklinSalary;
SELECT course.Get_Sal('111222333') AS MaiSalary;
SELECT course.Get_Sal('000000000') AS MissingEmployee;
GO
```

Kết quả 40000, NULL, NULL. Scalar function này không phân biệt được “nhân viên có lương NULL” với “không có nhân viên”. Nếu cần phân biệt, dùng query có EXISTS/trạng thái riêng hoặc TVF trả thêm cột.

Khóa Ssn bảo đảm query con tối đa một hàng. Khi tự viết function dựa trên cột không unique, cần giải quyết trường hợp nhiều hàng; không dùng TOP 1 không ORDER BY để che một lỗi nghiệp vụ chưa xác định.

## 3. Inline TVF: query có tham số

```tsql
CREATE OR ALTER FUNCTION course.EmployeesByDept(@dno int)
RETURNS TABLE
AS
RETURN (
 SELECT Ssn,Fname,Lname,Salary
 FROM course.EMPLOYEE WHERE Dno=@dno
);
GO
SELECT Fname,Salary FROM course.EmployeesByDept(5)
WHERE Salary>=30000 ORDER BY Fname;
GO
```

Kết quả Franklin 40000,John 30000,Ramesh 38000. Inline TVF là một SELECT định nghĩa bảng đầu ra, không khai báo @return table và không có khối chèn nhiều bước. Nó giúp diễn đạt query có tham số trong FROM; view thông thường không nhận @dno như vậy.

## 4. Multi-statement TVF theo slide EmpAndDependent

```tsql
CREATE OR ALTER FUNCTION course.EmpAndDependent()
RETURNS @person TABLE(
 first_name nvarchar(30),last_name nvarchar(30),
 sex char(1),person_type varchar(10)
)
AS
BEGIN
 INSERT INTO @person(first_name,last_name,sex,person_type)
 SELECT Fname,Lname,Sex,'Employee' FROM course.EMPLOYEE;

 INSERT INTO @person(first_name,last_name,sex,person_type)
 SELECT d.Dependent_name,e.Lname,d.Sex,'Dependent'
 FROM course.DEPENDENT d JOIN course.EMPLOYEE e ON e.Ssn=d.Essn;
 RETURN;
END;
GO
SELECT person_type,COUNT(*) AS N
FROM course.EmpAndDependent()
GROUP BY person_type;
GO
```

Có 9 Employee và 7 Dependent, tổng 16 hàng. @person là **table variable trả về**, không phải bảng bền trong schema. INSERT vào biến kết quả được phép trong dạng UDF này; không đồng nghĩa UDF được INSERT vào bảng nghiệp vụ EMPLOYEE.

Last_name của người phụ thuộc được lấy từ nhân viên bảo trợ theo cách minh họa của slide. Đây là quy ước hiển thị, không chứng minh mọi người phụ thuộc thực sự có cùng họ. Tên cột `person_type` rõ hơn `type` để tránh nhầm thuật ngữ và làm query dễ đọc.

### Viết lại bằng UNION ALL

Nếu body chỉ nối hai query như trên, có thể viết inline TVF với UNION ALL. Giữ ALL vì mỗi người là một hàng hợp lệ, không tự khử những người trùng tên. Không dùng tên làm định danh người thật; nếu ứng dụng cần nhận diện, trả thêm khóa/người sở hữu và loại.

## 5. Các giới hạn cần thuộc khi thi

T-SQL UDF không dùng để thay đổi trạng thái database nghiệp vụ, không gọi procedure thông thường, không dùng dynamic SQL/temp table, không dùng TRY...CATCH hay RAISERROR; table variable được phép ở những dạng phù hợp. Giới hạn cụ thể còn phụ thuộc loại UDF và phiên bản.

| Mong muốn | Có nên đưa vào UDF? | Cách phù hợp hơn |
|---|---|---|
| Tính một giá trị đọc dữ liệu | Có thể | Scalar UDF/query |
| Trả bảng lọc theo tham số | Có thể | Inline TVF |
| UPDATE lương rồi log và rollback khi lỗi | Không dùng T-SQL UDF | Procedure + transaction |
| Bắt mọi lỗi bằng TRY...CATCH trong function | Không | Đặt xử lý tại caller/procedure |

Hiệu năng scalar UDF không mặc định tốt. Gọi hàm cho nhiều hàng có thể phát sinh chi phí; một số phiên bản có scalar UDF inlining khi đáp ứng điều kiện. Inline TVF và multi-statement TVF cũng có cách tối ưu khác nhau. Dùng actual execution plan/dữ liệu thực tế khi đánh giá, không dùng từ “function” làm bảo đảm tốc độ.

## 6. Tự kiểm tra

1. Vì sao `EXEC course.Get_Sal...` không phải cách dùng scalar function trong bài?
2. Function không có nhân viên và function có lương NULL có cùng kết quả không?
3. Table variable kết quả có tồn tại sau lời gọi như một bảng dùng chung không?
4. 9 nhân viên và 7 người phụ thuộc có nhất thiết UNION chỉ trả 16 hàng không?

<details><summary>Lời giải</summary>

1. Gọi bằng biểu thức SELECT course.Get_Sal(...). EXEC là cách gọi procedure trong bài, dù T-SQL có một số dạng gọi function khác; cần học đúng ngữ cảnh.
2. Có trong thiết kế Get_Sal này: đều NULL. Muốn phân biệt phải trả thêm thông tin.
3. Không, đó là biến trả kết quả của lần gọi, không phải bảng schema dùng chung.
4. UNION ALL giữ 16; UNION có thể khử hàng trùng ở toàn bộ cột đầu ra. person_type phân biệt hai loại nhưng các người trong cùng loại vẫn có thể trùng tên/giới.

</details>

Tham khảo: [CREATE FUNCTION](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-function-transact-sql?view=sql-server-ver17), [Giới hạn UDF](https://learn.microsoft.com/en-us/sql/relational-databases/user-defined-functions/create-user-defined-functions-database-engine?view=sql-server-ver17).
