-- SQLite; lời giải đầy đủ và dữ liệu kỳ vọng ở exercises.json

-- Q01: Tên các nhân viên thuộc Research, tăng dần theo Fname
-- WHERE lọc hàng theo mã phòng; ORDER BY giúp kết quả đối chiếu được.
SELECT Fname FROM EMPLOYEE WHERE Dno=5 ORDER BY Fname;

-- Q02: Nhân viên có lương ít nhất 40000
-- So sánh >= giữ cả giá trị biên. Lương NULL không làm predicate TRUE.
SELECT Fname,Salary FROM EMPLOYEE WHERE Salary>=40000 ORDER BY Fname;

-- Q03: Nhân viên chưa biết lương
-- IS NULL kiểm tra thiếu giá trị; = NULL không cho TRUE.
SELECT Fname FROM EMPLOYEE WHERE Salary IS NULL ORDER BY Fname;

-- Q04: Mã phòng thực sự có nhân viên, không trùng
-- DISTINCT loại trùng sau projection; phòng 9 không có employee.
SELECT DISTINCT Dno FROM EMPLOYEE ORDER BY Dno;

-- Q05: Hai người có lương cao nhất trong những người biết lương
-- Lọc NULL trước; thêm Ssn để ổn định thứ tự khi bằng lương. LIMIT là dialect SQLite.
SELECT Fname,Salary FROM EMPLOYEE WHERE Salary IS NOT NULL ORDER BY Salary DESC,Ssn LIMIT 2;

-- Q06: Tên phòng của John Smith
-- Nối bằng FK/PK, không dựa vào NATURAL JOIN khi tên cột khác nhau.
SELECT e.Fname,d.Dname FROM EMPLOYEE e JOIN DEPARTMENT d ON d.Dnumber=e.Dno WHERE e.Ssn='123456789';

-- Q07: Đếm nhân viên mỗi phòng, kể cả phòng rỗng
-- LEFT JOIN giữ phòng rỗng; COUNT(e.Ssn) bỏ NULL do outer join tạo ra. COUNT(*) sẽ cho Innovation=1.
SELECT d.Dname,COUNT(e.Ssn) AS n FROM DEPARTMENT d LEFT JOIN EMPLOYEE e ON e.Dno=d.Dnumber GROUP BY d.Dnumber,d.Dname ORDER BY d.Dname;

-- Q08: Phòng chưa có nhân viên
-- NOT EXISTS kiểm tra không tồn tại nhân viên tương ứng.
SELECT d.Dname FROM DEPARTMENT d WHERE NOT EXISTS(SELECT 1 FROM EMPLOYEE e WHERE e.Dno=d.Dnumber) ORDER BY d.Dname;

-- Q09: Tên nhân viên và supervisor, giữ cả người không có supervisor
-- Self join dùng hai alias cho hai role của cùng entity. James được giữ nhờ LEFT JOIN.
SELECT e.Fname,s.Fname AS Supervisor FROM EMPLOYEE e LEFT JOIN EMPLOYEE s ON s.Ssn=e.Super_ssn ORDER BY e.Fname;

-- Q10: Nhân viên không có dependent
-- Không có là không tồn tại một hàng match, không phải tồn tại một hàng không match.
SELECT e.Fname FROM EMPLOYEE e WHERE NOT EXISTS(SELECT 1 FROM DEPENDENT d WHERE d.Essn=e.Ssn) ORDER BY e.Fname;

-- Q11: Tổng giờ đã biết của từng dự án
-- SUM bỏ qua Hours NULL của James. Đây là tổng giờ đã biết, không khẳng định tổng thực tế đã đầy đủ.
SELECT p.Pnumber,SUM(w.Hours) AS Total FROM PROJECT p LEFT JOIN WORKS_ON w ON w.Pno=p.Pnumber GROUP BY p.Pnumber ORDER BY p.Pnumber;

-- Q12: Nhân viên làm ít nhất 3 dự án
-- HAVING lọc nhóm sau COUNT; PK Works_on tránh lặp cùng cặp nhân viên–dự án.
SELECT e.Fname,COUNT(*) AS n FROM EMPLOYEE e JOIN WORKS_ON w ON w.Essn=e.Ssn GROUP BY e.Ssn,e.Fname HAVING COUNT(*)>=3 ORDER BY e.Fname;

-- Q13: Lương từ 25000 đến 30000, gồm hai đầu mút
-- BETWEEN gồm cả hai đầu mút.
SELECT Fname FROM EMPLOYEE WHERE Salary BETWEEN 25000 AND 30000 ORDER BY Fname;

-- Q14: Tên bắt đầu bằng J
-- Phần trăm match dãy ký tự; underscore match một ký tự. Collation/case behavior phụ thuộc DBMS.
SELECT Fname FROM EMPLOYEE WHERE Fname LIKE 'J%' ORDER BY Fname;

-- Q15: So sánh COUNT(*) và COUNT(Salary)
-- COUNT(*) đếm mọi hàng, COUNT(column) chỉ đếm hàng có giá trị non-NULL.
SELECT COUNT(*),COUNT(Salary) FROM EMPLOYEE;

