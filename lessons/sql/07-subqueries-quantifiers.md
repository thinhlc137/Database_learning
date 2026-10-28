# SQL 07 · Truy vấn lồng, IN, EXISTS, ANY, ALL và phép chia

> Nguồn: **4A slide 47–55**. Mục tiêu: nhận diện scalar/table/correlated subquery, diễn đạt “có ít nhất”, “không có”, “mọi” và xử lý NULL/tập rỗng đúng.

## 1. Phân loại query con

| Loại | Đầu ra/ngữ cảnh | Ví dụ |
|---|---|---|
| Scalar subquery | Một cột, tối đa một hàng theo ý định | Lương trung bình toàn công ty |
| Column/table subquery | Một hoặc nhiều cột, nhiều hàng | Tập Ssn người làm dự án 1 |
| Correlated subquery | Tham chiếu alias của query ngoài | Lương trung bình phòng của nhân viên đang xét |
| Derived table / inline view | Query con trong FROM có alias | Bảng tổng số giờ mỗi nhân viên |

```sql
-- @lab S27
SELECT Fname,Salary
FROM EMPLOYEE
WHERE Salary>(SELECT AVG(Salary) FROM EMPLOYEE)
ORDER BY Fname;
```

Trung bình là 35125, kết quả Franklin 40000, James 55000, Jennifer 43000, Ramesh 38000. Scalar subquery nhiều hàng gây lỗi ở SQL Server; SQLite có thể lấy hàng đầu theo quy tắc của nó, nên không dựa vào việc “web chạy được” để bỏ tính duy nhất. Scalar subquery không có hàng thường cho NULL.

## 2. IN: thuộc một tập

```sql
-- @lab S28
SELECT Fname FROM EMPLOYEE
WHERE Ssn IN (SELECT Essn FROM WORKS_ON WHERE Pno=1)
ORDER BY Fname;
```

Kết quả John và Joyce. Subquery có trùng Essn cũng không nhân hàng ngoài như JOIN: IN chỉ kiểm tra thuộc tập. Vì vậy đổi IN thành JOIN có thể cần DISTINCT để giữ cùng multiplicity của đầu ra, không chỉ cùng các giá trị khác nhau.

Với subquery trả một cột, số cột bên trái phải phù hợp. Tuple comparison trong slide 50 kiểm tra cặp `(Pno,Hours)`, không phải “Pno thuộc tập và Hours thuộc một tập độc lập”.

```sql
-- @lab S29
SELECT DISTINCT w.Essn FROM WORKS_ON w
WHERE (w.Pno,w.Hours) IN (
 SELECT j.Pno,j.Hours FROM WORKS_ON j WHERE j.Essn='123456789'
)
ORDER BY w.Essn;
```

Chỉ John có đúng một cặp dự án–giờ của John trong fixture. SQLite hỗ trợ row-value IN này; SQL Server cần viết EXISTS với cả hai điều kiện. So sánh Hours=NULL vẫn phải xét UNKNOWN, không mặc định coi hai NULL bằng nhau.

## 3. Correlated subquery: phụ thuộc hàng ngoài

```sql
-- @lab S30
SELECT e.Fname,e.Salary,e.Dno
FROM EMPLOYEE e
WHERE e.Salary>(SELECT AVG(x.Salary) FROM EMPLOYEE x WHERE x.Dno=e.Dno)
ORDER BY e.Fname;
```

| Fname | Salary | Dno |
|---|---:|---:|
| Franklin | 40000 | 5 |
| Jennifer | 43000 | 4 |
| Ramesh | 38000 | 5 |

Lập luận “với mỗi e, tính trung bình phòng của e” là mô hình để hiểu. Không kết luận optimizer buộc chạy query con nguyên vẹn từng lần; có thể biến đổi kế hoạch.

Ví dụ slide 48 tìm nhân viên có người phụ thuộc cùng tên và cùng giới: cần `d.Essn=e.Ssn AND d.Dependent_name=e.Fname AND d.Sex=e.Sex`. Fixture hiện không có hàng thỏa, và kết quả rỗng là hợp lệ. Đừng sửa query chỉ để tạo ra kết quả có hàng.

## 4. EXISTS và NOT EXISTS

```sql
-- @lab S31
SELECT e.Fname FROM EMPLOYEE e
WHERE NOT EXISTS(SELECT 1 FROM DEPENDENT d WHERE d.Essn=e.Ssn)
ORDER BY e.Fname;
```

Kết quả Ahmad, Alicia, James, Joyce, Mai, Ramesh. Query chỉ hỏi có hàng phụ thuộc không nên SELECT 1, SELECT * hay SELECT NULL trong EXISTS có cùng ý nghĩa tồn tại ở đây.

`UNIQUE(subquery)` được slide nhắc như predicate SQL chuẩn kiểm tra không có hàng trùng trong kết quả query con. SQLite và SQL Server không hỗ trợ cú pháp predicate đó. Phân biệt với UNIQUE constraint trên bảng. Nếu cần kiểm tra các giá trị đã chọn có trùng, có thể dùng `NOT EXISTS(SELECT key FROM ... GROUP BY key HAVING COUNT(*)>1)` và xác định chính sách NULL.

## 5. ANY/SOME và ALL: lượng từ

Với toán tử θ, `x θ ANY(Q)` nghĩa là tồn tại ít nhất một giá trị làm so sánh TRUE. SOME là từ đồng nghĩa của ANY. `x θ ALL(Q)` cần mọi so sánh TRUE. `=ANY` tương ứng kiểm tra IN; `<>ALL` liên hệ NOT IN với cùng các quy tắc NULL.

