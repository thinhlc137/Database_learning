# SQL 11 · T-SQL: biến, batch, IF, WHILE, BREAK và CONTINUE

> Nguồn: **4B slide 1–12**, bao gồm code nằm trong ảnh ở slide 4–6, 8–12. Từ đây ví dụ `tsql` phải chạy trên SQL Server. Mục tiêu: theo dõi trạng thái biến qua từng bước, tránh vòng lặp vô hạn và hiểu GO không phải câu SQL gửi cho server.

## 1. Môi trường thực hành

Bạn vẫn đọc được toàn bộ bài trên web offline. Muốn chạy procedure/function/cursor/T-SQL trigger thật, cần một SQL Server đang chạy và công cụ gửi query như SSMS. Cài riêng SSMS không tạo sẵn database engine.

Trong repository có thư mục **sql/sqlserver/**: `00-setup.sql` tạo database học riêng và nạp COMPANY vào schema `course`; `01-basics.sql` đến `06-errors.sql` chứa các ví dụ. Mở file bằng SSMS, chọn đúng kết nối rồi Execute. Xem [hướng dẫn SQL Server](../../sql/sqlserver/README.md). Các script T-SQL đã được soát logic và đối chiếu tài liệu; môi trường kiểm thử project hiện chỉ thực thi SQLite, không tuyên bố đã chạy SQL Server.

**Batch** là nhóm lệnh gửi cùng một lần. `GO` là dấu phân cách của SSMS/sqlcmd và các client có hỗ trợ, không phải lệnh T-SQL. Biến cục bộ không đi qua GO. CREATE OR ALTER PROCEDURE/FUNCTION/VIEW/TRIGGER cần batch phù hợp; vì thế ví dụ có GO giữa định nghĩa và lệnh gọi.

## 2. DECLARE, kiểu dữ liệu và giá trị ban đầu

```tsql
DECLARE @name nvarchar(30);              -- NULL
DECLARE @message nvarchar(30)=N'Xin chào';
DECLARE @count int=0,@factor decimal(5,2)=1.20;
SELECT @name AS Name,@message AS Message,@count AS CountValue;
```

Tên biến bắt đầu `@`. Không có giá trị mặc định thì NULL. `N'...'` là literal Unicode cho NVARCHAR trong T-SQL. BEGIN...END gom câu lệnh, không tự tạo transaction. Một block BEGIN không tương đương BEGIN TRANSACTION.

| Lệnh | Giá trị @count trước | Sau |
|---|---:|---:|
| DECLARE @count int=0 | Chưa tồn tại | 0 |
| SET @count=@count+1 | 0 | 1 |
| SET @count=NULL | 1 | NULL |
| SET @count=@count+1 | NULL | NULL |

## 3. SET và SELECT gán biến

```tsql
DECLARE @pattern varchar(30);
SET @pattern='J%';
SELECT Fname,Lname FROM course.EMPLOYEE
WHERE Fname LIKE @pattern ORDER BY Ssn;
```

Giống ý slide dùng Person.FirstName/LastName, nhưng thay bằng COMPANY để không phụ thuộc AdventureWorks.

| Dạng gán | Không có hàng nguồn | Nhiều hàng |
|---|---|---|
| `SET @x=(SELECT c FROM T...)` | Scalar subquery cho NULL | Lỗi scalar subquery nếu >1 hàng |
| `SELECT @x=c FROM T...` | Giữ giá trị @x trước đó | Gán lặp, giá trị cuối không được dựa vào thứ tự không bảo đảm |
| `SELECT @x=SUM(c) FROM T...` không GROUP BY | Có một hàng aggregate, có thể NULL | Aggregate cho một giá trị |

```tsql
DECLARE @x int=99;
SELECT @x=Dnumber FROM course.DEPARTMENT WHERE Dnumber=999;
SELECT @x AS AfterSelect;      -- 99
SET @x=(SELECT Dnumber FROM course.DEPARTMENT WHERE Dnumber=999);
SELECT @x AS AfterSet;         -- NULL
```

Đây là bẫy khi tái dùng biến trong vòng lặp. Kiểm tra sự tồn tại và tính duy nhất, hoặc khởi tạo rõ trước mỗi lần đọc. Không viết SELECT gán nhiều hàng rồi giả định server luôn chọn mã nhỏ nhất.

## 4. IF...ELSE và điều kiện UNKNOWN

```tsql
DECLARE @total decimal(19,2);
SELECT @total=COALESCE(SUM(Salary),0) FROM course.EMPLOYEE;
IF @total>250000
BEGIN
 PRINT N'Quỹ lương đã biết lớn hơn 250000';
END
ELSE
BEGIN
 PRINT N'Quỹ lương đã biết không vượt 250000';
END;
```

Fixture có tổng lương đã biết 281000 nên đi nhánh đầu. IF chỉ đi nhánh đầu khi biểu thức TRUE; FALSE/UNKNOWN đều đi ELSE nếu có. Muốn phân biệt thiếu dữ liệu, kiểm IS NULL riêng. IF không dùng như một biểu thức SELECT; CASE tạo giá trị cho từng hàng.

### Ví dụ doanh thu 2011 trong slide

Slide 7–8 dùng SalesOrderHeader/SalesOrderDetail trong CSDL mẫu. Nếu chưa có database đó, query không chạy. Ý tưởng là join theo SalesOrderID, lọc thời gian, SUM LineTotal, rồi so ngưỡng 10000000. Nên chọn DECIMAL đủ rộng thay vì INT cho tiền và dùng khoảng ngày:

```tsql
-- Minh họa với database có các bảng Sales tương ứng
DECLARE @sales decimal(19,2);
SELECT @sales=COALESCE(SUM(d.LineTotal),0)
FROM Sales.SalesOrderDetail d
JOIN Sales.SalesOrderHeader h ON h.SalesOrderID=d.SalesOrderID
WHERE h.OrderDate>='20110101' AND h.OrderDate<'20120101';
IF @sales>10000000 PRINT N'Vượt 10 triệu';
ELSE PRINT N'Chưa vượt 10 triệu';
```

Khoảng nửa mở giữ mọi thời điểm trong năm và tránh bỏ các giờ của ngày cuối. `YEAR(OrderDate)=2011` thể hiện cùng điều kiện năm ở ví dụ, nhưng khoảng trực tiếp trên cột thường thuận lợi hơn cho index phù hợp. “Có index” vẫn không bảo đảm optimizer luôn dùng nó.

## 5. WHILE và điều kiện dừng

```tsql
DECLARE @counter int=1;
WHILE @counter<=5
BEGIN
 PRINT @counter;
 SET @counter=@counter+1;
END;
```

In 1,2,3,4,5. Điều kiện được kiểm **trước** mỗi lượt, vì vậy khởi tạo 15 thì không chạy lượt nào. Thiếu tăng counter làm điều kiện có thể không bao giờ sai. Đọc biến sau mỗi câu lệnh, đừng chỉ nhìn kết quả mong muốn.

## 6. BREAK và CONTINUE qua trace của slide 12

```tsql
DECLARE @num int=1;
WHILE @num<=10
BEGIN
 IF @num=5
 BEGIN
  SET @num=@num+1;
  CONTINUE;
 END;
 IF @num=8
 BEGIN
  PRINT 'Loop stopped at number 8.';
  BREAK;
 END;
 PRINT 'Current number: '+CAST(@num AS varchar(11));
 SET @num=@num+1;
END;
```

| @num đầu lượt | Hành động | Có in số hiện tại? | @num tiếp theo |
|---:|---|---|---:|
| 1–4 | Qua hai IF, PRINT, tăng | 1,2,3,4 | 2–5 |
| 5 | Tăng thành 6 rồi CONTINUE | Không in 5 | 6 |
| 6–7 | PRINT rồi tăng | 6,7 | 7–8 |
| 8 | In thông báo, BREAK | Không in Current number: 8 | Thoát |

Kết quả: Current number 1,2,3,4,6,7 rồi “Loop stopped at number 8.” BREAK thoát vòng lặp gần nhất; CONTINUE bỏ phần còn lại của lượt hiện tại và kiểm điều kiện lần tiếp. Nếu bỏ `SET @num=@num+1` trước CONTINUE, @num mắc ở 5 vô hạn.

## 7. Bài tập

1. @x NULL, IF @x>0 đi nhánh nào?
2. BEGIN...END có tự commit không?
3. Biến khai báo trước GO có dùng sau GO được không?
4. Thay BREAK bằng CONTINUE ở nhánh @num=8 mà không tăng @num có chuyện gì?

<details><summary>Lời giải</summary>

1. ELSE vì điều kiện UNKNOWN. Viết kiểm tra IS NULL nếu cần thông báo riêng.
2. Không, chỉ gom block. Giao dịch cần BEGIN TRAN/COMMIT/ROLLBACK.
3. Không, phạm vi biến là batch/routine tương ứng.
4. Mắc mãi ở 8, vì CONTINUE quay lại kiểm điều kiện nhưng biến không đổi.

</details>
