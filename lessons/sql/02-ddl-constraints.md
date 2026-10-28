# SQL 02 · CREATE, ALTER, DROP và toàn vẹn dữ liệu

> Nguồn: **4A slide 6–25**, gồm cả schema ở dạng ảnh (17–19, 21). Mục tiêu: tự viết DDL, dự đoán lệnh nào bị từ chối, và giải thích phản ứng khi xóa/cập nhật hàng cha.

## 1. Một CREATE TABLE được đọc như thế nào?

```sql
-- @lab S03
CREATE TABLE CourseDept (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  budget INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL,
  manager_since TEXT,
  CONSTRAINT uq_course_dept UNIQUE (name),
  CONSTRAINT ck_budget CHECK (budget >= 0),
  CONSTRAINT ck_dates CHECK (manager_since >= created_at)
);
INSERT INTO CourseDept(id,name,created_at)
VALUES (1,'Research','2020-01-01');
SELECT id,name,budget,manager_since FROM CourseDept;
```

Đọc từ trên xuống: có 5 cột, `id` xác định hàng; tên bắt buộc và duy nhất; ngân sách bắt buộc, mặc định 0; ngày bổ nhiệm nếu có phải không sớm hơn ngày thành lập. Kết quả: `1, Research, 0, NULL`.

`CHECK` chỉ từ chối khi điều kiện là FALSE; nếu UNKNOWN do NULL, CHECK này không từ chối. Vì vậy `manager_since=NULL` được chấp nhận. Muốn bắt buộc ngày bổ nhiệm, cần thêm `NOT NULL`. Đây là lý do **CHECK không thay thế NOT NULL**.

## 2. Các constraint khác nhau ở câu hỏi chúng trả lời

| Constraint | Quy tắc | Phản ví dụ |
|---|---|---|
| NOT NULL | Cột phải có giá trị | Tên NULL |
| DEFAULT | Giá trị khi cột được bỏ qua/được yêu cầu dùng mặc định | Không tự sửa mọi NULL thành 0 |
| PRIMARY KEY | Mỗi hàng có một khóa định danh duy nhất, không NULL theo mô hình SQL | Hai hàng cùng Ssn |
| UNIQUE | Không trùng tổ hợp cột | Hai phòng cùng tên |
| FOREIGN KEY | Giá trị con tham chiếu một khóa hợp lệ ở cha, hoặc đáp ứng quy tắc NULL | Dno=999 không có phòng |
| CHECK | Điều kiện trên dữ liệu của hàng | Salary=-1 hoặc ngày bổ nhiệm trước ngày thành lập |

**DEFAULT không phải constraint kiểm tra giá trị.** Chèn Salary=-10 không được sửa thành mặc định. Chèn NULL tường minh cũng không tự dùng DEFAULT; nếu cột NOT NULL thì lỗi. `INTEGER PRIMARY KEY` trên SQLite là trường hợp riêng có thể tự cấp rowid khi chèn NULL; không lấy trường hợp đó để suy cho mọi cột PK.

### Khóa ghép không phải hai khóa đơn

`PRIMARY KEY(Essn,Pno)` cho phép `(John,1)`, `(John,2)` và `(Joyce,1)`, nhưng cấm hai lần `(John,1)`. Nếu viết `UNIQUE(Essn)` và `UNIQUE(Pno)`, bạn vô tình cấm mỗi người làm nhiều dự án và mỗi dự án có nhiều người.

Để FK tham chiếu cặp cột, cả phía cha và con phải có tổ hợp tương thích, đúng số lượng và thứ tự. Không được giả định một phần của composite PK đã duy nhất.

### NULL trong UNIQUE phụ thuộc hệ quản trị

SQLite cho phép nhiều NULL trong UNIQUE. SQL Server có hành vi khác với unique constraint/index thông thường; khi cần “email được bỏ trống nhiều lần, nhưng nếu có thì phải duy nhất”, hãy thiết kế theo DBMS, chẳng hạn filtered unique index `WHERE email IS NOT NULL` trên SQL Server. Không học quy tắc UNIQUE/NULL bằng cách suy từ PK.

## 3. FK kiểm tra tồn tại, không tự suy toàn bộ nghiệp vụ

