# SQL 01 · Ngôn ngữ SQL, kiểu dữ liệu và database COMPANY

> Đối chiếu **4A_SQL, slide 1–12, 17–19, 27**. Học xong bài này, bạn phải đọc được một schema, chọn kiểu dữ liệu có lý do và phân biệt SQL chuẩn với T-SQL/SQLite. Ví dụ có nút **Chạy ví dụ** dùng SQLite thật; mỗi lần chạy tạo COMPANY mới trong RAM. Code `tsql` dùng SQL Server, không chạy trong SQLite.

## 1. SQL giải quyết việc gì?

Một hệ nhân sự cần lưu nhân viên, phòng ban, dự án và số giờ tham gia. Nếu mỗi chương trình tự kiểm tra dữ liệu, hai chương trình có thể áp dụng hai quy tắc khác nhau. SQL cho phép mô tả cấu trúc, ràng buộc và thao tác ngay trong hệ quản trị CSDL (DBMS).

SQL có tính **khai báo**: bạn nêu kết quả muốn lấy, chẳng hạn “nhân viên thuộc Research”; optimizer chọn kế hoạch đọc bảng, dùng index và join. SQL Server bổ sung **T-SQL** để viết biến, rẽ nhánh, vòng lặp và routine. SQLite trong project phục vụ thực hành quan hệ và truy vấn, không có toàn bộ T-SQL.

| Nhóm | Câu hỏi | Lệnh điển hình | Tác động |
|---|---|---|---|
| DDL | Dữ liệu có cấu trúc gì? | CREATE, ALTER, DROP | Tạo/đổi/xóa đối tượng |
| DML | Đọc và thay đổi dữ liệu thế nào? | SELECT, INSERT, UPDATE, DELETE | Tạo kết quả hoặc thay đổi hàng |
| DCL | Ai có quyền làm gì? | GRANT, REVOKE | Thay đổi quyền |
| Điều khiển giao dịch, thường gọi TCL | Những thay đổi nào cùng được xác nhận? | BEGIN, COMMIT, ROLLBACK | Quyết định ranh giới giao dịch |

Slide gộp COMMIT/ROLLBACK vào DCL. Bạn nên nhận ra cách phân loại của slide khi làm bài, đồng thời hiểu chúng điều khiển giao dịch, khác với cấp quyền. SELECT đôi khi được tách thành DQL trong giáo trình khác; đổi nhãn không đổi ngữ nghĩa.

## 2. Catalog, schema, table và view

**Schema** là không gian tên chứa các đối tượng có liên quan. Theo mô hình SQL, một catalog có thể chứa nhiều schema. Trong SQL Server, một database chứa các schema như `dbo`, `course`; `course.EMPLOYEE` có hai phần: schema và tên bảng. Schema không phải “bản dữ liệu” và cũng không đồng nghĩa với user đăng nhập.

```sql
-- SQL chuẩn minh họa, không chạy bằng SQLite
CREATE SCHEMA Company AUTHORIZATION JSmith;
```

SQLite dùng các tên database `main`, `temp` hoặc database được ATTACH; không hỗ trợ CREATE SCHEMA theo cách này. Khi một người nói “schema của COMPANY”, họ cũng có thể đang nói **mô tả cấu trúc** toàn bộ COMPANY. Cần hiểu theo ngữ cảnh.

| Đối tượng | Lưu gì? | Dữ liệu có tự đổi theo bảng gốc? |
|---|---|---|
| Base table | Những hàng dữ liệu được lưu bởi DBMS | Thay đổi bởi DML |
| View thông thường | Định nghĩa truy vấn có tên | Có, truy vấn lại dữ liệu hiện tại |
| Bảng tạo bằng CREATE TABLE AS SELECT | Bản chụp kết quả tại lúc tạo | Không tự đồng bộ |
| Materialized/indexed view | Kết quả có lưu vật lý theo cơ chế riêng | Phụ thuộc DBMS và cơ chế duy trì |

Không suy “view luôn không tốn chi phí”: join và aggregate trong view vẫn cần được thực hiện, trừ khi DBMS có cơ chế tối ưu/lưu kết quả phù hợp.

