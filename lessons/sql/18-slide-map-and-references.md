# SQL 18 · Đối chiếu từng slide, hiệu đính và nguồn tham khảo

> Hai PowerPoint do người học cung cấp ngày 28/10/2026: **4A_SQL.pptx, 107 slide** và **4B_AdvancedSQL.pptx, 50 slide**. Số dưới đây là vị trí slide trong file, không dùng số trang notes. Bảng ghi đích học chính cho **từng slide**, gồm cả trang mục lục/lặp/kết thúc để không lẫn chúng với kiến thức mới.

## 1. Cách đối chiếu

Bài SQL 01–16 diễn giải theo chủ đề để học liên tục, không ép một slide thành một bài riêng. Bài 17 có 20 bài tổng hợp; 43 ví dụ S01–S43 chạy bằng SQLite, còn routine SQL Server có bộ script riêng. Các ảnh chứa code ở 4B 4–6,8–12 và bảng ở 39–40,47–48 đã được đọc như nội dung, không bị bỏ qua khi trích text. DDL COMPANY trong ảnh 4A 18–19,21 cũng được đối chiếu.

Manifest ở materials/sql-slides-manifest.json lưu tên file, SHA-256, tổng slide và ánh xạ từng trang. Hai file PPTX gốc vẫn là tài liệu người học cung cấp; project không gộp chúng vào ZIP nguồn. Chín Markdown gốc tiếp tục được giữ nguyên từng byte. Nội dung mới là bài giảng diễn giải, không phải đáp án chính thức.

## 2. Những điểm được hiệu đính khi học

| Vị trí | Cần đọc chính xác | Bài giải thích |
|---|---|---|
| 4A 4,95,106 | Slide gộp COMMIT/ROLLBACK vào DCL; phân biệt với GRANT/REVOKE và điều khiển giao dịch | SQL 01,08 |
| 4A 10–11 | TIMESTAMP SQL chuẩn khác SQL Server timestamp/rowversion; BIT cũng khác theo dialect | SQL 01 |
| 4A 16 | SQLite/SQL Server dùng NO ACTION mặc định; SQL Server không có từ khóa RESTRICT ở FK | SQL 02 |
| 4A 25 | ALTER có khác biệt dialect; ví dụ cuối thiếu cấu trúc ADD CONSTRAINT đầy đủ | SQL 02 |
| 4A 27,31 | SELECT statement phối hợp nhiều phép; WHERE gần σ, danh sách SELECT gần π | SQL 03 |
| 4A 35 | Self join phải có hai vai EMPLOYEE e và EMPLOYEE s, không chỉ FROM Employee E S | SQL 04 |
| 4A 42 | Vế WORKS_ON/EMPLOYEE lấy Pno, không phải Pnumber chưa có trong nguồn | SQL 03 |
| 4A 48–49 | Muốn đổi subquery sang JOIN phải giữ đủ predicate và xét multiplicity; nếu đề có sex thì giữ điều kiện sex | SQL 07 |
| 4A 51 | ALL/ANY cần xét NULL/tập rỗng, không thay MAX/MIN vô điều kiện | SQL 07 |
| 4A 65 | Có thể GROUP BY cột không đưa ra SELECT; tránh chọn cột không xác định trong nhóm | SQL 06 |
| 4A 75–76 | INSERT thiếu Dno không chạy với fixture hiện tại; ngày cần định dạng rõ; không chèn lại SSN James đã có | SQL 08 |
| 4A 85 | D.Number cần khớp schema Dnumber; assertion không được SQL Server/SQLite triển khai | SQL 09 |
| 4A 91 | SELECT biến từ inserted bỏ sót nhiều hàng; biên 0..20 khác 1..20 ở ví dụ CHECK | SQL 14 |
| 4A 99–105 | CREATETAB và GRANT tổng quát không phải mọi cú pháp T-SQL; quyền mức cột và CASCADE cần xét đúng hệ | SQL 10 |
| 4B 14–15 | Procedure có cơ chế compile/cache/recompile, không bảo đảm một plan bất biến hay luôn nhanh hơn | SQL 12 |
| 4B 17 | Update_Sal nên có hợp đồng hệ số, mã không tồn tại, OUTPUT và trạng thái | SQL 12 |
| 4B 30 | Bdate NULL và sinh nhật cần chính sách; DATEDIFF(year) không tự là tuổi chính xác | SQL 14 |
| 4B 35–36 | FETCH hướng khác cần loại cursor hỗ trợ; SSN nên giữ chuỗi, FETCH_STATUS chung connection | SQL 15 |
| 4B 40 | Quyền raise mức 19–25 không áp cho mọi mức 17–19; fatal có thể làm mất connection | SQL 16 |
| 4B 44,48 | RAISERROR không tự giữ number/line lỗi gốc; không bảo đảm luôn dừng batch/rollback | SQL 16 |
| 4B 47–49 | THROW; chỉ rethrow trong CATCH, THROW mới severity16; XACT_ABORT khác RAISERROR | SQL 16 |

