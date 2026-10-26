# 40 bài SQL: tự làm → dự đoán → chạy → chữa

Tất cả dùng COMPANY fixture của project. Kết quả đầy đủ được kiểm bằng expected rows trong exercises.json. Q21 là bẫy cố ý; Q22 sửa nó.

## Q01 · Tên các nhân viên thuộc Research, tăng dần theo Fname

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q01`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT Fname FROM EMPLOYEE WHERE Dno=5 ORDER BY Fname;
```

```json
[["Franklin"], ["John"], ["Joyce"], ["Ramesh"]]
```

WHERE lọc hàng theo mã phòng; ORDER BY giúp kết quả đối chiếu được.

</details>

## Q02 · Nhân viên có lương ít nhất 40000

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q02`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT Fname,Salary FROM EMPLOYEE WHERE Salary>=40000 ORDER BY Fname;
```

```json
[["Franklin", 40000], ["James", 55000], ["Jennifer", 43000]]
```

So sánh >= giữ cả giá trị biên. Lương NULL không làm predicate TRUE.

</details>

## Q03 · Nhân viên chưa biết lương

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q03`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT Fname FROM EMPLOYEE WHERE Salary IS NULL ORDER BY Fname;
```

```json
[["Mai"]]
```

IS NULL kiểm tra thiếu giá trị; = NULL không cho TRUE.

</details>

## Q04 · Mã phòng thực sự có nhân viên, không trùng

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q04`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT DISTINCT Dno FROM EMPLOYEE ORDER BY Dno;
```

```json
[[1], [4], [5]]
```

DISTINCT loại trùng sau projection; phòng 9 không có employee.

</details>

## Q05 · Hai người có lương cao nhất trong những người biết lương

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q05`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT Fname,Salary FROM EMPLOYEE WHERE Salary IS NOT NULL ORDER BY Salary DESC,Ssn LIMIT 2;
```

```json
[["James", 55000], ["Jennifer", 43000]]
```

Lọc NULL trước; thêm Ssn để ổn định thứ tự khi bằng lương. LIMIT là dialect SQLite.

</details>

## Q06 · Tên phòng của John Smith

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q06`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT e.Fname,d.Dname FROM EMPLOYEE e JOIN DEPARTMENT d ON d.Dnumber=e.Dno WHERE e.Ssn='123456789';
```

```json
[["John", "Research"]]
```

Nối bằng FK/PK, không dựa vào NATURAL JOIN khi tên cột khác nhau.

</details>

## Q07 · Đếm nhân viên mỗi phòng, kể cả phòng rỗng

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q07`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT d.Dname,COUNT(e.Ssn) AS n FROM DEPARTMENT d LEFT JOIN EMPLOYEE e ON e.Dno=d.Dnumber GROUP BY d.Dnumber,d.Dname ORDER BY d.Dname;
```

```json
[["Administration", 4], ["Headquarters", 1], ["Innovation", 0], ["Research", 4]]
```

LEFT JOIN giữ phòng rỗng; COUNT(e.Ssn) bỏ NULL do outer join tạo ra. COUNT(*) sẽ cho Innovation=1.

</details>

## Q08 · Phòng chưa có nhân viên

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q08`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT d.Dname FROM DEPARTMENT d WHERE NOT EXISTS(SELECT 1 FROM EMPLOYEE e WHERE e.Dno=d.Dnumber) ORDER BY d.Dname;
```

```json
[["Innovation"]]
```

NOT EXISTS kiểm tra không tồn tại nhân viên tương ứng.

</details>

## Q09 · Tên nhân viên và supervisor, giữ cả người không có supervisor

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q09`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT e.Fname,s.Fname AS Supervisor FROM EMPLOYEE e LEFT JOIN EMPLOYEE s ON s.Ssn=e.Super_ssn ORDER BY e.Fname;
```

```json
[["Ahmad", "Jennifer"], ["Alicia", "Jennifer"], ["Franklin", "James"], ["James", null], ["Jennifer", "James"], ["John", "Franklin"], ["Joyce", "Franklin"], ["Mai", "Jennifer"], ["Ramesh", "Franklin"]]
```

Self join dùng hai alias cho hai role của cùng entity. James được giữ nhờ LEFT JOIN.

</details>

