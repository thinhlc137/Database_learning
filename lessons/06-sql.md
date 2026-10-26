# 06 · SQL: hiểu dữ liệu trước và sau mỗi bước

> Đọc cùng **DB-Chapter6.md**. Lab chuẩn dùng SQLite qua Python; ví dụ SQL Server/PostgreSQL trong bản gốc phải đọc theo đúng dialect.

![Pipeline logic truy vấn và lỗi LEFT JOIN](../docs/assets/sql-pipeline.svg)

## Chạy một truy vấn thật

Từ thư mục gốc project:

```bash
python tools/lab.py --exercise Q01
python tools/lab.py --query "SELECT Fname, Salary FROM EMPLOYEE ORDER BY Fname"
python tools/lab.py --file sql/solutions.sql
```

Mỗi lần chạy tạo một database trong RAM từ schema và seed. Bạn có thể sửa dữ liệu trong phiên Python riêng mà không làm hỏng fixture trên đĩa. Xem `labs/02-sql.md` để mở REPL giữ cùng một connection.

## FROM/ON → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY

Đây là thứ tự **logic để lý giải** kết quả, không phải trình tự vật lý bắt buộc của optimizer. `WHERE` lọc hàng trước grouping; `HAVING` lọc nhóm sau grouping.

```sql
SELECT d.Dname, COUNT(e.Ssn) AS Employees
FROM DEPARTMENT AS d LEFT JOIN EMPLOYEE AS e ON e.Dno=d.Dnumber
GROUP BY d.Dnumber, d.Dname
HAVING COUNT(e.Ssn)>=4
ORDER BY d.Dname;
```

Kết quả: Administration 4, Research 4. `COUNT(e.Ssn)` đếm nhân viên thật; `COUNT(*)` ở LEFT JOIN đếm cả hàng giữ lại cho phòng không có nhân viên.

## LEFT JOIN: điều kiện đặt ở ON và WHERE không tương đương

```sql
-- Giữ cả phòng không có nhân viên lương > 40000.
SELECT d.Dname, e.Fname
FROM DEPARTMENT d LEFT JOIN EMPLOYEE e
 ON e.Dno=d.Dnumber AND e.Salary>40000
ORDER BY d.Dname, e.Fname;
```

Administration ghép Jennifer; Headquarters ghép James; Research và Innovation vẫn còn với Fname NULL. Nếu chuyển `e.Salary>40000` xuống WHERE, hai hàng NULL không vượt qua điều kiện và bị loại. Đây là lý do “outer join rồi WHERE” thường mất hàng người viết muốn giữ.

## NULL không phải 0, chuỗi rỗng hay một giá trị thường

Mai có Salary NULL: dữ liệu chưa biết. `Salary = NULL` cho UNKNOWN, không phải TRUE. Phải dùng `IS NULL`. WHERE chỉ giữ TRUE; cả FALSE và UNKNOWN đều bị loại. `AVG(Salary)` bỏ qua NULL; `COALESCE(Salary,0)` thay NULL bằng 0 và **thay đổi ý nghĩa phép tính**.

```sql
SELECT COUNT(*) AS AllEmployees, COUNT(Salary) AS KnownSalaries,
       ROUND(AVG(Salary),2) AS AverageKnownSalary
FROM EMPLOYEE;
```

Kết quả là 9, 8, 35125. Không nên điền lương chưa biết bằng 0 chỉ để biểu thức chạy được.

## NOT IN và NULL: thử phản ví dụ tối thiểu

```sql
SELECT Fname FROM EMPLOYEE WHERE Ssn NOT IN (SELECT Super_ssn FROM EMPLOYEE);
```

Super_ssn của James là NULL. Với những người không trùng các supervisor đã biết, điều kiện NOT IN vẫn UNKNOWN do NULL trong tập; không có hàng nào được giữ. Dùng correlated NOT EXISTS để tìm người không quản lý ai:

```sql
SELECT e.Fname FROM EMPLOYEE e
WHERE NOT EXISTS(SELECT 1 FROM EMPLOYEE s WHERE s.Super_ssn=e.Ssn)
ORDER BY e.Fname;
```

Kết quả Ahmad, Alicia, John, Joyce, Mai, Ramesh.

## Aggregate, subquery, view và transaction

Subquery tương quan tham chiếu hàng ngoài; viết được nó không có nghĩa engine phải thực thi lại y nguyên cho từng hàng. View thường là query lưu tên, không mặc định là bản sao vật lý. `CREATE VIEW ... WITH CHECK OPTION` không được SQLite hỗ trợ trực tiếp như PostgreSQL; không dán nguyên ví dụ đó vào lab rồi coi lỗi là lỗi của cú pháp SQL nói chung.

Transaction gom các thay đổi thành một đơn vị. Trong Python, `with connection:` commit khi thành công và rollback khi phát sinh exception. Truy vấn dữ liệu bằng **parameter binding**:

```python
rows = connection.execute(
    "SELECT Ssn, Fname FROM EMPLOYEE WHERE Dno = ?", (5,)
).fetchall()
```

Dấu `?` dành cho **giá trị**, không cho tên bảng/cột. Nếu cho người dùng chọn cột sắp xếp, cần whitelist tên cột. Xem `labs/05-security.md` để thử chuỗi có dấu nháy mà không ghép SQL.

## Bài tập và đầu ra cần kiểm tra

1. Đếm mọi phòng, kể cả phòng rỗng: Q07.
2. Tìm lương cao hơn trung bình phòng: Q16.
3. Tìm nhân viên làm cả dự án 1 và 2: Q18.
4. Dùng UPDATE trong transaction và cố tình lỗi để quan sát rollback: lab giao dịch.

<details><summary>Gợi ý lập luận</summary>

Q07 phải đi từ DEPARTMENT và LEFT JOIN; COUNT cột PK bên employee. Q16 phải so Salary với subquery có `x.Dno=e.Dno`; Salary NULL tự bị loại. Q18 có thể dùng hai EXISTS hoặc GROUP BY và COUNT DISTINCT trên hai mã yêu cầu. Không dùng điều kiện `Pno=1 AND Pno=2` trên cùng một hàng.

</details>
