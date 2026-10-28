# Thực hành SQL Server trên máy của bạn

> Dành cho SQL 11–16 và các ví dụ T-SQL trong hai bộ slide 4A/4B. Web của project dùng SQLite; SQL Server là một database engine riêng. Không chạy những file dưới đây bằng python tools/lab.py hoặc ô SQLite trên web.

## 1. Chuẩn bị

Cần một kết nối tới **SQL Server có hỗ trợ CREATE OR ALTER** (SQL Server 2016 SP1 trở lên cho các ví dụ này) và client gửi query, chẳng hạn SSMS. Có thể dùng engine cài trên máy hoặc server học tập được cấp. Cài SSMS không đồng thời tạo engine. Khi dùng máy trường/lab, hỏi thông tin server/database được cấp; không tạo đối tượng trên database nghiệp vụ đang sử dụng.

Script setup mặc định tạo database riêng **DatabaseLearningLab**, schema **course**. Tài khoản cần quyền tương ứng để tạo database/schema/đối tượng. Nếu chỉ có database được cấp sẵn, sửa các dòng USE và bỏ phần CREATE DATABASE theo quyền quản trị được cấp.

Các script được soát theo tài liệu SQL Server, nhưng **chưa được thực thi bằng SQL Server trong CI của project**. 43 ví dụ trong bài và 40 bài Q chạy bằng SQLite đã có kiểm thử thực thi; đây là hai phạm vi khác nhau.

## 2. Mở và chạy bằng SSMS

1. Giải nén project vào thư mục trên máy. Mở SSMS và kết nối engine.
2. File → Open → File, chọn **00-setup.sql**. Đọc database đích rồi Execute (F5).
3. Kiểm tra Employees=9, Departments=4, KnownPayroll=281000.
4. Mở lần lượt 01 đến 06, đọc mã rồi Execute. Mỗi CREATE/ALTER routine có GO để tách batch đúng.
5. Chạy 07-self-check.sql sau khi đã tạo các routine/trigger. Nó có các ca lỗi cố ý được bắt, cùng transaction rollback để kiểm thử.

| File | Nội dung | Dữ liệu bị thay đổi bền khi chạy? |
|---|---|---|
| [00-setup.sql](00-setup.sql) | Tạo DB/schema, 6 bảng, seed, FK có chu trình | Có, tạo dữ liệu học |
| [01-basics.sql](01-basics.sql) | Biến, SET/SELECT, IF, WHILE, trace BREAK/CONTINUE | Không sửa bảng |
| [02-procedures.sql](02-procedures.sql) | ListEmployees, Update_Sal, INPUT/OUTPUT/RETURN | Tạo routine; demo lương rollback |
| [03-functions.sql](03-functions.sql) | Get_Sal, inline TVF, EmpAndDependent | Tạo function; SELECT đọc |
| [04-triggers.sql](04-triggers.sql) | Check_Dnumber, CHECK_AGE, SalaryAudit | Tạo trigger và bảng audit |
| [05-cursor.sql](05-cursor.sql) | Cursor có cleanup và PrintedRows | Tạo procedure; chỉ đọc/in |
| [06-errors.sql](06-errors.sql) | InsertDept, TRY/CATCH, THROW, RAISERROR thông tin | Tạo procedure; demo không chèn dữ liệu |
| [07-self-check.sql](07-self-check.sql) | OUTPUT, TVF, audit nhiều hàng, trigger từ chối, hệ số sai | Ca sửa/chèn được rollback |
| [08-permissions.sql](08-permissions.sql) | Tùy chọn: user WITHOUT LOGIN, GRANT OPTION, REVOKE CASCADE, view | Tạo user/quyền trong database học |

GO là dấu phân cách client của SSMS/sqlcmd. Nếu dùng driver Python/Node gửi nguyên file, server không hiểu GO; cần công cụ tách batch phù hợp. Không tách script bằng dấu chấm phẩy vì body routine/trigger chứa nhiều statement.

## 3. Schema và dữ liệu

Dùng `course.EMPLOYEE` thay vì `dbo.EMPLOYEE`. Sáu bảng giữ ý nghĩa và dữ liệu COMPANY như SQLite: 9 nhân viên (có Mai Salary NULL), 4 phòng (Innovation rỗng), 6 dự án, 16 phân công, 7 người phụ thuộc.

SQL Server không hỗ trợ deferred FK như fixture SQLite. Setup tạo bảng, nạp dữ liệu rồi thêm những FK chu trình khi cả hai phía đã tồn tại và hợp lệ. Mgr_ssn nullable dùng filtered unique index để cho nhiều phòng chưa có quản lý mà vẫn không lặp mã quản lý đã biết, thay vì UNIQUE nullable thông thường có ngữ nghĩa khác SQLite.

Kiểu lương dùng DECIMAL(12,2), ngày dùng DATE, tiếng Việt dùng NVARCHAR. Dữ liệu ban đầu có địa chỉ rút gọn (Houston, Bellaire...), không giống đầy đủ mọi chuỗi địa chỉ trên slide.

## 4. Cách chạy lại

00-setup.sql dừng phần tạo bảng nếu các bảng course đã có; nó không xóa dữ liệu cũ. Không chạy lại setup để mong “reset” tự động. Các file routine dùng CREATE OR ALTER nên có thể tạo/cập nhật định nghĩa lại; trigger vẫn có thể ảnh hưởng những bài DML làm sau đó.

Để thử tăng lương nhiều lần mà vẫn giữ fixture, bọc thao tác trong BEGIN TRAN ... ROLLBACK như bài. Procedure InsertDept ở bài 16 cố ý yêu cầu gọi ngoài transaction đang mở và tự sở hữu transaction; không gọi nó bên trong demo BEGIN TRAN của caller.

Nếu bạn đã chủ động đổi dữ liệu fixture, hãy phục hồi đúng các hàng đã đổi hoặc tạo một database học mới bằng cách chỉnh tên database trong bản sao script. Project không kèm lệnh DROP DATABASE tự động.

## 5. Khi thấy lỗi

| Thông báo/tình huống | Kiểm tra |
|---|---|
| Invalid object name course.EMPLOYEE | Đã chạy setup? Đang USE đúng DB? |
| Incorrect syntax near GO | Client có xử lý GO không? |
| CREATE ... must be first statement in query batch | Chạy cả batch đúng vị trí GO; đừng bỏ một phần phân cách |
| Permission denied / không tạo được database | Quyền trên server/database và schema được cấp |
| Mã lỗi 51000/51001 | Trigger tuổi hoặc Dnumber đang enforce theo bài 14 |
| Mã lỗi 50001/50002 | Hệ số không hợp lệ hoặc không có nhân viên theo hợp đồng procedure |
| Transaction đang mở sau thử nghiệm | Đọc @@TRANCOUNT/XACT_STATE, xử lý COMMIT/ROLLBACK theo quyền sở hữu |
| Kết quả lương lệch mẫu | Có lần UPDATE trước chưa rollback? Trigger/routine hiện tại có thay đổi? |

Quay lại [mục lục SQL](../../lessons/06-sql.md), [biến và vòng lặp](../../lessons/sql/11-tsql-programming.md), [xử lý lỗi](../../lessons/sql/16-error-handling.md).