## Q10 · Nhân viên không có dependent

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q10`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT e.Fname FROM EMPLOYEE e WHERE NOT EXISTS(SELECT 1 FROM DEPENDENT d WHERE d.Essn=e.Ssn) ORDER BY e.Fname;
```

```json
[["Ahmad"], ["Alicia"], ["James"], ["Joyce"], ["Mai"], ["Ramesh"]]
```

Không có là không tồn tại một hàng match, không phải tồn tại một hàng không match.

</details>

## Q11 · Tổng giờ đã biết của từng dự án

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q11`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT p.Pnumber,SUM(w.Hours) AS Total FROM PROJECT p LEFT JOIN WORKS_ON w ON w.Pno=p.Pnumber GROUP BY p.Pnumber ORDER BY p.Pnumber;
```

```json
[[1, 52.5], [2, 37.5], [3, 50], [10, 55], [20, 25], [30, 55]]
```

SUM bỏ qua Hours NULL của James. Đây là tổng giờ đã biết, không khẳng định tổng thực tế đã đầy đủ.

</details>

## Q12 · Nhân viên làm ít nhất 3 dự án

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q12`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT e.Fname,COUNT(*) AS n FROM EMPLOYEE e JOIN WORKS_ON w ON w.Essn=e.Ssn GROUP BY e.Ssn,e.Fname HAVING COUNT(*)>=3 ORDER BY e.Fname;
```

```json
[["Franklin", 4]]
```

HAVING lọc nhóm sau COUNT; PK Works_on tránh lặp cùng cặp nhân viên–dự án.

</details>

## Q13 · Lương từ 25000 đến 30000, gồm hai đầu mút

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q13`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT Fname FROM EMPLOYEE WHERE Salary BETWEEN 25000 AND 30000 ORDER BY Fname;
```

```json
[["Ahmad"], ["Alicia"], ["John"], ["Joyce"]]
```

BETWEEN gồm cả hai đầu mút.

</details>

## Q14 · Tên bắt đầu bằng J

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q14`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT Fname FROM EMPLOYEE WHERE Fname LIKE 'J%' ORDER BY Fname;
```

```json
[["James"], ["Jennifer"], ["John"], ["Joyce"]]
```

Phần trăm match dãy ký tự; underscore match một ký tự. Collation/case behavior phụ thuộc DBMS.

</details>

## Q15 · So sánh COUNT(*) và COUNT(Salary)

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q15`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT COUNT(*),COUNT(Salary) FROM EMPLOYEE;
```

```json
[[9, 8]]
```

COUNT(*) đếm mọi hàng, COUNT(column) chỉ đếm hàng có giá trị non-NULL.

</details>

## Q16 · Nhân viên lương cao hơn trung bình phòng mình

Mức: Trung bình. Chạy `python tools/lab.py --exercise Q16`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT e.Fname FROM EMPLOYEE e WHERE e.Salary>(SELECT AVG(x.Salary) FROM EMPLOYEE x WHERE x.Dno=e.Dno) ORDER BY e.Fname;
```

```json
[["Franklin"], ["Jennifer"], ["Ramesh"]]
```

Subquery phải tương quan qua Dno; AVG bỏ NULL, không so với trung bình toàn công ty.

</details>

## Q17 · Nhân viên làm ít nhất một dự án ở Houston

Mức: Trung bình. Chạy `python tools/lab.py --exercise Q17`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT DISTINCT e.Fname FROM EMPLOYEE e JOIN WORKS_ON w ON w.Essn=e.Ssn JOIN PROJECT p ON p.Pnumber=w.Pno WHERE p.Plocation='Houston' ORDER BY e.Fname;
```

```json
[["Franklin"], ["James"], ["Jennifer"], ["Ramesh"]]
```

DISTINCT tránh một người xuất hiện nhiều lần nếu làm nhiều dự án ở Houston.

</details>

## Q18 · Nhân viên làm cả dự án 1 và 2

