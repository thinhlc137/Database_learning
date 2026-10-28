# SQL 17 · Bài tập tổng hợp và cách chấm lời giải

> Bộ tự luyện biên soạn theo hai slide, không phải đề thi chính thức. Hãy làm sau SQL 01–16. Các bài cuối yêu cầu SQL Server; không dán T-SQL vào SQLite. 40 bài Q01–Q40 cũ vẫn nằm ở [lab SQL](../../labs/03-exercises.md).

## 1. Cách dùng bộ bài

Với mỗi query, ghi trước **grain** (một hàng đại diện cho gì), cột khóa, quy tắc NULL, tập rỗng và thứ tự đầu ra. Dự đoán ít nhất một hàng được giữ và một hàng bị loại. Sau đó mới chạy. Với routine/trigger, bổ sung ca nhiều hàng và ca lỗi.

| Phần | Bài | Kỹ năng cần thể hiện |
|---|---|---|
| Cơ bản | E01–E04 | DDL, miền giá trị, SELECT, phép tập hợp |
| Truy vấn | E05–E10 | Outer join, aggregate, EXISTS, division |
| Thay đổi dữ liệu | E11–E13 | DML, view, transaction |
| T-SQL | E14–E20 | Trace, procedure, function, trigger, cursor, lỗi |

## 2. E01–E04: cấu trúc và SELECT

### E01. Thiết kế bảng đăng ký

Tạo Course(CourseId,Title) và Enrollment(StudentId,CourseId,Score). Mỗi sinh viên chỉ đăng ký một lần mỗi môn; Score được NULL khi chưa chấm, còn khi có phải thuộc [0,10]. Xóa Course khi còn đăng ký phải bị chặn. Viết DDL SQLite.

<details><summary>Lời giải E01</summary>

```sql
CREATE TABLE Course(CourseId INTEGER PRIMARY KEY,Title TEXT NOT NULL);
CREATE TABLE Enrollment(
 StudentId TEXT NOT NULL,CourseId INTEGER NOT NULL,
 Score REAL CHECK(Score BETWEEN 0 AND 10),
 PRIMARY KEY(StudentId,CourseId),
 FOREIGN KEY(CourseId) REFERENCES Course(CourseId) ON DELETE RESTRICT
);
```

Không thêm Score NOT NULL vì đề cho chưa chấm. PK là cặp, không UNIQUE từng cột. Bật PRAGMA foreign_keys=ON trên connection trước transaction. Ca cần thử: trùng cặp, môn không tồn tại, Score=-1, Score=NULL, xóa môn đang có con.

</details>

### E02. Mặc định và giá trị NULL

T có `x INTEGER NOT NULL DEFAULT 5`. So sánh INSERT bỏ x, INSERT x=NULL và INSERT x=-1. Có CHECK(x>0) thì trường hợp nào đổi?

<details><summary>Lời giải E02</summary>

Bỏ x dùng 5. NULL tường minh vi phạm NOT NULL, không tự thay bằng 5. -1 hợp lệ nếu không có CHECK; khi thêm CHECK(x>0), -1 bị từ chối. DEFAULT và kiểm tra miền có nhiệm vụ khác nhau.

</details>

### E03. Lọc lương và tính cột

Lấy nhân viên phòng 4 có lương đã biết từ 25000 đến 45000, hiển thị lương sau tăng 8%, sort lương giảm rồi Ssn tăng. Không sửa bảng.

<details><summary>Lời giải E03</summary>

```sql
SELECT Fname,Salary,ROUND(Salary*1.08,2) AS ProposedSalary
FROM EMPLOYEE WHERE Dno=4 AND Salary BETWEEN 25000 AND 45000
ORDER BY Salary DESC,Ssn;
```

Jennifer 43000→46440; Ahmad và Alicia 25000→27000, thứ tự hai người theo Ssn nên Ahmad (987987987) trước Alicia (999887777). Mai bị loại vì Salary NULL. ROUND là chính sách hiển thị ở đây.

</details>

### E04. Phép tập hợp

Tìm Ssn người tham gia dự án 1 nhưng không tham gia dự án 3 bằng EXCEPT. Viết thêm cách NOT EXISTS.

<details><summary>Lời giải E04</summary>

```sql
SELECT Essn FROM WORKS_ON WHERE Pno=1
EXCEPT
SELECT Essn FROM WORKS_ON WHERE Pno=3
ORDER BY Essn;
```

Kết quả John (123456789), Joyce (453453453). Cách khác:

```sql
SELECT e.Ssn FROM EMPLOYEE e
WHERE EXISTS(SELECT 1 FROM WORKS_ON w WHERE w.Essn=e.Ssn AND w.Pno=1)
AND NOT EXISTS(SELECT 1 FROM WORKS_ON w WHERE w.Essn=e.Ssn AND w.Pno=3)
ORDER BY e.Ssn;
```

EXCEPT khử trùng, EXISTS giữ mỗi hàng nhân viên một lần vì nguồn ngoài có PK.

</details>

## 3. E05–E10: JOIN, nhóm và query con

### E05. Mọi phòng và nhân viên lương cao

Giữ mọi phòng, chỉ ghép nhân viên Salary>=40000. Phân biệt với “chỉ giữ những phòng có người lương cao”.

<details><summary>Lời giải E05</summary>

```sql
SELECT d.Dname,e.Fname
FROM DEPARTMENT d LEFT JOIN EMPLOYEE e
ON e.Dno=d.Dnumber AND e.Salary>=40000
ORDER BY d.Dname,e.Ssn;
```

Administration/Jennifer; Headquarters/James; Innovation/NULL; Research/Franklin. Nếu cần chỉ phòng có người đạt, dùng EXISTS hoặc inner join và DISTINCT khi chỉ chọn phòng. Đặt predicate lương ở WHERE của LEFT JOIN sẽ bỏ phòng không khớp.

</details>

### E06. Phòng thiếu thông tin lương

Liệt kê phòng có ít nhất một nhân viên Salary NULL, không nhầm với phòng rỗng.

<details><summary>Lời giải E06</summary>

```sql
SELECT d.Dname FROM DEPARTMENT d
WHERE EXISTS(SELECT 1 FROM EMPLOYEE e WHERE e.Dno=d.Dnumber AND e.Salary IS NULL)
ORDER BY d.Dname;
```

Chỉ Administration do Mai. `LEFT JOIN ... WHERE e.Salary IS NULL` sẽ còn nhận Innovation vì hàng đệm NULL, nên cần xét e.Ssn hoặc EXISTS như trên.

</details>

### E07. Báo cáo phòng và số người quản lý trực tiếp

Với từng nhân viên quản lý ít nhất 3 người trực tiếp, trả Ssn,tên,số người. Không nhầm Mgr_ssn phòng với Super_ssn nhân viên.

<details><summary>Lời giải E07</summary>

```sql
SELECT s.Ssn,s.Fname,COUNT(*) AS Reports
FROM EMPLOYEE s JOIN EMPLOYEE e ON e.Super_ssn=s.Ssn
GROUP BY s.Ssn,s.Fname HAVING COUNT(*)>=3 ORDER BY s.Ssn;
```

Franklin 3 (John,Joyce,Ramesh), Jennifer 3 (Ahmad,Alicia,Mai). James trực tiếp quản lý Franklin/Jennifer nên có 2, không đạt. Nhân viên thuộc phòng và nhân viên được giám sát là hai quan hệ khác nhau.

</details>

### E08. Lương cao hơn mọi người phòng 4

Viết SQL Server ANY/ALL đúng theo slide và giải thích khi phòng 4 chứa Mai có lương NULL. Sau đó đổi đề thành “cao hơn mọi lương **đã biết** của phòng 4”.

<details><summary>Lời giải E08</summary>

```tsql
SELECT Fname FROM course.EMPLOYEE
WHERE Salary>ALL(SELECT Salary FROM course.EMPLOYEE WHERE Dno=4);
```

Không có hàng TRUE: phòng 4 có NULL và lương 43000. James 55000 lớn hơn mọi lương biết nhưng so với NULL UNKNOWN, nên không được WHERE giữ. Đổi query con thêm `AND Salary IS NOT NULL` thì James đạt. Nếu tập lương biết rỗng, ALL TRUE; quyết định có cần EXISTS để bắt tập không rỗng không. MAX chỉ tương đương với các giả thiết đã nêu.

</details>

### E09. Làm cả 1 và 2

Viết bằng GROUP BY. Vì sao `WHERE Pno=1 AND Pno=2` sai?

<details><summary>Lời giải E09</summary>

```sql
SELECT e.Ssn,e.Fname FROM EMPLOYEE e
JOIN WORKS_ON w ON w.Essn=e.Ssn WHERE w.Pno IN(1,2)
GROUP BY e.Ssn,e.Fname HAVING COUNT(DISTINCT w.Pno)=2 ORDER BY e.Ssn;
```