Các ghi chú làm rõ giới hạn/cú pháp khi ứng dụng; không thay đổi file gốc và không coi mọi câu tóm tắt trong slide là đặc tả đầy đủ của mọi DBMS.

## 3. Tài liệu chính thức để tra sâu

- [SQLite SELECT, JOIN và aggregate](https://www.sqlite.org/lang_select.html), [CREATE TABLE](https://www.sqlite.org/lang_createtable.html), [kiểu dữ liệu](https://www.sqlite.org/datatype3.html), [FK](https://www.sqlite.org/foreignkeys.html), [trigger](https://www.sqlite.org/lang_createtrigger.html).
- [SQL Server rowversion](https://learn.microsoft.com/en-us/sql/t-sql/data-types/rowversion-transact-sql?view=sql-server-ver17).
- [CREATE PROCEDURE](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-procedure-transact-sql?view=sql-server-ver17), [CREATE FUNCTION](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-function-transact-sql?view=sql-server-ver17), [giới hạn UDF](https://learn.microsoft.com/en-us/sql/relational-databases/user-defined-functions/create-user-defined-functions-database-engine?view=sql-server-ver17).
- [CREATE TRIGGER](https://learn.microsoft.com/en-us/sql/t-sql/statements/create-trigger-transact-sql?view=sql-server-ver17), [trigger nhiều hàng](https://learn.microsoft.com/en-us/sql/relational-databases/triggers/create-dml-triggers-to-handle-multiple-rows-of-data?view=sql-server-ver17).
- [DECLARE CURSOR](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/declare-cursor-transact-sql?view=sql-server-ver17), [FETCH_STATUS](https://learn.microsoft.com/en-us/sql/t-sql/functions/fetch-status-transact-sql?view=sql-server-ver17).
- [THROW](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/throw-transact-sql?view=sql-server-ver17), [RAISERROR](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/raiserror-transact-sql?view=sql-server-ver17), [TRY/CATCH](https://learn.microsoft.com/en-us/sql/t-sql/language-elements/try-catch-transact-sql?view=sql-server-ver17), [XACT_ABORT](https://learn.microsoft.com/en-us/sql/t-sql/statements/set-xact-abort-transact-sql?view=sql-server-ver17).
- [GRANT OBJECT](https://learn.microsoft.com/en-us/sql/t-sql/statements/grant-object-permissions-transact-sql?view=sql-server-ver17), [REVOKE OBJECT](https://learn.microsoft.com/en-us/sql/t-sql/statements/revoke-object-permissions-transact-sql?view=sql-server-ver17).

Nguồn slide quyết định phạm vi giảng; tài liệu chính thức được dùng đối chiếu những giới hạn/hiệu đính về dialect, không sao chép dài. Ngày đối chiếu: 28/10/2026. Kiểm thử tự động chạy SQLite; chưa thực thi SQL Server trong môi trường CI này.

## 4. 4A_SQL.pptx · 107 slide

| Slide | Chủ đề trên slide | Bài đọc chính | Vai trò |
|---:|---|---|---|
| 1 | Structured Query Language | [SQL-01](01-language-data-types.md) | Bìa/mục lục |
| 2 | Contents | [SQL-01](01-language-data-types.md) | Bìa/mục lục |
| 3 | Contents | [SQL-01](01-language-data-types.md) | Bìa/mục lục |
| 4 | Introduction of Structured Query Language | [SQL-01](01-language-data-types.md) | Nội dung |
| 5 | Contents | [SQL-01](01-language-data-types.md) | Bìa/mục lục |
| 6 | Data Definition Language (DDL) | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 7 | Schema and Catalog Concepts in SQL | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 8 | CREATE TABLE | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 9 | CREATE TABLE | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 10 | Basic Data Types | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 11 | Basic Data Types | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 12 | Domains | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 13 | Specifying Constraints | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 14 | Attribute Constraints | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 15 | Key Constraints | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 16 | Key and Referential Integrity Constraints | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 17 | The COMPANY Database | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 18 | DDL COMPANY: EMPLOYEE, DEPARTMENT, DEPT_LOCATIONS (ảnh) | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 19 | DDL COMPANY: PROJECT, WORKS_ON, DEPENDENT (ảnh) | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 20 | Specifying Constraints | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 21 | Constraint có tên và FK actions (ảnh) | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 22 | Constraints on individual tuples within a relation | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 23 | DROP Command | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 24 | DROP Command | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 25 | ALTER Command | [SQL-02](02-ddl-constraints.md) | Nội dung |
| 26 | Contents | [SQL-03](03-select-expressions-sets.md) | Bìa/mục lục |
| 27 | SELECT Command | [SQL-03](03-select-expressions-sets.md) | Nội dung |
| 28 | SELECT Command | [SQL-03](03-select-expressions-sets.md) | Nội dung |
| 29 | SELECT Command | [SQL-03](03-select-expressions-sets.md) | Nội dung |
| 30 | SELECT Command | [SQL-03](03-select-expressions-sets.md) | Nội dung |
| 31 | SELECT Command | [SQL-03](03-select-expressions-sets.md) | Nội dung |
| 32 | SELECT Command | [SQL-04](04-joins.md) | Nội dung |
| 33 | SELECT Command | [SQL-04](04-joins.md) | Nội dung |
| 34 | Ambiguous Attribute Names | [SQL-04](04-joins.md) | Nội dung |
| 35 | Aliases | [SQL-04](04-joins.md) | Nội dung |
| 36 | Aliases | [SQL-04](04-joins.md) | Nội dung |
| 37 | Unspecified WHERE-clause | [SQL-04](04-joins.md) | Nội dung |
| 38 | Unspecified WHERE-clause | [SQL-04](04-joins.md) | Nội dung |
| 39 | Use of ASTERISK (*) | [SQL-04](04-joins.md) | Nội dung |
| 40 | Use of DISTINCT | [SQL-03](03-select-expressions-sets.md) | Nội dung |
| 41 | Set Operations | [SQL-03](03-select-expressions-sets.md) | Nội dung |
| 42 | Set Operations | [SQL-03](03-select-expressions-sets.md) | Nội dung |
| 43 | Substring pattern matching and arithmetic operators | [SQL-03](03-select-expressions-sets.md) | Nội dung |
| 44 | Substring pattern matching and arithmetic operators | [SQL-03](03-select-expressions-sets.md) | Nội dung |
| 45 | NULL & 3-valued logic | [SQL-05](05-null-logic.md) | Nội dung |
| 46 | SELECT Command | [SQL-03](03-select-expressions-sets.md) | Nội dung |
| 47 | Nested Queries | [SQL-07](07-subqueries-quantifiers.md) | Nội dung |
| 48 | Correlated Nested Queries | [SQL-07](07-subqueries-quantifiers.md) | Nội dung |
| 49 | Correlated Nested Queries | [SQL-07](07-subqueries-quantifiers.md) | Nội dung |
| 50 | Nested Query Exercises | [SQL-07](07-subqueries-quantifiers.md) | Nội dung |
| 51 | More Comparison Operators | [SQL-07](07-subqueries-quantifiers.md) | Nội dung |
| 52 | EXISTS and UNIQUE Functions | [SQL-07](07-subqueries-quantifiers.md) | Nội dung |
| 53 | EXISTS Function | [SQL-07](07-subqueries-quantifiers.md) | Nội dung |
| 54 | EXISTS Function | [SQL-07](07-subqueries-quantifiers.md) | Nội dung |
| 55 | Enumerated Sets | [SQL-03](03-select-expressions-sets.md) | Nội dung |
| 56 | Joined Relations | [SQL-04](04-joins.md) | Nội dung |
| 57 | Joined Tables and Outer Joins | [SQL-04](04-joins.md) | Nội dung |
| 58 | Joined Tables and Outer Joins | [SQL-04](04-joins.md) | Nội dung |
| 59 | Joined Tables in SQL and Outer Joins (cont’d.) | [SQL-04](04-joins.md) | Nội dung |
| 60 | Joined Tables in SQL and Outer Joins (cont’d.) | [SQL-04](04-joins.md) | Nội dung |
| 61 | Joined Relations - Examples | [SQL-04](04-joins.md) | Nội dung |
| 62 | Joined Relations - Examples | [SQL-04](04-joins.md) | Nội dung |
| 63 | AGGREGATE FUNCTIONS | [SQL-06](06-aggregation.md) | Nội dung |
| 64 | AGGREGATE FUNCTIONS | [SQL-06](06-aggregation.md) | Nội dung |
| 65 | GROUPING | [SQL-06](06-aggregation.md) | Nội dung |
| 66 | SELECT Command | [SQL-06](06-aggregation.md) | Nội dung |
| 67 | GROUPING | [SQL-06](06-aggregation.md) | Nội dung |
| 68 | GROUPING: Q22 result | [SQL-06](06-aggregation.md) | Nội dung |
| 69 | GROUPING: THE HAVING-CLAUSE | [SQL-06](06-aggregation.md) | Nội dung |
| 70 | GROUPING: THE HAVING-CLAUSE | [SQL-06](06-aggregation.md) | Nội dung |
| 71 | ORDER BY | [SQL-03](03-select-expressions-sets.md) | Nội dung |
| 72 | SELECT Command | [SQL-06](06-aggregation.md) | Nội dung |
| 73 | SELECT Command | [SQL-06](06-aggregation.md) | Nội dung |
| 74 | Insert Command | [SQL-08](08-dml-transactions.md) | Nội dung |
| 75 | Insert Command | [SQL-08](08-dml-transactions.md) | Nội dung |
| 76 | Insert Command | [SQL-08](08-dml-transactions.md) | Nội dung |
| 77 | Insert Command | [SQL-08](08-dml-transactions.md) | Nội dung |
| 78 | Insert Command | [SQL-08](08-dml-transactions.md) | Nội dung |
| 79 | Delete Command | [SQL-08](08-dml-transactions.md) | Nội dung |
| 80 | Delete Command - Examples | [SQL-08](08-dml-transactions.md) | Nội dung |
| 81 | Update Command | [SQL-08](08-dml-transactions.md) | Nội dung |
| 82 | Update Command | [SQL-08](08-dml-transactions.md) | Nội dung |
| 83 | Update Command | [SQL-08](08-dml-transactions.md) | Nội dung |
| 84 | Advanced DDL: Assertions & Triggers | [SQL-09](09-views-assertions.md) | Nội dung |
| 85 | Advanced DDL: Assertions & Triggers | [SQL-09](09-views-assertions.md) | Nội dung |
| 86 | Trigger Overview | [SQL-14](14-triggers.md) | Nội dung |
| 87 | Uses of Trigger | [SQL-14](14-triggers.md) | Nội dung |
| 88 | Simple DML Trigger Syntax | [SQL-14](14-triggers.md) | Nội dung |
| 89 | Trigger Example  | [SQL-14](14-triggers.md) | Nội dung |
| 90 | “Virtual” tables for triggers | [SQL-14](14-triggers.md) | Nội dung |
| 91 | Trigger Example 2 | [SQL-14](14-triggers.md) | Nội dung |
| 92 | Views | [SQL-09](09-views-assertions.md) | Nội dung |
| 93 | Views | [SQL-09](09-views-assertions.md) | Nội dung |
| 94 | View Update and Inline Views | [SQL-09](09-views-assertions.md) | Nội dung |
| 95 | Contents | [SQL-10](10-permissions.md) | Bìa/mục lục |
| 96 | SQL for Data Control | [SQL-10](10-permissions.md) | Nội dung |
| 97 | SQL for Data Control | [SQL-10](10-permissions.md) | Nội dung |
| 98 | SQL for Data Control | [SQL-10](10-permissions.md) | Nội dung |
| 99 | An Example | [SQL-10](10-permissions.md) | Nội dung |
| 100 | An Example (2) | [SQL-10](10-permissions.md) | Nội dung |
| 101 | Schema cho ví dụ phân quyền A1–A4 (ảnh) | [SQL-10](10-permissions.md) | Nội dung |
| 102 | An Example (4) | [SQL-10](10-permissions.md) | Nội dung |
| 103 | An Example (5) | [SQL-10](10-permissions.md) | Nội dung |
| 104 | An Example (6) | [SQL-10](10-permissions.md) | Nội dung |
| 105 | An Example (7) | [SQL-10](10-permissions.md) | Nội dung |
| 106 | Summary | [SQL-01](01-language-data-types.md) | Nội dung |
| 107 | Trang kết thúc / hình trang trí | [SQL-18](18-slide-map-and-references.md) | Kết thúc/trang trí |

## 5. 4B_AdvancedSQL.pptx · 50 slide

| Slide | Chủ đề trên slide | Bài đọc chính | Vai trò |
|---:|---|---|---|
| 1 | Advanced SQL: Store Procedure, Function, Trigger, Cursor in MS SQL Server | [SQL-11](11-tsql-programming.md) | Bìa/mục lục |
| 2 | Contents | [SQL-11](11-tsql-programming.md) | Bìa/mục lục |
| 3 | Contents | [SQL-11](11-tsql-programming.md) | Bìa/mục lục |
| 4 | Declaring Local Variables | [SQL-11](11-tsql-programming.md) | Nội dung |
| 5 | Setting Values for Variables | [SQL-11](11-tsql-programming.md) | Nội dung |
| 6 | Conditional Structure | [SQL-11](11-tsql-programming.md) | Nội dung |
| 7 | Conditional Structure | [SQL-11](11-tsql-programming.md) | Nội dung |
| 8 | IF doanh thu 2011: code (ảnh) | [SQL-11](11-tsql-programming.md) | Nội dung |
| 9 | Loop Structure | [SQL-11](11-tsql-programming.md) | Nội dung |
| 10 | Loop Structure | [SQL-11](11-tsql-programming.md) | Nội dung |
| 11 | Loop Structure | [SQL-11](11-tsql-programming.md) | Nội dung |
| 12 | Loop Structure | [SQL-11](11-tsql-programming.md) | Nội dung |
| 13 | Contents | [SQL-12](12-procedures.md) | Bìa/mục lục |
| 14 | Stored procedure overview | [SQL-12](12-procedures.md) | Nội dung |
| 15 | Store procedure overview (cond.) | [SQL-12](12-procedures.md) | Nội dung |
| 16 | Store procedure syntax | [SQL-12](12-procedures.md) | Nội dung |
| 17 | Store procedure example | [SQL-12](12-procedures.md) | Nội dung |
| 18 | Contents | [SQL-13](13-functions.md) | Bìa/mục lục |
| 19 | Function overview | [SQL-13](13-functions.md) | Nội dung |
| 20 | Scalar function syntax | [SQL-13](13-functions.md) | Nội dung |
| 21 | Table-valued function syntax | [SQL-13](13-functions.md) | Nội dung |
| 22 | Scalar function example | [SQL-13](13-functions.md) | Nội dung |
| 23 | Table-valued function example | [SQL-13](13-functions.md) | Nội dung |
| 24 | Contents | [SQL-14](14-triggers.md) | Bìa/mục lục |
| 25 | Trigger Overview | [SQL-14](14-triggers.md) | Nội dung |
| 26 | Uses of Trigger | [SQL-14](14-triggers.md) | Nội dung |
| 27 | Simple DML Trigger Syntax | [SQL-14](14-triggers.md) | Nội dung |
| 28 | Trigger Firing Order | [SQL-14](14-triggers.md) | Nội dung |
| 29 | “Virtual” tables for triggers | [SQL-14](14-triggers.md) | Nội dung |
| 30 | Trigger Example | [SQL-14](14-triggers.md) | Nội dung |
| 31 | Contents | [SQL-15](15-cursors.md) | Bìa/mục lục |
| 32 | Cursor overview | [SQL-15](15-cursors.md) | Nội dung |
| 33 | Cursor life cycle | [SQL-15](15-cursors.md) | Nội dung |
| 34 | Cursor syntax | [SQL-15](15-cursors.md) | Nội dung |
| 35 | Cursor syntax (cond.) | [SQL-15](15-cursors.md) | Nội dung |
| 36 | Cursor example | [SQL-15](15-cursors.md) | Nội dung |
| 37 | Contents | [SQL-16](16-error-handling.md) | Bìa/mục lục |
| 38 | Error Handling | [SQL-16](16-error-handling.md) | Nội dung |
| 39 | Error Handling | [SQL-16](16-error-handling.md) | Nội dung |
| 40 | Severity và WITH options (ảnh) | [SQL-16](16-error-handling.md) | Nội dung |
| 41 | Example  | [SQL-16](16-error-handling.md) | Nội dung |
| 42 | Try… Catch | [SQL-16](16-error-handling.md) | Nội dung |
| 43 | Retrieving Error Details | [SQL-16](16-error-handling.md) | Nội dung |
| 44 | Try… Catch Example (1) | [SQL-16](16-error-handling.md) | Nội dung |
| 45 | Try… Catch Example (2) | [SQL-16](16-error-handling.md) | Nội dung |
| 46 | Try… Catch Example (3) | [SQL-16](16-error-handling.md) | Nội dung |
| 47 | THROW theo vị trí (ảnh) | [SQL-16](16-error-handling.md) | Nội dung |
| 48 | RAISERROR theo vị trí (ảnh) | [SQL-16](16-error-handling.md) | Nội dung |
| 49 | Key Differences between RAISERROR and THROW | [SQL-16](16-error-handling.md) | Nội dung |
| 50 | Trang kết thúc / hình trang trí | [SQL-18](18-slide-map-and-references.md) | Kết thúc/trang trí |