Mức: Trung bình. Chạy `python tools/lab.py --exercise Q18`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT e.Fname FROM EMPLOYEE e WHERE EXISTS(SELECT 1 FROM WORKS_ON w WHERE w.Essn=e.Ssn AND w.Pno=1) AND EXISTS(SELECT 1 FROM WORKS_ON w WHERE w.Essn=e.Ssn AND w.Pno=2) ORDER BY e.Fname;
```

```json
[["John"], ["Joyce"]]
```

Hai EXISTS xét hai hàng có thể khác nhau. Pno=1 AND Pno=2 trên cùng hàng không thể đúng.

</details>

## Q19 · Nhân viên không làm bất kỳ dự án nào ở Houston

Mức: Trung bình. Chạy `python tools/lab.py --exercise Q19`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT e.Fname FROM EMPLOYEE e WHERE NOT EXISTS(SELECT 1 FROM WORKS_ON w JOIN PROJECT p ON p.Pnumber=w.Pno WHERE w.Essn=e.Ssn AND p.Plocation='Houston') ORDER BY e.Fname;
```

```json
[["Ahmad"], ["Alicia"], ["John"], ["Joyce"], ["Mai"]]
```

Mai chưa làm dự án vẫn thỏa không có dự án ở Houston. Không thay bằng một dự án ngoài Houston.

</details>

## Q20 · Nhân viên chưa được phân công dự án

Mức: Trung bình. Chạy `python tools/lab.py --exercise Q20`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT e.Fname FROM EMPLOYEE e WHERE NOT EXISTS(SELECT 1 FROM WORKS_ON w WHERE w.Essn=e.Ssn) ORDER BY e.Fname;
```

```json
[["Mai"]]
```

Anti join qua NOT EXISTS cho kết quả ổn định trước NULL ở các cột không liên quan.

</details>

## Q21 · Tìm nhân viên không quản lý ai bằng NOT IN chưa xử lý NULL

Mức: Trung bình. Chạy `python tools/lab.py --exercise Q21`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT Fname FROM EMPLOYEE WHERE Ssn NOT IN (SELECT Super_ssn FROM EMPLOYEE) ORDER BY Fname;
```

```json
[]
```

Đây là query cố ý minh họa bẫy: subquery chứa NULL của James nên NOT IN không giữ hàng nào. Không dùng làm lời giải đúng nghiệp vụ.

</details>

## Q22 · Sửa Q21 bằng NOT EXISTS

Mức: Trung bình. Chạy `python tools/lab.py --exercise Q22`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT e.Fname FROM EMPLOYEE e WHERE NOT EXISTS(SELECT 1 FROM EMPLOYEE x WHERE x.Super_ssn=e.Ssn) ORDER BY e.Fname;
```

```json
[["Ahmad"], ["Alicia"], ["John"], ["Joyce"], ["Mai"], ["Ramesh"]]
```

Loại từng người có ít nhất một cấp dưới; không bị NULL trong Super_ssn làm nhiễu.

</details>

## Q23 · Tên người thuộc phòng 1 hoặc 5 bằng UNION

Mức: Trung bình. Chạy `python tools/lab.py --exercise Q23`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT Fname FROM EMPLOYEE WHERE Dno=1 UNION SELECT Fname FROM EMPLOYEE WHERE Dno=5 ORDER BY Fname;
```

```json
[["Franklin"], ["James"], ["John"], ["Joyce"], ["Ramesh"]]
```

UNION loại dòng trùng; UNION ALL giữ bội số.

</details>

## Q24 · Mã nhân viên làm cả dự án 1 và 2 bằng INTERSECT

Mức: Trung bình. Chạy `python tools/lab.py --exercise Q24`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT Essn FROM WORKS_ON WHERE Pno=1 INTERSECT SELECT Essn FROM WORKS_ON WHERE Pno=2 ORDER BY Essn;
```

```json
[["123456789"], ["453453453"]]
```

INTERSECT lấy giao hai tập có cùng cấu trúc.

</details>

## Q25 · Nhân viên làm mọi dự án trong tập {1,2}

Mức: Nâng cao. Chạy `python tools/lab.py --exercise Q25`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT e.Fname FROM EMPLOYEE e WHERE NOT EXISTS(SELECT 1 FROM PROJECT p WHERE p.Pnumber IN (1,2) AND NOT EXISTS(SELECT 1 FROM WORKS_ON w WHERE w.Essn=e.Ssn AND w.Pno=p.Pnumber)) ORDER BY e.Fname;
```

```json
[["John"], ["Joyce"]]
```

Không tồn tại dự án yêu cầu mà nhân viên chưa làm. Đây là mẫu for all.