John và Joyce. Một hàng WORKS_ON chỉ có một giá trị Pno, nên không cùng lúc bằng 1 và 2. Yêu cầu “cả hai” nói về hai phân công của cùng người.

</details>

### E10. Có mọi dự án trong tập yêu cầu

Áp dụng double NOT EXISTS cho tập dự án {1,2}. Nếu tập yêu cầu rỗng, có trả Mai không?

<details><summary>Lời giải E10</summary>

```sql
SELECT e.Fname FROM EMPLOYEE e
WHERE NOT EXISTS(
 SELECT 1 FROM PROJECT p WHERE p.Pnumber IN(1,2)
 AND NOT EXISTS(SELECT 1 FROM WORKS_ON w WHERE w.Essn=e.Ssn AND w.Pno=p.Pnumber)
) ORDER BY e.Fname;
```

John,Joyce. Nếu tập yêu cầu rỗng, mọi nhân viên kể cả Mai đạt theo lượng từ mọi. Nếu nghiệp vụ yêu cầu có ít nhất một dự án thì thêm điều kiện tập yêu cầu không rỗng hoặc có phân công theo hợp đồng mong muốn.

</details>

## 4. E11–E13: DML, transaction và view

### E11. Thử sửa rồi hoàn tác

Tăng lương phòng 5 thêm 1000, quan sát tổng rồi rollback. Tổng trước/sau từng mốc là bao nhiêu?

<details><summary>Lời giải E11</summary>

Ban đầu phòng 5 tổng 133000; 4 người được tăng nên thành 137000; rollback về 133000. Dùng BEGIN; UPDATE ... WHERE Dno=5; SELECT SUM(...); ROLLBACK; SELECT SUM(...). UPDATE không WHERE sẽ sửa 8 lương biết ở toàn công ty, Mai vẫn NULL, thành tổng 289000 nếu tăng mọi người 1000.

</details>

### E12. View và bảng chụp

Tạo V bằng CREATE VIEW SELECT ... WHERE Dno=5; tạo T bằng CREATE TABLE AS SELECT cùng query. Sau UPDATE bảng gốc, V/T đổi thế nào? T có tự kế thừa mọi PK/FK của bảng gốc không?

<details><summary>Lời giải E12</summary>

V đọc dữ liệu mới; T giữ bản chụp. SQLite CREATE TABLE AS SELECT không tự sao toàn bộ constraint của bảng gốc. Nếu muốn schema/ràng buộc, CREATE TABLE tường minh rồi INSERT SELECT.

</details>

### E13. Một lỗi giữa script

Không BEGIN: INSERT hợp lệ rồi SELECT cột không tồn tại. Có được kết luận INSERT đã mất không? Nếu có BEGIN thì xử lý thế nào?

<details><summary>Lời giải E13</summary>

Không. Autocommit có thể đã xác nhận INSERT. Với explicit transaction cần kiểm cơ chế lỗi và trạng thái, chủ động ROLLBACK hoặc COMMIT theo chính sách. Trong SQL Server CATCH dùng XACT_STATE/@@TRANCOUNT theo quyền sở hữu transaction; trong Playground có thể chạy ROLLBACK nếu transaction còn hoạt động. “Script hiện lỗi” không đồng nghĩa “mọi thứ đã hoàn tác”.

</details>

## 5. E14–E20: lập trình SQL Server

### E14. Trace vòng lặp

Trong bài 11, đổi @num=1 thành 9. Đoạn BREAK ở 8 có bao giờ chạy không? In những gì?

<details><summary>Lời giải E14</summary>

In Current number: 9 rồi 10; tăng thành 11 thì điều kiện sai. Không đi lùi về 8, nên BREAK không chạy. Điều kiện IF là kiểm trạng thái hiện tại, không phải sự kiện “vòng lặp có chứa số 8 trong mã”.

</details>

### E15. Hợp đồng procedure

Viết danh sách test cho Update_Sal gồm thành công, không tồn tại, NULL/âm và gọi lại hai lần. Xác định OUTPUT/RETURN/result set.

<details><summary>Lời giải E15</summary>

John factor 1.2 → 36000 từ fixture mới; mã lạ → lỗi 50002; factor NULL/0/âm → 50001; Mai → NULL theo hợp đồng; hai lần thành công không rollback → 43200. OUTPUT là biến @new_salary, RETURN là status int, SELECT ở caller hiển thị bảng status/lương. Chạy từng test trong ranh giới phù hợp để tránh test trước làm thay kết quả test sau.