## 3. Dữ liệu dùng xuyên suốt khóa học

![Các bảng COMPANY và liên kết khóa ngoại](../../docs/assets/sql-company.svg)

| Bảng | Một hàng biểu diễn | Khóa chính | Những khóa ngoại quan trọng |
|---|---|---|---|
| EMPLOYEE | Một nhân viên | Ssn | Dno → DEPARTMENT; Super_ssn → EMPLOYEE |
| DEPARTMENT | Một phòng ban | Dnumber | Mgr_ssn → EMPLOYEE |
| DEPT_LOCATIONS | Một địa điểm của một phòng | (Dnumber, Dlocation) | Dnumber → DEPARTMENT |
| PROJECT | Một dự án | Pnumber | Dnum → DEPARTMENT |
| WORKS_ON | Một nhân viên tham gia một dự án | (Essn, Pno) | Essn → EMPLOYEE; Pno → PROJECT |
| DEPENDENT | Một người phụ thuộc của một nhân viên | (Essn, Dependent_name) | Essn → EMPLOYEE |

Ví dụ `('123456789', 1, 32.5)` trong WORKS_ON nghĩa là John làm dự án 1 trong 32.5 giờ. `Pno=1` có thể xuất hiện nhiều lần vì nhiều nhân viên cùng làm một dự án. **Cặp** `(Essn,Pno)` mới phải duy nhất.

```sql
-- @lab S01
SELECT Fname, Ssn, Salary, Dno
FROM EMPLOYEE
ORDER BY Ssn;
```

| Nhân viên | Salary | Dno | Ghi chú để kiểm thử |
|---|---:|---:|---|
| Mai | NULL | 4 | Lương chưa biết, chưa có phân công |
| John | 30000 | 5 | Làm ProductX và ProductY |
| Franklin | 40000 | 5 | Quản lý phòng Research |
| Joyce | 25000 | 5 | Cùng làm dự án 1 và 2 với John |
| James | 55000 | 1 | Super_ssn NULL |

Fixture có **9 nhân viên, 4 phòng, 6 dự án, 16 phân công, 7 người phụ thuộc**. Innovation (9) chưa có nhân viên. Slide COMPANY thường dùng 8 nhân viên và 3 phòng, nên kết quả không nhất thiết giống số trong slide. Các hàng bổ sung giúp thấy rõ NULL, phòng rỗng và outer join. Cột trong slide có lúc viết `MGRSSN`/`SUPERSSN`; fixture dùng `Mgr_ssn`/`Super_ssn`.

## 4. Chọn kiểu dữ liệu theo ý nghĩa

| Nhóm trong slide | Ví dụ | Dùng khi nào? | Điểm dễ sai |
|---|---|---|---|
| Số nguyên | INTEGER, SMALLINT | Số lượng, mã số nội bộ | Mã có số 0 đầu không nên ép thành số |
| Số gần đúng | FLOAT, REAL, DOUBLE PRECISION | Đo lường, tính gần đúng | Không bảo đảm số thập phân chính xác |
| Số thập phân chính xác | DECIMAL(p,s), NUMERIC(p,s) | Tiền, số liệu cần số chữ số xác định | `p` là tổng chữ số, `s` là phần lẻ |
| Chuỗi cố định | CHAR(n) | Mã có độ dài cố định | Có quy tắc padding/so sánh tùy DBMS |
| Chuỗi thay đổi | VARCHAR(n), NVARCHAR(n) | Tên, địa chỉ | SQL Server nên dùng NVARCHAR cho tiếng Việt |
| Chuỗi bit | BIT(n), BIT VARYING(n) trong SQL chuẩn | Dãy bit | SQL Server BIT là 0/1/NULL, không phải BIT(n) chuẩn |
| Boolean | BOOLEAN | Đúng/sai/chưa biết | Không phải DBMS nào có cùng kiểu vật lý |
| Ngày/giờ | DATE, TIME, TIMESTAMP | Ngày sinh, thời điểm | Tránh định dạng ngày mơ hồ |
| Khoảng thời gian | INTERVAL | Khoảng 3 ngày, 2 tháng | SQL Server dùng DATEADD/DATEDIFF, không có INTERVAL như PostgreSQL |