</details>

## Q26 · Mẫu for all khi tập dự án yêu cầu rỗng

Mức: Nâng cao. Chạy `python tools/lab.py --exercise Q26`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT e.Fname FROM EMPLOYEE e WHERE NOT EXISTS(SELECT 1 FROM PROJECT p WHERE p.Dnum=9 AND NOT EXISTS(SELECT 1 FROM WORKS_ON w WHERE w.Essn=e.Ssn AND w.Pno=p.Pnumber)) ORDER BY e.Fname;
```

```json
[["Ahmad"], ["Alicia"], ["Franklin"], ["James"], ["Jennifer"], ["John"], ["Joyce"], ["Mai"], ["Ramesh"]]
```

Tập yêu cầu rỗng không có phản ví dụ; mọi ứng viên EMPLOYEE đều thỏa.

</details>

## Q27 · Mỗi phòng và nhân viên có lương >40000; giữ phòng không match

Mức: Trung bình. Chạy `python tools/lab.py --exercise Q27`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT d.Dname,e.Fname FROM DEPARTMENT d LEFT JOIN EMPLOYEE e ON e.Dno=d.Dnumber AND e.Salary>40000 ORDER BY d.Dname,e.Fname;
```

```json
[["Administration", "Jennifer"], ["Headquarters", "James"], ["Innovation", null], ["Research", null]]
```

Điều kiện trong ON quyết định cặp match nhưng vẫn giữ mọi phòng.

</details>

## Q28 · So sánh Q27 khi điều kiện lương chuyển xuống WHERE

Mức: Trung bình. Chạy `python tools/lab.py --exercise Q28`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT d.Dname,e.Fname FROM DEPARTMENT d LEFT JOIN EMPLOYEE e ON e.Dno=d.Dnumber WHERE e.Salary>40000 ORDER BY d.Dname,e.Fname;
```

```json
[["Administration", "Jennifer"], ["Headquarters", "James"]]
```

WHERE lọc các hàng NULL-extended; query này chỉ phù hợp nếu muốn bỏ phòng không match.

</details>

## Q29 · Phòng có ít nhất 4 nhân viên, bằng HAVING

Mức: Trung bình. Chạy `python tools/lab.py --exercise Q29`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT Dno,COUNT(*) FROM EMPLOYEE GROUP BY Dno HAVING COUNT(*)>=4 ORDER BY Dno;
```

```json
[[4, 4], [5, 4]]
```

WHERE không thể lọc trực tiếp COUNT của nhóm trước khi nhóm được tạo.

</details>

## Q30 · Dự án có ít nhất hai người tham gia

Mức: Trung bình. Chạy `python tools/lab.py --exercise Q30`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT Pno,COUNT(*) FROM WORKS_ON GROUP BY Pno HAVING COUNT(*)>=2 ORDER BY Pno;
```

```json
[[1, 2], [2, 3], [3, 2], [10, 3], [20, 3], [30, 3]]
```

Đếm hàng phân công, kể cả hàng Hours NULL; đó là người tham gia chứ không phải số giờ.

</details>

## Q31 · Nhân viên có lương cao nhất trong từng phòng, giữ đồng hạng

Mức: Nâng cao. Chạy `python tools/lab.py --exercise Q31`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT e.Fname FROM EMPLOYEE e WHERE e.Salary=(SELECT MAX(x.Salary) FROM EMPLOYEE x WHERE x.Dno=e.Dno) ORDER BY e.Fname;
```

```json
[["Franklin"], ["James"], ["Jennifer"]]
```

MAX bỏ NULL. So sánh bằng MAX giữ mọi hàng đồng hạng nếu dữ liệu có tie.

</details>

## Q32 · Phân loại lương: Unknown / High (>=40000) / Other

Mức: Trung bình. Chạy `python tools/lab.py --exercise Q32`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT CASE WHEN Salary IS NULL THEN 'Unknown' WHEN Salary>=40000 THEN 'High' ELSE 'Other' END AS Band,COUNT(*) FROM EMPLOYEE GROUP BY CASE WHEN Salary IS NULL THEN 'Unknown' WHEN Salary>=40000 THEN 'High' ELSE 'Other' END ORDER BY Band;
```

```json
[["High", 3], ["Other", 5], ["Unknown", 1]]
```

CASE kiểm tra NULL riêng trước khi phân nhóm; không coi Unknown là Other.

</details>

## Q33 · Dense rank lương ở phòng 5, phần mở rộng window function

Mức: Nâng cao. Chạy `python tools/lab.py --exercise Q33`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT Fname,DENSE_RANK() OVER(ORDER BY Salary DESC) AS SalaryRank FROM EMPLOYEE WHERE Dno=5 ORDER BY SalaryRank,Fname;
```

