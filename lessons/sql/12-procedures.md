# SQL 12 · Stored procedure: tham số, OUTPUT và mã trạng thái

> Nguồn: **4B slide 13–17**. Mục tiêu: tự tạo/gọi procedure, phân biệt result set–OUTPUT–RETURN và cải tiến Update_Sal để không thất bại im lặng.

## 1. Procedure đóng gói một thao tác nghiệp vụ

Procedure là routine trong database được gọi bằng EXEC. Nó có thể SELECT, sửa dữ liệu, gọi procedure khác và dùng điều khiển luồng. Slide mô tả “precompiled ... single execution plan”; cách hiểu chính xác hơn: định nghĩa được lưu, SQL Server có thể biên dịch kế hoạch khi thực thi và dùng lại cache, cũng có thể recompile. Không bảo đảm luôn có đúng một kế hoạch bất biến hay procedure luôn nhanh hơn mọi query tương đương.

| Loại | Ví dụ/ý nghĩa |
|---|---|
| User-defined | Routine do ứng dụng tạo trong schema |
| Temporary | Procedure tạm với quy tắc phạm vi của SQL Server |
| System | Routine hệ thống như sp_help; dùng đúng tài liệu |

Lợi ích thực tế gồm gom nhiều bước thành một lần gọi, dùng lại logic, dễ thay định nghĩa và cấp EXECUTE có kiểm soát. Hiệu năng/bảo mật còn phụ thuộc cách viết query, index, execution context và quyền. Không ghép input vào dynamic SQL chỉ vì đã ở trong procedure.

## 2. Cú pháp tối thiểu

```tsql
CREATE OR ALTER PROCEDURE course.ListEmployees
 @Dno int=5
AS
BEGIN
 SET NOCOUNT ON;
 SELECT Ssn,Fname,Lname,Salary
 FROM course.EMPLOYEE WHERE Dno=@Dno ORDER BY Ssn;
END;
GO
EXEC course.ListEmployees;              -- default 5
EXEC course.ListEmployees @Dno=4;        -- named argument
GO
```

Định nghĩa routine ở batch riêng. `SET NOCOUNT ON` hạn chế thông báo số hàng tác động, không xóa result set của SELECT và không làm @@ROWCOUNT vô dụng. Tham số có tên giúp gọi rõ ràng; nếu gọi theo vị trí phải đúng thứ tự. READONLY trong cú pháp tổng quát liên quan table-valued parameter; không thêm tùy ý cho mọi scalar parameter.

## 3. Ba đường trả thông tin khác nhau

| Cơ chế | Trả gì? | Cách nhận |
|---|---|---|
| SELECT result set | Một bảng hàng/cột, có thể nhiều result set | Client đọc kết quả |
| OUTPUT parameter | Giá trị một hoặc nhiều tham số | Biến caller, phải ghi OUTPUT lúc gọi |
| RETURN | Mã số nguyên trạng thái | `EXEC @status=proc ...` |

Không dùng RETURN làm cách trả bảng hay tiền lương decimal. RETURN 0 thường quy ước thành công nhưng quy ước phải được routine định nghĩa. Lỗi ném bằng THROW và mã trạng thái cũng là hai cơ chế khác nhau; đừng bắt mọi lỗi rồi RETURN 0.

## 4. Phân tích Update_Sal trong slide

Slide kiểm COUNT(*) theo Ssn, nếu bằng 1 thì nhân Salary với @factor. Với PK, nhiều hơn 1 không thể xảy ra, nhưng nhân viên không tồn tại sẽ không được cập nhật và không báo gì. Hệ số NULL/âm chưa được xử lý; Salary NULL vẫn NULL. Ví dụ này dùng để học cú pháp, cần bổ sung hợp đồng đầu vào/đầu ra khi ứng dụng.

