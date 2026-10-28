# SQL 08 · INSERT, UPDATE, DELETE và giao dịch

> Nguồn: **4A slide 74–83**, kết hợp COMMIT/ROLLBACK trong dàn ý slide. Mục tiêu: viết thay đổi có kiểm soát, dự đoán constraint và phân biệt lệnh lỗi với transaction đã rollback.

## 1. INSERT và thứ tự cột

```sql
-- @lab S34
INSERT INTO EMPLOYEE(Fname,Lname,Ssn,Dno)
VALUES('Richard','Marini','653298653',4);
SELECT Fname,Lname,Ssn,Salary,Dno FROM EMPLOYEE WHERE Ssn='653298653';
```

Kết quả Richard,Marini,653298653,NULL,4. Những cột bỏ qua nhận DEFAULT nếu có, nếu không thường nhận NULL khi được phép. Slide chèn chỉ Fname/Lname/Ssn nhưng fixture yêu cầu Dno NOT NULL và không có default, nên phải bổ sung Dno như trên.

Liệt kê cột tránh lệ thuộc vào thứ tự trong CREATE TABLE. `INSERT INTO T VALUES(...)` đòi số lượng/thứ tự khớp cấu trúc; thêm cột sau này có thể làm script cũ lỗi hoặc sai ý nghĩa. Chèn nhiều hàng dùng `VALUES(...),(...);` nhưng vẫn phải kiểm mọi PK/FK/CHECK.

### INSERT ... SELECT tạo bản sao kết quả

```sql
-- @lab S35
CREATE TABLE DeptsInfo(
 DeptName TEXT,Employees INTEGER,TotalSalary REAL
);
INSERT INTO DeptsInfo(DeptName,Employees,TotalSalary)
SELECT d.Dname,COUNT(e.Ssn),SUM(e.Salary)
FROM DEPARTMENT d LEFT JOIN EMPLOYEE e ON e.Dno=d.Dnumber
GROUP BY d.Dnumber,d.Dname;
SELECT * FROM DeptsInfo ORDER BY DeptName;
```

Administration 4/93000, Headquarters 1/55000, Innovation 0/NULL, Research 4/133000. Đây là bảng chụp, không phải view tự đổi khi EMPLOYEE đổi. Nếu báo cáo muốn tổng 0 cho phòng rỗng, dùng COALESCE(SUM(...),0) với ý nghĩa đã chọn.

## 2. UPDATE thay đổi những hàng đang được chọn

```sql
-- @lab S36
BEGIN;
UPDATE EMPLOYEE SET Salary=Salary*1.1
WHERE Dno IN(SELECT Dnumber FROM DEPARTMENT WHERE Dname='Research');
SELECT Fname,ROUND(Salary,2) AS Salary FROM EMPLOYEE WHERE Dno=5 ORDER BY Fname;
ROLLBACK;
SELECT Salary FROM EMPLOYEE WHERE Ssn='123456789';
```

Bảng trong transaction có Franklin 44000,John 33000,Joyce 27500,Ramesh 41800. Sau ROLLBACK, John trở về 30000. `SELECT Salary*1.1` chỉ tính kết quả, còn UPDATE ghi thay đổi vào trạng thái hiện tại.

Một UPDATE có thể đổi nhiều cột: `UPDATE PROJECT SET Plocation='Bellaire',Dnum=5 WHERE Pnumber=10;`. FK Dnum vẫn phải hợp lệ. UPDATE thiếu WHERE tác động mọi hàng. Nếu Salary=NULL thì Salary*1.1 vẫn NULL.

## 3. DELETE và tác động lan truyền

```sql
-- @lab S37
BEGIN;
DELETE FROM EMPLOYEE WHERE Ssn='111222333';
SELECT COUNT(*) AS N FROM EMPLOYEE;
ROLLBACK;
SELECT COUNT(*) AS N FROM EMPLOYEE;
```

Trong transaction còn 8 người, rollback về 9. Mai chưa có hàng con cần giữ và không phải quản lý. Xóa John sẽ kéo theo WORKS_ON và DEPENDENT do ON DELETE CASCADE của fixture. Xóa Jennifer còn bị các tham chiếu supervisor/manager ràng buộc; không thể chỉ nhìn một FK rồi kết luận.