</details>

### E16. Chọn loại function

Muốn đưa bảng nhân viên của một phòng có tham số vào FROM thì dùng loại gì? Muốn cập nhật lương trong function có được không?

<details><summary>Lời giải E16</summary>

Inline TVF `RETURNS TABLE AS RETURN(SELECT...)` nếu một query đủ diễn đạt. T-SQL UDF không dùng để đổi trạng thái bảng nghiệp vụ; dùng procedure cho UPDATE. Multi-statement TVF được INSERT vào table variable kết quả, không suy ra quyền sửa bảng nghiệp vụ.

</details>

### E17. Sửa trigger sai nhiều hàng

Trigger `SELECT @s=Salary FROM inserted; IF @s<0 THROW...` có đúng không? Hãy đưa một statement hai hàng làm lộ vấn đề, rồi sửa theo tập.

<details><summary>Lời giải E17</summary>

Một statement thêm (-1) và (100) có thể để scalar @s nhận 100, bỏ hàng âm. Dùng `IF EXISTS(SELECT 1 FROM inserted WHERE Salary<0) THROW ...`; với quy tắc đơn giản ưu tiên CHECK(Salary>=0), thêm NOT NULL nếu bắt buộc. Không dựa vào thứ tự VALUES để chứng minh trigger scalar luôn bắt/không bắt; thiếu bảo đảm đã đủ làm thiết kế sai.

</details>

### E18. Audit và NULL

Predicate `i.Salary<>d.Salary` có bắt NULL→30000 không? Nếu UPDATE Salary=Salary, UPDATE(Salary) và predicate thay đổi giá trị có giống nhau không?

<details><summary>Lời giải E18</summary>

Không, so sánh với NULL UNKNOWN. Thêm hai nhánh NULL↔NOT NULL. UPDATE(Salary) nói cột được nhắm tới, không chứng minh giá trị đổi; UPDATE x=x có thể khiến UPDATE(Salary) TRUE nhưng predicate so old/new không giữ hàng nào.

</details>

### E19. Cursor thiếu FETCH

Có FETCH đầu, WHILE status=0, body chỉ PRINT mà không FETCH tiếp. Chuyện gì xảy ra? Nếu body có CONTINUE thì đặt FETCH thế nào?

<details><summary>Lời giải E19</summary>

Có thể in cùng hàng mãi vì trạng thái/biến không đổi. Mọi nhánh tiếp tục cần tiến cursor hoặc thoát có chủ ý; tránh CONTINUE bỏ qua FETCH cuối. Với truy vấn chỉ cần danh sách, dùng SELECT theo tập.

</details>

### E20. Chọn THROW và xử lý giao dịch

Trong CATCH, muốn giữ mã lỗi/line gốc thì dùng gì? Nếu XACT_STATE=-1 thì có commit được không? RAISERROR severity10 trong TRY có nhảy CATCH không?

<details><summary>Lời giải E20</summary>

Dùng THROW; trong CATCH. Transaction -1 không commit được, phải rollback toàn bộ theo chính sách caller. Severity10 là thông tin nên không chuyển vào CATCH chỉ vì message đó. CATCH không tự rollback, RAISERROR không tự bảo đảm dừng batch/rollback; phải xét ngữ cảnh và XACT_ABORT.

</details>

## 6. Tự chấm một câu SQL

| Tiêu chí | Câu hỏi tự kiểm |
|---|---|
| Nguồn và đường join | Đúng bảng/đúng FK/đúng vai nhân viên–quản lý chưa? |
| Điều kiện | Có xử lý AND/OR, NULL, tập rỗng không? |
| Số lần xuất hiện | JOIN có nhân hàng? DISTINCT có làm mất dữ liệu? |
| Tổng hợp | Grain đúng? COUNT hàng thật hay đệm NULL? |
| Kết quả | Đủ cột, đúng thứ tự nếu đề yêu cầu? |
| Dialect | Mọi cú pháp có thuộc engine đang chạy không? |
| Thay đổi dữ liệu | PK/FK/CHECK, nhiều hàng, transaction và lỗi đã xét chưa? |

Nếu chỉ so một output hiện tại, một query sai vẫn có thể tình cờ đúng. Hãy thêm phòng rỗng, lương NULL, hai người cùng tên, hai phân công cùng giờ và một statement nhiều hàng để kiểm tra lập luận.