-- Q16: Nhân viên lương cao hơn trung bình phòng mình
-- Subquery phải tương quan qua Dno; AVG bỏ NULL, không so với trung bình toàn công ty.
SELECT e.Fname FROM EMPLOYEE e WHERE e.Salary>(SELECT AVG(x.Salary) FROM EMPLOYEE x WHERE x.Dno=e.Dno) ORDER BY e.Fname;

-- Q17: Nhân viên làm ít nhất một dự án ở Houston
-- DISTINCT tránh một người xuất hiện nhiều lần nếu làm nhiều dự án ở Houston.
SELECT DISTINCT e.Fname FROM EMPLOYEE e JOIN WORKS_ON w ON w.Essn=e.Ssn JOIN PROJECT p ON p.Pnumber=w.Pno WHERE p.Plocation='Houston' ORDER BY e.Fname;

-- Q18: Nhân viên làm cả dự án 1 và 2
-- Hai EXISTS xét hai hàng có thể khác nhau. Pno=1 AND Pno=2 trên cùng hàng không thể đúng.
SELECT e.Fname FROM EMPLOYEE e WHERE EXISTS(SELECT 1 FROM WORKS_ON w WHERE w.Essn=e.Ssn AND w.Pno=1) AND EXISTS(SELECT 1 FROM WORKS_ON w WHERE w.Essn=e.Ssn AND w.Pno=2) ORDER BY e.Fname;

-- Q19: Nhân viên không làm bất kỳ dự án nào ở Houston
-- Mai chưa làm dự án vẫn thỏa không có dự án ở Houston. Không thay bằng một dự án ngoài Houston.
SELECT e.Fname FROM EMPLOYEE e WHERE NOT EXISTS(SELECT 1 FROM WORKS_ON w JOIN PROJECT p ON p.Pnumber=w.Pno WHERE w.Essn=e.Ssn AND p.Plocation='Houston') ORDER BY e.Fname;

-- Q20: Nhân viên chưa được phân công dự án
-- Anti join qua NOT EXISTS cho kết quả ổn định trước NULL ở các cột không liên quan.
SELECT e.Fname FROM EMPLOYEE e WHERE NOT EXISTS(SELECT 1 FROM WORKS_ON w WHERE w.Essn=e.Ssn) ORDER BY e.Fname;

-- Q21: Tìm nhân viên không quản lý ai bằng NOT IN chưa xử lý NULL
-- Đây là query cố ý minh họa bẫy: subquery chứa NULL của James nên NOT IN không giữ hàng nào. Không dùng làm lời giải đúng nghiệp vụ.
SELECT Fname FROM EMPLOYEE WHERE Ssn NOT IN (SELECT Super_ssn FROM EMPLOYEE) ORDER BY Fname;

-- Q22: Sửa Q21 bằng NOT EXISTS
-- Loại từng người có ít nhất một cấp dưới; không bị NULL trong Super_ssn làm nhiễu.
SELECT e.Fname FROM EMPLOYEE e WHERE NOT EXISTS(SELECT 1 FROM EMPLOYEE x WHERE x.Super_ssn=e.Ssn) ORDER BY e.Fname;

-- Q23: Tên người thuộc phòng 1 hoặc 5 bằng UNION
-- UNION loại dòng trùng; UNION ALL giữ bội số.
SELECT Fname FROM EMPLOYEE WHERE Dno=1 UNION SELECT Fname FROM EMPLOYEE WHERE Dno=5 ORDER BY Fname;

-- Q24: Mã nhân viên làm cả dự án 1 và 2 bằng INTERSECT
-- INTERSECT lấy giao hai tập có cùng cấu trúc.
SELECT Essn FROM WORKS_ON WHERE Pno=1 INTERSECT SELECT Essn FROM WORKS_ON WHERE Pno=2 ORDER BY Essn;

-- Q25: Nhân viên làm mọi dự án trong tập {1,2}
-- Không tồn tại dự án yêu cầu mà nhân viên chưa làm. Đây là mẫu for all.
SELECT e.Fname FROM EMPLOYEE e WHERE NOT EXISTS(SELECT 1 FROM PROJECT p WHERE p.Pnumber IN (1,2) AND NOT EXISTS(SELECT 1 FROM WORKS_ON w WHERE w.Essn=e.Ssn AND w.Pno=p.Pnumber)) ORDER BY e.Fname;

-- Q26: Mẫu for all khi tập dự án yêu cầu rỗng
-- Tập yêu cầu rỗng không có phản ví dụ; mọi ứng viên EMPLOYEE đều thỏa.
SELECT e.Fname FROM EMPLOYEE e WHERE NOT EXISTS(SELECT 1 FROM PROJECT p WHERE p.Dnum=9 AND NOT EXISTS(SELECT 1 FROM WORKS_ON w WHERE w.Essn=e.Ssn AND w.Pno=p.Pnumber)) ORDER BY e.Fname;

