# 50 câu tự luyện có giải thích

Đề biên soạn bổ sung theo các nhóm kiến thức của tài liệu. Không phải đề thi hoặc đáp án chính thức.

## M01 · Schema khác state ở điểm nào?

- **A.** Schema là bản backup; state là chương trình
- **B.** Schema thay đổi sau mỗi SELECT
- **C.** Hai khái niệm đồng nghĩa
- **D.** Schema mô tả cấu trúc; state là dữ liệu tại một thời điểm

<details><summary>Đáp án và giải thích</summary>

**D.** INSERT đổi state mà không bắt buộc đổi schema. CREATE/ALTER thường tác động schema.

</details>

## M02 · Thêm index nhưng ứng dụng vẫn dùng nguyên SQL minh họa điều gì?

- **A.** Logical independence
- **B.** Physical independence
- **C.** Total participation
- **D.** Entity integrity

<details><summary>Đáp án và giải thích</summary>

**B.** Index là đường truy cập ở mức vật lý; interface logic có thể giữ nguyên.

</details>

## M03 · Metadata là ví dụ nào?

- **A.** Ảnh đại diện người dùng
- **B.** Lương của John
- **C.** Danh sách tên cột và kiểu dữ liệu
- **D.** Một dòng đặt vé

<details><summary>Đáp án và giải thích</summary>

**C.** Metadata mô tả cấu trúc và quy tắc của dữ liệu, thường trong catalog.

</details>

## M04 · Hai ứng dụng cùng ghi đè số chỗ trống gây vấn đề chính nào?

- **A.** Specialization
- **B.** Minimal cover
- **C.** Projection
- **D.** Concurrency

<details><summary>Đáp án và giải thích</summary>

**D.** Các thao tác đồng thời cần cơ chế transaction/isolation để tránh mất cập nhật hoặc vi phạm bất biến.

</details>

## M05 · Ba-schema architecture là gì?

- **A.** External, conceptual, internal
- **B.** RAM, CPU, SSD
- **C.** DDL, DML, DCL
- **D.** Frontend, API, database server

<details><summary>Đáp án và giải thích</summary>

**A.** Đây là ba mức mô tả dữ liệu, không phải ba tầng triển khai ứng dụng.

</details>

## M06 · Cardinality và participation lần lượt nói về điều gì?

- **A.** Minimum và kiểu dữ liệu
- **B.** Maximum và yêu cầu tham gia tối thiểu
- **C.** Số cột và số hàng hiện tại
- **D.** Tên khóa và index

<details><summary>Đáp án và giải thích</summary>

**B.** 1:N/M:N không cho biết phía nào bắt buộc phải có ít nhất một liên kết.

</details>

## M07 · Trong Chen, đường đôi từ ANIME tới Has_genre biểu diễn gì?

- **A.** Quan hệ 1:1
- **B.** Anime có đúng hai genre
- **C.** ANIME total participation
- **D.** GENRE là weak entity

<details><summary>Đáp án và giải thích</summary>

**C.** Mọi anime phải tham gia ít nhất một instance quan hệ; không suy ra tối đa là bao nhiêu.

</details>

## M08 · AddedAt khi thêm anime vào watch list nên gắn với gì?

- **A.** Contains giữa list và anime
- **B.** Tên studio
- **C.** ANIME
- **D.** GENRE

<details><summary>Đáp án và giải thích</summary>

**A.** Giá trị phụ thuộc vào cặp list–anime, không chỉ một entity riêng lẻ.

</details>

## M09 · Điều gì đặc trưng cho thực thể yếu?

- **A.** Cần khóa owner cộng partial key để định danh
- **B.** Bất cứ entity nào có FK
- **C.** Không có thuộc tính
- **D.** Luôn có ít hơn 10 hàng

<details><summary>Đáp án và giải thích</summary>

**A.** Sự phụ thuộc định danh là cốt lõi; nhiều entity mạnh cũng có FK sau mapping.

</details>

## M10 · EpisodeNo chỉ duy nhất trong cùng anime. Khóa tự nhiên phù hợp là gì?

- **A.** EpisodeNo
- **B.** Title
- **C.** AnimeID + EpisodeNo
- **D.** Duration

<details><summary>Đáp án và giải thích</summary>