`DECIMAL(10,2)` có tối đa 8 chữ số phần nguyên và 2 chữ số phần lẻ. `NUMERIC(3,2)` chỉ chứa một chữ số phần nguyên, nên hệ số 1.20 hợp lệ còn 10.00 vượt miền. SSN là định danh, không phải đại lượng để cộng trừ: giữ `CHAR(9)` để không mất số 0 đầu.

**TIMESTAMP là bẫy dialect quan trọng.** Trong SQL chuẩn nó mô tả ngày và giờ. Trong SQL Server, `timestamp` là tên cũ của `rowversion`, một giá trị nhị phân phục vụ đánh dấu phiên bản hàng; dùng `datetime2` cho thời điểm, `datetimeoffset` nếu cần độ lệch múi giờ. `DATE '2000-01-01'` là literal chuẩn ở một số DBMS; ví dụ T-SQL dùng `CONVERT(date,'20000101',112)` hoặc chuỗi ISO phù hợp.

### SQLite trong project khác gì?

SQLite thường dùng type affinity và 5 storage classes: NULL, INTEGER, REAL, TEXT, BLOB. `VARCHAR(3)` trên bảng thường không tự chặn chuỗi dài hơn 3 ký tự. `DECIMAL(10,2)` không tạo cơ chế lưu decimal chính xác như SQL Server. Bảng STRICT có các quy tắc riêng và bộ tên kiểu giới hạn.

```sql
-- @lab S02
CREATE TABLE TypeDemo(code VARCHAR(3), amount DECIMAL(10,2));
INSERT INTO TypeDemo VALUES ('ABCDE', 12.345);
SELECT code, length(code) AS n, amount FROM TypeDemo;
```

Kết quả `ABCDE, 5, 12.345`. Đừng lấy sự chấp nhận này làm bằng chứng dữ liệu đã đúng quy tắc. Trong SQLite có thể thêm `CHECK(length(code)<=3)`; với tiền có thể lưu số nguyên theo đơn vị nhỏ nhất, chẳng hạn đồng hoặc cent.

## 5. Domain là miền giá trị dùng lại

Domain đặt tên cho một kiểu kèm quy tắc để nhiều cột cùng dùng một định nghĩa. Ví dụ minh họa SQL chuẩn/PostgreSQL:

```sql
CREATE DOMAIN SSN_TYPE AS CHAR(9);
CREATE DOMAIN NONNEGATIVE_MONEY AS DECIMAL(10,2)
CHECK (VALUE >= 0);
```

Domain giúp đọc schema và tập trung thay đổi, nhưng thay miền có thể cần kiểm tra dữ liệu đang tồn tại. Domain không tự làm cột thành khóa. SQLite không có CREATE DOMAIN; SQL Server có alias type nhưng không tương đương đầy đủ với domain có CHECK. Trong bài thực hành, khai báo kiểu và constraint trực tiếp.

## 6. Tự kiểm tra

1. Vì sao SSN nên là chuỗi? `PRIMARY KEY(Ssn)` có đồng nghĩa Dno duy nhất không?
2. Một view lương cao có tự phản ánh UPDATE EMPLOYEE không? Bảng sao chép từ SELECT thì sao?
3. Có thể dùng `timestamp` làm ngày sinh trong SQL Server không?
4. Nếu `VARCHAR(3)` nhận 5 ký tự trên web, bạn kết luận gì về SQL Server?

<details><summary>Lời giải và tiêu chí hiểu bài</summary>

1. SSN là mã, cần giữ số 0 đầu. PK chỉ bảo đảm tính duy nhất/không NULL của khóa đã khai báo, không lan sang Dno.
2. View thường đọc trạng thái hiện tại. Bảng chụp lưu kết quả tại thời điểm tạo và cần cập nhật riêng.
3. Không. Dùng DATE cho ngày sinh. SQL Server timestamp/rowversion không phải thời điểm.
4. Chỉ kết luận hành vi của SQLite trong ví dụ. Muốn biết DBMS khác phải đọc quy tắc kiểu và cấu hình của nó.

</details>

Tiếp theo: [SQL 02 · DDL và ràng buộc](02-ddl-constraints.md).