**Xem trước tập hàng:** viết SELECT với cùng WHERE, kiểm số hàng và khóa, sau đó mới đổi thành UPDATE/DELETE. Trong bài thực hành, có thể dùng BEGIN/ROLLBACK để quan sát. Với dữ liệu thật, phải có kế hoạch giao dịch, kiểm soát quyền và điều kiện nghiệp vụ cụ thể.

## 4. Transaction: nhiều thay đổi thành một đơn vị

| Mốc | Tài khoản A | Tài khoản B | Tổng |
|---|---:|---:|---:|
| Ban đầu | 1000 | 500 | 1500 |
| Sau trừ A | 900 | 500 | 1400 tạm thời |
| Sau cộng B | 900 | 600 | 1500 |
| Rollback toàn bộ | 1000 | 500 | 1500 |

Một lệnh thành công không đồng nghĩa giao dịch đã COMMIT. Một lệnh lỗi không đồng nghĩa các lệnh trước đã rollback. Trong Playground, script `INSERT hợp lệ; SELECT cột_không_tồn_tại;` có thể giữ INSERT nếu đang autocommit. Trong explicit transaction, khi lỗi giữa script, cần xử lý trạng thái và ROLLBACK/COMMIT có chủ ý.

ACID: **Atomicity** giữ cả đơn vị thành công/thất bại; **Consistency** dựa vào constraints và logic đúng để giữ bất biến; **Isolation** quy định tương tác giữa transaction đồng thời; **Durability** nói về dữ liệu đã commit theo bảo đảm của hệ lưu trữ. Browser DB của project nằm trong RAM: đóng tab/mở lại mất dữ liệu, dù COMMIT trong phiên đã thành công.

## 5. SAVEPOINT để thử một nhánh

```sql
-- @lab S38
BEGIN;
UPDATE EMPLOYEE SET Salary=31000 WHERE Ssn='123456789';
SAVEPOINT trial;
UPDATE EMPLOYEE SET Salary=99999 WHERE Ssn='123456789';
ROLLBACK TO trial;
RELEASE trial;
SELECT Salary FROM EMPLOYEE WHERE Ssn='123456789';
ROLLBACK;
SELECT Salary FROM EMPLOYEE WHERE Ssn='123456789';
```

Kết quả lần lượt 31000 và 30000. ROLLBACK TO savepoint giữ transaction ngoài và quay về mốc, không đồng nghĩa ROLLBACK toàn bộ. SQL Server dùng `SAVE TRANSACTION ten` và `ROLLBACK TRANSACTION ten`, không dùng RELEASE như SQLite.

## 6. Parameter binding khi nối SQL với chương trình

```python
con.execute('UPDATE EMPLOYEE SET Salary=? WHERE Ssn=?', (35000, emp_ssn))
```

Giá trị truyền riêng giúp dấu nháy không biến thành mã SQL. Không nối `...WHERE Ssn='` + input + `'`. Binding dùng cho giá trị, không thay được tên bảng/cột; nếu cho chọn cột sort, dùng danh sách cho phép. Procedure cũng không tự miễn SQL injection nếu bên trong ghép dynamic SQL từ input.

## 7. Bài tập

1. INSERT thiếu Dno trong fixture có chạy không?
2. UPDATE không WHERE và DELETE không WHERE có làm mất định nghĩa bảng không?
3. Sau BEGIN; UPDATE; query lỗi; có nên giả định lương đã về cũ?
4. COMMIT trong browser có lưu dữ liệu qua lần đóng tab không?

<details><summary>Lời giải</summary>

1. Không, Dno NOT NULL và không có default. Trường hợp slide đã có Dno DEFAULT 1 là schema khác.
2. Không, bảng còn. UPDATE đổi mọi hàng, DELETE xóa mọi hàng nếu các constraint cho phép. DROP mới xóa đối tượng.
3. Không. Xử lý lỗi của DBMS/driver và tình trạng transaction quyết định. Cần kiểm tra và rollback có chủ ý; bài 16 giải thích SQL Server.
4. Không trong app này, vì database được tạo trong RAM. Muốn dữ liệu bền qua phiên phải có cơ chế lưu/export riêng.

</details>