```tsql
CREATE OR ALTER PROCEDURE course.Update_Sal
 @p_emp_id char(9),
 @p_factor decimal(5,2),
 @new_salary decimal(12,2) OUTPUT
AS
BEGIN
 SET NOCOUNT ON;
 SET @new_salary=NULL;
 IF @p_factor IS NULL OR @p_factor<=0
  THROW 50001,N'Hệ số phải lớn hơn 0.',1;

 UPDATE course.EMPLOYEE
 SET Salary=Salary*@p_factor
 WHERE Ssn=@p_emp_id;
 IF @@ROWCOUNT=0
  THROW 50002,N'Không tìm thấy nhân viên.',1;

 SELECT @new_salary=Salary FROM course.EMPLOYEE WHERE Ssn=@p_emp_id;
 RETURN 0;
END;
GO
DECLARE @salary decimal(12,2),@status int;
BEGIN TRAN;
EXEC @status=course.Update_Sal
 @p_emp_id='123456789',@p_factor=1.20,@new_salary=@salary OUTPUT;
SELECT @status AS Status,@salary AS NewSalary;
ROLLBACK;
GO
```

John từ 30000 thành 36000, OUTPUT=36000 và Status=0, sau ROLLBACK trở về ban đầu. @@ROWCOUNT phải được đọc ngay sau UPDATE trước khi một câu khác thay nó. Hợp đồng này cho phép lương chưa biết vẫn NULL; nếu nghiệp vụ yêu cầu lương phải biết thì bổ sung kiểm tra và lỗi tương ứng.

**Giới hạn concurrency:** UPDATE là một statement; SELECT OUTPUT sau đó là một statement khác. Nếu cần trả đúng lương do chính UPDATE tạo ra dù có transaction khác xen vào, dùng `UPDATE ... OUTPUT inserted.Salary` (vào table variable rồi gán OUTPUT) hoặc ranh giới transaction/isolation phù hợp. Bản script đi kèm dùng OUTPUT INTO để minh họa cách này. Khi factor/lương gây overflow, SQL Server vẫn phát lỗi kiểu số.

## 5. Kiểm thử procedure phải gồm nhánh thất bại

| Ca | Dự đoán |
|---|---|
| John, factor 1.20 | Cập nhật thành 36000 từ fixture mới |
| Mã không tồn tại | THROW 50002 |
| factor 0, âm hoặc NULL | THROW 50001 |
| Mai có Salary NULL | Vẫn NULL theo hợp đồng hiện tại |
| Gọi hai lần factor 1.20 | 30000→36000→43200 nếu không rollback |

Lệnh tăng lương không idempotent: chạy lại làm thay đổi tiếp. Script thực hành bọc transaction/rollback để mỗi lần quan sát có thể phục hồi. Nếu trigger tuổi/lương ở bài sau đang bật, nó cũng tham gia khi procedure UPDATE dữ liệu.

## 6. Khi chọn procedure, function hay view?

| Nhu cầu | Công cụ phù hợp để xét |
|---|---|
| Thay đổi dữ liệu và báo lỗi nghiệp vụ | Procedure |
| Trả một giá trị trong SELECT | Scalar function |
| Trả một bảng có tham số, dùng trong FROM | TVF |
| Query có tên không tham số | View |
| Tự phản ứng khi DML xảy ra | Trigger |

## 7. Bài tập

1. Caller bỏ OUTPUT trong lệnh EXEC thì có nhận giá trị mới qua biến không?
2. Vì sao kiểm COUNT trước UPDATE không phải bằng chứng không có race condition?
3. Có nên RETURN Salary không?

<details><summary>Lời giải</summary>

1. Không nhận theo cơ chế OUTPUT mong muốn; cần đánh dấu cả định nghĩa và lời gọi.
2. Hai statement có thể bị transaction khác xen giữa tùy isolation. Ưu tiên thao tác set-based với kiểm @@ROWCOUNT/OUTPUT và thiết kế transaction phù hợp.
3. Không, RETURN là int status. Dùng OUTPUT decimal hoặc SELECT result set.

</details>

Tham khảo: [CREATE PROCEDURE](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-procedure-transact-sql?view=sql-server-ver17).