**C.** Hai anime có thể cùng tập số 1 nên EpisodeNo riêng không đủ định danh.

</details>

## M11 · Biết nhân viên và dự án cùng thuộc một phòng có đủ xác định ai làm dự án nào?

- **A.** Đủ nếu cả hai FK NOT NULL
- **B.** Luôn đủ
- **C.** Chỉ khi phòng có tên
- **D.** Không; cần quan hệ phân công hoặc constraint tương ứng

<details><summary>Đáp án và giải thích</summary>

**D.** Cùng phòng không đồng nghĩa phân công; suy diễn qua đường nối có thể tạo fan trap.

</details>

## M12 · Overlapping specialization cho phép điều gì?

- **A.** Không entity nào có subclass
- **B.** Subclass không kế thừa khóa
- **C.** Một entity thuộc nhiều subclass trong specialization
- **D.** Mọi entity phải thuộc mọi subclass

<details><summary>Đáp án và giải thích</summary>

**C.** Cho phép giao giữa các subclass; không bắt buộc giao luôn khác rỗng trong mọi state.

</details>

## M13 · Total specialization tương ứng với điều kiện nào?

- **A.** Hợp các subclass bằng superclass
- **B.** Mọi subclass đều có ít nhất một hàng
- **C.** Superclass không có khóa
- **D.** Giao subclass rỗng

<details><summary>Đáp án và giải thích</summary>

**A.** Total yêu cầu bao phủ mọi entity của superclass, không yêu cầu mỗi subclass không rỗng.

</details>

## M14 · Shared subclass và category khác nhau ở phép tập hợp nào?

- **A.** Cả hai luôn là hợp
- **B.** Shared subclass là subset của giao; category là subset của hợp
- **C.** Shared subclass là hiệu
- **D.** Category là tích Descartes

<details><summary>Đáp án và giải thích</summary>

**B.** Teaching assistant thuộc student và employee; owner có thể là person hoặc company.

</details>

## M15 · Superclass + hai bảng subclass PK/FK mặc định có enforce total không?

- **A.** Chỉ cần UNIQUE trên tên
- **B.** Có, vì có FK
- **C.** Có, vì subclass có PK
- **D.** Không; superclass có thể chưa có hàng con

<details><summary>Đáp án và giải thích</summary>

**D.** FK đảm bảo con có cha, không đảm bảo mọi cha có ít nhất một loại con.

</details>

## M16 · Mapping quan hệ 1:N thường đặt FK ở đâu?

- **A.** Cả hai phía bắt buộc
- **B.** Không cần FK
- **C.** Phía N
- **D.** Luôn phía 1

<details><summary>Đáp án và giải thích</summary>

**C.** Mỗi hàng phía N có thể giữ khóa của một owner phía 1; tránh cột lặp ở phía 1.

</details>

## M17 · Mapping 1:1 bằng FK còn cần gì để chặn nhiều hàng trỏ cùng cha?

- **A.** UNIQUE trên FK
- **B.** ORDER BY
- **C.** DEFAULT 0
- **D.** SUM

<details><summary>Đáp án và giải thích</summary>

**A.** FK chỉ kiểm tra tồn tại cha; UNIQUE giới hạn tối đa một hàng tham chiếu cùng khóa cha.

</details>

## M18 · M:N Produced_by nên được ánh xạ thế nào?

- **A.** Một StudioID duy nhất trong ANIME
- **B.** Một bảng liên kết chứa cả hai khóa
- **C.** Một chuỗi chứa mọi studio trong một ô
- **D.** Không thể mapping

<details><summary>Đáp án và giải thích</summary>

**B.** Bảng liên kết cho phép nhiều studio trên anime và nhiều anime trên studio.

</details>

## M19 · Superkey khác candidate key thế nào?

- **A.** Hai khái niệm hoàn toàn khác
- **B.** Candidate key là superkey tối thiểu theo bao hàm
- **C.** Superkey luôn chỉ có một thuộc tính
- **D.** Candidate key được phép trùng

<details><summary>Đáp án và giải thích</summary>

**B.** Thêm thuộc tính vào candidate key vẫn tạo superkey nhưng thường không còn tối thiểu.

</details>

## M20 · FK NOT NULL từ anime_genre tới anime đã đảm bảo mọi anime có genre chưa?