`EMPLOYEE.Dno → DEPARTMENT.Dnumber` chỉ xác nhận phòng tồn tại. `DEPARTMENT.Mgr_ssn → EMPLOYEE.Ssn` chỉ xác nhận quản lý là một nhân viên. Hai FK riêng **chưa bảo đảm** người quản lý làm đúng phòng mình quản lý. Quy tắc này cần thiết kế ràng buộc phù hợp hoặc cơ chế kiểm tra khác.

Trong COMPANY có chu trình: EMPLOYEE cần DEPARTMENT, còn DEPARTMENT tham chiếu người quản lý trong EMPLOYEE. Có hai vấn đề riêng:

1. **Tạo schema:** SQL Server thường tạo hai bảng trước, rồi ALTER TABLE thêm FK sau khi cả hai tồn tại.
2. **Nạp dữ liệu:** cho Mgr_ssn tạm NULL rồi bổ sung sau, hoặc dùng constraint trì hoãn ở DBMS hỗ trợ. Fixture SQLite dùng DEFERRABLE INITIALLY DEFERRED và nạp trong transaction. SQL Server không có deferred FK tương đương.

## 4. ON DELETE và ON UPDATE: điều gì xảy ra ở bảng con?

Giả sử cha có mã 5, hai hàng con cùng tham chiếu 5. Khi xóa cha:

| Hành động | Kết quả mong đợi ở con | Điều kiện/lưu ý |
|---|---|---|
| NO ACTION | Không cho trạng thái vi phạm FK tồn tại tại lúc kiểm tra | Thời điểm kiểm tra phụ thuộc cơ chế deferral |
| RESTRICT | Chặn thay đổi đang còn tham chiếu theo quy tắc DBMS | Không đồng nhất mọi chi tiết với NO ACTION |
| CASCADE | Xóa các hàng con tham chiếu | Không chỉ xóa giá trị FK |
| SET NULL | Giữ hàng con, đổi FK sang NULL | Cột con phải cho NULL |
| SET DEFAULT | Giữ hàng con, dùng mặc định | Giá trị mặc định vẫn phải hợp lệ theo FK |

Với ON UPDATE CASCADE, đổi khóa cha 5 thành 7 làm FK con từ 5 thành 7. Cập nhật cột không phải khóa được tham chiếu không kích hoạt sự lan truyền này. SQL Server dùng NO ACTION chứ không có từ khóa RESTRICT ở đây. SQLite mặc định NO ACTION. Slide dùng “RESTRICT default” như cách mô tả khái quát, cần phân biệt khi viết lệnh cụ thể.

```sql
-- @lab S04
CREATE TABLE ParentDemo(id INTEGER PRIMARY KEY);
CREATE TABLE ChildDemo(
 id INTEGER PRIMARY KEY,
 parent_id INTEGER REFERENCES ParentDemo(id)
 ON UPDATE CASCADE ON DELETE SET NULL
);
INSERT INTO ParentDemo VALUES(5);
INSERT INTO ChildDemo VALUES(10,5),(11,5);
UPDATE ParentDemo SET id=7 WHERE id=5;
SELECT id,parent_id FROM ChildDemo ORDER BY id;
DELETE FROM ParentDemo WHERE id=7;
SELECT id,parent_id FROM ChildDemo ORDER BY id;
```

Hai bảng kết quả: trước xóa có `(10,7),(11,7)`; sau xóa có `(10,NULL),(11,NULL)`. Thử đổi SET NULL thành CASCADE rồi dự đoán: hai hàng con sẽ biến mất. Khi làm bài thi, ghi rõ **hàng nào bị xóa**, **cột nào đổi**, hay **lệnh thất bại**.

**CASCADE của FK là lan truyền DML**. `DROP ... CASCADE` trong một số DBMS là xử lý phụ thuộc khi xóa **đối tượng schema**. Cùng từ khóa nhưng hai tình huống khác nhau.

## 5. Đặt tên constraint

```tsql
ALTER TABLE course.EMPLOYEE
ADD CONSTRAINT FK_Employee_Department
FOREIGN KEY(Dno) REFERENCES course.DEPARTMENT(Dnumber);
```