| So sánh | Q={10,20} với x=15 | Q rỗng | Q={10,NULL} với x=15 |
|---|---|---|---|
| x>ANY(Q) | TRUE | FALSE | TRUE |
| x>ALL(Q) | FALSE | TRUE | UNKNOWN |
| x<ANY(Q) | TRUE | FALSE | UNKNOWN |
| x<ALL(Q) | FALSE | TRUE | FALSE |

**ALL trên tập rỗng là TRUE**, được gọi là đúng hiển nhiên (vacuous truth). UNKNOWN xuất hiện nếu không có giá trị quyết định FALSE cho ALL hoặc TRUE cho ANY nhưng vẫn có so sánh chưa biết.

```tsql
-- SQL Server, dữ liệu từ sql/sqlserver/00-setup.sql
SELECT Fname,Salary FROM course.EMPLOYEE
WHERE Salary > ALL (
 SELECT Salary FROM course.EMPLOYEE WHERE Dno=5
);
```

Research có 25000,30000,38000,40000, nên kết quả James và Jennifer. SQLite không có cú pháp ANY/ALL này. Với mục đích lọc WHERE và cần giữ ngữ nghĩa TRUE của ALL ngay cả với NULL/tập rỗng, có thể dùng:

```sql
-- @lab S32
SELECT e.Fname,e.Salary FROM EMPLOYEE e
WHERE NOT EXISTS (
 SELECT 1 FROM EMPLOYEE x
 WHERE x.Dno=5 AND (e.Salary<=x.Salary OR e.Salary IS NULL OR x.Salary IS NULL)
)
ORDER BY e.Fname;
```

Kết quả James,Jennifer. Nếu tập đối chiếu rỗng thì NOT EXISTS TRUE, kể cả e.Salary NULL, giống ALL trong WHERE. Với ANY có thể dùng EXISTS với so sánh tương ứng: query chỉ cần ít nhất một hàng so sánh TRUE.

### Vì sao không tùy ý thay ALL bằng MAX?

Với tập không rỗng và không NULL, `x>ALL(Q)` tương đương `x>MAX(Q)`. Nhưng MAX bỏ NULL và trên tập rỗng cho NULL. ALL tập rỗng TRUE, còn x>NULL UNKNOWN; có NULL trong Q cũng có thể khiến ALL UNKNOWN trong khi so MAX TRUE. Nếu đổi query, phải nêu giả thiết hoặc thêm kiểm tra phù hợp.

## 6. “Làm mọi dự án” là không có dự án bị thiếu

Gọi tập yêu cầu là các dự án do Research kiểm soát (1,2,3). Một nhân viên đạt nếu **không tồn tại dự án yêu cầu mà không tồn tại phân công của người đó**.

```sql
-- @lab S33
SELECT e.Fname FROM EMPLOYEE e
WHERE NOT EXISTS (
 SELECT 1 FROM PROJECT p
 WHERE p.Dnum=5 AND NOT EXISTS (
  SELECT 1 FROM WORKS_ON w WHERE w.Essn=e.Ssn AND w.Pno=p.Pnumber
 )
)
ORDER BY e.Fname;
```

Không ai đạt trong fixture: Franklin thiếu 1, John/Joyce thiếu 3, Ramesh thiếu 1 và 2. Nếu thay tập yêu cầu bằng dự án không tồn tại (Dnum=999), mọi nhân viên đạt theo logic “mọi phần tử của tập rỗng”. Nghiệp vụ có thể yêu cầu tập không rỗng; khi đó thêm EXISTS cho tập yêu cầu.

| Nhân viên | Có 1? | Có 2? | Có 3? | Thiếu dự án nào? |
|---|---|---|---|---|
| John | Có | Có | Không | 3 |
| Franklin | Không | Có | Có | 1 |
| Joyce | Có | Có | Không | 3 |
| Ramesh | Không | Không | Có | 1,2 |

Để tìm người làm cả dự án 1 và 2, dùng hai EXISTS hoặc GROUP BY Essn, HAVING COUNT(DISTINCT Pno)=2 sau WHERE Pno IN(1,2). Kết quả John và Joyce.

## 7. Bài tập

1. Viết “có ít nhất một phân công >30 giờ” bằng EXISTS.
2. Tại sao IN → JOIN có thể tăng số hàng?
3. `x>ALL({NULL})` và `x>ALL(tập rỗng)` khác gì?
4. Thay ANY bằng MIN cần giả thiết gì?

<details><summary>Lời giải</summary>

```sql
SELECT e.Fname FROM EMPLOYEE e
WHERE EXISTS(SELECT 1 FROM WORKS_ON w WHERE w.Essn=e.Ssn AND w.Hours>30)
ORDER BY e.Fname;
```

Kết quả Ahmad,John,Ramesh. IN chỉ kiểm tra tồn tại thuộc tập; JOIN giữ từng cặp khớp nên nhiều hàng con làm lặp hàng ngoài. Với {NULL}, so sánh là UNKNOWN; với tập rỗng ALL TRUE. Muốn thay `x>ANY(Q)` bằng `x>MIN(Q)` một cách trực tiếp, phải xử lý tập rỗng/NULL và ngữ cảnh logic; trong WHERE, MIN bỏ NULL thường vẫn giữ cùng tập hàng TRUE cho so sánh này, nhưng không đồng nghĩa mọi giá trị TRUE/FALSE/UNKNOWN ở mọi ngữ cảnh. Đừng suy tương đương toàn bộ predicate chỉ từ tập hàng của một ví dụ.

</details>