-- Q27: Mỗi phòng và nhân viên có lương >40000; giữ phòng không match
-- Điều kiện trong ON quyết định cặp match nhưng vẫn giữ mọi phòng.
SELECT d.Dname,e.Fname FROM DEPARTMENT d LEFT JOIN EMPLOYEE e ON e.Dno=d.Dnumber AND e.Salary>40000 ORDER BY d.Dname,e.Fname;

-- Q28: So sánh Q27 khi điều kiện lương chuyển xuống WHERE
-- WHERE lọc các hàng NULL-extended; query này chỉ phù hợp nếu muốn bỏ phòng không match.
SELECT d.Dname,e.Fname FROM DEPARTMENT d LEFT JOIN EMPLOYEE e ON e.Dno=d.Dnumber WHERE e.Salary>40000 ORDER BY d.Dname,e.Fname;

-- Q29: Phòng có ít nhất 4 nhân viên, bằng HAVING
-- WHERE không thể lọc trực tiếp COUNT của nhóm trước khi nhóm được tạo.
SELECT Dno,COUNT(*) FROM EMPLOYEE GROUP BY Dno HAVING COUNT(*)>=4 ORDER BY Dno;

-- Q30: Dự án có ít nhất hai người tham gia
-- Đếm hàng phân công, kể cả hàng Hours NULL; đó là người tham gia chứ không phải số giờ.
SELECT Pno,COUNT(*) FROM WORKS_ON GROUP BY Pno HAVING COUNT(*)>=2 ORDER BY Pno;

-- Q31: Nhân viên có lương cao nhất trong từng phòng, giữ đồng hạng
-- MAX bỏ NULL. So sánh bằng MAX giữ mọi hàng đồng hạng nếu dữ liệu có tie.
SELECT e.Fname FROM EMPLOYEE e WHERE e.Salary=(SELECT MAX(x.Salary) FROM EMPLOYEE x WHERE x.Dno=e.Dno) ORDER BY e.Fname;

-- Q32: Phân loại lương: Unknown / High (>=40000) / Other
-- CASE kiểm tra NULL riêng trước khi phân nhóm; không coi Unknown là Other.
SELECT CASE WHEN Salary IS NULL THEN 'Unknown' WHEN Salary>=40000 THEN 'High' ELSE 'Other' END AS Band,COUNT(*) FROM EMPLOYEE GROUP BY CASE WHEN Salary IS NULL THEN 'Unknown' WHEN Salary>=40000 THEN 'High' ELSE 'Other' END ORDER BY Band;

-- Q33: Dense rank lương ở phòng 5, phần mở rộng window function
-- Window không gom mất từng hàng như GROUP BY; DENSE_RANK không để khoảng trống khi có tie.
SELECT Fname,DENSE_RANK() OVER(ORDER BY Salary DESC) AS SalaryRank FROM EMPLOYEE WHERE Dno=5 ORDER BY SalaryRank,Fname;

-- Q34: Lương và trung bình phòng bằng window, không làm mất hàng
-- PARTITION BY chia cửa sổ; WHERE Dno=5 vẫn giữ trọn phòng 5 trong ví dụ này.
SELECT Fname,AVG(Salary) OVER(PARTITION BY Dno) AS DeptAverage FROM EMPLOYEE WHERE Dno=5 ORDER BY Fname;

-- Q35: CTE tính tổng giờ đã biết rồi lọc >=40
-- CTE đặt tên cho bước trung gian; không khẳng định nó luôn được materialize.
WITH T AS(SELECT Essn,SUM(Hours) AS h FROM WORKS_ON GROUP BY Essn) SELECT e.Fname,T.h FROM EMPLOYEE e JOIN T ON T.Essn=e.Ssn WHERE T.h>=40 ORDER BY e.Fname;

-- Q36: Nhân viên có trên 2 dependent
-- Join trước và GROUP BY đúng khóa nhân viên; không gộp những người trùng tên.
SELECT e.Fname,COUNT(*) FROM EMPLOYEE e JOIN DEPENDENT d ON d.Essn=e.Ssn GROUP BY e.Ssn,e.Fname HAVING COUNT(*)>2 ORDER BY e.Fname;

-- Q37: Bộ tên/địa điểm dự án của phòng 5
-- Projection chọn hai cột, selection lọc phòng. SQL ORDER BY có thể dùng cột không nằm SELECT trong dạng này.
SELECT Pname,Plocation FROM PROJECT WHERE Dnum=5 ORDER BY Pnumber;

-- Q38: Bình quân lương đã biết toàn công ty
-- Tổng lương 281000 chia 8 giá trị đã biết, không chia 9.
SELECT ROUND(AVG(Salary),2) FROM EMPLOYEE;

-- Q39: Danh sách SSN không có WORKS_ON bằng EXCEPT
-- EXCEPT biểu diễn hiệu hai tập cùng một cột SSN.
SELECT Ssn FROM EMPLOYEE EXCEPT SELECT Essn FROM WORKS_ON ORDER BY Ssn;

-- Q40: Tổng số phòng và số phòng có manager
-- COUNT(column) bỏ NULL; Innovation có manager chưa được gán. Đây là giả thiết fixture, không phải yêu cầu COMPANY chính thức.
SELECT COUNT(*),COUNT(Mgr_ssn) FROM DEPARTMENT;