- **A.** Chỉ cần thêm PK anime
- **B.** Thêm CHECK anime_id>0 là đủ
- **C.** Đã đủ
- **D.** Chưa; anime có thể chưa được tham chiếu

<details><summary>Đáp án và giải thích</summary>

**D.** Constraint chỉ buộc mỗi hàng liên kết có cha; cần điều kiện tồn tại theo chiều ngược lại.

</details>

## M21 · Projection trong RA cổ điển xử lý dòng trùng thế nào?

- **A.** Loại tuple trùng
- **B.** Nhân đôi tuple
- **C.** Chỉ giữ dòng đầu theo thứ tự
- **D.** Giữ mọi dòng như SQL mặc định

<details><summary>Đáp án và giải thích</summary>

**A.** RA dùng set semantics; SQL thường cần DISTINCT để có hành vi tương ứng.

</details>

## M22 · Natural join chọn cột nối dựa trên gì?

- **A.** FK metadata
- **B.** Tên cột trùng
- **C.** Cột đầu tiên mỗi bảng
- **D.** Mọi cột kiểu số

<details><summary>Đáp án và giải thích</summary>

**B.** Dno và Dnumber không tự match chỉ vì chúng có quan hệ FK.

</details>

## M23 · Từ “mọi / tất cả” thường gợi ý mẫu nào?

- **A.** LEFT JOIN luôn đủ
- **B.** Một điều kiện = duy nhất
- **C.** Division hoặc không tồn tại phản ví dụ
- **D.** ORDER BY

<details><summary>Đáp án và giải thích</summary>

**C.** For all x, P(x) tương đương không tồn tại x sao cho không P(x).

</details>

## M24 · Union hai quan hệ đòi hỏi gì?

- **A.** Cùng primary key tên giống nhau
- **B.** Cùng số index
- **C.** Cùng số tuple
- **D.** Union-compatible về số cột và miền tương ứng

<details><summary>Đáp án và giải thích</summary>

**D.** Hai tập phải có cấu trúc tương thích; không cần có cùng số hàng.

</details>

## M25 · WHERE giữ các hàng có predicate nào?

- **A.** FALSE
- **B.** UNKNOWN
- **C.** TRUE và UNKNOWN
- **D.** TRUE

<details><summary>Đáp án và giải thích</summary>

**D.** Trong SQL ba-valued logic, WHERE chỉ giữ TRUE.

</details>

## M26 · Cách kiểm tra Salary thiếu giá trị là gì?

- **A.** Salary = NULL
- **B.** Salary IS NULL
- **C.** Salary = 0
- **D.** Salary = empty

<details><summary>Đáp án và giải thích</summary>

**B.** = NULL cho UNKNOWN; IS NULL là phép kiểm tra thiếu giá trị.

</details>

## M27 · COUNT(*) khác COUNT(Salary) khi có NULL thế nào?

- **A.** COUNT(Salary) cộng lương
- **B.** COUNT(*) bỏ NULL
- **C.** COUNT(Salary) bỏ hàng có Salary NULL
- **D.** Cả hai luôn bằng nhau

<details><summary>Đáp án và giải thích</summary>

**C.** COUNT(*) đếm hàng; COUNT(expression) đếm biểu thức non-NULL.

</details>

## M28 · Sau LEFT JOIN, WHERE trên cột bên phải có thể gây gì?

- **A.** Tự biến thành FULL JOIN
- **B.** Tự enforce FK
- **C.** Luôn giữ mọi hàng trái
- **D.** Loại các hàng NULL-extended

<details><summary>Đáp án và giải thích</summary>

**D.** Predicate thông thường như e.Salary>40000 cho UNKNOWN ở hàng không match và hàng đó bị loại.

</details>

## M29 · Lọc nhóm có COUNT>=4 nên đặt ở đâu?

- **A.** HAVING COUNT(*)>=4
- **B.** ORDER BY COUNT(*)>=4
- **C.** PRIMARY KEY
- **D.** WHERE COUNT(*)>=4

<details><summary>Đáp án và giải thích</summary>

**A.** HAVING lọc nhóm sau aggregation trong thứ tự xử lý logic.

</details>

## M30 · NOT IN có NULL trong tập con có thể làm gì?

- **A.** Luôn coi NULL là 0
- **B.** Không cho TRUE đối với các giá trị không match còn lại
- **C.** Luôn trả tất cả hàng
- **D.** Tự bỏ NULL