```json
[["Franklin", 1], ["Ramesh", 2], ["John", 3], ["Joyce", 4]]
```

Window không gom mất từng hàng như GROUP BY; DENSE_RANK không để khoảng trống khi có tie.

</details>

## Q34 · Lương và trung bình phòng bằng window, không làm mất hàng

Mức: Nâng cao. Chạy `python tools/lab.py --exercise Q34`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT Fname,AVG(Salary) OVER(PARTITION BY Dno) AS DeptAverage FROM EMPLOYEE WHERE Dno=5 ORDER BY Fname;
```

```json
[["Franklin", 33250], ["John", 33250], ["Joyce", 33250], ["Ramesh", 33250]]
```

PARTITION BY chia cửa sổ; WHERE Dno=5 vẫn giữ trọn phòng 5 trong ví dụ này.

</details>

## Q35 · CTE tính tổng giờ đã biết rồi lọc >=40

Mức: Nâng cao. Chạy `python tools/lab.py --exercise Q35`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
WITH T AS(SELECT Essn,SUM(Hours) AS h FROM WORKS_ON GROUP BY Essn) SELECT e.Fname,T.h FROM EMPLOYEE e JOIN T ON T.Essn=e.Ssn WHERE T.h>=40 ORDER BY e.Fname;
```

```json
[["Ahmad", 40], ["Alicia", 40], ["Franklin", 40], ["John", 40], ["Joyce", 40], ["Ramesh", 40]]
```

CTE đặt tên cho bước trung gian; không khẳng định nó luôn được materialize.

</details>

## Q36 · Nhân viên có trên 2 dependent

Mức: Trung bình. Chạy `python tools/lab.py --exercise Q36`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT e.Fname,COUNT(*) FROM EMPLOYEE e JOIN DEPENDENT d ON d.Essn=e.Ssn GROUP BY e.Ssn,e.Fname HAVING COUNT(*)>2 ORDER BY e.Fname;
```

```json
[["Franklin", 3], ["John", 3]]
```

Join trước và GROUP BY đúng khóa nhân viên; không gộp những người trùng tên.

</details>

## Q37 · Bộ tên/địa điểm dự án của phòng 5

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q37`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT Pname,Plocation FROM PROJECT WHERE Dnum=5 ORDER BY Pnumber;
```

```json
[["ProductX", "Bellaire"], ["ProductY", "Sugarland"], ["ProductZ", "Houston"]]
```

Projection chọn hai cột, selection lọc phòng. SQL ORDER BY có thể dùng cột không nằm SELECT trong dạng này.

</details>

## Q38 · Bình quân lương đã biết toàn công ty

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q38`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT ROUND(AVG(Salary),2) FROM EMPLOYEE;
```

```json
[[35125]]
```

Tổng lương 281000 chia 8 giá trị đã biết, không chia 9.

</details>

## Q39 · Danh sách SSN không có WORKS_ON bằng EXCEPT

Mức: Trung bình. Chạy `python tools/lab.py --exercise Q39`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT Ssn FROM EMPLOYEE EXCEPT SELECT Essn FROM WORKS_ON ORDER BY Ssn;
```

```json
[["111222333"]]
```

EXCEPT biểu diễn hiệu hai tập cùng một cột SSN.

</details>

## Q40 · Tổng số phòng và số phòng có manager

Mức: Cơ bản. Chạy `python tools/lab.py --exercise Q40`.

<details><summary>SQL, kết quả và giải thích</summary>

```sql
SELECT COUNT(*),COUNT(Mgr_ssn) FROM DEPARTMENT;
```

```json
[[4, 3]]
```

COUNT(column) bỏ NULL; Innovation có manager chưa được gán. Đây là giả thiết fixture, không phải yêu cầu COMPANY chính thức.

</details>
