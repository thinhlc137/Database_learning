# SQL 09 · View, inline view và assertion

> Nguồn: **4A slide 84–85, 92–94**. Mục tiêu: hiểu query có tên, hạn chế cập nhật view và lý do CHECK một hàng không diễn đạt được mọi bất biến liên bảng.

## 1. View là một giao diện dữ liệu có tên

```sql
-- @lab S39
CREATE VIEW WorksOnDetail AS
SELECT e.Ssn,e.Fname,e.Lname,p.Pname,w.Hours
FROM EMPLOYEE e JOIN WORKS_ON w ON w.Essn=e.Ssn
JOIN PROJECT p ON p.Pnumber=w.Pno;
SELECT Fname,Lname,Hours FROM WorksOnDetail
WHERE Pname='ProductX' ORDER BY Fname;
```

Kết quả John Smith 32.5 và Joyce English 20. View đóng gói đường join để câu hỏi phía ngoài ngắn hơn. Không gọi view là bảng sao chép nếu chỉ CREATE VIEW thông thường.

```sql
-- @lab S40
CREATE VIEW ResearchPay AS
SELECT Ssn,Fname,Salary FROM EMPLOYEE WHERE Dno=5;
UPDATE EMPLOYEE SET Salary=31000 WHERE Ssn='123456789';
SELECT Fname,Salary FROM ResearchPay WHERE Ssn='123456789';
DROP VIEW ResearchPay;
```

Kết quả John,31000: view phản ánh dữ liệu hiện tại. DROP VIEW xóa định nghĩa view, không xóa EMPLOYEE. Query qua view vẫn chịu quyền, optimizer và chi phí thực thi; view không mặc định là hàng rào bảo mật tuyệt đối.

## 2. Cập nhật view có những câu hỏi khó nào?

Giả sử view đơn giản lấy Ssn,Fname,Salary từ một bảng EMPLOYEE. Khi UPDATE Salary của Ssn đã có, có thể tìm rõ hàng gốc để cập nhật ở hệ hỗ trợ updatable view. Nhưng:

| Dạng view | Khó khăn khi UPDATE/INSERT |
|---|---|
| Bỏ cột NOT NULL không có default | INSERT thiếu dữ liệu bắt buộc của bảng gốc |
| Có biểu thức Salary*1.1 | Gán kết quả không tự suy được cách cập nhật mọi biểu thức |
| GROUP BY Dno, AVG(Salary) | Đổi trung bình thành 50000 không chỉ rõ lương từng người |
| Join nhiều bảng | Cần xác định bảng và khóa nào được cập nhật |
| DISTINCT/UNION | Có thể mất ánh xạ một hàng view về một hàng gốc |

SQL Server cho một số cập nhật view khi ánh xạ được đến một bảng và đáp ứng giới hạn. SQLite coi view thông thường là read-only; có thể viết INSTEAD OF trigger trên view để tự mô tả hành vi. Không kỳ vọng mọi ví dụ UPDATE view của SQL Server chạy nguyên trên web.

### WITH CHECK OPTION

```tsql
CREATE OR ALTER VIEW course.ResearchEmployees AS
SELECT Ssn,Fname,Lname,Dno,Salary
FROM course.EMPLOYEE WHERE Dno=5
WITH CHECK OPTION;
GO
```

CHECK OPTION yêu cầu thay đổi qua view vẫn đáp ứng điều kiện để hàng nằm trong view. Nếu update Dno=4 qua view này, hàng sẽ ra khỏi tập Research nên bị từ chối. Không có CHECK OPTION, một cập nhật được phép có thể khiến hàng “biến mất” khỏi view sau khi sửa. Nó không thay thế constraint cho mọi đường cập nhật bảng gốc và không tự bảo vệ hàng khỏi user đã có quyền trực tiếp trên bảng.

## 3. Inline view và CTE

```sql
-- @lab S41
SELECT t.Dno,t.TotalSalary
FROM (
 SELECT Dno,SUM(Salary) AS TotalSalary
 FROM EMPLOYEE GROUP BY Dno
) AS t
WHERE t.TotalSalary>100000;
```