<details><summary>Đáp án và giải thích</summary>

**B.** Với x không bằng giá trị đã biết nào, so với NULL vẫn UNKNOWN; dùng NOT EXISTS cho anti join phù hợp.

</details>

## M31 · Double NOT EXISTS với tập yêu cầu rỗng trả gì trong mẫu lấy ứng viên từ EMPLOYEE?

- **A.** Lỗi SQL
- **B.** Không ai
- **C.** Mọi ứng viên EMPLOYEE
- **D.** Chỉ nhân viên có dự án

<details><summary>Đáp án và giải thích</summary>

**C.** Không tồn tại phản ví dụ trong tập rỗng: vacuous truth.

</details>

## M32 · Prepared statement placeholder dùng trực tiếp để thay gì?

- **A.** Giá trị tham số
- **B.** Từ khóa SELECT
- **C.** Tên bảng tùy ý
- **D.** Tên cột tùy ý

<details><summary>Đáp án và giải thích</summary>

**A.** Parameter binding tách giá trị khỏi cú pháp. Identifier động cần whitelist/cơ chế quoting phù hợp.

</details>

## M33 · View thông thường có nhất thiết lưu một bản sao vật lý kết quả không?

- **A.** Không; khác materialized view
- **B.** Chỉ khi có WHERE
- **C.** Chỉ khi có JOIN
- **D.** Có

<details><summary>Đáp án và giải thích</summary>

**A.** View thường đặt tên cho query; materialized view là khái niệm khác, tùy DBMS.

</details>

## M34 · FD A→B có nghĩa gì?

- **A.** A nhỏ hơn B
- **B.** Hai tuple cùng A phải cùng B trong mọi state hợp lệ
- **C.** B luôn là primary key
- **D.** A và B cùng kiểu

<details><summary>Đáp án và giải thích</summary>

**B.** FD là ràng buộc của schema/miniworld, không chỉ một mẫu tình cờ trong dữ liệu hiện có.

</details>

## M35 · R(A,B,C), F={A→B,B→C}; A+ là gì?

- **A.** BC
- **B.** A
- **C.** AB
- **D.** ABC

<details><summary>Đáp án và giải thích</summary>

**D.** Khởi tạo A; A→B thêm B; B→C thêm C; dừng khi không đổi.

</details>

## M36 · R(A,B,C), F={A→B,B→A}; candidate keys là gì?

- **A.** Chỉ ABC
- **B.** C
- **C.** A và B
- **D.** AC và BC

<details><summary>Đáp án và giải thích</summary>

**D.** C không xuất hiện RHS nên bắt buộc thuộc key. AC và BC xác định toàn R, bỏ bất cứ thành phần nào đều không đủ.

</details>

## M37 · Prime attribute là gì?

- **A.** Nằm trong ít nhất một candidate key
- **B.** Có giá trị là số nguyên tố
- **C.** Nằm trong mọi candidate key
- **D.** Chỉ nằm trong primary key được chọn

<details><summary>Đáp án và giải thích</summary>

**A.** Phải tìm đủ candidate keys trước khi đánh dấu prime để kiểm 3NF.

</details>

## M38 · FD nontrivial X→a thỏa 3NF khi nào?

- **A.** X superkey hoặc a prime
- **B.** X phải candidate key đúng bằng PK
- **C.** a phải nonprime
- **D.** X luôn một thuộc tính

<details><summary>Đáp án và giải thích</summary>

**A.** BCNF chỉ giữ nhánh X là superkey; 3NF cho phép RHS prime.

</details>

## M39 · R tách thành R1 và R2. Điều kiện lossless binary theo FD là gì?

- **A.** Mỗi bảng con tự đạt BCNF
- **B.** Mọi bảng con đều có PK
- **C.** Giao xác định R1 hoặc R2 theo F+
- **D.** Hai bảng có cùng số hàng

<details><summary>Đáp án và giải thích</summary>

**C.** (R1∩R2)→R1 hoặc →R2 là điều kiện cần và đủ trong mô hình phân rã nhị phân dựa trên FD.

</details>

## M40 · Unspanned, B=4096, R=100, không overhead: bfr bằng bao nhiêu?