Tên giúp thông báo lỗi và migration dễ đọc. Một tên do DBMS tự sinh khó đối chiếu hơn tên mô tả ý nghĩa. Phạm vi duy nhất của tên phụ thuộc DBMS/loại đối tượng; với SQL Server hãy đặt tên không đụng trong schema. Thêm constraint phải kiểm tra dữ liệu cũ, không chỉ dữ liệu mới.

## 6. ALTER TABLE và giới hạn dialect

| Mục đích | SQL Server minh họa | SQLite trong web |
|---|---|---|
| Thêm cột | `ALTER TABLE ... ADD Job nvarchar(50);` | `ADD COLUMN Job TEXT` |
| Đổi kiểu | `ALTER TABLE ... ALTER COLUMN Salary decimal(12,2);` | Thường cần dựng bảng mới rồi chuyển dữ liệu |
| Thêm FK | `ADD CONSTRAINT ... FOREIGN KEY ...` | Không có ADD CONSTRAINT tổng quát |
| Xóa constraint | `DROP CONSTRAINT ten;` | Không có DROP CONSTRAINT tổng quát |
| Đổi mặc định | Thao tác default constraint có tên | Thường cần migration dựng lại bảng |
| Xóa cột | `DROP COLUMN ...` với điều kiện phụ thuộc | Có hỗ trợ trong SQLite mới nhưng còn điều kiện |

```sql
-- @lab S05
CREATE TABLE AlterDemo(id INTEGER PRIMARY KEY,name TEXT);
INSERT INTO AlterDemo VALUES(1,'An');
ALTER TABLE AlterDemo ADD COLUMN active INTEGER NOT NULL DEFAULT 1;
SELECT id,name,active FROM AlterDemo;
```

Kết quả `1, An, 1`. Đọc `PRAGMA table_info(AlterDemo)` trong Playground để xem cấu trúc. Không dán `ALTER COLUMN ... SET DEFAULT` chuẩn/PostgreSQL vào SQL Server hoặc SQLite rồi kết luận SQL “không cho đổi mặc định”.

## 7. DROP, DELETE và TRUNCATE

| Lệnh | Hàng dữ liệu | Định nghĩa bảng | WHERE | Ghi nhớ |
|---|---|---|---|---|
| DELETE FROM T | Xóa các hàng được chọn | Còn | Có | Có thể kích hoạt DELETE trigger và FK actions |
| DROP TABLE T | Đối tượng bảng bị xóa | Mất | Không | Phải xử lý phụ thuộc theo DBMS |
| TRUNCATE TABLE T (SQL Server) | Xóa toàn bộ dữ liệu | Còn | Không | Có hạn chế FK; không kích hoạt DML DELETE trigger |

SQLite không có TRUNCATE TABLE. PostgreSQL hỗ trợ DROP TABLE ... CASCADE/RESTRICT, SQL Server không chấp nhận hậu tố đó. `DROP` có thể rollback trong transaction ở SQL Server ở các tình huống thông thường; đừng ghi nhớ sai rằng “mọi DDL luôn auto-commit ở mọi hệ”.

## 8. Bài tập dự đoán

1. `CHECK(x>0)` có chặn x=NULL không? Thêm gì nếu x bắt buộc?
2. SET DEFAULT về 1 nhưng bảng cha không có 1 thì sao?
3. Có `(A,1)` rồi, chèn `(A,2)` vào PK(A,B) có được không?
4. Hai nhân viên cùng Dno có vi phạm FK không?
5. DELETE không WHERE khác DROP TABLE thế nào?

<details><summary>Lời giải</summary>

1. Không, biểu thức UNKNOWN không bị CHECK này từ chối. Thêm NOT NULL.
2. Vẫn vi phạm FK. Default không miễn kiểm tra toàn vẹn.
3. Được nếu không có constraint khác bị vi phạm; hai cặp khác nhau.
4. Không. FK cho phép nhiều con cùng tham chiếu một cha.
5. DELETE giữ định nghĩa bảng, xóa hàng, còn phải xét FK/trigger. DROP xóa đối tượng và cần xử lý các phụ thuộc schema.

</details>