Kết quả phòng 5,133000. Bảng dẫn xuất chỉ tồn tại trong phạm vi câu lệnh. CTE viết `WITH t AS (...) SELECT ...` cũng tạo tên trong phạm vi câu lệnh, không phải CREATE VIEW bền trong catalog.

| Cơ chế | Phạm vi tên | Có tham số trực tiếp? | Lưu vật lý kết quả mặc định? |
|---|---|---|---|
| Derived table | Một vị trí trong query | Tham chiếu phù hợp theo dialect | Không |
| CTE | Một câu lệnh | Không phải routine nhận tham số | Không bảo đảm materialize |
| View thường | Đối tượng schema | Không | Không |
| TVF SQL Server | Đối tượng schema | Có | Theo loại và kế hoạch thực thi |

## 4. Assertion mô tả bất biến toàn database

Slide đưa quy tắc: lương nhân viên không vượt lương quản lý phòng mình. Đây là quan hệ giữa nhiều hàng và nhiều bảng. CHECK(Salary>=0) chỉ kiểm từng hàng không đủ.

```sql
-- SQL chuẩn minh họa; không chạy trên SQLite/SQL Server
CREATE ASSERTION SalaryConstraint CHECK (
 NOT EXISTS (
  SELECT * FROM Employee e
  JOIN Department d ON d.Dnumber=e.Dno
  JOIN Employee m ON m.Ssn=d.Mgr_ssn
  WHERE e.Salary>m.Salary
 )
);
```

Slide 85 có `D.Number`, trong schema dùng Dnumber; ví dụ trên sửa tên. CREATE ASSERTION được dạy như khái niệm SQL chuẩn nhưng không được SQLite/SQL Server triển khai. Có thể **chẩn đoán vi phạm** bằng query NOT EXISTS/EXISTS, rồi chọn cơ chế thực thi như thiết kế lại ràng buộc, trigger hay transaction trong dịch vụ.

```sql
-- @lab S42
SELECT e.Fname AS Employee,e.Salary,m.Fname AS Manager,m.Salary AS ManagerSalary
FROM EMPLOYEE e JOIN DEPARTMENT d ON d.Dnumber=e.Dno
JOIN EMPLOYEE m ON m.Ssn=d.Mgr_ssn
WHERE e.Salary>m.Salary ORDER BY e.Ssn;
```

Hiện 0 hàng. Nhưng 0 hàng không chứng minh chính sách xử lý NULL đã đầy đủ: nếu một lương chưa biết, `>` UNKNOWN và query không báo vi phạm. Cần quyết định thiếu lương có được chấp nhận không.

### Những thay đổi nào có thể phá quy tắc?

1. Tăng Salary của nhân viên.
2. Giảm Salary của quản lý.
3. Chuyển Dno nhân viên sang phòng khác.
4. Đổi Mgr_ssn của phòng.
5. Chèn nhân viên/phòng hoặc xóa/thay đổi hàng liên quan.

Một trigger chỉ kiểm khi INSERT EMPLOYEE chưa phủ các đường còn lại. Khi thiết kế với nhiều transaction đồng thời còn phải xét isolation/locking để hai thao tác kiểm tra riêng không cùng vượt qua rồi gây vi phạm. Viết query chẩn đoán là bước đầu, không phải toàn bộ giải pháp concurrency.

## 5. Bài tập

1. Sửa lương qua view AVG lương phòng thành 50000 có một cách duy nhất không?
2. DROP VIEW có xóa nhân viên không?
3. Trigger chỉ kiểm nhân viên khi tăng lương có đủ enforce quy tắc với lương quản lý không?

<details><summary>Lời giải</summary>

1. Không, có rất nhiều cách đổi lương từng người để đạt một trung bình. Cần quy tắc cập nhật cụ thể.
2. Không, bảng gốc còn. Phụ thuộc các view khác cần xử lý theo DBMS.
3. Không. Hạ lương quản lý hoặc đổi quản lý/chuyển phòng cũng có thể tạo vi phạm. Cần phủ mọi đường làm thay đổi bất biến.

</details>