- **A.** 409600
- **B.** 100
- **C.** 40
- **D.** 41

<details><summary>Đáp án và giải thích</summary>

**C.** floor(B/R)=40 record/block. Làm tròn xuống vì record không được tách.

</details>

## M41 · r=30000, bfr=40: số data block là bao nhiêu?

- **A.** 750
- **B.** 751
- **C.** 1200000
- **D.** 749

<details><summary>Đáp án và giải thích</summary>

**A.** ceil(r/bfr)=750 block; phép chia đã nguyên.

</details>

## M42 · Sparse primary index điển hình có bao nhiêu entry?

- **A.** Một mỗi data block
- **B.** Một mỗi byte
- **C.** Luôn một mỗi record
- **D.** Một mỗi bảng

<details><summary>Đáp án và giải thích</summary>

**A.** Theo mô hình file sorted trên ordering key, một anchor đại diện mỗi data block.

</details>

## M43 · Hai mức index chưa cache và một data block: tổng accesses?

- **A.** 4
- **B.** 1
- **C.** 2
- **D.** 3

<details><summary>Đáp án và giải thích</summary>

**D.** Số mức index là 2; cộng một lần đọc data block, tổng 3.

</details>

## M44 · Authentication và authorization khác gì?

- **A.** Tên bảng và khóa
- **B.** Không khác nhau
- **C.** Danh tính và quyền truy cập
- **D.** Mã hóa và backup

<details><summary>Đáp án và giải thích</summary>

**C.** Đăng nhập thành công không có nghĩa được phép mọi thao tác.

</details>

## M45 · Bell–LaPadula tập trung bảo vệ gì?

- **A.** Tốc độ query
- **B.** Uniqueness
- **C.** Backup duration
- **D.** Confidentiality

<details><summary>Đáp án và giải thích</summary>

**D.** No read up/no write down là các quy tắc bảo mật thông tin trong mô hình này, không phải mô hình integrity tổng quát.

</details>

## M46 · Nguyên tắc least privilege yêu cầu gì?

- **A.** Mọi user là DBA
- **B.** Chỉ cấp quyền cần để hoàn thành công việc
- **C.** Tắt audit
- **D.** Chỉ dùng mật khẩu dài

<details><summary>Đáp án và giải thích</summary>

**B.** Giảm quyền hạn chế phạm vi tác động nếu tài khoản hoặc ứng dụng gặp sự cố.

</details>

## M47 · CAP nêu giới hạn quan trọng trong tình huống nào?

- **A.** Khi có một SELECT
- **B.** Khi network partition và vẫn đòi C cùng A theo định nghĩa
- **C.** Chỉ khi hết RAM
- **D.** Chỉ khi dùng SQL

<details><summary>Đáp án và giải thích</summary>

**B.** Không diễn đạt thành ba thuộc tính tùy ý chọn hai mà bỏ điều kiện partition.

</details>

## M48 · OLAP thường phục vụ loại công việc nào?

- **A.** Chỉ thêm từng dòng đăng ký
- **B.** Chỉ kiểm FK
- **C.** Phân tích tổng hợp theo nhiều chiều
- **D.** Chỉ đổi mật khẩu

<details><summary>Đáp án và giải thích</summary>

**C.** OLTP phục vụ giao dịch nghiệp vụ, OLAP phục vụ truy vấn phân tích; có hệ hỗn hợp.

</details>

## M49 · 2PC có tự đồng nghĩa với 2PL không?

- **A.** Không; atomic commit khác giao thức locking
- **B.** Chỉ khác tên
- **C.** Cả hai là kiểu index
- **D.** Có

<details><summary>Đáp án và giải thích</summary>

**A.** Two-Phase Commit phối hợp quyết định commit; Two-Phase Locking là cơ chế điều khiển đồng thời.

</details>

## M50 · Xóa tên và email đã đủ bảo đảm k-anonymity chưa?

- **A.** Luôn đủ
- **B.** Không; còn phải xét quasi-identifiers và nhóm tương đương
- **C.** Có nếu đủ 10 hàng
- **D.** Có nếu dùng NoSQL

<details><summary>Đáp án và giải thích</summary>

**B.** Tuổi, khu vực, nghề nghiệp kết hợp vẫn có thể nhận diện; k-anonymity có điều kiện hình thức riêng.

</details>
