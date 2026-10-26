## 📚 TÓM TẮT LÝ THUYẾT DATABASE SYSTEMS (CO2013) — FULL ĐIỂM CUỐI KỲ HK252

> **Mục tiêu:** Đọc 1 file duy nhất này là đủ để **đi thi được điểm 10** trắc nghiệm — viết để **dễ coi và dễ hệ thống hoá lại kiến thức một cách tổng quát**, **bao quát hết toàn bộ kiến thức** của môn (toàn bộ 8 lecture chính + nhóm slide "Security & Advanced topics" + Tutorial 8 chương + 2 PDF VoTien), đối chiếu với **đề thi 4 năm gần nhất** (HK191, HK192, HK202, HK211, F2024/HK241) và **bộ QUIZ 1–10 trên BK-LMS** (`Final/Important/`) đã có đáp án đúng — nguồn dự đoán sát nhất.
>
> **📣 Cấu trúc đề (theo thông báo chính thức của thầy — `Final/Important/Nội dung ôn thi`):** **50 câu trắc nghiệm**, **thi OPEN-BOOK** (được mang tài liệu in: sách, vở, ghi chú). Vì open-book → file này tối ưu để **tra nhanh (Ctrl+F)**: mỗi định nghĩa có dòng `🔑 Keywords (EN)`, mỗi công thức có **Worked example** giải từng bước, mỗi chương có bảng so sánh + bẫy MCQ.
>
> | # | Chủ đề | Số câu | Ưu tiên học |
> |---|---|---|---|
> | 1 | Database System Overview | 5 | ④ |
> | 2 | **ERD & EERD** | **10** 🔥🔥 | ① LỚN NHẤT |
> | 3 | Relational Mapping | 5 | ⑤ |
> | 4 | Relational Algebra | 4 | ⑦ |
> | 5 | **SQL** | **9** 🔥🔥 | ② |
> | 6 | Functional Dependencies & Normalization | 6 🔥 | ③ |
> | 7 | Data Storage & Indexing | 4 | ⑥ |
> | 8 | Database Security | 3 | ⑨ |
> | 9 | Advanced Topics | 4 | ⑧ |
>
> **Cách dùng (open-book):**
> 1. Ghi nhớ **§0 Quick Reference Card** (công thức + notation) và **§0bis Golden Rules** (quy tắc loại đáp án) — đây là 2 mục cứu nguy.
> 2. Học theo trọng số: **§2 (10) → §5 (9) → §6 (6) → §1 (5) → §3 (5) → §4 (4) → §7 (4) → §9 (4) → §8 (3)**.
> 3. Mỗi chương: đọc keyword EN (bôi đậm) → làm Worked example → đọc "🎯 MCQ Traps".
> 4. Đêm trước thi: ôn **§10 Câu thần chú** + **§11 "If you see X → think Y"**; in sẵn **§0 + §0bis + §11** để tra trong phòng thi.

---

## 📑 MỤC LỤC

| § | Chủ đề | Nguồn chính | Số câu |
|---|---|---|---|
| 0 | Quick Reference Card (formulas + notation) | — | tổng hợp |
| 0bis | Golden Rules giải trắc nghiệm (cross-chương) | — | 8 quy tắc |
| 1 | Database System Overview | Lecture 00 + 01 · QUIZ 1 | 5 |
| 2 | ERD & EERD | Lecture 02 + 03 · QUIZ 2,3 | 10 🔥🔥 |
| 3 | Relational Mapping | Lecture 04 · QUIZ 4 | 5 |
| 4 | Relational Algebra | Lecture 05 · QUIZ 5 | 4 |
| 5 | SQL | Lecture 06 + Advanced SQL + Exercises · QUIZ 6,7 | 9 🔥🔥 |
| 6 | Functional Dependencies & Normalization | Lecture 07 + VoTien/Normalization · QUIZ 8,9 | 6 🔥 |
| 7 | Data Storage & Indexing | Lecture 08 + Indexing + VoTien/Storage · QUIZ 10 | 4 |
| 8 | Database Security | `6_DatabaseSecurity_v2` · QUIZ 10 | 3 |
| 9 | Advanced Topics | Data Warehouse, Distributed DB, NoSQL, Neo4j, Cassandra, Data Anonymization | 4 |
| 10 | Câu thần chú trước khi vào phòng thi | — | 70+ |
| 11 | "If you see X → think Y" + Disputed answer keys | — | speed-recap |
| 12 | Mẹo làm bài MCQ (open-book) | — | 8 mẹo |
| 13 | Checklist trước khi vào phòng thi | — | ≥15 mục |
| 14 | Kết luận + chiến lược 3 ngày | — | — |

---

# §0. QUICK REFERENCE CARD

> In riêng trang này mang vào phòng thi (open-book). Mọi công thức + notation cốt lõi gom 1 chỗ.

## 0.1. Formula sheet — phải thuộc lòng

```
─── STORAGE & INDEXING ───
bfr  = ⌊B / R⌋                          (unspanned blocking factor)
b    = ⌈r / bfr⌉                        (số block lưu r record)
bfr  = ⌊(B − p) / R⌋                    (unspanned + linked, p = pointer)
b    = ⌈(r × R) / B⌉                    (spanned, continuous)
b    = ⌈(r × R) / (B − p)⌉              (spanned, non-continuous)

─── SEARCH COST (số block access) ───
Heap linear search avg          = b/2          worst = b
Ordered file binary search      = ⌈log₂ b⌉
Hashed file (no collision)      = 1
Index access (single level)     = ⌈log₂ bᵢ⌉ + 1   (+1 = data block)
Multilevel index                = L + 1            (L = số mức index)

─── INDEX ENTRY COUNTS ───
index_entry  = field_size + block_pointer
index_bfr    = ⌊B / index_entry⌋
index_blocks = ⌈#entries / index_bfr⌉
Primary index   #entries = #data blocks         (sparse; field KEY + file ordered)
Clustering index #entries = #distinct values    (file ordered theo NON-key)
Secondary (key) #entries = #records             (dense; field non-ordering)

─── RELATIONAL ALGEBRA CARDINALITY ───
|σ_c(R)| ≤ |R| ;  |π_L(R)| ≤ |R| (loại trùng) ;  |R × S| = |R|·|S|
degree(R × S) = degree(R) + degree(S)
|RA result (π)| ≤ |SQL result (no DISTINCT)|

─── DECOMPOSITION (NJB / lossless test) ───
{R1, R2} lossless ⇔  (R1 ∩ R2) → (R1 − R2) ∈ F⁺   HOẶC  (R1 ∩ R2) → (R2 − R1) ∈ F⁺
```

## 0.2. NF decision tree (BẮT BUỘC nhớ)

```
1NF:  Mọi ô có giá trị atomic (không tổ hợp, không đa trị, không nested)
       ▼
2NF:  1NF + KHÔNG có partial FD (nonprime phụ thuộc đầy đủ vào MỌI candidate key)
       Quy tắc nhanh: nếu MỌI CK chỉ 1 thuộc tính → tự động đạt 2NF
       ▼
3NF:  2NF + ∀ FD X→A non-trivial:  X là superkey  HOẶC  A là prime (không transitive qua nonprime)
       ▼
BCNF: ∀ FD X→A non-trivial:  X PHẢI là superkey  (nghiêm hơn 3NF)
       BCNF có thể MẤT dependency preservation; luôn lossless join
```

| Vi phạm từ → | Dấu hiệu |
|---|---|
| 1NF → 2NF | Có FD `Y→A`, `Y` là **tập con thực sự** của một CK, `A` nonprime (partial) |
| 2NF → 3NF | Có FD `X→A`, `X` không superkey, `A` nonprime (transitive) |
| 3NF → BCNF | Có FD `X→A`, `X` không superkey **nhưng** `A` lại là prime |

> ⚠️ **Báo dạng chuẩn THẤP nhất đạt được.** Vi phạm 2NF → dạng chuẩn cao nhất là **1NF** (kể cả khi cũng vi phạm 3NF).

## 0.3. ER notation cheatsheet

```
▭      Strong entity            ▭▭   Weak entity (double rect)
◇      Relationship             ◇◇   Identifying relationship (double diamond)
○      Attribute (oval)         ⊙    Multivalued (double oval)
◌      Derived (dashed oval)    A̲    Key (gạch chân)
═══    Total participation      ───  Partial participation
1,N,M  Cardinality ratio        (m,n) min–max (structural) notation
〔d〕  Disjoint specialization   〔o〕 Overlapping
〔U〕  Category (union type)     ──△ IS-A (subclass)
```

## 0.4. 3 loại Index — bảng vàng

| Loại index | File ordered? | Field key? | # entry | Dense/Sparse | Max/1 file |
|---|---|---|---|---|---|
| **Primary** | Yes (theo PK) | Yes (PK) | **= # block** | sparse | **1** |
| **Clustering** | Yes (theo non-key) | No | **= # distinct values** | sparse | **1** |
| **Secondary (key)** | No | Yes (CK khác) | **= # record** | **dense** | nhiều |
| **Secondary (non-key)** | No | No | bucket / dense | dense | nhiều |

> **Quy tắc vàng:** 1 file CHỈ có **1 Primary HOẶC 1 Clustering** (1 thứ tự vật lý), nhưng **nhiều Secondary**.

## 0.5. SQL logical execution order

```
FROM → ON/JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT
```

> WHERE lọc **tuple** (trước aggregate); HAVING lọc **nhóm** (sau aggregate). Cột GROUP BY không thấy alias của SELECT (SELECT chạy sau).

## 0.6. CAP Theorem (3 chọn 2)

| Chữ | Tên | Nghĩa |
|---|---|---|
| **C** | Consistency | Mọi node thấy cùng phiên bản dữ liệu mới nhất |
| **A** | Availability | Mọi request đều có response (không treo) |
| **P** | Partition tolerance | Vẫn chạy khi mạng phân vùng |

> Distributed thực tế **P bắt buộc** → chọn **CP** (MongoDB, HBase) hoặc **AP** (Cassandra, DynamoDB). **CA** chỉ có ở DB centralized.

## 0.7. ACID vs BASE

| | ACID (SQL) | BASE (NoSQL) |
|---|---|---|
| A | **Atomicity** | **Basically Available** |
| C | **Consistency** | (drop / Soft state) |
| I | **Isolation** | **Soft state** |
| D | **Durability** | **Eventually consistent** |

> ⚠️ **Bẫy kinh điển:** "**Accuracy**" KHÔNG thuộc ACID — `A = Atomicity`.

## 0.8. Magic numbers / hằng số phải thuộc

| Hằng số | Giá trị / nội dung |
|---|---|
| Block size B / Pointer p | thường 512B hoặc 4096B / 6B (block ptr), 4B (record ptr) |
| 3-schema (ANSI/SPARC) | External / Conceptual / Internal |
| Armstrong axioms | IR1 Reflexivity, IR2 Augmentation, IR3 Transitivity (+ Union, Decomposition, Pseudotransitivity) |
| 4 dạng chuẩn cơ bản | 1NF / 2NF / 3NF / BCNF (+ 4NF MVD, 5NF PJNF) |
| 4 mô hình access control | DAC / MAC / RBAC / ABAC |
| 4 loại NoSQL | Key-Value / Document / Wide-Column / Graph |
| Cardinality ratio | 1:1, 1:N, M:N · (min,max): (0,1),(1,1),(0,N),(1,N) |
| Bell-LaPadula | no read-up, no write-down → Confidentiality |

---

# §0bis. GOLDEN RULES GIẢI TRẮC NGHIỆM (áp cho MỌI chương)

> Áp dụng **cơ học** trước khi đọc đáp án. Đây là phần "cứu nguy" khi gặp câu lạ.

### 0bis.1 — Dịch đề thành điều kiện kỹ thuật TRƯỚC khi đọc đáp án
- "all projects" ≠ "at least one project"; "controlled by Research" (`Project.Dnum`) ≠ "employee belongs to Research" (`Employee.Dno`).
- FD: **đừng đoán key bằng mắt — tính closure `X⁺`**.
- Storage: xác định câu hỏi đang hỏi **record / block / index entry / index block / block access** — đây là các con số khác nhau.

### 0bis.2 — "does NOT do / không tham gia" = phép trừ tập hợp (set difference)
Mẫu: *nhân viên không làm project nào*, *khách không đăng ký*. Công thức:
```
π_X(AllObjects)  −  π_X(ObjectsThatDoTheAction)
```
Hai vế của `−` phải **union-compatible** (cùng số cột, cùng kiểu, cùng ý nghĩa cột).

### 0bis.3 — Natural join `*` chỉ nối cột **trùng tên**
Bẫy kinh điển trong schema COMPANY — các cặp cột liên quan nhưng **khác tên** ⇒ natural join trần là SAI:
```
PROJECT.Dnum ≠ DEPARTMENT.Dnumber ;  EMPLOYEE.SSN ≠ WORKS_ON.ESSN ;  WORKS_ON.Pno ≠ PROJECT.Pnumber
```
Sửa: dùng theta/equi-join có điều kiện `⋈_{Dnum=Dnumber}` hoặc `ρ`-rename cột trước.

### 0bis.4 — Đáp án quá tuyệt đối thường SAI
Nghi ngờ: *"all SQL systems cannot…"*, *"NoSQL always…"*, *"SQL never…"*, *"tất cả các đáp án còn lại"*. Trừ định nghĩa cứng, câu tuyệt đối hầu hết là bẫy.

### 0bis.5 — Bẫy "đúng khái niệm, sai chủ thể" (right concept, wrong subject)
"only managers can change" đúng là **Integrity**, nhưng nếu đáp án ghi *"Integrity for passengers"* thì sai vì sai chủ thể. Luôn hỏi: **tính chất này áp cho actor nào trong đề?**

### 0bis.6 — Bẫy least-privilege (đặc quyền tối thiểu)
Một câu lệnh đúng cú pháp nhưng cấp **quá nhiều quyền** → sai. Cấp toàn bộ `Employee` cho user chỉ cần phòng 1 = over-privileged. Đáp án security ưu tiên **least privilege**.

### 0bis.7 — Bẫy "giữ sai số dòng / bỏ mất cột"
- "tất cả nhân viên nhưng giấu lương" → phải **mask giá trị** (CASE/UNION), KHÔNG `WHERE`-lọc bỏ dòng.
- View lọc đúng dòng nhưng chỉ `SELECT SSN` là sai khi đề cần full thông tin nhân viên.

### 0bis.8 — Bẫy NULL (3-valued logic)
`= NULL` và `<> NULL` hầu như luôn sai → dùng `IS NULL` / `IS NOT NULL`. SQL là 3 trị: TRUE / FALSE / **UNKNOWN**. `CHECK (X > 1)` KHÔNG chặn NULL (vì `NULL > 1` = UNKNOWN, không phải FALSE).

---

## §1. DATABASE SYSTEM OVERVIEW — Trọng số đề: 5 câu

---

### 1.1 Data, Information, Knowledge

**Data** (dữ liệu): các sự kiện thô, chưa xử lý — ví dụ: `30`, `"Nguyễn Văn A"`, `"HCM"`.

**Information** (thông tin): dữ liệu đã được xử lý, có ngữ cảnh, mang ý nghĩa — ví dụ: *"Sinh viên Nguyễn Văn A, 30 tuổi, ở HCM"*.

**Knowledge** (tri thức): thông tin đã được diễn giải, kết hợp với kinh nghiệm để ra quyết định.

> Chuỗi: **Data → (processing/context) → Information → (interpretation/experience) → Knowledge**

🔑 **Keywords (EN):** **raw facts**, **meaningful information**, **knowledge**, **data processing**
Bẫy: Data chưa xử lý ≠ Information; Information ≠ Knowledge.

---

### 1.2 Database, DBMS và Database System

| Khái niệm | Định nghĩa ngắn | Ví dụ |
|---|---|---|
| **Database** | Tập hợp dữ liệu có liên quan, được tổ chức có cấu trúc, phản ánh một side of the real world | Tập hợp hồ sơ sinh viên của HCMUT |
| **DBMS** | Phần mềm cho phép định nghĩa, xây dựng, thao tác và chia sẻ database | Oracle, MySQL, PostgreSQL, MongoDB |
| **Database System** | Database + DBMS + Application programs + Users (textbook); một số slide dùng bản hẹp hơn: Database + DBMS software — nếu đề trích nguyên văn slide, cả hai đều được chấp nhận | Toàn bộ hệ thống quản lý sinh viên |
| **Database Application** | Chương trình tương tác với database qua DBMS | Web app tra cứu điểm |

🔑 **Keywords (EN):** **database**, **DBMS** (Database Management System), **database system**, **define, construct, manipulate, share**
Bẫy: DBMS ≠ Database; Database System bao gồm cả DBMS lẫn Database lẫn ứng dụng.

---

### 1.3 Metadata và System Catalog

**Metadata** = "data about data" — mô tả cấu trúc, kiểu dữ liệu, ràng buộc của database.

**System Catalog** (còn gọi **Data Dictionary**): nơi DBMS lưu trữ metadata. Bản thân DBMS dùng catalog để xử lý truy vấn.

Ví dụ metadata: tên bảng `STUDENT`, tên cột `StudentID INT PRIMARY KEY`, ràng buộc `NOT NULL`.

🔑 **Keywords (EN):** **metadata**, **system catalog**, **data dictionary**, **self-describing nature of a database system**
Bẫy: Metadata lưu trong system catalog, không phải trong data files thông thường.

---

### 1.4 Schema vs State (Snapshot / Instance)

| | Schema | State / Instance / Snapshot |
|---|---|---|
| **Là gì?** | Mô tả cấu trúc database (tên bảng, cột, kiểu, ràng buộc) | Dữ liệu thực tế tại một thời điểm |
| **Thay đổi?** | Hiếm thay đổi (DDL) | Thay đổi liên tục (DML) |
| **Còn gọi** | Intension, database schema | Extension, database state, snapshot, instance |
| **Ví dụ** | `STUDENT(ID, Name, GPA)` | 500 dòng trong bảng STUDENT vào ngày 01/06/2026 |

**Schema Diagram** = a displayed schema — biểu diễn trực quan của schema (ví dụ: sơ đồ ER, bảng cột trong công cụ thiết kế).

🔑 **Keywords (EN):** **schema (intension)**, **database state / instance / snapshot (extension)**, **schema evolution**, **schema diagram**
Bẫy: *Instance* (một occurrence cụ thể) ≠ *Schema*; Schema thay đổi qua **schema evolution** (hiếm), còn state thay đổi mỗi khi có insert/update/delete.

---

### 1.5 File-Processing System — Vấn đề và Khi nào vẫn dùng

**Vấn đề của file-processing approach:**
- **Data redundancy & inconsistency**: dữ liệu trùng lặp ở nhiều file.
- **Data isolation**: dữ liệu phân tán, khó truy cập tổng hợp.
- **Integrity problems**: khó ràng buộc nhất quán.
- **Atomicity problems**: không đảm bảo giao dịch toàn vẹn.
- **Concurrent-access anomalies**: nhiều user cùng ghi gây lỗi.
- **Security problems**: khó kiểm soát truy cập chi tiết.

**Shared File Approach** — bước trung gian giữa file-processing và full database: file/dữ liệu được **chia sẻ** giữa nhiều ứng dụng, giúp giảm redundancy và inconsistency. Tuy nhiên, phát sinh 3 vấn đề mới:
- **Rigid data structure**: cấu trúc dữ liệu không uyển chuyển, khó thay đổi schema.
- **Physical data dependency**: ứng dụng phụ thuộc vào cách dữ liệu được lưu trữ vật lý.
- **No concurrency control support**: không có cơ chế kiểm soát truy cập đồng thời.

**Khi nào file-processing vẫn chấp nhận được?**
- Ứng dụng đơn giản, dữ liệu ít, chỉ một người dùng.
- Không cần truy vấn phức tạp hay chia sẻ đồng thời.
- Overhead của DBMS vượt lợi ích (embedded systems, log files đơn giản).

🔑 **Keywords (EN):** **data redundancy**, **data inconsistency**, **data isolation**, **integrity constraint**, **atomicity**, **concurrent access**, **security**, **shared file approach**, **rigid data structure**, **physical data dependency**

---

### 1.6 Database Approach — Lợi ích so với File Processing

| Lợi ích | Giải thích |
|---|---|
| **Self-describing** | Metadata lưu trong catalog, hệ thống tự mô tả |
| **Insulation between programs and data** | Program-data independence |
| **Data abstraction** | Ẩn chi tiết lưu trữ, cung cấp conceptual view; bao gồm cả **program-data independence** và **program-operation independence** |
| **Multiple views** | Mỗi user thấy một view phù hợp |
| **Sharing & multiuser transaction processing** | Concurrency control, ACID transactions |
| **Enforcing integrity constraints** | DBMS kiểm tra tự động |
| **Backup & recovery** | DBMS cung cấp cơ chế phục hồi |
| **Reduced development time** | Không phải viết lại I/O code |
| **Up-to-date data sharing** | Trạng thái real-time luôn được cập nhật và chia sẻ đồng thời giữa nhiều user (ví dụ: thông báo chỗ ngồi còn trống) |

🔑 **Keywords (EN):** **program-data independence**, **program-operation independence**, **data abstraction**, **multiple views of data**, **multiuser transaction processing**, **backup and recovery**, **up-to-date with data sharing**
Bẫy: Khi đề mô tả tình huống "nhiều user chia sẻ trạng thái real-time luôn cập nhật" → chọn **"up-to-date with data sharing"**, KHÔNG phải "multiple views".

---

### 1.7 3-Schema Architecture (ANSI/SPARC)

```
┌─────────────────────────────────────┐
│   EXTERNAL LEVEL (External Schemas) │  ← Views cho từng user/group
├─────────────────────────────────────┤
│   CONCEPTUAL LEVEL (Conceptual      │  ← Cấu trúc logic toàn bộ DB
│          Schema)                    │     (entities, relationships, constraints)
├─────────────────────────────────────┤
│   INTERNAL LEVEL (Internal Schema)  │  ← Cách lưu trữ vật lý
│                                     │     (indexes, file org, storage)
└─────────────────────────────────────┘
```

- **External schema** (= *subschema* = **view level**): mỗi user group thấy một phần/biến thể của DB. "External level" và "View level" là hai thuật ngữ tương đương.
- **Conceptual schema**: mô tả TOÀN BỘ cấu trúc logic, ẩn chi tiết lưu trữ.
- **Internal schema**: mô tả physical storage — file tổ chức thế nào, index nào tồn tại.

**Logical Data Independence**: có thể thay đổi conceptual schema mà không phải sửa external schemas (khó thực hiện hơn).

**Physical Data Independence**: có thể thay đổi internal schema (cách lưu, index) mà không phải sửa conceptual schema (dễ thực hiện hơn, DBMS hiện đại hỗ trợ tốt).

🔑 **Keywords (EN):** **3-schema architecture**, **external / conceptual / internal schema**, **view level**, **logical data independence**, **physical data independence**, **ANSI/SPARC**
Bẫy: Physical independence = thay đổi **internal** không ảnh hưởng **conceptual**. Logical independence = thay đổi **conceptual** không ảnh hưởng **external**. Logical independence **khó đạt** hơn physical. **External level = View level** — hai tên cùng một tầng.

---

### 1.8 DDL, DML, DCL, TCL

| Loại | Tên đầy đủ | Mục đích | Ví dụ lệnh |
|---|---|---|---|
| **DDL** | Data Definition Language | Định nghĩa schema, cấu trúc | `CREATE`, `ALTER`, `DROP` |
| **DML** | Data Manipulation Language | Thao tác dữ liệu | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |
| **DCL** | Data Control Language | Phân quyền truy cập | `GRANT`, `REVOKE` |
| **TCL** | Transaction Control Language | Quản lý giao dịch | `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

- **Procedural DML**: người dùng chỉ định **how** (cách lấy) — ví dụ: relational algebra.
- **Non-procedural DML** (declarative): người dùng chỉ định **what** (cần gì) — ví dụ: SQL `SELECT`.
- **4GL (Fourth-Generation Language)**: ngôn ngữ non-procedural thế hệ 4 — bao gồm SQL, QBE (Query By Example), application generators, report generators.

🔑 **Keywords (EN):** **DDL**, **DML**, **DCL**, **TCL**, **procedural vs non-procedural (declarative) DML**, **high-level / low-level DML**, **4GL**, **QBE**
Bẫy: **Không phải mọi DML đều non-procedural** — relational algebra là procedural DML. SQL là non-procedural. Đề hay hỏi "SQL thuộc loại nào?" → **Non-procedural / declarative DML**.

---

### 1.9 Database Design Process

```
Requirements Collection & Analysis
          ↓
  Conceptual Design  ←── DBMS-INDEPENDENT (dùng ER/EER model)
          ↓
    Logical Design   ←── DBMS-INDEPENDENT (mapping → relational schema)
          ↓             (một số tài liệu coi bước này cũng DBMS-independent)
   Physical Design   ←── DBMS-DEPENDENT (chọn index, file org, storage params)
          ↓
     Implementation
```

- **Conceptual Design**: tạo **conceptual schema** bằng **high-level data model** (ER diagram). **DBMS-independent**.
- **Logical Design** (= data model mapping): chuyển sang mô hình DBMS muốn dùng (relational). Thường vẫn DBMS-independent với mức relational.
- **Physical Design**: xác định cấu trúc lưu trữ, index, partitioning. **DBMS-dependent**.

🔑 **Keywords (EN):** **requirements analysis**, **conceptual design**, **logical design**, **physical design**, **DBMS-independent**, **high-level data model**, **ER model**
Bẫy: Conceptual design là DBMS-independent — chưa cần biết dùng Oracle hay MySQL. Physical design mới phụ thuộc DBMS.

---

### 1.10 Data Models — Phân loại

| Loại | Đặc điểm | Ví dụ | Level ánh xạ |
|---|---|---|---|
| **High-level / Conceptual data models** | Gần cách con người nghĩ, dùng trong thiết kế | ER model, EER model, UML | Conceptual + External level |
| **Representational / Implementation / Record-based data models** | Dùng trong DBMS thực tế; cấu trúc dạng records | Relational, Network, Hierarchical | Conceptual + some physical |
| **Low-level / Physical data models** | Mô tả dữ liệu lưu trên disk | Record formats, storage structures | Internal level |
| **Object-based data models** | Tích hợp OOP | Object-oriented, Object-relational | Conceptual + External level |
| **Self-describing data models** | Schema + data cùng chỗ | XML, JSON, NoSQL (key-value, document) | — |

**Lịch sử 3 thế hệ DBMS:**
- **1st generation**: Hierarchical model & Network model.
- **2nd generation**: **Relational model** (SQL-based DBMS).
- **3rd generation**: Object-relational & Object-oriented DBMS.

🔑 **Keywords (EN):** **conceptual / high-level data model**, **representational / implementation / record-based data model**, **low-level / physical data model**, **ER model**, **relational model**, **object-based**, **self-describing**, **1st / 2nd / 3rd generation DBMS**
Bẫy: "Relational model thuộc thế hệ mấy?" → **2nd generation**. Tên đầy đủ đúng của nhóm Relational/Network/Hierarchical là **record-based** (không chỉ "representational").

---

### 1.11 Data Model Terminology (ER vs Relational)

| Khái niệm | ER Model | Relational Model |
|---|---|---|
| Tập đối tượng | Entity type | Relation (table) |
| Một đối tượng cụ thể | Entity instance | Tuple (row) |
| Thuộc tính | Attribute | Attribute (column) |
| Kiểu thuộc tính | Domain | Domain |
| Liên kết | Relationship type | Foreign key / join |

🔑 **Keywords (EN):** **entity**, **attribute**, **relationship**, **tuple**, **relation**, **domain**, **entity type vs entity instance**

---

### 1.12 DBA, Database Designer và Các Vai Trò Trong DB Environment

| Vai trò | Trách nhiệm chính |
|---|---|
| **DBA** (Database Administrator) | Cài đặt/cấu hình DBMS; cấp quyền; monitor hiệu năng; backup & recovery; security policy |
| **Database Designer** | Xác định data (entities, attributes, relationships); thiết kế schema conceptual + logical; **phân tích nhu cầu lưu trữ dữ liệu** (storage-requirements analysis) |
| **Application Programmers** | Viết và bảo trì các chương trình ứng dụng tương tác với database qua DBMS |
| **End Users** | Người dùng cuối — truy cập và sử dụng database thông qua application hoặc trực tiếp |

- DBA chịu trách nhiệm **toàn bộ hệ thống** sau khi deploy.
- Database Designer làm việc chủ yếu trong **giai đoạn thiết kế** (trước khi deploy).
- **Storage-requirements analysis** là nhiệm vụ của Database Designer / requirements analyst, **không phải** DBA.

🔑 **Keywords (EN):** **DBA**, **database designer**, **application programmers**, **end users**, **authorization**, **performance tuning**, **schema design**, **storage requirements analysis**
Bẫy: "Phân tích nhu cầu lưu trữ dữ liệu" → **Database Designer**, không phải DBA. Có 4 vai trò chính trong DB environment, không chỉ 2.

---

### 1.13 DBMS Components

Các thành phần chính của một DBMS:

1. **DDL Compiler** — biên dịch DDL statements, cập nhật system catalog.
2. **Query Compiler / Optimizer** — parse và tối ưu hóa truy vấn.
3. **Runtime Database Processor** — thực thi truy vấn tối ưu, xử lý DML.
4. **Transaction Manager** — concurrency control + recovery.
5. **Storage Manager / Buffer Manager** — quản lý I/O giữa disk và memory.
6. **System Catalog / Data Dictionary** — lưu metadata.

🔑 **Keywords (EN):** **query compiler**, **query optimizer**, **runtime database processor**, **transaction manager**, **storage manager**, **buffer manager**, **system catalog**

---

### 1.14 Controlled-Access Subsystems (5 loại) và Data Management Framework

DBMS cung cấp controlled access qua các subsystem:

| Subsystem | Chức năng |
|---|---|
| **Security subsystem** | Kiểm soát ai được đọc/ghi gì (authentication + authorization) |
| **Integrity subsystem** | Kiểm tra integrity constraints khi cập nhật |
| **Concurrency control subsystem** | Đảm bảo nhất quán khi nhiều user truy cập đồng thời |
| **Recovery subsystem** | Khôi phục database sau sự cố |
| **Catalog / Data Dictionary subsystem** | Lưu và cung cấp truy cập metadata |

**Data Management Systems Framework — 3 tầng:**

| Tầng | Nội dung |
|---|---|
| **Tầng 1 — DB Technologies** | DB Systems, Distributed DB |
| **Tầng 2 — Interoperability & Migration** | Heterogeneous DB, Client/Server, Multimedia, Legacy systems |
| **Tầng 3 — Information Extraction & Sharing** | Data Warehousing, Data Mining, Internet DB |

🔑 **Keywords (EN):** **security**, **integrity**, **concurrency control**, **backup and recovery**, **data dictionary / catalog**, **data warehousing**, **data mining**, **heterogeneous DB**, **distributed DB**
Bẫy: Đề hay hỏi "DBMS provides controlled access through which subsystems?" — liệt kê đủ 5.

---

### 1.15 Worked Example — Câu hỏi thực từ QUIZ/MCQ

**Câu hỏi (QUIZ 1 style):** Phát biểu nào sau đây MÔ TẢ ĐÚNG về sự khác nhau giữa Schema và State của một database?

A. Schema là dữ liệu thực tế; State là cấu trúc của database.
B. Schema mô tả cấu trúc database (ít thay đổi); State là dữ liệu thực tế tại một thời điểm (thay đổi thường xuyên).
C. Schema và State đều thay đổi mỗi khi có INSERT.
D. State được lưu trong System Catalog.

**Phân tích từng bước:**
1. Schema = structure description (intension) → hiếm thay đổi, chỉ thay đổi qua DDL.
2. State/Instance/Snapshot = actual data (extension) → thay đổi mỗi khi có DML.
3. System Catalog lưu **schema** (metadata), không lưu state.
4. → Đáp án: **B**.

Bẫy: Nhiều bạn nhầm "instance" = một bản cài đặt DBMS; ở đây "instance" = một database state tại thời điểm cụ thể.

---

### 1.16 Worked Example — 3-Schema và Data Independence

**Câu hỏi (MCQ-01 style):** Thêm một cột vào bảng STUDENT ở conceptual schema mà không làm ảnh hưởng đến các view (external schemas) hiện có — đây là ví dụ về loại independence nào?

**Phân tích:**
1. Thay đổi xảy ra ở **conceptual level**.
2. External schemas **không bị ảnh hưởng**.
3. Conceptual → External = **Logical Data Independence**.
4. → Đáp án: **Logical Data Independence**.

Bẫy: Nếu thay đổi là ở internal schema (thêm index) mà conceptual không đổi → **Physical Data Independence**.

---

### 🎯 MCQ Traps §1

1. 🔥 **"Database System" ≠ DBMS** — Database System = Database + DBMS + Applications + Users.
2. 🔥 **SQL là non-procedural DML** — không phải mọi DML đều non-procedural (relational algebra = procedural).
3. 🔥 **Physical data independence dễ đạt hơn Logical** — đề thường hỏi cái nào "harder to achieve" → Logical.
4. 🔥 **Conceptual design là DBMS-independent** — Physical design mới phụ thuộc DBMS cụ thể.
5. 🔥 **Metadata lưu trong System Catalog**, không phải trong data files.
6. **Schema = intension (structure)** / **State = extension (data)** — "instance" = một state cụ thể, không phải bản cài DBMS.
7. **File-processing approach vẫn OK** khi ứng dụng đơn giản, single-user, không cần chia sẻ hay truy vấn phức tạp — đề hay hỏi "khi nào file-processing là lựa chọn hợp lý?"
8. **External schema = subschema = view level** — cùng một khái niệm, ba tên khác nhau.
9. **DDL** định nghĩa schema; **DML** thao tác data — `CREATE TABLE` là DDL, `INSERT` là DML.
10. 🔥 **3-schema architecture mục đích chính**: đạt **data independence** (cả logical lẫn physical), cho phép **multiple views**, ẩn chi tiết lưu trữ khỏi người dùng.
11. 🔥 **"Up-to-date with data sharing"** là benefit riêng biệt — khi đề mô tả nhiều user chia sẻ trạng thái real-time luôn cập nhật (vd: chỗ ngồi còn trống) → chọn benefit này, KHÔNG phải "multiple views".
12. 🔥 **"Phân tích nhu cầu lưu trữ" → Database Designer**, không phải DBA — DBA quản lý hệ thống sau deploy, Designer phân tích và thiết kế trước deploy.
13. **Shared File Approach**: giảm redundancy nhưng PHÁT SINH `rigid data structure` + `physical data dependency` + `no concurrency control` — đề hỏi "problem cần giải quyết" → chọn một trong 3 này.
14. **Relational model = 2nd generation DBMS** — 1st gen: Hierarchical & Network; 3rd gen: Object-relational & OO.
15. **DB environment có 4 vai trò**: DBA, Database Designer, Application Programmers, End Users — không chỉ 2.

---

### 🪄 Câu thần chú §1

- 🔥 *"Database System = DB + DBMS + App + Users — không phải chỉ DBMS."*
- 🔥 *"Schema = bản vẽ, State = ngôi nhà thực tế đang xây."*
- 🔥 *"3-schema: External (ai thấy gì) → Conceptual (có gì) → Internal (lưu thế nào)."*
- 🔥 *"Physical independence: đổi cách lưu → conceptual không đổi. Logical independence: đổi conceptual → external không đổi. Logical khó hơn."*
- *"Conceptual design không cần biết DBMS. Physical design mới cần."*
- *"Metadata = data về data → lưu trong System Catalog (Data Dictionary)."*
- 🔥 *"SQL = non-procedural (what). Relational algebra = procedural (how)."*
- *"File-processing OK khi: đơn giản, single-user, không chia sẻ, không truy vấn phức tạp."*
- *"DBMS controlled access = Security + Integrity + Concurrency + Recovery + Catalog."*
- 🔥 *"DBA giữ hệ thống sống; Designer tạo ra schema — hai vai trò khác nhau."*
- *"Shared File: chia sẻ tốt hơn file riêng, nhưng rigid structure + physical dependency + no concurrency control."*
- *"Relational = 2nd gen. 1st = Hierarchical/Network. 3rd = Object-relational/OO."*
- 🔥 *"External level = View level — hai tên, một tầng."*
- 🔥 *"Real-time shared state → 'up-to-date with data sharing', không phải 'multiple views'."*
- *"Data abstraction = program-data independence + program-operation independence."*

---

## §2. ERD & EERD — Trọng số đề: 10 câu 🔥🔥

> Nguồn: `Lectures/02_ER Model.pdf` · `Lectures/03_EER Model.pdf` · `Tutorial/DB-Chapter2.md` · `DB-Chapter3.md`
> Tập trung: Fan/Chasm trap · Weak entity · Cardinality vs Participation (trục độc lập) · Shared subclass vs Category · 4 tổ hợp Specialization · Attribute types · Recursive · Counting rule |Sup|=|Sub1|+|Sub2|

---

### 2.1 Quy trình thiết kế CSDL (Database Design Process) — 5 phases

| Phase | Output | DBMS? |
|---|---|---|
| **Requirements collection & analysis** | Data requirements + Functional requirements | — |
| **Conceptual design** | **Conceptual schema = ERD/EERD** | **DBMS-independent** |
| **Choice of DBMS** | Chọn DBMS phù hợp | — |
| **Logical design** ("data model mapping") | Database schema (relational tables…) | **DBMS-specific** |
| **Physical design** | Storage structures, file org, **indexes, access paths** | DBMS-specific |

🔑 **Keywords (EN):** **conceptual database design**, **DBMS-independent**, **high-level data model**, **data model mapping**, **storage structures and access paths** (= physical, NOT conceptual).

> 🔥 **MCQ Trap:** "Xác định storage structures and access paths" → **Physical design**, KHÔNG phải Conceptual. Thứ tự chuẩn: Requirements → Conceptual → **Choice of DBMS** → Logical → Physical. "Choice of DBMS" phải **sau** Conceptual (vì Conceptual là DBMS-independent) và **trước** Logical. *(QUIZ 2 Q1, Q3 — 100%)*

> 🔥 **MCQ Trap:** **Functional design (phân tích chức năng phần mềm) và DB structural design (thiết kế cấu trúc CSDL) chạy SONG SONG và ĐỘC LẬP nhau** — đáp án "parallel + independent", KHÔNG phải "parallel + related". *(HK211mock Q12)*

---

### 2.2 Entity / Entity Type / Entity Set

```
Entity      = đối tượng cụ thể, tồn tại độc lập (John Smith, Research Dept)
Entity Type = lớp/template (EMPLOYEE, DEPARTMENT)
Entity Set  = tập tất cả instance của entity type tại một thời điểm
```

🔑 **Keywords (EN):** **entity**, **entity type**, **entity set**, **independent existence**.

Khi nào nên mô hình là entity (không phải attribute)? → Khi đối tượng: tồn tại độc lập, có nhiều thuộc tính, nhiều instance, tham gia nhiều relationship, được tham chiếu bởi entity khác.

> 🔥 **MCQ Trap:** Danh từ KHÔNG tự động là entity — nếu chỉ là property đơn giản của entity khác thì nên là attribute.

---

### 2.3 Attribute — 5 loại + Complex + Value Set

| Loại | Ký hiệu ERD | Ví dụ | Đặc điểm |
|---|---|---|---|
| **Simple / Atomic** | Oval thường | `Ssn`, `Sex` | Không chia nhỏ trong phạm vi bài |
| **Composite** | Oval cha + oval con | `Name{Fname, Minit, Lname}` | Chia thành component; equivalent với từng atomic riêng |
| **Multivalued** | Oval **viền đôi** | `[[Phones]]`, `[[Locations]]` | Một entity có nhiều giá trị |
| **Derived** | Oval **viền đứt** | `(Age)` từ `Bdate`, `(CloseDate)` | Tính được, thường **không lưu** trong DB |
| **Complex** | Composite + multivalued | `{Phone(Country, Number)}` | Vừa có cấu trúc, vừa nhiều giá trị |

**Value set (= domain)** = tập giá trị hợp lệ của attribute. Không phải chỉ các giá trị đang có trong data.

🔑 **Keywords (EN):** **simple**, **composite**, **multivalued** (double oval), **derived** (dashed oval), **complex**, **value set**, **stored attribute** (attribute lưu thật sự, đối nghĩa với derived).

Từ khóa nhận diện trong đề:
- Multivalued: *"one or many …", "multiple …", "list of …", "several …"*
- Derived: *"determined from", "computed from", "calculated by", "based on details"*

> 🔥 **MCQ Traps:**
> - **Derived KHÔNG lưu** trong DB. *(QUIZ 2 Q4 — CloseDate = derived)*
> - **Multivalued ≠ Composite**: oval đôi ≠ oval cha-con.
> - **Composite ≡ hai atomic riêng biệt** về mặt semantics (equivalence — QUIZ 2 Q9).
> - "list of conditions", "list of privileges" → **multivalued**. *(QUIZ 2 Q8)*

---

### 2.4 Key Attribute

```
Key attribute = attribute (hoặc tập attribute) định danh duy nhất entity trong entity set.
Candidate keys: có thể nhiều. ERD underline TẤT CẢ candidate keys (không chỉ PK).
```

| Candidate | OK? | Lý do |
|---|---|---|
| SSN | ✅ | Unique nationwide |
| Full name | ❌ | Nhiều người trùng tên |
| Phone numbers | ❌ | Multivalued, không stable |
| Transaction number per branch | ❌ | Chỉ unique cục bộ trong branch |

🔑 **Keywords (EN):** **key attribute**, **candidate key**, **uniqueness constraint**, **unique over the full modeling scope**.

> 🔥 **MCQ Trap:** Underline **TẤT CẢ** candidate keys trong ERD, không chỉ 1. *(H202 Q33)* — Ví dụ DEPARTMENT có cả `Name` và `Number` đều là key. *(QUIZ 2 Q10)*

---

### 2.5 Relationship Type / Instance / Degree / Recursive

```
Relationship Type    = WORKS_FOR (liên kết giữa EMPLOYEE và DEPARTMENT)
Relationship Instance = "John Smith works_for Research Dept" = 1 record cụ thể
Degree              = số entity type tham gia
```

| Degree | Tên | Ví dụ |
|---|---|---|
| 1 | **Unary / Recursive** | EMPLOYEE supervises EMPLOYEE |
| 2 | **Binary** | EMPLOYEE works_for DEPARTMENT |
| 3 | **Ternary** | Customer submits LoanApplication at Branch |
| n | n-ary | — |

🔑 **Keywords (EN):** **relationship type**, **relationship instance**, **degree**, **binary**, **ternary**, **recursive (unary) relationship**, **role names**.

> 🔥 **MCQ Traps:**
> - **Degree = số entity type tham gia**, KHÔNG phải số attribute của relationship. *(H211 Q53)*
> - **Recursive relationship BẮT BUỘC có role names** (Supervisor / Subordinate). *(H211)*
> - **Ternary KHÔNG luôn thay được bằng 3 binary** — tách có thể mất thông tin. *(H202 Q40)*
> - **Cùng 2 entity type có thể có ≥ 2 relationship type** (WORKS_FOR vs MANAGES). *(Slides)*
> - **≥ 2 relationship type có thể tồn tại giữa CÙNG cặp entity** → không bị cấm.

**Đọc cardinality chuỗi 3 entity:** Với ERD chuỗi nhiều entity (ví dụ: Curriculum — Grade — Subject), đọc cardinality **từng cạnh riêng biệt** (ví dụ: Curriculum 1:N Grade, Grade N:1 Subject → chuỗi N:N:1). Không rút gọn hay ghép tắt.

**Relationship Attribute:** Attribute thuộc về relationship khi **chỉ có nghĩa cho cặp (A, B)**, không thuộc riêng A hay B.

| Relationship | Attribute | Vì sao đặt trên hình thoi |
|---|---|---|
| `WORKS_ON(EMP, PROJ)` | `Hours` | Số giờ phụ thuộc cặp emp-proj |
| `MANAGES(EMP, DEPT)` | `Start_date` | Ngày bắt đầu quản lý thuộc association |
| `complains_to(Cust, Branch)` | `Content`, `Timestamp` | Nội dung/thời điểm thuộc lần complain *(QUIZ 2 Q7)* |
| `gains(Cust, CreditType)` | `Timestamp` | Thời điểm khách được cấp credit type *(QUIZ 2 Q8)* |

---

### 2.6 Cardinality Ratio vs Participation Constraint — HAI TRỤC ĐỘC LẬP

> ⚠️ Cardinality và Participation là **hai khái niệm hoàn toàn độc lập** — đừng nhầm.

| Tiêu chí | **Cardinality Ratio** | **Participation Constraint** |
|---|---|---|
| Trả lời | Một instance liên hệ với tối đa **bao nhiêu** instance phía kia? | Tham gia relationship có **bắt buộc** không? |
| Dạng | `1:1`, `1:N`, `M:N` | **Total** (phải) / **Partial** (tuỳ chọn) |
| Ký hiệu | Số/chữ trên đường | Total = **đường đôi** (═══); Partial = đường đơn |
| Từ khóa đề | "one", "many", "at most one", "several" | "must", "at least one" (total) / "may", "optional", "some have none" (partial) |
| Nhãn slide | — | **Mandatory** (= total) / **Optional** (= partial) |

🔑 **Keywords (EN):** **cardinality ratio** (1:1 / 1:N / M:N), **participation constraint**, **total participation** (double line, existence-dependent), **partial participation** (single line), **membership class**, **mandatory** (= total), **optional** (= partial).

> 🔥 **MCQ Trap kinh điển:** "1:N" KHÔNG nói tham gia có bắt buộc hay không — chúng độc lập. "Some excellent branches have no complaint" → **partial participation** của Branch. *(QUIZ 2 Q7)*

**Relationship attribute migrate khi nào?**

| Cardinality | Migrate attribute sang bên nào? |
|---|---|
| **1:1** | Một trong 2 bên đều được |
| **1:N** | **CHỈ phía N** (mỗi N instance gắn 1 entity phía 1) |
| **M:N** | **KHÔNG migrate** — attribute phụ thuộc *từng cặp* (Hours BẮT BUỘC trên WORKS_ON) |

---

### 2.7 Min-Max Notation (Structural Constraint)

> **Lưu ý thuật ngữ:** "Structural constraint" bao gồm **cả cardinality ratio lẫn participation** — không chỉ riêng min-max. Min-max notation là cách ký hiệu gộp cả hai vào một cặp `(min, max)`.

Dạng `(min, max)` — **thay thế hoàn toàn** cả cardinality ratio lẫn participation ký hiệu đường đôi/đơn.

| Notation | Nghĩa | Participation |
|---|---|---|
| `(0, 1)` | tuỳ chọn, tối đa 1 | Partial |
| `(1, 1)` | bắt buộc đúng 1 | Total |
| `(0, N)` | tuỳ chọn, nhiều | Partial |
| `(1, N)` | bắt buộc ít nhất 1, nhiều | Total |
| `(4, N)` | bắt buộc ít nhất 4 | Total |

Ràng buộc toán học: `0 ≤ min ≤ max`, `max ≥ 1`.

🔑 **Keywords (EN):** **min-max notation**, **structural constraint**, `(min, max)` constraint.

**Ví dụ chuẩn:** `EMPLOYEE (1,1) — WORKS_FOR — (4,N) DEPARTMENT` → mỗi employee thuộc đúng 1 dept; mỗi dept có ít nhất 4 employees.

---

### 2.8 Weak Entity — Định nghĩa chính xác

**Weak entity** = entity type **KHÔNG có key attribute của riêng nó** (no key attribute of its own), định danh nhờ:

1. **Identifying owner** entity (entity mạnh) + **Identifying relationship** (◇◇, double diamond)
2. **Partial key** (gạch chân **đứt**) — unique trong phạm vi owner
3. **Full key = {owner\_PK, partial\_key}**

| Thành phần | Ký hiệu ERD |
|---|---|
| Weak entity | Rectangle **đôi** |
| Identifying relationship | Diamond **đôi** (◇◇) |
| Partial key | Gạch chân **đứt** |
| Participation phía weak | **LUÔN total** (double line) |

🔑 **Keywords (EN):** **weak entity type**, **no key attribute of its own**, **partial key**, **identifying relationship**, **identifying owner**, **total participation**, **existence-dependent**.

> 🔥 **MCQ Traps:**
> - Weak entity **LUÔN total** phía weak trong identifying relationship. *(H211 Q3)*
> - Weak entity có thể có **nhiều owner** (identifying relationship degree > 2). *(H192 Q31)*
> - **Partial key một mình KHÔNG phải PK** — phải kết hợp với owner\_PK.
> - Mapping: FK nên có `ON DELETE CASCADE`.

**Ví dụ COMPANY:** DEPENDENT là weak; owner = EMPLOYEE; identifying = DEPENDENTS\_OF (◇◇); partial key = `Dependent_name`; PK = `(Essn, Dependent_name)`.

**Ví dụ QUIZ 3 Q7 (Contract):** CONTRACT là weak entity (double rectangle), identified bởi ternary "has" relationship với STAR và STUDIO; CONTRACT M:N "is used for" MOVIE. *(QUIZ 3 Q7)*

**Ví dụ QUIZ 3 Q11 (Bank Branch):** BANK `(1)—◇◇ has—(N)` BRANCH — BRANCH là weak entity; `Number` và `Name` đều là **partial keys** (dashed underline) trong phạm vi BANK. *(QUIZ 3 Q11)*

---

### 2.9 COMPANY Database — Ví dụ chuẩn phải thuộc

**4 entity chính:**

| Entity | Loại | Key |
|---|---|---|
| **EMPLOYEE** | Strong | `Ssn` |
| **DEPARTMENT** | Strong | `Name` (CK), `Number` (CK) |
| **PROJECT** | Strong | `Name` (CK), `Number` (CK) |
| **DEPENDENT** | **Weak** | `(Essn, Dependent_name)` |

**6 relationship chính:**

| Relationship | Giữa | Cardinality | Participation | Attribute |
|---|---|---|---|---|
| **WORKS\_FOR** | EMP — DEPT | N:1 | EMP total, DEPT partial | — |
| **MANAGES** | EMP — DEPT | 1:1 | EMP partial, DEPT total | `Start_date` |
| **CONTROLS** | DEPT — PROJ | 1:N | DEPT partial, PROJ **total** | — |
| **WORKS\_ON** | EMP — PROJ | M:N | Total cả 2 | `Hours` |
| **SUPERVISION** | EMP — EMP (recursive) | 1:N | Partial cả 2 | roles: Supervisor/Subordinate |
| **DEPENDENTS\_OF** | EMP — DEPENDENT | 1:N (identifying) | DEPENDENT total | — |

> 🔥 `Hours` BẮT BUỘC nằm trên WORKS\_ON (M:N) — không migrate sang EMP hay PROJECT.

---

### 2.10 Connection Traps — ĐỀ NÀO CŨNG CÓ

| Trap | Bản chất | Dấu hiệu nhận biết | Ví dụ | Cách sửa |
|---|---|---|---|---|
| **Fan trap** | Pathway qua entity trung tâm **mơ hồ** | ≥ 2 relationship **1:N** tỏa quạt từ 1 entity (1:N + 1:N từ cùng hub) | BRANCH→1:N→STAFF, BRANCH→1:N→PROPERTY → "Staff nào phụ trách Property nào?" = mơ hồ | Thêm relationship trực tiếp `STAFF OVERSEES PROPERTY` |
| **Chasm trap** | Pathway **bị đứt** do partial participation | Có pathway nhưng ≥ 1 participation = partial ở giữa → tuple không match | BRANCH→1:N→STAFF, STAFF→**0:N**→PROPERTY → Property chưa assign = không tìm được Branch | Thêm relationship `PROPERTY LOCATED_AT BRANCH` hoặc đổi participation |

🔑 **Keywords (EN):** **fan trap** (ambiguous pathway), **chasm trap** (broken pathway, partial/optional participation).

**Ví dụ điển hình — QUIZ 3 Q19 (Chasm trap):**
```
BRANCH (Code,Name) ─M─ joins ─N─ PROJECT ─M─ is supported by ─N─ INVESTOR
```
Câu hỏi: "Có tìm được Branch của Investor không?"
→ **KHÔNG** — đây là **chasm trap**: một investor có thể chưa tham gia "is supported by" → không nối được về Branch.
Đáp án: **b** (chasm trap, không phải fan trap). *(QUIZ 3 Q19 — xác nhận 100%)*

**Phân biệt Fan vs Chasm:**
- **Fan** = ambiguity (đường đi không rõ đi theo nhánh nào).
- **Chasm** = no path (đường đi bị đứt hoàn toàn).

**Phân biệt Fan trap 1:N+1:N vs M:N+1:N:**

> Fan trap định nghĩa **chính xác**: chỉ xảy ra khi cùng 1 entity là **hub của ≥ 2 nhánh 1:N** toả ra. Trường hợp **M:N + 1:N** (ví dụ: DesignStudio —M:N— Model —1:N— Product; hoặc Branch —M:N— Book —1:N— BookCopy) thì **không phải fan trap thuần** — đường đi vẫn có thể mơ hồ nhưng cơ chế khác (thiếu relationship trực tiếp). Cách giải quyết tương tự: thêm quan hệ trực tiếp hoặc restructure ERD. *(HK191 Q4, F2024 Q36)*

---

### 2.11 Đọc miniworld để vẽ ERD — Từ khóa ánh xạ

| Từ trong đề | Quy ra ERD |
|---|---|
| Danh từ chính | **Entity** |
| Tính chất / mô tả | **Attribute** |
| Động từ / liên hệ | **Relationship** |
| unique / identifier / code / SSN / number | **Key attribute** |
| must / at least one | **Total participation** |
| may / can / optional / some have none | **Partial participation** |
| one or many / multiple / list of / several | **Multivalued attribute** |
| computed / determined from / derived from / based on | **Derived attribute** |
| uniquely in each X / numbered within X | **Partial key** (→ Weak entity) |

---

### 2.12 Semantic Constraints — Không vẽ được trong ERD

**Semantic constraints** = ràng buộc **KHÔNG biểu diễn trực tiếp được trong ERD**; phải enforce bằng **trigger / application program / CHECK constraint / assertion**.

Ví dụ: `Age > 18`, `Manager salary > employee salary cùng phòng`, `Salary tăng ≤ 20%`.

**Ràng buộc thời gian (time-based constraint):** Ràng buộc kiểu "sau N ngày tự đổi trạng thái" KHÔNG enforce được bằng trigger (trigger chỉ chạy theo DML event, không theo thời gian trôi qua), không enforce được bằng CHECK hay app validation thụ động → cần **tiến trình định thời (scheduled job / cron job)**. *(HK191 Q10)*

🔑 **Keywords (EN):** **semantic constraint**, **trigger**, **application program**, **assertion**, **scheduled job** (time-based constraint).

> 🔥 **MCQ Trap:** "ERD không biểu diễn được ràng buộc nào?" → **semantic constraint** — enforce bằng trigger/app code. Ràng buộc thời gian → **scheduled job**, không phải trigger.

---

### 2.13 UML Class Diagram (Alternative Notation)

| ER | UML |
|---|---|
| Entity type | **Class** (3 ngăn: tên / attributes / operations) |
| Entity instance | **Object** |
| Relationship type | **Association** |
| Relationship instance | **Link** |
| Cardinality | **Multiplicity** `min..max` |
| Không giới hạn max (= N) | **`*`** |
| Weak entity | **Qualified association** |
| Link attribute (M:N) | Box đính vào association bằng **đường đứt nét** |

🔑 **Keywords (EN):** **UML class diagram**, **association**, **link**, **multiplicity**, `*` = no maximum.

> 🔥 **MCQ Trap:** `*` = "no maximum" = N. Association ↔ relationship **type**; Link ↔ relationship **instance** — đừng đảo.

---

### 2.14 EER — Vì sao ER thuần chưa đủ

```
EMPLOYEE → SECRETARY / ENGINEER / TECHNICIAN / MANAGER
```
Nhét hết vào EMPLOYEE → NULL nhiều. Tách hoàn toàn → lặp `Ssn`, `Name`, `Address`.

EER thêm: **Subclass / Superclass + Specialization / Generalization + Inheritance + Shared subclass + Category (Union type)**.

🔑 **Keywords (EN):** **EER (Enhanced Entity-Relationship)**, **subclass**, **superclass**, **IS-A**, **specialization** (top-down), **generalization** (bottom-up), **attribute inheritance**, **relationship inheritance**.

---

### 2.15 Subclass / Superclass / IS-A / Inheritance

```
ENGINEER IS-A EMPLOYEE
EMPLOYEE = superclass;  ENGINEER / SECRETARY / MANAGER = subclasses
Subclass S ⊆ Superclass C (formal: S ⊆ C)
```

Quy tắc (theo Elmasri):
- **R2:** Mọi subclass instance PHẢI tồn tại ở superclass trước. *(H211 Q43)*
- **R5:** Superclass / subclass **LUÔN là 1:1**. *(Slides)*
- Subclass kế thừa **TẤT CẢ attribute VÀ relationship** của superclass.
- Subclass có thể có thêm **local attributes** (thuộc tính riêng) và **specific relationship types** (relationship riêng).
- Entity KHÔNG thể chỉ tồn tại trong subclass.

🔑 **Keywords (EN):** **subclass**, **superclass**, **IS-A relationship**, **attribute inheritance**, **relationship inheritance**, `S ⊆ C`, **local attributes**, **specific relationship types**, **class** (tên gọi chung cho entity type / superclass / subclass).

> 🔥 **MCQ Trap:** "An entity of a subclass is also one of the entities of its superclass." → **TRUE** (R2). *(QUIZ 3 Q6 — xác nhận 100%)*

---

### 2.16 Specialization vs Generalization

| | **Specialization** | **Generalization** |
|---|---|---|
| Hướng | **Top-down** | **Bottom-up** |
| Bắt đầu từ | Superclass | Nhiều entity types |
| Kết quả | Subclasses | Superclass mới |
| Vẽ trên diagram | **Giống nhau hoàn toàn** | **Giống nhau hoàn toàn** |

**Mũi tên trong ký hiệu EER:** Slides đề cập có ký hiệu mũi tên (mũi tên hướng về superclass = generalization; hướng về subclass = specialization), tuy nhiên môn này **không dùng mũi tên** trong diagram ("advocate not drawing any arrows") — phân biệt qua ngữ cảnh mô tả.

**"Generalization is usually total":** Vì superclass được suy ra TỪ các subclass (bottom-up) nên thường mọi superclass entity đều thuộc ít nhất 1 subclass → generalization thường **total**.

🔑 **Keywords (EN):** **specialization** (top-down, subgroups), **generalization** (bottom-up, common descriptions), **inverse processes**.

> 🔥 **MCQ Trap:** "Generalization mặc định total" (vì superclass được suy từ subclass). *(QUIZ 3 Q17 chính xác: Specialization = hỗ trợ mô tả/associations cụ thể hơn cho subgroup; Generalization = lấy common descriptions của nhiều entity types để tạo superclass mới)*

---

### 2.17 Predicate-defined / Attribute-defined / User-defined

| Loại | Định nghĩa | Hệ quả |
|---|---|---|
| **Predicate-defined** (= **condition-defined**) | `S = C[predicate]` — entity thỏa điều kiện p | Có thể disjoint hoặc overlap |
| **Attribute-defined** | Giá trị 1 attribute quyết định subclass (defining attribute) | **Implies disjoint** |
| **User-defined** | User/app gán thủ công từng instance vào subclass | Có thể disjoint hoặc overlap |

🔑 **Keywords (EN):** **predicate-defined** (= **condition-defined**), **attribute-defined** (defining attribute, implies disjoint), **user-defined**.

---

### 2.18 Disjoint vs Overlapping × Total vs Partial — 4 Tổ hợp

> ⚠️ Hai trục **hoàn toàn độc lập** → 4 tổ hợp.

| Constraint | Ký hiệu | Ý nghĩa |
|---|---|---|
| **Disjoint `d`** | vòng tròn chứa `d` | Superclass entity thuộc **tối đa 1** subclass |
| **Overlapping `o`** | vòng tròn chứa `o` | Superclass entity có thể thuộc **nhiều** subclass |
| **Total** | **double line** từ superclass → vòng tròn | **Mọi** superclass entity phải thuộc **≥ 1** subclass |
| **Partial** | single line từ superclass → vòng tròn | Một số superclass entity có thể **không thuộc** subclass nào |

> ⚠️ **Bẫy hình "U-shape":** Trong diagram, vòng tròn chứa chữ **`o`** (overlapping) có thể trông giống hình chữ U. Đây là ký hiệu **overlapping** của specialization (1 entity thuộc nhiều subclass) — **KHÁC HOÀN TOÀN** với ký hiệu **`∪`** của category/union type. Không nhầm hai ký hiệu này. *(QuizDB img9)*

**4 tổ hợp:**

| Tổ hợp | Ký hiệu | Ví dụ |
|---|---|---|
| **Disjoint + Total** | ═══ + `d` | PATIENT = Outpatient **hoặc** Inpatient (đúng 1, bắt buộc) *(QUIZ 3 Q4)* |
| **Disjoint + Partial** | ─── + `d` | DRUG → TreatmentDrug/SpecialDrug/SupportingDrug (max 1, có thể chưa phân loại) *(QUIZ 3 Q5)* |
| **Overlapping + Total** | ═══ + `o` | BOOK = Hardcopy/Softcopy (phải là ít nhất 1, có thể cả 2) *(QUIZ 3 Q3)* |
| **Overlapping + Partial** | ─── + `o` | WAREHOUSE = Physical/e-Warehouse (có thể cả 2, có thể 1) *(QUIZ 3 Q2)* |

🔑 **Keywords (EN):** **disjoint** `d` (at most one), **overlapping** `o` (may belong to several), **total** (double line, at least one), **partial** (single line, may belong to none).

**Counting Rule (rất hay ra đề):**
> **|Sup| = |Sub1| + |Sub2|** ⟺ **Total AND Disjoint** (total ngăn không có entity nào bị loại trừ; disjoint ngăn đếm trùng). *(QUIZ 3 Q13 — xác nhận 100%)*

**Ứng dụng counting rule:**
- **Total + Disjoint:** Mỗi entity Sup thuộc đúng 1 sub → |Sup| = |Sub1| + |Sub2|.
- **Total + Overlapping:** Sup = Sub1 ∪ Sub2 nhưng Sub1 ∩ Sub2 có thể ≠ ∅ → |Sup| ≤ |Sub1| + |Sub2|. "Có sách chỉ có softcopy" → **TRUE** dưới Total+Overlapping. *(QUIZ 3 Q3 — xác nhận)*
- **Partial + bất kỳ:** |Sup| > |Sub1| + |Sub2| (có entity không thuộc sub nào).

> 🔥 **MCQ Trap:** "Phòng học vs Phòng TN không thể vừa là vừa kia" → **Disjoint(d)**. "Mọi entity phải vào ít nhất 1 nhóm" → **Total**. Hai điều kiện **độc lập**.

**Worked Example — Hai specialization độc lập trên cùng superclass:**
```
EMPLOYEE có 2 specialization RIÊNG BIỆT:
  Job-type (d): SECRETARY / TECHNICIAN / ENGINEER / MANAGER
  Pay-type:     HOURLY_EMPLOYEE / SALARIED_EMPLOYEE
```
Hai specialization chạy **độc lập** — một SECRETARY có thể đồng thời là HOURLY_EMPLOYEE. Mỗi specialization có ký hiệu d/o và total/partial riêng. *(QuizDB img22)*

---

### 2.19 Multiple Inheritance — Hierarchy vs Lattice — Shared Subclass

```
Hierarchy = cây, mỗi subclass có đúng 1 superclass trực tiếp (single inheritance).
Lattice   = DAG, multiple inheritance.
           STUDENT_ASSISTANT = subclass của EMPLOYEE ∩ STUDENT (shared subclass)
```

**Multiple inheritance (lattice):** Subclass kế thừa attribute của **direct superclass VÀ tất cả predecessor superclass**. Nếu attribute cùng gốc 1 superclass kế thừa qua nhiều đường → **chỉ tính 1 lần**.

**Ví dụ chuẩn — QUIZ 3 Q1:**
```
PERSON
  └─ o ─┬─ EMPLOYEE  ─ d ─┬─ STAFF / FACULTY / STUDENT_ASSISTANT
        ├─ ALUMNUS         └─ RESEARCH_ASSISTANT / TEACHING_ASSISTANT
        └─ STUDENT ─ d ─┬─ GRADUATE_STUDENT / UNDERGRAD / STUDENT_ASSISTANT
```
Superclasses của RESEARCH\_ASSISTANT = **Student\_Assistant, Employee, Student, Person** (tất cả ancestors trên mọi đường kế thừa). *(QUIZ 3 Q1 — 100%)*

🔑 **Keywords (EN):** **hierarchy** (single inheritance), **lattice** (multiple inheritance, DAG), **shared subclass** (AND, intersection, multiple inheritance).

---

### 2.20 Shared Subclass vs Category (Union Type) — DỄ NHẦM NHẤT

> Đây là 1 trong những bẫy điểm cao nhất của §2.

| Tiêu chí | **Shared Subclass (AND)** | **Category / Union type (OR)** |
|---|---|---|
| Logic | **AND** / intersection (∩) | **OR** / union (∪) |
| Subset của | `S ⊆ D1 ∩ D2 ∩ … ∩ Dn` | `T ⊆ D1 ∪ D2 ∪ … ∪ Dn` (`n > 1`) |
| Member phải thuộc | **TẤT CẢ** superclass | **CHỈ 1** trong các superclass |
| Kế thừa từ | **Tất cả** superclass | **Chỉ 1** superclass mà nó thực sự thuộc |
| Key superclass | Nên cùng key | **Có thể khác key** → bắt buộc **surrogate key** |
| Số relationship | Nhiều IS-A riêng biệt | **Một** relationship với circle `∪` |
| Ví dụ | `ENG_MGR ⊆ ENGINEER ∩ MANAGER ∩ SALARIED_EMP` | `OWNER ⊆ PERSON ∪ BANK ∪ COMPANY` |
| Ký hiệu | Nhiều relationship riêng | Circle `∪` (circle-U) |

🔑 **Keywords (EN):** **shared subclass** (AND, multiple inheritance, intersection), **category** / **union type** (OR, union), **surrogate key**, `n > 1` (điều kiện của category).

> ⚠️ **Ký hiệu `o` vs `∪`:** Vòng tròn `o` trong specialization = **overlapping** (khác key); vòng tròn `∪` = **union/category**. Nhìn hình chữ U-shape trong diagram EER → kiểm tra kỹ: nếu là specialization thì là `o` (overlapping), không phải category. *(QuizDB img9)*

**Subsets trong mô hình (QUIZ 3 Q9):**
- Subclass (Sub1, Sub2) = **subsets** (⊆ superclass).
- Category/union type (Uni) = **subset** (⊆ union của owners).
- E1, E2 (owners của category) = **KHÔNG phải subsets** — chúng là owners.
- **Đáp án: Sub1, Sub2, Uni** là subsets. E1, E2 không phải. *(QUIZ 3 Q9 — 100%)*

**Category total/partial:**
- **Total category** = **double line** vào **circle ∪** → mọi owner entity tham gia.
- **Partial category** = **single line** vào **circle ∪** → chỉ một subset của union.

| Ví dụ Category | Key các owner | Hệ quả mapping |
|---|---|---|
| `OWNER = PERSON ∪ BANK ∪ COMPANY` | **Khác key** | BẮT BUỘC **surrogate key** |
| `REGISTERED_VEHICLE = CAR ∪ TRUCK` | **Cùng key** | Dùng key chung |

> 🔥 **MCQ Traps:**
> - **Shared = AND; Category = OR** — H191 Q6.
> - Category total = double line vào **CIRCLE** (≠ double line vào subclass box như specialization total).
> - Đếm relationship: Shared = subclass của *nhiều* IS-A riêng biệt mỗi cái 1 cha; Category = subclass của *một* relationship có *nhiều* cha.
> - **Category giới hạn member trong đúng các owner type liệt kê** — khác partial specialization (không giới hạn).

---

### 2.21 Union type vs Specialization — Phân biệt ngữ nghĩa

- **Category** `REGISTERED_VEHICLE = CAR ∪ TRUCK` → **CHỈ** car và truck mới có thể là member.
- **Partial specialization** của `VEHICLE` → **KHÔNG loại trừ** các type khác (ví dụ: motorcycle vẫn là VEHICLE).

**Ví dụ điển hình — QUIZ 3 Q12 (Self-study places):**
> "Self-study places are given from library rooms and class rooms. **Some** class rooms CANNOT be provided."
> → SelfStudy ⊆ LibraryRoom ∪ ClassRoom → **Category (union type)**.
> → "Some class rooms cannot" → không phải mọi phòng đều là self-study place → **Partial category**.
> **Đáp án: Union type, partial category (d)**. *(QUIZ 3 Q12 — 100%)*

**Ví dụ QUIZ 3 Q20 (Studying Room):**
> Diagram gốc: STUDYING\_ROOM ─── `d` ─┬─ CLASSROOM / LABORATORY (single line = partial disjoint)
> Modeling nào có **cùng số entity** trong Studyingroom?
> → Đáp án **f**: Category/union type Studyingroom = CLASSROOM ∪ LABORATORY, mỗi owner có attr riêng.
> Lý do: Partial disjoint specialization ≡ partial category về số entity trong supertype. *(QUIZ 3 Q20)*

---

### 2.22 Formal Definitions EER (Elmasri)

| Formal | Định nghĩa |
|---|---|
| `S ⊆ C` | Subclass S là subset của superclass C |
| `S1 ∪ S2 ∪ … ∪ Sn = G` | **Total** specialization |
| `Si ∩ Sj = ∅` (i ≠ j) | **Disjoint** |
| `S = C[p]` | **Predicate-defined** subclass |
| `T ⊆ D1 ∪ … ∪ Dn`, `n > 1` | **Category / union type** |
| `T = (D1[p1] ∪ D2[p2] ∪ … ∪ Dn[pn])` | Category có predicate đủ |

**Thuật ngữ:** **class** = tên gọi chung bao gồm entity type, superclass, và subclass trong mô hình EER.

> 🔥 `n > 1` là điều kiện bắt buộc của category (≥ 2 owner types).

---

### 2.23 Design Choices trong EER

- Nên tạo subclass nếu có: **thuộc tính riêng (local attributes), relationship riêng (specific relationship types), constraint riêng, nghiệp vụ riêng**.
- **Không nên** nếu chỉ khác tên loại → dùng **type attribute** (Employee\_type).
- Subclass có ít attr riêng + không có relationship riêng → **gộp vào superclass**.
- **Union type nên TRÁNH** khi có thể.
- Chọn d/o và total/partial **theo miniworld requirement**, không theo ý thích.

---

### 2.24 Worked Example — Giải chi tiết Q14 BOOK (QUIZ 3 Q3) 🔥

**Đề:** BOOK superclass, `o` (overlapping), double line (total), 2 subclass HARDCOPY và SOFTCOPY.

**Phân tích từng đáp án:**
- **(a) "There exists a book that has only softcopies."** → Total = mọi book thuộc ≥ 1 subclass; Overlapping = có thể thuộc cả 2. Một book chỉ thuộc SOFTCOPY (không thuộc HARDCOPY) hoàn toàn hợp lệ. → **TRUE ✅**
- **(d) "Each book is either hardcopy or softcopy."** → "either … or" = disjoint, nhưng ký hiệu là `o` (overlapping) → sai, book có thể thuộc cả 2. → **FALSE ❌**
- **(e) "There exists a book not classified."** → Total (double line) = mọi book phải thuộc ≥ 1 → không thể không được phân loại. → **FALSE ❌**
- **(f) "|BOOK| = |HARDCOPY| + |SOFTCOPY|."** → Overlapping cho phép một book thuộc cả 2 → bị đếm 2 lần → không bằng nhau. → **FALSE ❌**

**Đáp án: a.** *(QUIZ 3 Q3 — xác nhận 100%)*

**Trap rút ra:** Total+Overlapping → |Sup| ≤ |Sub1|+|Sub2| (không phải bằng). Counting rule chỉ đúng khi **Total AND Disjoint**.

---

### 2.25 Worked Example — Giải chi tiết Q12 SELF-STUDY PLACES (QUIZ 3 Q12) 🔥

**Đề:** "Self-study places are given from library rooms and class rooms. However, **some** class rooms can **not** be provided for self-study places."

**Bước suy luận:**
1. Self-study place được lấy từ library room HOẶC class room → logic **OR/Union** → **Category (union type)**.
2. "Some class rooms cannot" → không phải mọi library room hay class room đều là self-study place → Category là **partial** (single line vào circle ∪).
3. Nếu dùng specialization (Self-Study là superclass của Library/Class): sẽ hàm ý Library và Class room là subtype của Self-Study → sai ngữ nghĩa.

**Đáp án: d — Union type, partial category.** *(QUIZ 3 Q12 — 100%)*

**Trap rút ra:** Union type khi objects đến từ **nhiều entity type khác nhau** (library ≠ class), không dùng specialization.

---

### 🎯 MCQ Traps §2

> Học 17 bẫy này = bảo hiểm ~8/10 câu §2 🔥

1. 🔥 **Storage structures / access paths → Physical design, KHÔNG phải Conceptual** (Conceptual = DBMS-independent). *(QUIZ 2 Q1)*
2. 🔥 **Thứ tự 5 phase:** Requirements → Conceptual → Choice of DBMS → Logical (mapping) → Physical. "Choice of DBMS" sau Conceptual, trước Logical. *(QUIZ 2 Q3)*
3. 🔥 **Derived KHÔNG lưu** trong DB — oval đứt, tính từ stored data. "Close date determined from account details" = derived. *(QUIZ 2 Q4)*
4. 🔥 **"must / at least one" = total; "may / optional / some have none" = partial** — áp dụng ngay khi đọc miniworld. *(QUIZ 2 Q4, Q5, Q7)*
5. 🔥 **M:N relationship attribute KHÔNG migrate** — Hours BẮT BUỘC nằm trên WORKS\_ON.
6. 🔥 **Cardinality VÀ Participation là 2 trục độc lập** — 1:N không nói gì về tính bắt buộc.
7. 🔥 **Weak entity: no key of its own + partial key + identifying relationship (◇◇) + LUÔN total phía weak.** Weak có thể có nhiều owner. *(H192 Q31)*
8. 🔥 **Degree = số entity type tham gia**, KHÔNG phải số attribute của relationship. *(H211 Q53)*
9. 🔥 **|Sup| = |Sub1| + |Sub2| ⟺ Total AND Disjoint** — không total hoặc không disjoint thì không bằng. *(QUIZ 3 Q13)*
10. 🔥 **Shared subclass = AND (∩); Category = OR (∪)** — H191 Q6. Subsets: Sub1, Sub2, Uni đều là subsets; E1, E2 (owners của Uni) KHÔNG. *(QUIZ 3 Q9)*
11. 🔥 **Chasm trap = pathway bị đứt do partial/0:N participation**, KHÔNG phải fan trap. *(QUIZ 3 Q19)*
12. 🔥 **"An entity of a subclass is also one of the entities of its superclass" = TRUE (R2).** *(QUIZ 3 Q6)*
13. 🔥 **Category giới hạn member đúng các owner type liệt kê**; partial specialization KHÔNG giới hạn (motorcycle vẫn là VEHICLE).
14. 🔥 **Attribute-defined specialization implies disjoint** (defining attribute chỉ có 1 giá trị → 1 subclass).
15. 🔥 **Ternary KHÔNG luôn thay bằng 3 binary** — tách có thể mất thông tin (ai submit cái nào tại branch nào). *(H202 Q40)*
16. 🔥 **Fan trap = 1:N + 1:N từ cùng hub** (hub mơ hồ). Trường hợp M:N + 1:N không phải fan trap thuần — nhưng vẫn cần restructure (thêm direct relationship). *(HK191 Q4, F2024 Q36)*
17. 🔥 **Functional design ∥ DB structural design = parallel + independent** (KHÔNG phải "parallel + related"). *(HK211mock Q12)* Ràng buộc thời gian → **scheduled job**, không phải trigger. *(HK191 Q10)*

---

### 🪄 Câu thần chú §2

1. **Danh từ → Entity, Tính chất → Attribute, Động từ → Relationship, Unique/SSN → Key.**
2. **Multivalued = oval đôi; Derived = oval đứt; Composite = oval cha-con.**
3. **Weak entity PK = {owner\_PK, partial\_key}** — identifying = ◇◇, participation phía weak = **luôn total**.
4. **M:N attribute BẮT BUỘC trên relationship** — Hours trên WORKS\_ON, không migrate.
5. **Cardinality "bao nhiêu", Participation "có bắt buộc không" — hai trục độc lập.**
6. **(min,max) gói cả cardinality + participation** — `(1,N)` = total + many, `(0,1)` = partial + max one.
7. **Specialization = top-down, Generalization = bottom-up; vẽ trên diagram giống nhau.**
8. **`d/o` trả lời "vào bao nhiêu nhóm"; Total/Partial trả lời "có bắt buộc vào nhóm không".**
9. **|Sup| = |Sub1| + |Sub2| chỉ khi Total AND Disjoint** — một trong hai thiếu là sai.
10. **Shared = AND (∩ tất cả); Category = OR (∪ chỉ 1)** — điểm nhầm nhất trong §2.
11. **Subclass/superclass LUÔN 1:1 (R5); subclass entity PHẢI tồn tại ở superclass (R2).**
12. **Fan trap = pathway mơ hồ (≥2 nhánh 1:N toả từ hub); Chasm trap = pathway đứt (partial participation).**
13. **Conceptual design = DBMS-independent; Physical design = storage structures + access paths.**
14. **Subsets trong EER: Sub1, Sub2 (subclasses) và Uni (category) đều là subsets; E1/E2 (owners) không phải.**
15. **Hình `o` trong specialization = overlapping; hình `∪` = union/category — KHÔNG nhầm dù trông giống nhau.**

---

## §3. RELATIONAL MAPPING (ER/EER → Relational) — Trọng số đề: 5 câu

> **Nguồn:** Lecture 04 · Tutorial/DB-Chapter4.md · QUIZ 4 BK-LMS (20/20 điểm — near-verbatim predictive) · đề thi các năm
>
> **Tập trung:** 7 + 2 steps mapping, specialization 4 options, FK direction, total participation enforcement, relational model terminology, COMPANY schema 6 bảng.

---

### 3.1. Bức tranh tổng quan — Mapping nằm ở đâu?

```
Conceptual design → ER/EER diagram   [DBMS-independent]
          ↓  STEP 1–9 (Relational Mapping)
Logical design   → Relational schema  [DBMS-specific, dùng relational model]
          ↓
Physical design  → file, index, storage
```

🔑 **Keywords (EN):** logical database design · relational data model · conceptual schema · external schema · internal schema

- **Mapping ≠ Normalization** — chỉ dịch ER thành bảng; normalization kiểm tra FD/redundancy sau đó.
- **Relational model dùng ở đâu?** → Conceptual schema + external schemas (KHÔNG phải internal schema — internal là physical storage). `(QUIZ Q4 = E; MCQ-03 Q8 = A)`

---

### 3.2. Thuật ngữ Relational Model — cốt lõi

🔑 **Keywords (EN):** relation · tuple · attribute · domain · relation schema · relation state/instance · degree · cardinality · atomic value · NULL · `t[A]` notation · intension vs extension · E.F. Codd 1970

| Formal (RM) | Informal | Ví dụ EMPLOYEE |
|---|---|---|
| Relation | Table | EMPLOYEE |
| Tuple | Row | 1 nhân viên cụ thể |
| Attribute | Column header | `Ssn`, `Salary` |
| Domain | All column values | tập giá trị hợp lệ của `Salary` |
| Schema `R(A1…An)` | Table definition | `EMPLOYEE(Ssn, Fname, …)` |
| State / Instance | Populated table | 8 nhân viên tại thời điểm t |
| Degree | Số cột (# attribute trong schema) | EMPLOYEE 10 cột → degree = 10 |
| Cardinality (RM) | Số hàng (# tuple) | 8 tuple → cardinality = 8 |

> ⚠️ **Bẫy:** Cardinality trong RM = số dòng. Cardinality ratio trong ER = 1:1/1:N/M:N. Hai khái niệm hoàn toàn khác nhau.

- **Relation là SET** → không có duplicate tuple, thứ tự tuple không quan trọng, attribute tham chiếu bằng **tên** (không bằng vị trí).
- **Tuple** `t = <v1, v2, …, vn>`; giá trị thứ i viết là `t[Ai]`. Mỗi `vi ∈ dom(Ai)` **hoặc NULL**.
- **NULL** = unknown / inapplicable / known but not recorded. ⚠️ NULL ≠ 0 ≠ empty string ≠ space.
- **Tại sao data trong relational DB gọi là "simple"?** → Attribute values are **atomic** and organized in a well-controlled tabular format. `(QUIZ Q16 = A)`
- **Nguồn gốc:** Relational model do Dr. **E.F. Codd** (IBM) đề xuất năm **1970** trong bài báo *"A Relational Model for Large Shared Data Banks"* (CACM).

---

### 3.3. Relation (RM) ≠ Relationship (ER)

🔑 **Keywords (EN):** relation (table) · relationship (ER diamond/association)

| Từ | Nằm ở | Nghĩa |
|---|---|---|
| **Relationship** | ER/EER | Mối liên kết giữa entity type (hình thoi ◇) |
| **Relation** | Relational Model | Bảng |

`WORKS_ON` là một *relationship* trong ER. Sau mapping, `WORKS_ON(Essn, Pno, Hours)` là một *relation* (bảng). Tuy nhiên **relation ≠ relationship**.

---

### 3.4. Superkey / Candidate Key / Primary Key / Secondary Key

🔑 **Keywords (EN):** superkey · candidate key (minimal superkey) · primary key · secondary key (alternate key)

```
Superkey       ⊇  Candidate key  ⊇  Primary key
(minimal superkey = candidate key; primary key = candidate key được chọn)
Secondary / alternate key = candidate key còn lại (không được chọn làm PK)
```

**Ví dụ CAR(State, Reg#, SerialNo, Make, Model, Year):**
- Candidate keys: `{State, Reg#}`, `{SerialNo}`
- `{SerialNo, Make}` = **superkey** nhưng **KHÔNG phải key** (không minimal — bỏ Make vẫn unique)
- PK được chọn: `{SerialNo}` (hoặc `{State, Reg#}`); cái còn lại = secondary key

> 🔥 **Bẫy Q40/MCQ:** "A superkey is the primary key used to distinguish rows" → **SAI** (D = sai). Đúng: superkey ⊇ PK, nhưng không nhất thiết bằng nhau. `(MCQ-03 Q40 ans=D incorrect)`
>
> 🔥 **Bẫy phát biểu (HK191-Q16):** Nếu một phát biểu về key chỉ đòi **tính duy nhất** (`t1[K] ≠ t2[K]`) mà **không đòi minimal** → đó là định nghĩa **SUPERKEY**, không phải primary key. PK = candidate key được chọn = minimal superkey.

---

### 3.5. 4 Integrity Constraints

🔑 **Keywords (EN):** domain constraint · key constraint · entity integrity constraint · referential integrity constraint · NOT NULL · NULL · FK · static constraint · transition constraint · dynamic constraint

| Constraint | Nghĩa | Vi phạm điển hình |
|---|---|---|
| **Domain** | Mỗi giá trị ∈ domain hợp lệ | `Salary = 'abc'` hoặc `Salary < 0` |
| **Key** | PK duy nhất xác định tuple; không trùng | 2 employee cùng `Ssn` |
| **Entity integrity** | **PK ≠ NULL** (mọi thành phần PK phải NOT NULL) | `Employee.Ssn = NULL` |
| **Referential integrity** | FK ∈ {PK referenced relation} ∪ {NULL} | `Dno = 99` nhưng không có Department 99 |

> ⚠️ **Participation constraint** = ràng buộc ER, **KHÔNG phải** constraint của Relational Data Model. `(MCQ-03 Q47=A, Q52=B, Q62=D)`
>
> 🔥 **Nếu FK là một phần PK** → FK đó KHÔNG được NULL (vì PK ≠ NULL). Ví dụ `WORKS_ON(Essn, Pno, Hours)` — `Essn` vừa là FK vừa là phần PK → NOT NULL bắt buộc.

**Static vs Dynamic (Transition) Constraints:**
- 4 integrity constraints trên đều là **static constraints** — phải đúng tại **mọi thời điểm** (mọi state hợp lệ).
- **Transition / dynamic constraint**: ràng buộc áp lên **sự thay đổi trạng thái** — ví dụ *"salary chỉ được tăng, không giảm"*. Loại này không thể biểu diễn trực tiếp bằng 4 constraint trên; cần trigger hoặc application logic.

**Update operations vi phạm constraint nào?**

| Operation | Có thể vi phạm |
|---|---|
| **INSERT** | Domain · Entity integrity (PK=NULL) · Key (PK trùng) · Referential (FK → không tồn tại) |
| **DELETE** | **Referential integrity** (xóa cha khi con đang tham chiếu) |
| **MODIFY** | Tùy cột: PK/FK → như INSERT/DELETE; cột thường → Domain |

> `(MCQ-03 Q41=B, Q54=D, Q55=C, Q58=A, Q65=C)`

---

### 3.6. 7 Steps Mapping ER → Relational

🔑 **Keywords (EN):** strong entity · weak entity · partial key · owner relation · binary 1:1 · binary 1:N · binary M:N · recursive relationship · involuted relationship · multivalued attribute · n-ary relationship · relationship relation · FK (foreign key) · PK (primary key) · ON DELETE CASCADE

| Step | Đối tượng | Quy tắc |
|---|---|---|
| **1** | **Strong (Regular) Entity** | Bảng riêng. Simple attr → cột. Composite → tách thành simple components. Derived → **KHÔNG lưu** (bỏ). Multivalued → để Step 6. Key → PK. |
| **2** | **Weak Entity** | Bảng riêng + FK trỏ owner. **PK = {owner_PK + partial_key}**. Thêm `ON DELETE CASCADE`. |
| **3** | **Binary 1:1** | 3 cách: **(a) FK approach** — đặt FK ở **phía total participation** (giảm NULL), FK phải có **UNIQUE** (nếu thiếu UNIQUE → quan hệ biến thành N:1); **(b) Merge** — gộp 1 bảng nếu cả 2 total; **(c) Cross-reference relation** — bảng riêng nếu cả 2 partial. |
| **4** | **Binary 1:N** | **FK ở phía N** trỏ về PK phía 1. Relationship attr đặt vào phía N. KHÔNG tạo bảng mới (option chính). Option phụ: **Relationship-relation approach** — tạo bảng quan hệ riêng với PK = FK phía N; nên dùng khi ít tuple phía N tham gia (tránh nhiều NULL), coi như "almost optional". |
| **5** | **Binary M:N** | **BẮT BUỘC bảng riêng** `R(PK1, PK2, attrs)`. PK = `{PK1, PK2}`. 2 FK. |
| **6** | **Multivalued Attribute** | Bảng riêng `(entity_PK, attr_value)`. PK = `{entity_PK, attr_value}`. |
| **7** | **N-ary Relationship** | Bảng riêng + n FK. **Nếu Eᵢ có cardinality 1 → FKᵢ KHÔNG nằm trong PK** (xem 3.9). |

**Recursive relationship (= involuted relationship):**
- Slide dùng thuật ngữ **involuted** cho recursive relationship (ví dụ: 1:1 MARRY, 1:N EMPLOYEE-SUPERVISE, M:N PART-COMPRISE).
- 1:N recursive → self-FK (đổi tên role). Ví dụ: `EMPLOYEE(..., Super_ssn)` FK `Super_ssn → EMPLOYEE(Ssn)`.
- M:N recursive → bảng riêng. Ví dụ: `COMPRISE(Major_part_no, Minor_part_no, Quantity)`, PK = `(Major_part_no, Minor_part_no)`.

> 🔥 **Đối tượng MAY NOT cần bảng riêng**: Binary 1:N relationship (Step 4 dùng FK thôi). `(MCQ-03 Q28=D, Q43=C)`

---

### 3.7. Enforcing Total Participation — khi nào cần CHECK/Assertion?

🔑 **Keywords (EN):** total participation · NOT NULL · CHECK constraint · trigger/assertion · partial participation

| Trường hợp | Cách enforce | Cần CHECK? |
|---|---|---|
| **1:N — phía N total** | `FK + NOT NULL` là đủ | ❌ Không cần CHECK thêm |
| **Weak entity** | owner PK là phần PK → tự động NOT NULL | ❌ Không cần CHECK thêm |
| **Strong entity / phía 1 / phía M:N total** | FK/PK KHÔNG đảm bảo entity xuất hiện ≥ 1 lần | ✅ **Cần CHECK / assertion / trigger** |

**Ví dụ quan trọng (QUIZ Q11 / MCQ-03 Q27):**
- `Building(Name, Location) 1—N Room(Number)`, **Building total** → Room có FK `BuildingName NOT NULL` (Room total → auto). Nhưng bạn **vẫn cần** `Check: total participation of Building in Room` vì không có gì ngăn INSERT một Building mà không có Room nào.
- `Musician M—N Instrument`, cả 2 total → `Plays(MusicianSSN, InstrumentCode)` PK/FK không force → **cần Check total participation của cả hai**. `(QUIZ Q9 = Check: total participation of Musician and Instrument in Plays)`
- `Customer M—N Service`, Customer total → `Registration(...)` cần `Check: total participation of Customer`. `(QUIZ Q14/Q19)`
- Ngược lại: `Project(Code, …, DepartmentID NOT NULL)` — Project total trong 1:N với Department → **KHÔNG cần** thêm Check. `(QUIZ Q5 ans=B, no spurious Check)`

---

### 3.8. Ternary Relationship — quy tắc PK khi có cardinality 1

🔑 **Keywords (EN):** ternary (n-ary) relationship · functional dependency in ternary · 1-side FK not in PK

Cho ternary relationship A:1, B:N, C:N → `(B, C) → A`:
```
R(A_id, B_id, C_id, attrs)
PK = (B_id, C_id)      -- hai phía N
A_id là FK, KHÔNG nằm trong PK
```

**Ví dụ QUIZ Q17 — `Plays(Musician:1, Play:N, Instrument:N, Style)`:**
```
Plays(MusicianIdentifier, PlayTitle, InstrumentCode, Style)
PK = (PlayTitle, InstrumentCode)          -- hai N-side
FK MusicianIdentifier → Musician.Identifier  NOT NULL
```
Multivalued attr `Periods` trên `Plays` → bảng riêng:
```
playsPeriods(PlayTitle, InstrumentCode, APeriod)
PK = (PlayTitle, InstrumentCode, APeriod)
FK (PlayTitle, InstrumentCode) → Plays
```

---

### 3.9. Step 8 — Specialization / Generalization: 4 Options

🔑 **Keywords (EN):** specialization · generalization · superclass · subclass · disjoint · overlapping · total · partial · 8A (superclass+subclasses) · 8B (subclass-only) · 8C (single table + type attr) · 8D (single table + boolean flags)

| Option | Cấu trúc | Disjoint? | Overlap? | Total? | Partial? | Nhược điểm |
|---|---|---|---|---|---|---|
| **8A** Superclass + Subclass tables | m+1 bảng | ✅ | ✅ | ✅ | ✅ | JOIN nhiều — nhưng **luôn an toàn** |
| **8B** Subclass-only (kế thừa tất cả attr) | m bảng | ✅ tốt nhất | ⚠️ duplicate (discouraged) | ✅ **Bắt buộc Total** | ❌ **Không dùng Partial** | Redundancy nếu overlap |
| **8C** Single table + 1 type attribute | 1 bảng | ✅ | ❌ **Không dùng Overlap** | ✅ | ✅ | Nhiều NULL |
| **8D** Single table + boolean flags | 1 bảng | ✅ | ✅ **Tốt cho Overlap** | ✅ | ✅ | Nhiều NULL |

> 🔥 **Partial + Disjoint → 3 options: 8A, 8C, 8D** (KHÔNG có 8B vì 8B yêu cầu Total). `(MCQ-03 Q46=C)`
>
> 🔥 **Overlap → chỉ 8D hoặc 8A. KHÔNG dùng 8C.**
>
> 🔥 **8B nuance:** Option 8B *hoạt động được* với total (cả disjoint lẫn overlap về mặt kỹ thuật), nhưng chỉ *được khuyến dùng* cho **total + disjoint**. Nếu overlap → cùng 1 thực thể xuất hiện trùng lặp ở nhiều bảng con → **discouraged** (không phải cấm tuyệt đối, nhưng tạo redundancy nghiêm trọng).
>
> 🔥 **Bẫy 8C với Total specialization:** `BookType ∈ {Hardcopy, Softcopy, Both, Other}` — domain value `Other` nghĩa là "không thuộc subclass nào" → vi phạm Total (phải thuộc ít nhất 1 subclass).
>
> 🔥 **Bẫy "find the INCORRECT mapping" (QUIZ4-Q10):** Với **overlapping** specialization (Book → Hardcopy/Softcopy), áp dụng 8C (single table + type attr `Domain {Hardcopy, Softcopy, Both, Other}`) là **mapping SAI** — thêm giá trị `Both`/`Other` là workaround sai bản chất; 8C chỉ đúng cho disjoint.
>
> `(MCQ-03 Q30=E: tất cả A,B,C,D đều đúng cho disjoint specialization Room → Classroom/Laboratory)`

**Integrity constraints của specialization:** Disjointness constraint + Completeness constraint. `(MCQ-03 Q39=D: "all of the above wrong" — đúng là Disjointness + Completeness, không phải Participation hay Cardinality)`

---

### 3.10. Step 9 — Category / Union Type → Surrogate Key

🔑 **Keywords (EN):** category · union type · superclass · surrogate key · partial category · total category

- Category `C = T1 ∪ T2 ∪ T3` (OR/union) khi các superclass có PK **khác nhau** → bắt buộc tạo **surrogate key** mới.

**Ví dụ QUIZ Q3 — `LearningMaterial = Book(ISBN) ∪ Article(DOI)`:**
```
LearningMaterial(ID, …)           PK = ID  (surrogate)
Book(ISBN, …, LearningMaterialID) FK LearningMaterialID → LearningMaterial.ID
Article(DOI, …, LearningMaterialID) FK LearningMaterialID → LearningMaterial.ID
Is_used_in(LearningMaterialID, CourseID)  PK = (LearningMaterialID, CourseID)
```
> Nếu **partial category** → KHÔNG đặt NOT NULL cho link FK. Total category → FK NOT NULL.

---

### 3.11. Shared Subclass vs Category

| | Shared subclass | Category |
|---|---|---|
| Logic | AND / intersection | OR / union |
| Ví dụ | `STUDENT_ASSISTANT = STUDENT ∩ EMPLOYEE` | `OWNER = PERSON ∪ BANK ∪ COMPANY` |
| Key condition | Superclass nên **cùng key** | Khác key → **surrogate key** |

---

### 3.12. Bảng vàng ER construct → Relational result

🔑 **Keywords (EN):** entity relation · relationship relation · foreign key · composite attribute flatten · value set → domain

| ER construct | Relational result |
|---|---|
| Strong entity | Entity relation; key → PK |
| Weak entity | Relation, PK = owner_PK + partial_key; owner PK là FK |
| Composite attribute | **Flatten** — tách thành simple components (KHÔNG bảng riêng) |
| Derived attribute | Thường **không lưu** |
| Multivalued attribute | Bảng riêng `(OwnerPK, Value)`, PK = cả hai |
| 1:1 relationship | Foreign key (ưu tiên phía total participation); FK phải **UNIQUE** |
| 1:N relationship | FK ở **phía N** |
| M:N relationship | Relationship relation mới + 2 FK, PK = (PK1, PK2) |
| N-ary relationship | Relationship relation + n FK; phía cardinality 1 → FK không vào PK |
| Value set | Domain |
| Key attribute | Primary (or secondary) key |

---

### 3.13. Referential Actions (ON DELETE / ON UPDATE)

🔑 **Keywords (EN):** REJECT / NO ACTION / RESTRICT · CASCADE · SET NULL · SET DEFAULT · referential action

| Action | Hành vi khi cha bị xóa/update |
|---|---|
| **REJECT / NO ACTION / RESTRICT** | Không cho nếu còn child tham chiếu |
| **CASCADE** | Lan truyền sang child (xóa cha → xóa con) |
| **SET NULL** | FK child = NULL |
| **SET DEFAULT** | FK child = DEFAULT value |

> ⚠️ `SET NULL` **không dùng được** nếu FK là NOT NULL hoặc là một phần PK.
>
> **QUIZ Q42:** Khi update Card_no ở BORROWER phải cascade sang BOOK_LOANS, nhưng delete BORROWER bị block nếu BOOK_LOANS còn tham chiếu → `FOREIGN KEY (Card_no) REFERENCES BORROWER(Card_no) ON DELETE RESTRICT ON UPDATE CASCADE` đặt trong **BOOK_LOANS** (hoặc tương đương: PRIMARY KEY ON DELETE RESTRICT trên BORROWER). Đáp án = A.

---

### 3.14. COMPANY — Full Mapping (BẮT BUỘC thuộc — 6 bảng + 8 FK)

```
EMPLOYEE(Fname, Minit, Lname, Ssn, Bdate, Address, Sex, Salary, Super_ssn, Dno)
  PK = Ssn
  FK: Super_ssn → EMPLOYEE(Ssn)          -- recursive 1:N (self-ref)
      Dno       → DEPARTMENT(Dnumber)    -- 1:N

DEPARTMENT(Dname, Dnumber, Mgr_ssn, Mgr_start_date)
  PK = Dnumber
  FK: Mgr_ssn → EMPLOYEE(Ssn)           -- 1:1

DEPT_LOCATIONS(Dnumber, Dlocation)       -- Step 6: multivalued
  PK = {Dnumber, Dlocation}
  FK: Dnumber → DEPARTMENT(Dnumber)

PROJECT(Pname, Pnumber, Plocation, Dnum)
  PK = Pnumber
  FK: Dnum → DEPARTMENT(Dnumber)        -- 1:N

WORKS_ON(Essn, Pno, Hours)              -- Step 5: M:N
  PK = {Essn, Pno}
  FK: Essn → EMPLOYEE(Ssn)
      Pno  → PROJECT(Pnumber)

DEPENDENT(Essn, Dependent_name, Sex, Bdate, Relationship)  -- Step 2: weak entity
  PK = {Essn, Dependent_name}
  FK: Essn → EMPLOYEE(Ssn)  ON DELETE CASCADE
```

> QUIZ Q6: "If available, each `Dno` value in Employee must appear in `Dnumber` in Department" → **TRUE** (Referential integrity). Removing Employee has no impact on Department. `(QUIZ Q6 = E)`

---

### 3.15. "Is this table a relation?" — Bẫy kinh điển

🔑 **Keywords (EN):** duplicate tuples · non-atomic column · set semantics · 1NF

- Bảng có **duplicate tuples** → **KHÔNG phải relation** (relation là set).
- Cột chứa **non-atomic value** (tập giá trị, như `Contact = {212921, 018271}`) → **KHÔNG phải relation** (vi phạm 1NF/atomicity).
- Cột có giá trị lặp lại **nhưng không phải PK** → vẫn là relation (bình thường).

**QUIZ Q20 / MCQ-03 Q33:**
- `Trainee` có tuple `(NDV,20,2001)` xuất hiện 2 lần → **NOT a relation**.
- `Customer` có `Contact = {…}` multi-value → **NOT a relation**.
- `Book` và `iPhone` atomic, distinct tuples → **Relations**.

---

### 3.16. Các trường hợp đặc biệt từ QUIZ BK-LMS

**QUIZ Q1 — 1:1 (Employee–Account), both total + multivalued attr Privileges:**
```
EmployeeAccount(SSN, Name, …, Username, Password, …)
  PK = SSN;  Secondary key (unique, not null): Username
isgivenPrivileges(EmployeeAccountSSN, APrivilege)
  PK = (EmployeeAccountSSN, APrivilege)
  FK EmployeeAccountSSN → EmployeeAccount.SSN
```
→ 1:1 both total → **merge** vào 1 bảng; Privileges multivalued → bảng riêng.

**QUIZ Q2 — 1:N (Employee leads Project), Project total + multivalued attr Tasks trên relationship:**
```
Employee(ID, SSN)  PK=ID, SK SSN
Project(Number, Name, EmployeeID)  PK=Number, FK EmployeeID NOT NULL + UNIQUE
Is_led_byTasks(ProjectNumber, ATask)  PK=(ProjectNumber, ATask)  FK→Project
```
→ 1:N → FK ở phía N (Project); multivalued attr trên relationship → bảng riêng lấy PK từ phía FK; 1:1 FK phía total → UNIQUE.

**QUIZ Q5 — 1:N (Department–Project), composite attr ProjectPeriod(From, To):**
```
Department(ID, Name)  SK Name
Project(Code, Name, DepartmentID)  FK DepartmentID NOT NULL
ProjectPeriod(ProjectCode, From, To)  PK=(ProjectCode, From, To)  FK→Project
```
→ Composite attr `ProjectPeriod` → flatten From, To; composite + thực ra là multivalued → bảng riêng.

**QUIZ Q13 — Weak entity Drug + Specialization + Multivalued SpecialConditions:**
```
Drug(DrugName, CompanyName, DrugType, Function)
  PK = (DrugName, CompanyName)  [weak: CompanyName là owner PK]
  Domain DrugType: {'Treatment', 'Special', 'Supporting', 'Other'}
SpecialConditions(DrugName, CompanyName, Acondition)
  PK = (DrugName, CompanyName, Acondition); FK → Drug
Is_used_for(DrugName, CompanyName, DiseaseCode)  [only Treatment drugs]
```
→ Specialization disjoint → 8C (single table + type attribute).

**QUIZ4-Q15 — Reverse-direction mapping (schema → ERD):**
- Dạng đề: *"Cho lược đồ quan hệ R, ERD nào KHÔNG thể tương ứng?"*
- Nguyên tắc: `(OwnerPK, AttrValue)` với PK = cả hai → xuất phát từ **multivalued attribute** trong ER, **không thể** tương ứng ERD có **weak entity** (vì weak entity luôn có thêm partial key riêng và FK rõ ràng). Cần phân biệt schema do multivalued attr sinh ra vs schema do weak entity sinh ra.

---

### 🎯 MCQ Traps §3

1. 🔥 **1:N → FK phía N**, KHÔNG phải phía 1 (đặt FK phía 1 → vi phạm 1NF vì 1 tuple phải chứa nhiều FK).
2. 🔥 **M:N → BẮT BUỘC bảng riêng** — không bao giờ merge vào entity.
3. 🔥 **Weak entity PK = {owner_PK + partial_key}** + `ON DELETE CASCADE`; partial key **một mình không unique**.
4. 🔥 **Multivalued attr KHÔNG để chung 1 cột** (`Phone="123,456"` → vi phạm 1NF).
5. 🔥 **Option 8B chỉ được khuyến dùng Total + Disjoint**; với overlap 8B tạo redundancy nghiêm trọng (discouraged, không phải cấm tuyệt đối); **8C không xử lý Overlap**; **8D tốt cho Overlap**.
6. 🔥 **Partial + Disjoint → 3 options (8A, 8C, 8D)**, không có 8B.
7. 🔥 **Category (superclass khác key) → surrogate key**; Shared subclass cần cùng key.
8. 🔥 **Total participation phía N** → `FK NOT NULL` là đủ, không cần CHECK thêm. **Total participation phía "1" hoặc phía M:N** → phải có CHECK/assertion/trigger.
9. 🔥 **Ternary A:1, B:N, C:N → PK = (B_id, C_id)**; A_id là FK nhưng không vào PK.
10. 🔥 **DELETE vi phạm referential integrity**; **INSERT vi phạm entity integrity** (PK null) hoặc key/referential.
11. 🔥 **Participation constraint KHÔNG phải constraint của Relational Model** (Domain · Key · Entity integrity · Referential integrity là 4 cái đúng).
12. 🔥 **Superkey ⊇ CK ⊇ PK**; superkey không nhất thiết là key (ví dụ `{SerialNo, Make}` là superkey nhưng không minimal). Phát biểu chỉ đòi uniqueness mà không đòi minimal = định nghĩa superkey, KHÔNG phải PK.
13. 🔥 **1:1 FK phía total PHẢI có UNIQUE** — thiếu UNIQUE → quan hệ biến thành N:1 (nhiều phía N trỏ về cùng 1 phía 1). `(QUIZ4-Q2)`
14. 🔥 **8C + overlapping specialization = mapping SAI** — thêm `Both`/`Other` vào domain là workaround sai bản chất; nhận diện dạng "find the incorrect mapping". `(QUIZ4-Q10)`
15. 🔥 **Reverse-direction trap**: schema `(OwnerPK, Value)` PK=cả hai → multivalued attr, **không phải** weak entity. Dạng đề "ERD nào KHÔNG thể tương ứng". `(QUIZ4-Q15)`
16. 🔥 **Static vs Dynamic constraint**: 4 integrity constraints là static; "salary chỉ được tăng" là transition/dynamic constraint → không thể enforce bằng 4 constraint trên.

---

### 🪄 Câu thần chú §3

1. **Entity → bảng; Weak → PK = {owner_PK + partial_key} + CASCADE.**
2. **1:1 → FK phía total (UNIQUE); 1:N → FK phía N; M:N → bảng riêng + 2 FK.**
3. **Composite → flatten; Derived → bỏ; Multivalued → bảng riêng.**
4. **N-ary → bảng + n FK; cardinality-1 side → FK không vào PK.**
5. **Recursive (involuted) 1:N → self-FK đổi tên; Recursive M:N → bảng riêng.**
6. **Overlap → 8D hoặc 8A. KHÔNG 8C. 8B chỉ Total+Disjoint (discouraged nếu overlap). 8A luôn an toàn.**
7. **Total phía N/weak → FK NOT NULL đủ. Total phía "1"/M:N → cần CHECK.**
8. **Category khác key → surrogate key mới.**
9. **Mapping nằm ở Logical Design phase (không phải Conceptual, không phải Physical).**
10. **Conceptual + External schemas dùng relational model; Internal = physical.**
11. **DELETE vi phạm Referential; INSERT vi phạm Entity integrity / Key / Referential.**
12. **Relation = SET: không duplicate tuple, không thứ tự, atomic value, tên không vị trí.**
13. **Superkey = unique không cần minimal; PK = minimal superkey được chọn; 1:1 FK thiếu UNIQUE → thành N:1.**
14. **Static constraint = đúng mọi thời điểm (4 loại); Dynamic/transition = ràng buộc thay đổi trạng thái (cần trigger).**

---

## §4. RELATIONAL ALGEBRA — Trọng số đề: 4 câu

> **Nguồn gốc:** `Lectures/05_Relational Algebra.pdf` + `Tutorial/DB-Chapter5.md`
> **Tập trung thi:** type-compatibility cho set ops, cardinality của ×, Division ÷, OUTER JOIN, GROUP BY ↔ 𝓕, RA σ vs SQL SELECT, natural join name-trap.

---

### 4.1. Operator Cheat Table

| Toán tử | Ký hiệu | SQL equiv | Tính chất nổi bật |
|---|---|---|---|
| **SELECT** | `σ_cond(R)` | `WHERE` | Lọc ROWS; giao hoán; cascade AND; `\|σ(R)\| ≤ \|R\|` |
| **PROJECT** | `π_L(R)` | `SELECT DISTINCT` | Chọn COLS; **tự loại duplicate** (relation = set); **không** giao hoán tùy tiện |
| **RENAME** | `ρ_S(B1,…)(R)` | `AS` | Chỉ đổi nhãn; dùng khi self-join hoặc natural join khác tên |
| **UNION** | `R ∪ S` | `UNION` | Giao hoán + kết hợp; **đòi union-compatible** |
| **INTERSECT** | `R ∩ S` | `INTERSECT` | Giao hoán + kết hợp; **đòi union-compatible** |
| **DIFFERENCE** | `R − S` | `EXCEPT/MINUS` | **KHÔNG** giao hoán; **đòi union-compatible** |
| **CART. PRODUCT** | `R × S` | `CROSS JOIN` | `\|R×S\|=\|R\|·\|S\|`; degree = n+m; **KHÔNG** cần union-compat |
| **THETA JOIN** | `R ⋈_θ S` | `JOIN ON θ` | `= σ_θ(R × S)`; θ bất kỳ (≤, ≥, ≠) |
| **EQUIJOIN** | `R ⋈_{R.A=S.B} S` | `INNER JOIN ON =` | θ chỉ dùng `=`; **giữ cả 2** cột bằng |
| **NATURAL JOIN** | `R * S` | `NATURAL JOIN` | Tự nối cột **cùng tên**, **bỏ 1 cột trùng** |
| **DIVISION** | `R(Z) ÷ S(X)` | `double NOT EXISTS` | "với mọi / for all / every" |
| **AGGREGATE** | `[grp] 𝓕_{fn}(R)` | `GROUP BY` + agg | grouping attrs **bên trái** 𝓕; không group → 1 dòng |
| **LEFT OUTER** | `R ⟕ S` | `LEFT OUTER JOIN` | Giữ mọi tuple R; pad NULL bên phải |
| **RIGHT OUTER** | `R ⟖ S` | `RIGHT OUTER JOIN` | Giữ mọi tuple S; pad NULL bên trái |
| **FULL OUTER** | `R ⟗ S` | `FULL OUTER JOIN` | Giữ cả 2; pad NULL cả 2 chiều |
| **OUTER UNION** | `R ⊌ S` | — | Dùng khi **không** union-compat; cột riêng pad NULL |
| **ASSIGNMENT** | `R ← expr` | — | Đặt tên kết quả trung gian; vd `DEP5_EMPS ← σ_{DNO=5}(EMPLOYEE)` |

🔑 **Keywords (EN):** RA is "closed" (output is always a relation → composable); read RA expressions **inside-out** (leaf → root); complete set `{σ, π, ∪, −, ×}`; σ = filter rows; π = choose columns removes duplicates (set semantics); ∪/∩/− need union-compatibility; − NOT commutative; ∪/∩ commutative; × no union-compat required; join = `σ_θ(R × S)`; natural join = same-named columns keep one copy; division = "for all/every"; 𝓕 = aggregate with grouping attrs left; outer join keeps unmatched tuples with NULL; outer union pads NULL when not union-compatible; `query tree` = tree where leaves are relations and internal nodes are RA operators, executed leaf→root; `assignment ←` names intermediate results; `UNIQUE(Q)` returns TRUE iff Q has no duplicate tuples.

---

### 4.2. Tính chất quan trọng & Kích thước

```
σ giao hoán ✅   π KHÔNG ❌   − KHÔNG ❌   × ✅   ⋈ INNER ✅   OUTER JOIN KHÔNG ❌

∪ / ∩ / −  ĐÒI union-compatible (cùng số cột + kiểu tương thích)
× / ⋈       KHÔNG đòi union-compatible

Cascade:   σ_C1(σ_C2(R)) = σ_{C1 AND C2}(R)          -- commutes
Cascade:   σ_C(R ∪ S)   = σ_C(R) ∪ σ_C(S)
           σ_C(R × S)   = σ_C(R) × S     (nếu C chỉ thuộc R)
           π_X(π_Y(R))  = π_X(R)  nếu X ⊆ Y

Kích thước:
  |σ_C(R)|      ≤ |R|
  |π_L(R)|      ≤ |R|;  = |R| nếu L chứa key của R
  |R × S|       = |R| · |S|
  degree(R × S) = degree(R) + degree(S)

Complete set:
  R ∩ S   = R − (R − S)
  R ⋈_θ S = σ_θ(R × S)

Assignment (đặt tên trung gian):
  DEP5_EMPS ← σ_{DNO=5}(EMPLOYEE)
  RESULT    ← π_{FNAME,LNAME}(DEP5_EMPS)
  -- Giúp viết biểu thức dài thành chuỗi bước tường minh
```

> 🔥 **RA closed:** mọi toán tử nhận relation → trả relation → có thể lồng phép tùy ý.

---

### 4.3. SELECT σ vs PROJECT π vs SQL SELECT

| Chiều | RA | SQL |
|---|---|---|
| Lọc DÒNG | `σ_cond(R)` | `WHERE cond` |
| Chọn CỘT + loại trùng | `π_L(R)` | `SELECT DISTINCT L` |
| Chọn CỘT **giữ trùng** | *(không có — RA là set)* | `SELECT L` (multiset) |

> 🔥 **Bẫy cổ điển:** RA `σ` (SELECT) = lọc **hàng**, KHÔNG phải chọn cột như SQL `SELECT`.
> 🔥 **`|RA result| ≤ |SQL result|`** — RA π loại duplicate tự động; SQL `SELECT` giữ multiset.

---

### 4.4. JOIN biến thể — bẫy tên cột

| Loại JOIN | Cách hoạt động | Cột bằng nhau |
|---|---|---|
| **Theta** `R ⋈_θ S` | `σ_θ(R × S)` với θ bất kỳ | Giữ cả 2 cột |
| **Equijoin** `R ⋈_{R.A=S.B} S` | θ chỉ là `=` | **Giữ cả 2 cột bằng** |
| **Natural** `R * S` | Tự nối cột **cùng tên** | **Bỏ 1 cột trùng (giữ 1)** |

> 🔥 **NATURAL JOIN trap:** `EMPLOYEE.SSN ≠ WORKS_ON.ESSN` → natural join **không nối** (khác tên). Phải dùng `EMPLOYEE ⋈_{SSN=ESSN} WORKS_ON`.
>
> 🔥 `PROJECT.Dnum ≠ DEPARTMENT.Dnumber` → natural join **sai hoàn toàn** cho bộ Company DB.
>
> ✅ Giải pháp: dùng `⋈_{cond}` hoặc `ρ` đổi tên trước rồi dùng natural join.

---

### 4.5. Division ÷ — "với mọi / for all / every"

**Cú pháp:** `R(Y, X) ÷ S(X) = T(Y)` — trả về tuple t ∈ Y sao cho **∀s ∈ S: (t, s) ∈ R**.

**Nhận diện:** từ khoá *all, every, tất cả, mọi* trong đề bài.

**Ví dụ:** `STUDENT_COURSE ÷ COURSE` = sinh viên đã học **tất cả** môn trong COURSE.

**Worked step-by-step (HK191-Q20):** `Students(Code,CNo) ÷ Courses(CNo)` với `Courses = {DB, DM, OS}`:

| Code | Môn đã học | Có đủ {DB,DM,OS}? |
|---|---|---|
| 1111 | DB, DM, OS | ✅ → vào kết quả |
| 1112 | DB | ✗ thiếu DM, OS → loại |
| 1113 | DM, OS, DB | ✅ → vào kết quả |
| 1114 | DM | ✗ thiếu DB, OS → loại |

**Kết quả: {1111, 1113}**

**Công thức tường minh (không dùng ÷):**
```
R ÷ S = π_Y(R) − π_Y( (π_Y(R) × S) − R )
      = "mọi ứng viên" − "ứng viên bị thiếu ít nhất 1 yêu cầu"
```

**SQL equivalent:** `double NOT EXISTS`:
```sql
SELECT s.Code FROM Students s
WHERE NOT EXISTS (
  SELECT * FROM Courses c
  WHERE NOT EXISTS (
    SELECT * FROM Students sc
    WHERE sc.Code = s.Code AND sc.CNo = c.CNo
  )
);
-- Students(Code,CNo) ÷ Courses(CNo) → {1111, 1113}  (Q32 / Q40)
```

---

### 4.6. Aggregate 𝓕 — nhận diện "for each / per"

**Cú pháp:** `<grouping_cols> 𝓕_{fn_list}(R)` — grouping attrs **bên trái** 𝓕.

| Tín hiệu đề | Toán tử |
|---|---|
| *"for each / in each / mỗi / từng X"* | Có grouping attr X bên trái 𝓕 |
| Không có nhóm | `𝓕_{count Ssn}(Employee)` → 1 dòng kết quả |

| Function | Quy tắc NULL |
|---|---|
| `COUNT(*)` | Đếm **tất cả** dòng, kể cả NULL |
| `COUNT(col)` | Chỉ đếm `IS NOT NULL` |
| `SUM`, `AVG`, `MAX`, `MIN` | **Discard NULL** tự động |

> 🔥 **Sau OUTER JOIN:** dùng `COUNT(col)` không `COUNT(*)` để trả về 0 cho tuple không match (NULL từ outer join).

---

### 4.7. OUTER JOIN & OUTER UNION

- `R ⟕ S` LEFT: giữ **mọi tuple R**, pad NULL phía S nếu không match.
- `R ⟖ S` RIGHT: giữ mọi tuple S.
- `R ⟗ S` FULL: giữ cả 2, pad NULL cả 2 phía.

> 🔥 **`R ⟕ S = S ⟖ R`** — LEFT của R = RIGHT của S (đề thường hỏi dạng này).

> 🔥 **INNER = RIGHT OUTER khi nào? (HK191-Q32):** Xét `Employee E ⋈_{E.Superssn=S.Ssn} Employee S`. RIGHT OUTER giữ mọi S (supervisor) và pad NULL cho S nào không có ai báo cáo. Nếu **mọi nhân viên đều là supervisor** (không ai có `Superssn=NULL`) → không có tuple bị pad NULL → INNER JOIN ≡ RIGHT OUTER JOIN. Ngược lại, nếu tồn tại nhân viên `Superssn=NULL` → INNER bỏ dòng đó còn RIGHT OUTER giữ → **khác nhau**.

**OUTER UNION** `R ⊌ S`: dùng khi R và S **không** union-compatible. Cột chung gộp bình thường, cột riêng pad NULL cho phía thiếu.

```
STUDENT(Name, Age, GPA) ⊌ INSTRUCTOR(Name, Age, Salary)
→ kết quả: (Name, Age, GPA, Salary)
  Student rows:     Salary = NULL
  Instructor rows:  GPA    = NULL
```

---

### 4.8. RA vs Relational Calculus

| Tiêu chí | Relational Algebra | Relational Calculus |
|---|---|---|
| Bản chất | **Procedural** (HOW) | **Non-procedural** (WHAT) |
| Dạng | Chuỗi phép toán | Biểu thức điều kiện logic |
| Ví dụ | `π_Fname(σ_{Dno=5}(Employee))` | `{t.Fname \| Employee(t) ∧ t.Dno=5}` |
| Biến | — | Tuple Calc: 1 biến/dòng; Domain Calc: n biến cho degree n |

**3 ngôn ngữ tương đương biểu đạt:** RA ≡ Tuple Calculus ≡ Domain Calculus.

**Bound vs Free variable (Tuple Calculus):** Tuple variable `t` là **bound** nếu nằm trong phạm vi lượng từ `∃(t)` hoặc `∀(t)`; ngược lại là **free**. Trong biểu thức `{t.Fname | Employee(t) ∧ ∃s(Department(s) ∧ s.Mgr=t.Ssn)}`, `t` là free (xác định output), `s` là bound (nằm trong ∃s).

> 🔥 **RA = procedural; Calculus = non-procedural** — câu hỏi phân biệt xuất hiện thường xuyên (Q17, Q19).
>
> 🔥 **Recursive closure** (chuỗi supervisor, tổ tiên) **KHÔNG** tính được bằng RA cơ bản → cần `SQL3 WITH RECURSIVE`.

---

### 4.9. Query Tree (Expression Tree)

🔑 **`query tree`** — cấu trúc cây biểu diễn một biểu thức RA:
- **Leaf node:** quan hệ đầu vào (base relations).
- **Internal node:** phép toán RA (σ, π, ⋈, …).
- **Thực thi:** từ leaf lên root (inside-out).

```
        π_{Fname, Lname}
               |
         σ_{Dno=5}
               |
           Employee
```
*Ví dụ:* `π_{Fname,Lname}(σ_{Dno=5}(Employee))` — đọc từ dưới lên: (1) lấy Employee, (2) lọc Dno=5, (3) project Fname/Lname.

```
         π_{Fname}
               |
           ⋈_{SSN=ESSN}
          /             \
    Employee          WORKS_ON
```

> Query tree là nền tảng của **query optimization**: DBMS viết lại cây (đẩy σ xuống leaf, kết hợp π) để tối ưu chi phí trước khi thực thi.

---

### 4.10. Recognition Guide — nhận diện → chọn toán tử

| Dấu hiệu đề bài | Toán tử RA |
|---|---|
| *"for each / per / mỗi / từng X"* | `X 𝓕_{func}(R)` — group by X |
| *"do not / no / without / không"* | Set difference `−` (project cả 2 vế cùng schema trước) |
| *"for all / every / tất cả / mọi"* | Division `÷` hoặc `double NOT EXISTS` |
| Cần chỉ cột employee nhưng join lộ cột Department | Phải `π` về đúng cột employee sau join |

---

### 4.11. Canonical Worked Patterns

**Pattern 1 — Average salary của female employees theo từng department:**
```
_{Dno} 𝓕_{average Salary}( σ_{Sex='F'}(Employee) )
```
Bước: (1) σ lọc nữ → (2) group by Dno → (3) tính AVG(Salary). ✅ Đáp án Q4.

**Pattern 2 — Employees không làm project nào:**
```
π_{SSN, Fname, Minit, Lname}(Employee)
  − π_{SSN, Fname, Minit, Lname}(Employee ⋈_{SSN=ESSN} WORKS_ON)
```
Bước: (1) tất cả emp → (2) emp có trong WORKS_ON → (3) trừ. Hai vế `−` **phải cùng schema**. ✅ Đáp án Q2, Q9.

**Pattern 3 — Số dependents của manager từng department:**
```
_{Mgr_ssn} 𝓕_{count Dependent_name}(Department ⋈_{Mgr_ssn=Essn} Dependent)
```
Grouping attr = `Mgr_ssn`; function = `count Dependent_name` (tên cụ thể, không dùng `count` trống). ✅ Đáp án Q6.

**Pattern 4 — Tổng giờ làm từng project:**
```
_{Pname} 𝓕_{sum Hours}(Project ⋈_{Pnumber=Pno} WORKS_ON)
```
Grouping = `Pname`; function = `sum Hours`. ✅ Đáp án Q8.

**Pattern 5 — Emp dept 5 làm >10h trên project ProductX:**
```
π_{SSN, Fname, Lname}(
  σ_{DNo=5}(Employee)
  ⋈_{SSN=ESSN} (σ_{Hours>10}(WORKS_ON) ⋈_{Pno=Pnumber} σ_{PName='ProductX'}(Project))
)
```
Phải dùng `⋈_{cond}` (SSN≠ESSN, Pno≠Pnumber) — natural join sai. ✅ Đáp án Q7.

**Pattern 6 — Emp có tổng giờ >1000:**
```
π_{Fname, Lname}(
  σ_{sum_hours>1000}(
    (_{Essn} 𝓕_{sum Hours}(WORKS_ON)) ⋈_{Essn=SSN} Employee
  )
)
```
Aggregate **trước** rồi σ lọc trên alias `sum_hours`, sau đó join Employee. ✅ Đáp án Q42.

**Pattern 7 — Natural join với MCQ Q16:**
```
R(A,B,C) * S(A,C) → T(A,B,C)  (nối trên A và C đồng thời)
Kết quả giữ các row thỏa A và C khớp cả 2 → 6 rows (C đáp án Q16)
```

---

### 4.12. SQL ↔ RA So sánh nhanh

| SQL | RA tương đương | Ghi chú |
|---|---|---|
| `SELECT A, C FROM R WHERE B=1` | `π_{A,C}(σ_{B=1}(R))` | `\|SQL\| ≥ \|RA\|` vì SQL giữ duplicates |
| `SELECT dno, AVG(salary) FROM Employee GROUP BY dno` | `_{dno} 𝓕_{average salary}(Employee)` | Tương đương Q43C ✅ |
| `SELECT * FROM A, B` (không WHERE) | `A × B` (Cartesian product!) | Bẫy: thiếu join condition |
| `SELECT DISTINCT A, C FROM R WHERE B=1` | `π_{A,C}(σ_{B=1}(R))` | Hoàn toàn tương đương |

> 🔥 **Q38/Q13:** `π_{A,C}(σ_{B=1}(R))` vs `SELECT A, C FROM R WHERE B=1` → `|RA| ≤ |SQL|` — RA loại duplicate, SQL không. Nếu {A,C} chứa key thì `|RA| = |SQL|`.

---

### 🎯 MCQ Traps §4

1. 🔥 **σ = lọc HÀNG** (không phải chọn cột như SQL SELECT) — bẫy thường ra đề (Q19).
2. 🔥 **Natural join `*` xét TÊN CỘT**, không xét foreign key: `SSN ≠ ESSN`, `Dnum ≠ Dnumber` → natural join sai (Q1, Q5, Q7, Q10 — xuyên suốt BK-LMS quiz).
3. 🔥 **π loại trùng tự động (set); SQL SELECT giữ multiset → `|RA| ≤ |SQL|`** (Q13, Q38).
4. 🔥 **Set ops (∪/∩/−) đòi union-compatible; × và ⋈ KHÔNG** — câu hỏi phân biệt ra nhiều lần (Q33, Q34, Q35, Q37).
5. 🔥 **`R − S ≠ S − R`** — difference KHÔNG giao hoán.
6. 🔥 **`∪/∩/−`: tên cột lấy theo toán hạng ĐẦU (R1)**, không phải R2.
7. 🔥 **Aggregate `𝓕`: grouping attr bên TRÁI 𝓕**; thiếu grouping → 1 dòng toàn cục (Q4, Q6, Q8).
8. 🔥 **Division ÷ = "for all/every"**; SQL equivalent = `double NOT EXISTS`; kết quả HK191-Q20: `{1111, 1113}` (Q15, Q28, Q32, Q40).
9. 🔥 **`R ⟕ S = S ⟖ R`** — LEFT outer của R = RIGHT outer của S.
10. 🔥 **`COUNT(*)` đếm dòng (kể NULL); `COUNT(col)` discard NULL** — quan trọng sau OUTER JOIN.
11. 🔥 **`|R × S| = |R|·|S|`; `degree(R×S) = degree(R) + degree(S)`** — tính cardinality và degree (Q39).
12. 🔥 **RA = procedural (HOW); Calculus = non-procedural (WHAT)** — tương đương biểu đạt nhưng khác bản chất (Q17).
13. 🔥 **INNER = RIGHT OUTER iff mọi nhân viên đều là supervisor** (không có Superssn=NULL); nếu tồn tại Superssn=NULL → INNER ≠ RIGHT OUTER (HK191-Q32).
14. 🔥 **Bound variable** nằm trong ∃/∀; **free variable** xuất hiện ngoài lượng từ (xác định output của biểu thức calculus).

---

### 🪄 Câu thần chú §4

1. **σ cắt HÀNG — π cắt CỘT (loại trùng tự động) — ρ đổi tên**.
2. **∪/∩/− đòi union-compatible; × và ⋈ KHÔNG cần**.
3. **Complete set = {σ, π, ∪, −, ×}** — đủ suy ra mọi toán tử còn lại.
4. **Natural join = cùng TÊN CỘT, bỏ cột trùng; Equijoin = cùng GIÁ TRỊ (=), giữ cả 2 cột**.
5. **Division = "với mọi" = double `NOT EXISTS`**.
6. **"for each/per" → grouping 𝓕; "do not/without" → set diff −; "for all/every" → ÷**.
7. **RA closed: output luôn là relation → lồng phép tùy ý**.
8. **`|RA π| ≤ |SQL SELECT|` — RA là set, SQL là multiset**.
9. **OUTER JOIN giữ tuple không match + pad NULL; INNER bỏ**.
10. **`R ⟕ S = S ⟖ R`** (LEFT của R = RIGHT của S).
11. **Aggregate: fn arg cụ thể (`count Ssn`), không bỏ trống; group attr bên TRÁI 𝓕**.
12. **Recursive closure cần `SQL3 WITH RECURSIVE` — RA cơ bản không tính được**.
13. **Query tree: leaf = relation, internal = operator, thực thi leaf→root**.
14. **Assignment `←` đặt tên trung gian, giúp viết biểu thức dài thành chuỗi bước**.

---

## §5. SQL — Trọng số đề: 9 câu 🔥🔥

### 5.1 Bản chất SQL: Declarative + Bag/Multiset

🔑 **Keywords (EN):** `SQL = declarative`, `bag / multiset`, `DISTINCT`, `set vs. multiset`, `DDL / DML / DCL / TCL`

SQL khác Relational Algebra ở chỗ:
- **RA relation = set** → không có tuple trùng.
- **SQL table / result = bag (multiset)** → có thể có dòng trùng.
- `SELECT Salary FROM Employee;` → có thể trả về nhiều dòng cùng giá trị.
- `SELECT DISTINCT Salary FROM Employee;` → loại trùng, tương đương `π` trong RA.

| Nhóm | Lệnh | Mô tả |
|---|---|---|
| DDL | `CREATE`, `ALTER`, `DROP` | Định nghĩa / sửa / xóa cấu trúc |
| DML | `SELECT`, `INSERT`, `UPDATE`, `DELETE` | Truy vấn + thao tác dữ liệu |
| DCL | `GRANT`, `REVOKE` | Phân quyền |
| TCL | `COMMIT`, `ROLLBACK`, `SAVEPOINT` | Quản lý transaction (một số slide gom vào DCL) |

---

### 5.2 DDL: CREATE TABLE, Data Types, Constraints

🔑 **Keywords (EN):** `CREATE TABLE`, `CHAR(n)`, `VARCHAR(n)`, `DECIMAL(p,s)`, `DATE`, `TIMESTAMP`, `NOT NULL`, `DEFAULT`, `CHECK`, `UNIQUE`, `PRIMARY KEY`, `FOREIGN KEY`, `REFERENCES`, `ON DELETE`, `ON UPDATE`, `CASCADE`, `SET NULL`, `SET DEFAULT`, `NO ACTION`, `RESTRICT`, `INTERVAL`, `BIT(n)`, `BIT VARYING(n)`, `BOOLEAN`, `CHAR VARYING(n)`, `CREATE DOMAIN`, `CONSTRAINT`

```sql
CREATE TABLE Department (
    Dname   VARCHAR(15) NOT NULL,
    Dnumber INT         NOT NULL,
    Mgr_ssn CHAR(9)     NOT NULL,
    Mgr_start_date DATE,
    PRIMARY KEY (Dnumber),
    UNIQUE (Dname),
    FOREIGN KEY (Mgr_ssn) REFERENCES Employee(Ssn)
        ON DELETE SET NULL ON UPDATE CASCADE
);
```

**Chọn kiểu dữ liệu đúng:**

| Dữ liệu | Nên dùng | Lý do |
|---|---|---|
| SSN / CCCD | `CHAR(9)` | Giữ số 0 đầu, độ dài cố định |
| Tên / địa chỉ | `VARCHAR(n)` | Độ dài thay đổi (`CHAR VARYING(n)` = `CHARACTER VARYING(n)` = synonym) |
| Lương / tiền | `DECIMAL(10,2)` | Chính xác, không làm tròn như FLOAT |
| Ngày | `DATE` | Chỉ ngày |
| Ngày + giờ | `TIMESTAMP` | DATE + TIME |
| Khoảng thời gian | `INTERVAL` | Giá trị tương đối để +/− date/time |
| Cờ nhị phân | `BIT(n)` / `BIT VARYING(n)` | Chuỗi bit cố định / thay đổi |
| Logic | `BOOLEAN` | TRUE / FALSE / NULL |

**Referential Actions — bẫy quan trọng:**

| Action | Khi parent bị xóa / update |
|---|---|
| `RESTRICT` / `NO ACTION` | Không cho nếu còn child |
| `CASCADE` | Lan truyền sang child |
| `SET NULL` | FK của child → NULL |
| `SET DEFAULT` | FK của child → DEFAULT |

> **Bẫy:** `ON DELETE CASCADE` khai báo ở **bảng con** (bảng chứa FK), không phải bảng cha. `DROP TABLE Department CASCADE` ≠ `ON DELETE CASCADE` — DROP CASCADE loại bỏ cả lược đồ phụ thuộc, không phải hành động referential.

**Ví dụ QUIZ 6 Q10 — đọc kỹ FK chain:** với `Employee.Dno → Department ON DELETE CASCADE` và `Project.Dnum → Department ON DELETE CASCADE`, khi `DELETE FROM Department WHERE Dnumber = 4` → Department, tất cả Employee có Dno=4 **và** tất cả Project có Dnum=4 đều bị xóa theo.

**QUIZ 6 Q15 — ALTER TABLE ADD UNIQUE:**
```sql
ALTER TABLE Employee ADD Experience int UNIQUE;  -- CÓ THỂ LỖI
```
Nếu bảng đã có dữ liệu, thêm cột với `UNIQUE` mà không có `DEFAULT` → nhiều dòng nhận NULL → **lỗi vi phạm UNIQUE** (trong quy ước SQL Server, nhiều NULL bị coi là vi phạm). Ngược lại, `ADD Experience int DEFAULT 1` hoặc `ADD Experience int NULL` thành công. `CHECK (Experience > 1)` **không** chặn NULL vì `NULL > 1 = UNKNOWN` (không phải FALSE).

**CREATE DOMAIN — tái sử dụng kiểu dữ liệu:**
```sql
CREATE DOMAIN SSN_TYPE AS CHAR(9)
    CHECK (VALUE REGEXP '[0-9]{9}');
-- Dùng lại: Ssn SSN_TYPE NOT NULL
```
`CREATE DOMAIN DomainName AS DataType [CHECK(...)]` định nghĩa domain do người dùng tạo, tái dùng cho nhiều cột.

**Đặt tên ràng buộc để sau này DROP được:**
```sql
ALTER TABLE Employee
    ADD CONSTRAINT chk_salary CHECK (Salary > 0);
-- Để xóa: ALTER TABLE Employee DROP CONSTRAINT chk_salary;
```
`CONSTRAINT <name> ...` giúp `ALTER TABLE ... DROP CONSTRAINT <name>` sau này.

**DROP SCHEMA:**
```sql
DROP SCHEMA Company CASCADE;   -- xóa cả nội dung bên trong
DROP SCHEMA Company RESTRICT;  -- chỉ xóa nếu schema rỗng
```

---

### 5.3 Thứ tự xử lý logic SELECT và WHERE vs HAVING

🔑 **Keywords (EN):** `FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY`, `aggregate filter → HAVING`

```
FROM → (ON / JOIN) → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT
```

**Hệ quả:**
- `WHERE` lọc **tuple trước** khi group; `HAVING` lọc **group sau** khi aggregate.
- Không được dùng aggregate trực tiếp trong `WHERE`:
  - `WHERE COUNT(*) > 2` ❌ → `GROUP BY … HAVING COUNT(*) > 2` ✅
- `WHERE` không thấy alias đặt trong `SELECT`.
- Cột không aggregate trong `SELECT` **bắt buộc** có trong `GROUP BY`.
- **Mệnh đề tối thiểu:** chỉ `SELECT` (thường kèm `FROM`) là bắt buộc; `WHERE / GROUP BY / HAVING / ORDER BY` là OPTIONAL. SQL Server cho phép `SELECT 1+1` không cần FROM (HK241-Q1, F2024).

```sql
-- QUIZ 6 Q8: xóa nhân viên làm < 20 giờ trên tất cả project
DELETE FROM Employee
WHERE SSN IN (
    SELECT ESSN FROM Works_on
    GROUP BY ESSN
    HAVING SUM(Hours) < 20
);
-- Sai: WHERE SUM(Hours) < 20  -- aggregate không được trong WHERE
-- Sai: DELETE Employee WHERE ...  -- thiếu FROM
-- Sai: WHERE SSN = (SELECT ...)  -- subquery trả nhiều dòng → dùng IN không dùng =
```

**QUIZ 6 Q11 — kiểu cũ vs JOIN:**
```sql
-- kiểu cũ (tương đương INNER JOIN):
SELECT dno, count(Super_SSN), min(Salary), avg(Salary), max(Salary)
FROM Employee, Works_on, Project
WHERE SSN = Essn AND Pno = Pnumber AND Pname = 'ProductY'
GROUP BY dno
HAVING count(Super_SSN) >= 2;
-- Đúng tương đương:
FROM (Employee JOIN Works_on ON SSN=Essn) JOIN Project ON Pno = Pnumber
WHERE Pname = 'ProductY'
GROUP BY dno HAVING count(Super_SSN) >= 2;
```

| Clause | Lọc gì | Dùng aggregate trực tiếp? |
|---|---|---|
| `WHERE` | Tuple trước GROUP BY | **KHÔNG** |
| `HAVING` | Group sau GROUP BY | **CÓ** |

---

### 5.4 JOIN: INNER, OUTER, NATURAL JOIN, Self-Join

🔑 **Keywords (EN):** `INNER JOIN`, `LEFT OUTER JOIN`, `RIGHT OUTER JOIN`, `FULL OUTER JOIN`, `NATURAL JOIN`, `Cartesian product`, `self-join`, `LEFT JOIN … WHERE rightKey IS NULL`, `tuple variable`, `alias`

- **Thiếu join condition** → **Cartesian product** (tích Đề-các): N×M dòng.
- **Old-style** `FROM A, B WHERE A.k = B.k` ≡ `A JOIN B ON A.k = B.k` (INNER JOIN).
- **LEFT JOIN** giữ tất cả dòng bên trái, bên phải NULL nếu không match.
- **`LEFT JOIN … WHERE rightKey IS NULL`** = anti-join = "A không có B nào tương ứng".

```sql
-- Nhân viên không có dependent:
SELECT E.Fname FROM Employee E
LEFT JOIN Dependent D ON E.Ssn = D.Essn
WHERE D.Essn IS NULL;
```

- **NATURAL JOIN** tự nối cột **cùng tên** — không hiểu FK. Trong COMPANY: `Employee.Ssn ≠ Works_on.Essn` nên `Employee NATURAL JOIN Works_on` **SAI**; đúng là `JOIN Works_on ON Ssn = Essn`.
- **Self-join** luôn cần alias:

```sql
SELECT E.Fname AS EmpName, S.Fname AS SupervisorName
FROM Employee E LEFT JOIN Employee S ON E.Super_ssn = S.Ssn;
```

- **Tuple variable / alias đổi tên cột:** `FROM Employee AS E(FN, M, LN, SSN, ...)` — `E`, `S` là "tuple variables"; dạng này đổi tên cả cột trong phạm vi truy vấn.

**OUTER JOIN COUNT(\*) trap:**
```sql
-- Sai: employee không có dependent vẫn COUNT=1 (dòng padding NULL):
SELECT E.Ssn, COUNT(*) FROM Employee E
LEFT JOIN Dependent D ON E.Ssn = D.Essn GROUP BY E.Ssn;

-- Đúng: đếm dependent thực sự:
SELECT E.Ssn, COUNT(D.Dependent_name) FROM Employee E
LEFT JOIN Dependent D ON E.Ssn = D.Essn GROUP BY E.Ssn;
```

---

### 5.5 NULL và 3-valued Logic

🔑 **Keywords (EN):** `NULL`, `IS NULL`, `IS NOT NULL`, `3-valued logic`, `TRUE / FALSE / UNKNOWN`

- **`WHERE Salary = NULL` → SAI** → luôn dùng `IS NULL` / `IS NOT NULL`.
- Trong `WHERE` chỉ giữ lại dòng có điều kiện = **TRUE**; FALSE và **UNKNOWN** đều bị loại.

```
TRUE AND UNKNOWN  = UNKNOWN
FALSE AND UNKNOWN = FALSE
TRUE OR UNKNOWN   = TRUE
FALSE OR UNKNOWN  = UNKNOWN
NOT UNKNOWN       = UNKNOWN
```

- `CHECK (Experience > 1)` **không chặn NULL** vì `NULL > 1 = UNKNOWN`.
- `AVG(Salary)` bỏ qua NULL tự động; `SUM(Salary) / COUNT(*)` **sai** khi Salary có NULL.

---

### 5.6 Subquery: IN, EXISTS, Correlated, ANY/ALL

🔑 **Keywords (EN):** `IN`, `NOT IN`, `EXISTS`, `NOT EXISTS`, `correlated subquery`, `ANY`, `SOME`, `ALL`, `> ALL ≡ > MAX`, `> ANY ≡ > MIN`, `= ANY ≡ IN`, `UNIQUE(Q)`

```sql
-- IN: subquery không correlated
SELECT Fname FROM Employee
WHERE Dno IN (SELECT Dnumber FROM Department WHERE Dname='Research');

-- EXISTS: correlated (tham chiếu outer)
SELECT E.Fname FROM Employee E
WHERE EXISTS (
    SELECT * FROM Dependent D
    WHERE D.Essn = E.Ssn AND D.Dependent_name = E.Fname
);
```

- Subquery trả **nhiều dòng** → dùng `IN`, không dùng `=` (sẽ runtime error).
- `NOT EXISTS` an toàn hơn `NOT IN` khi subquery có thể trả NULL.
- **`UNIQUE(Q)`** — hàm SQL trả TRUE nếu subquery Q không có tuple trùng (kiểm tra tính duy nhất của kết quả).

| Biểu thức | Trực giác | Tương đương |
|---|---|---|
| `x > ALL(Q)` | x lớn hơn mọi phần tử | `x > MAX(Q)` |
| `x > ANY(Q)` | x lớn hơn ít nhất 1 | `x > MIN(Q)` |
| `x = ANY(Q)` | x thuộc tập Q | `x IN (Q)` |
| `x <> ALL(Q)` | x khác tất cả | `x NOT IN (Q)` |

**QUIZ 6 Q4 — salary > max Research:**
```sql
SELECT ssn, fname, lname, dnumber, dname
FROM Employee JOIN Department ON dno = dnumber
WHERE salary > ALL (
    SELECT salary FROM Employee JOIN Department ON dno=dnumber
    WHERE dname='Research'
);
-- "> ALL" ≡ "> MAX". KHÔNG dùng ">= MAX" (sẽ bao gồm cả đúng bằng max).
-- KHÔNG dùng "IN (SELECT MAX...)" (IN kiểm tra = chứ không phải >).
```

**QUIZ 6 Q9 — EXISTS vs COUNT = 1:**
```sql
-- Đúng: "có ít nhất 1 project" dùng EXISTS:
AND EXISTS (SELECT * FROM Works_on WHERE essn = ssn);
-- Sai: AND (SELECT count(*) FROM Works_on WHERE essn = ssn) = 1;
-- → "= 1" là "đúng 1 project", không phải "ít nhất 1".
```

---

### 5.7 Pattern "Không có" và "Tất cả" (Double NOT EXISTS)

🔑 **Keywords (EN):** `NOT EXISTS`, `double NOT EXISTS`, `relational division`, `set difference`, `"for all" pattern`

**Pattern "không có" (anti-join):**
```sql
-- Nhân viên không có dependent:
SELECT E.Fname FROM Employee E
WHERE NOT EXISTS (SELECT * FROM Dependent D WHERE D.Essn = E.Ssn);
```

**Pattern "tất cả" — double NOT EXISTS (quan trọng nhất §5):**
```sql
-- QUIZ 6 Q6: nhân viên làm TẤT CẢ project của Research department
SELECT *
FROM Employee
WHERE NOT EXISTS (
    SELECT * FROM PROJECT JOIN DEPARTMENT ON dnum=dnumber
    WHERE dname='Research'
      AND pnumber NOT IN (SELECT pno FROM Works_on WHERE essn=ssn)
);
```
Đọc: *"Không tồn tại project Research nào mà nhân viên này CHƯA làm"* → tức là đã làm **tất cả** project Research.

**Lưu ý quan trọng:** Điều kiện này **không** yêu cầu nhân viên thuộc Research — nó chỉ kiểm tra nhân viên nào đã làm hết các project do Research kiểm soát. Điều kiện là về **project's controlling department**, không phải department của employee.

Phiên bản double NOT EXISTS chuẩn:
```sql
SELECT E.Ssn FROM Employee E
WHERE NOT EXISTS (
    SELECT * FROM Project P
    JOIN Department D ON P.Dnum = D.Dnumber
    WHERE D.Dname = 'Research'
    AND NOT EXISTS (
        SELECT * FROM Works_on W
        WHERE W.Essn = E.Ssn AND W.Pno = P.Pnumber
    )
);
-- Đọc lớp ngoài: "không có project Research nào …"
-- Đọc lớp trong: "… mà không có dòng Works_on chứng minh E làm project đó"
```

---

### 5.8 Set Operations: UNION, INTERSECT, EXCEPT

🔑 **Keywords (EN):** `UNION`, `UNION ALL`, `INTERSECT`, `EXCEPT`, `compatible columns`, `duplicate elimination`

```sql
UNION / INTERSECT / EXCEPT       -- mặc định loại trùng
UNION ALL / INTERSECT ALL / EXCEPT ALL   -- giữ trùng (multiset)
```

- Hai SELECT phải có **cùng số cột** + kiểu tương thích theo vị trí.
- `SELECT` mặc định **KHÔNG** loại trùng; `UNION` thì **có**.
- **`UNION ALL` nhanh hơn `UNION`** vì bỏ qua bước khử trùng — ưu tiên khi cần tốc độ và chấp nhận duplicate.

**QUIZ 6 Q5 — UNION đặt bên trong IN:**
```sql
-- Đúng: UNION nằm trong subquery của IN:
SELECT * FROM Employee
WHERE dno IN (
    SELECT dnumber FROM Dept_locations WHERE dlocation LIKE 'Houston'
    UNION
    SELECT dnum FROM Project WHERE plocation LIKE 'Houston'
);
-- Sai: UNION dùng riêng với SELECT * (UNION ALL giữ trùng → trả duplicate employees).
```

---

### 5.9 Aggregate Functions và GROUP BY

🔑 **Keywords (EN):** `COUNT(*)`, `COUNT(col)`, `SUM`, `AVG`, `MIN`, `MAX`, `GROUP BY`, `HAVING`, `NULL discard`

| Function | Xử lý NULL |
|---|---|
| `COUNT(*)` | Đếm **tất cả dòng** kể cả dòng chứa NULL |
| `COUNT(col)` | **Bỏ** dòng có NULL ở col |
| `COUNT(DISTINCT col)` | Bỏ NULL + đếm distinct |
| `SUM / AVG / MIN / MAX(col)` | **Bỏ** NULL tự động |

- Cột không aggregate trong `SELECT` **phải nằm** trong `GROUP BY`.
- `AVG(Salary)` bỏ NULL — `SUM(Salary)/COUNT(*)` sai khi có NULL.

---

### 5.10 INSERT / UPDATE / DELETE

🔑 **Keywords (EN):** `INSERT INTO`, `INSERT INTO … SELECT`, `UPDATE SET`, `DELETE FROM`, `subquery in UPDATE`, `referential integrity`, `ON DELETE CASCADE`

```sql
-- INSERT đúng cột:
INSERT INTO Department VALUES ('Marketing', 10, '123456789', '2000-10-10');
-- Mgr_ssn phải là SSN hợp lệ trong Employee → nếu '123456789' không tồn tại → lỗi FK.

-- INSERT … SELECT — bulk insert nhiều tuple từ kết quả query:
INSERT INTO HighEarner(Ssn, Fname, Salary)
SELECT Ssn, Fname, Salary FROM Employee WHERE Salary > 50000;

-- UPDATE với subquery (QUIZ 6 Q3):
DECLARE @avg FLOAT;
SET @avg = (SELECT average(Salary) FROM Employee);  -- AVG của TOÀN CÔNG TY
UPDATE Employee SET Salary = @avg
WHERE Dno = (SELECT Dnumber FROM Department WHERE Dname='Research');
-- Sai nếu tính AVG của Research rồi gán cho Research → đệ quy tham chiếu.

-- UPDATE có thể vi phạm: PK (trùng key), FK (không tồn tại), NOT NULL, CHECK.
-- DELETE FROM Employee;  -- xóa TOÀN BỘ dữ liệu, bảng cấu trúc vẫn còn.
-- DROP TABLE Employee;   -- xóa cả cấu trúc.
```

**DELETE NOT IN — xóa dòng cha không được tham chiếu:**
```sql
-- Xóa Department không có nhân viên nào:
DELETE FROM Department
WHERE Dnumber NOT IN (SELECT Dno FROM Employee);
-- Luôn hợp lệ bất kể ON DELETE setting — chỉ xóa dòng không bị tham chiếu (HK211-Q4).
```

**QUIZ 6 Q1 — UPDATE nào chạy được:**
- `UPDATE Department SET Dnumber = 1 WHERE Dname = 'Research';` → **Sai**: Dnumber là PK được Employee và Project reference → không thể đổi nếu không có `ON UPDATE CASCADE`.
- `UPDATE Employee SET Dno = NULL WHERE Super_ssn IS NULL;` → **Sai**: `Dno INT NOT NULL` → không cho NULL.
- `UPDATE Employee SET Salary = 45000, Dno = 1 WHERE Dno = (SELECT Dnumber FROM Department WHERE Dname='Research');` → **Đúng**.

---

### 5.11 VIEW và WITH CHECK OPTION

🔑 **Keywords (EN):** `CREATE VIEW`, `WITH CHECK OPTION`, `WITH CASCADED CHECK OPTION`, `WITH LOCAL CHECK OPTION`, `updatable view`, `view for security`, `CASE WHEN`, `mask not delete rows`, `view auto-reflect`

```sql
CREATE VIEW EMP_D5 AS
SELECT Ssn, Fname, Salary, Dno FROM Employee WHERE Dno = 5
WITH CHECK OPTION;
-- WITH CHECK OPTION chặn INSERT/UPDATE làm row rời khỏi điều kiện WHERE Dno=5.
```

**WITH CASCADED vs LOCAL CHECK OPTION (view phân cấp):**
- `WITH CASCADED CHECK OPTION` (mặc định): kiểm tra điều kiện WHERE của **tất cả** view trong chuỗi kế thừa.
- `WITH LOCAL CHECK OPTION`: chỉ kiểm tra điều kiện WHERE của **view hiện tại**; view cha không bị kiểm tra.

**Điều kiện view UPDATABLE (đủ điều kiện):**
- Không có `DISTINCT`.
- `SELECT` chỉ chứa tên cột (không expression, không aggregate, không cột trùng).
- `FROM` chỉ một bảng nguồn (không JOIN nhiều bảng).
- Không có nested `SELECT` tham chiếu cùng bảng trong `FROM`.
- Không có `GROUP BY` / `HAVING`.

**View tự động phản ánh base table:** `SELECT` trong view được re-evaluated mỗi lần truy vấn → view luôn thể hiện trạng thái hiện tại của base table (HK202-Q20).

**View thường KHÔNG updatable nếu có:**
`DISTINCT`, `GROUP BY / HAVING`, `Aggregate`, `JOIN nhiều bảng`, `UNION / INTERSECT / EXCEPT`, cột tính toán, không chứa PK của base table.

**View cho security — mask, không xóa dòng:**
```sql
-- Ẩn lương thật của manager (Super_ssn IS NULL = đó là top-level manager):
CREATE VIEW Alice_View AS
SELECT Fname, Lname, Ssn,
       CASE WHEN superssn IS NULL THEN 0 ELSE salary END AS salary,
       superssn, dno
FROM Employee;
-- KHÔNG dùng WHERE superssn IS NULL (sẽ xóa dòng thay vì mask).
-- KHÔNG dùng <> NULL (syntax sai — phải IS NOT NULL).
```

---

### 5.12 GRANT / REVOKE và ACID

🔑 **Keywords (EN):** `GRANT`, `REVOKE`, `WITH GRANT OPTION`, `CASCADE revoke`, `GRANT CREATETAB`, `CREATE SCHEMA … AUTHORIZATION`, `SET AUTOCOMMIT OFF`, `COMMIT`, `ROLLBACK`, `ACID`, `Atomicity`, `Consistency`, `Isolation`, `Durability`

```sql
GRANT SELECT ON Employee TO A3;
GRANT SELECT ON Employee TO A3 WITH GRANT OPTION;  -- A3 có thể cấp tiếp
GRANT UPDATE(Salary) ON Employee TO A4;             -- cấp theo cột
REVOKE SELECT ON Employee FROM A3;                  -- cascade xuống A3-đã-cấp-tiếp

-- Account-level DDL privilege:
GRANT CREATETAB TO A1;                              -- cho phép A1 tạo bảng
CREATE SCHEMA Example AUTHORIZATION A1;             -- A1 là chủ schema Example
```

- `GRANT` không có `WHERE` → dùng **VIEW** cho row-level security.
- `REVOKE` có thể **cascade** xuống người đã được cấp tiếp.

**TCL — quản lý transaction:**
```sql
SET AUTOCOMMIT OFF;   -- tắt auto-commit; mọi thay đổi phải COMMIT tường minh
COMMIT;
ROLLBACK;
SAVEPOINT sp1;
```

| Chữ | Tên | Nghĩa |
|---|---|---|
| A | **Atomicity** | all-or-nothing |
| C | Consistency | DB hợp lệ → DB hợp lệ |
| I | Isolation | transaction đồng thời như chạy riêng |
| D | Durability | commit xong thì bền vững |

> **Bẫy cổ điển:** A = **Atomicity** (KHÔNG phải Accuracy).

---

### 5.13 ASSERTION vs TRIGGER

🔑 **Keywords (EN):** `CREATE ASSERTION`, `CHECK`, `TRIGGER`, `BEFORE`, `AFTER`, `INSTEAD OF`, `FOR EACH ROW`, `FOR EACH STATEMENT`

- `CHECK` cấp bảng: kiểm trong **1 tuple**, không kiểm cross-table.
- `ASSERTION`: ràng buộc **cross-table** — modern DBMS (SQL Server, MySQL) **hầu như không hỗ trợ** → dùng **TRIGGER thay thế ASSERTION** trong thực tế.
- `TRIGGER`: tự chạy khi event xảy ra — linh hoạt hơn, là giải pháp thực tế.

```sql
CREATE ASSERTION Salary_constraint CHECK (
    NOT EXISTS (
        SELECT * FROM Employee E, Employee M, Department D
        WHERE E.Dno=D.Dnumber AND D.Mgr_ssn=M.Ssn AND E.Salary > M.Salary
    )
);
```

---

### 5.14 Stored Procedure, Function, Trigger, Cursor (T-SQL / SQL Server)

🔑 **Keywords (EN):** `CREATE PROC`, `EXEC`, `OUTPUT param`, `CREATE FUNCTION`, `RETURNS`, `scalar function`, `table-valued function (TVF)`, `inline TVF`, `multi-statement TVF`, `dbo.`, `CREATE TRIGGER`, `AFTER`, `INSTEAD OF`, `INSERTED`, `DELETED`, `CURSOR`, `DECLARE CURSOR`, `OPEN`, `FETCH`, `CLOSE`, `DEALLOCATE`

**Bảng so sánh 3 đối tượng quan trọng:**

| Tiêu chí | Procedure | Scalar Function | Table-Valued Function |
|---|---|---|---|
| Tạo bằng | `CREATE PROC` | `CREATE FUNCTION … RETURNS type` | `CREATE FUNCTION … RETURNS TABLE` hoặc `RETURNS @t TABLE(...)` |
| Gọi bằng | `EXEC proc_name` | Trong `SELECT`, `WHERE` → `dbo.f(...)` | Trong `FROM` → `FROM dbo.tvf(...)` |
| Return | Không bắt buộc | Bắt buộc 1 scalar | Bắt buộc 1 table |
| Multiple result sets | **Có** | Không | Không |
| Dùng trong SELECT | **KHÔNG** | **CÓ** | Chỉ trong FROM |
| Modify data (INSERT/UPDATE) | Có thể | Thường không | Thường không |

**Stored procedure = lựa chọn tốt nhất cho INSERT cần giá trị dẫn xuất:**
> Khi INSERT cần tính toán tại thời điểm gọi (rental_time = NOW(), unit_price = giá hiện tại, total = price × days), **Stored Procedure** là tốt nhất: tính dẫn xuất tại call-time. Trigger = reactive enforcement sau khi event xảy ra; CHECK = ràng buộc tĩnh trên 1 cột, không dẫn xuất cross-table (HK191-Q8).

**Procedure với OUTPUT param (QUIZ 7 Q2, Q12):**
```sql
CREATE PROC getCount @dname VARCHAR(15), @count INT OUT
AS
SET @count = (SELECT COUNT(*)
              FROM Employee
              WHERE ssn IN (
                  SELECT essn FROM Works_on
                  WHERE pno IN (
                      SELECT pnumber FROM Project JOIN Department ON dnum = dnumber
                      WHERE dname = @dname)));
-- Phải dùng SET @count = (...) để gán vào OUT param.
-- Bare SELECT COUNT(*) KHÔNG gán vào @count.

-- Cách gọi đúng (QUIZ 7 Q12):
DECLARE @name VARCHAR(15), @cnt INT;
SET @name = 'Research';
EXEC getCountEmployee @name, @cnt OUT;
PRINT @cnt;
```

**Scalar Function (QUIZ 7 Q11):**
```sql
CREATE FUNCTION countProject (@dname VARCHAR(15))
RETURNS INT AS BEGIN
    DECLARE @cnt INT;
    SET @cnt = (SELECT COUNT(*) FROM Project
                WHERE dnum = (SELECT dnumber FROM Department WHERE dname = @dname));
    RETURN @cnt;
END;

-- Gọi đúng: dbo. prefix trong SELECT/WHERE:
SELECT dnumber, dname, dbo.countProject(dname) project_number
FROM Department
WHERE dbo.countProject(dname) > 1;
-- Sai: EXEC dbo.countProject('Research') -- EXEC dùng cho procedure, không dùng cho function.
```

**Multi-statement Table-Valued Function (QUIZ 7 Q8):**
```sql
-- Gọi đúng: trong FROM, không dùng EXEC:
DECLARE @dname VARCHAR(15);
SET @dname = (SELECT dname FROM Department WHERE dnumber = 5);
SELECT * FROM getSum(@dname) WHERE AverageHours > 10.0;
-- Sai: FROM getSum(5) -- không truyền INT trực tiếp nếu param VARCHAR.
-- Sai: EXEC getSum @dname -- EXEC dành cho procedure.
```

**Procedure trả nhiều result set vs Function (QUIZ 7 Q7):**
> Procedure có thể trả **nhiều result set**; Function chỉ trả **1** (scalar hoặc 1 table).
> TVF không hiệu quả hơn base table mặc định — đây là bẫy MCQ.

---

### 5.15 Trigger: INSERTED / DELETED và AFTER vs INSTEAD OF

🔑 **Keywords (EN):** `INSERTED` (virtual table), `DELETED` (virtual table), `AFTER INSERT`, `AFTER UPDATE`, `AFTER DELETE`, `INSTEAD OF DELETE`, `ROLLBACK` trong trigger

| Event | `INSERTED` | `DELETED` |
|---|---|---|
| `INSERT` | Row **mới** vừa thêm | Rỗng |
| `DELETE` | Rỗng | Row **cũ** vừa xóa |
| `UPDATE` | Row **mới** (sau khi update) | Row **cũ** (trước khi update) |

```sql
-- QUIZ 7 Q13 — AFTER DELETE, cập nhật derived column:
CREATE TRIGGER trigger1 ON Works_on AFTER DELETE
AS BEGIN
    UPDATE Project
    SET number = (SELECT COUNT(*) FROM Works_on WHERE pno = pnumber)
    WHERE Pnumber IN (SELECT DISTINCT pno FROM deleted);
END;
-- Trigger cập nhật [number] của project BỊ ẢNH HƯỞNG (lọc từ deleted) sau khi xóa Works_on.

-- QUIZ 7 Q6 — AFTER INSERT kích hoạt khi nào:
CREATE TRIGGER trigger3 ON Project AFTER INSERT AS BEGIN
    IF NOT EXISTS (SELECT * FROM Dept_locations, inserted
                   WHERE dnumber = inserted.dnum AND dlocation = inserted.plocation)
    BEGIN RAISERROR(...); ROLLBACK; RETURN; END;
END;
-- Chỉ kích hoạt bởi INSERT có plocation (không phải SELECT/UPDATE/DELETE).
-- INSERT không có plocation → inserted.plocation = NULL → điều kiện UNKNOWN → trigger rollback.
-- insert into project (pname, pnumber, plocation, dnum) values ('Sales', 15, 'Stafford', 5); -- ✅ kích hoạt

-- QUIZ 7 Q3 — INSTEAD OF DELETE:
CREATE TRIGGER trigger2 ON Employee INSTEAD OF DELETE AS BEGIN
    IF NOT EXISTS (SELECT * FROM Employee e JOIN deleted d ON e.dno = d.dno)
        UPDATE Employee SET status = 1 WHERE ssn IN (SELECT ssn FROM deleted);
    ELSE
        DELETE FROM Employee WHERE ssn IN (SELECT ssn FROM deleted);
END;
-- Logic: nếu KHÔNG CÒN nhân viên nào khác cùng phòng (deleted là dòng cuối cùng của dept)
--        → đặt status = 1 thay vì xóa.
-- Nếu CÒN nhân viên khác cùng phòng → xóa bình thường.

-- QUIZ 7 Q15 — AFTER UPDATE: reject nếu project.plocation không trùng dept location.
-- Bảo đảm project luôn cùng địa điểm với department kiểm soát nó.
```

**Trigger vs Procedure — điểm khác biệt cốt lõi (QUIZ 7 Q14):**
> Trigger **tự động kích hoạt** theo event trên table/updatable view; Procedure **phải được gọi** tường minh (EXEC/CALL). Đây là sự khác biệt chính — không phải số bảng nó động đến.

---

### 5.16 Cursor

🔑 **Keywords (EN):** `CURSOR`, `DECLARE CURSOR`, `OPEN`, `FETCH NEXT`, `CLOSE`, `DEALLOCATE`, `set-based thinking`

```text
DECLARE cursor_name CURSOR FOR SELECT ...
OPEN cursor_name
FETCH NEXT FROM cursor_name INTO @var
-- xử lý từng dòng
CLOSE cursor_name
DEALLOCATE cursor_name
```

> **Nguyên tắc:** SQL nên xử lý theo **tập (set-based)**. Cursor duyệt từng dòng → chậm hơn query tập hợp. Chỉ dùng khi thật sự cần xử lý từng row riêng.

---

### 5.17 Query Processing Pipeline

🔑 **Keywords (EN):** `query processing pipeline`, `syntax analysis`, `query optimization`, `code generation`, `query execution`, `table scan vs index scan`

```
SQL string
  → Syntax Analysis & Conversion (parse, check schema)
  → Query Optimization (chọn execution plan: table scan hay index scan)
  → Code Generation & Interpretation
  → Query Execution (kết quả)
```

DBMS chọn **index scan** nếu có index phù hợp (trên `Dno` chẳng hạn), hoặc **full table scan** nếu không có. Quyết định này xảy ra ở bước **Query Optimization**.

---

### 🎯 MCQ Traps §5

1. 🔥 `= NULL` **luôn sai** → phải dùng `IS NULL`.
2. 🔥 Aggregate (`COUNT`, `SUM`…) trong `WHERE` → **lỗi** → chuyển sang `HAVING`.
3. 🔥 `> ALL(Q)` ≡ `> MAX(Q)` — **không** phải `>= MAX` và **không** phải `IN (MAX)`.
4. 🔥 Double NOT EXISTS = "làm tất cả" — lớp ngoài "không có project nào", lớp trong "chưa làm project đó".
5. 🔥 `EXISTS` = "ít nhất 1" ≠ `COUNT(*) = 1` = "đúng 1".
6. 🔥 `COUNT(*)` sau `LEFT JOIN` đếm cả dòng NULL padding → **phải dùng** `COUNT(right_col)`.
7. 🔥 `EXEC` chỉ dành cho **procedure**; function gọi qua `dbo.f()` trong SELECT/WHERE, TVF gọi trong FROM.
8. 🔥 OUTPUT param trong procedure **phải `SET @out = (...)`** — bare `SELECT COUNT(*)` không gán vào @out.
9. 🔥 Trigger: `INSERTED` = row **mới**, `DELETED` = row **cũ**; cả hai đều có trong `UPDATE`.
10. 🔥 `AFTER INSERT` chỉ kích hoạt bởi **INSERT** — SELECT/UPDATE/DELETE không kích hoạt.
11. 🔥 `ON DELETE CASCADE` khai báo ở **bảng con** (chứa FK) — không phải bảng cha.
12. 🔥 `ALTER TABLE ADD col UNIQUE` có thể **lỗi** nếu bảng đã có nhiều dòng (nhiều NULL = unique violation).
13. 🔥 `SECONDARY KEY` **không phải** SQL syntax — secondary/candidate key khai báo bằng `UNIQUE`.
14. 🔥 `DROP TABLE T CASCADE` ≠ `ON DELETE CASCADE` — DROP CASCADE xóa lược đồ phụ thuộc, không phải dữ liệu.
15. 🔥 `DELETE FROM T;` (thiếu WHERE) = xóa **toàn bộ dữ liệu**, bảng vẫn còn; `DROP TABLE T` = xóa cả cấu trúc.
16. 🔥 `SELECT` + `FROM` là tối thiểu; `WHERE/GROUP BY/HAVING/ORDER BY` là OPTIONAL — `SELECT 1+1` hợp lệ không cần FROM (SQL Server).
17. 🔥 **Alias scope:** trong correlated subquery, đặt tên alias che table-name gốc — dùng sai scope gây lỗi biên dịch (HK241-Q2).
18. 🔥 **Stored procedure = tốt nhất** cho INSERT cần tính giá trị dẫn xuất tại call-time; Trigger = reactive; CHECK = ràng buộc tĩnh 1 cột.
19. 🔥 **ASSERTION** hầu như không được hỗ trợ trong modern DBMS → dùng TRIGGER thay thế.
20. 🔥 `WITH CASCADED CHECK OPTION` kiểm tra toàn bộ chuỗi view; `WITH LOCAL CHECK OPTION` chỉ kiểm tra view hiện tại.

---

### 🪄 Câu thần chú §5

1. SQL = bag (multiset) → `SELECT DISTINCT` mới loại trùng như π RA.
2. Thứ tự xử lý: **FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY**.
3. WHERE lọc tuple; HAVING lọc group — không hoán đổi được.
4. NULL so sánh = UNKNOWN → chỉ `IS NULL` / `IS NOT NULL` mới đúng.
5. `> ALL` = `> MAX`; `> ANY` = `> MIN`; `= ANY` = `IN`.
6. "Tất cả" = double NOT EXISTS: "không có cái X nào mà ta chưa làm".
7. `EXISTS` = "ít nhất 1" ≠ `COUNT = 1` = "đúng 1".
8. `LEFT JOIN + WHERE rightKey IS NULL` = anti-join = "không có".
9. `COUNT(*)` sau LEFT JOIN đếm cả NULL → dùng `COUNT(right_col)` khi cần đếm matched.
10. Procedure: `EXEC` + có thể nhiều result set; Function: `dbo.f()` hoặc `FROM tvf()` + chỉ 1 result.
11. OUTPUT param: bắt buộc `SET @out = (...)` trong thân procedure; bare `SELECT` không gán.
12. Trigger: `INSERTED` = mới, `DELETED` = cũ; UPDATE có cả hai.
13. Trigger khác procedure ở **activation**: trigger tự động theo event, procedure phải EXEC.
14. `ON DELETE CASCADE` đặt ở **bảng con**; ACID: **A = Atomicity** (không phải Accuracy).
15. `DROP TABLE CASCADE` ≠ referential CASCADE; `SECONDARY KEY` không tồn tại → dùng `UNIQUE`.
16. Query pipeline: **Parse → Optimize → Generate → Execute** — index scan hay table scan quyết định ở Optimize.
17. `INSERT INTO T SELECT ...` = bulk insert từ query; `UNION ALL` nhanh hơn `UNION` (bỏ bước khử trùng).
18. View tự động phản ánh base table (re-evaluated mỗi truy vấn); `WITH CASCADED CHECK OPTION` = kiểm tra toàn chuỗi.
19. ASSERTION = cross-table constraint nhưng modern DBMS không hỗ trợ → dùng TRIGGER.
20. Stored procedure tốt nhất cho INSERT tính giá trị dẫn xuất tại call-time.

---

## §6. FUNCTIONAL DEPENDENCIES & NORMALIZATION — Trọng số đề: 6 câu 🔥

> **Nguồn chính:** `Lectures/07_FD_v2.pdf` · `Final/VoTien/Normalization.pdf` · `Tutorial/DB-Chapter7.md`  
> **Tập trung:** tính `X⁺`, tìm tất cả candidate key, xác định NF cao nhất, phân rã BCNF, anomalies, lossless join.

---

### 6.1. Khái niệm nền tảng

🔑 **Keywords (EN):** functional dependency, determinant, trivial / non-trivial FD, F⁺ (closure of FD set), X⁺ (closure of attribute set), superkey, candidate key, primary key, prime attribute, non-prime attribute, NULL interpretations.

**Functional dependency (FD)** `X → Y`: với mỗi giá trị của X, tồn tại **duy nhất** một giá trị của Y. FD phản ánh **ngữ nghĩa thực tế** của dữ liệu — do **database designer** quyết định (QUIZ 8 Q10), không thể chứng minh từ một instance mẫu (mẫu chỉ có thể *bác bỏ* FD).

**NULL — 3 cách diễn giải (Lec07):**

| Diễn giải | Nghĩa |
|---|---|
| **(a) attribute does not apply** | Attribute không áp dụng cho entity này |
| **(b) value unknown** | Giá trị tồn tại nhưng chưa biết |
| **(c) value known but not yet recorded** | Biết giá trị nhưng chưa nhập vào hệ thống |

> NULL không phải 0, không phải chuỗi rỗng — ba nghĩa trên là lý do chính tại sao thiết kế tốt cần tránh NULL không cần thiết (đây là **informal guideline**, xem §6.12).

**Superkey vs Candidate Key vs Primary Key:**

```
Superkey:       K sao cho mọi cặp tuple t1[K] ≠ t2[K] (CHỈ đòi duy nhất, KHÔNG đòi minimal)
Candidate Key:  Superkey tối giản (minimal superkey)
Primary Key:    1 candidate key được DBA chọn làm khóa chính
```

> 🔥 **Bẫy HK192/HK191-Q16:** Phát biểu "K sao cho mọi cặp tuple t1[K]≠t2[K]" = định nghĩa **SUPERKEY**, KHÔNG phải primary key hay candidate key. PK = minimal superkey.

**Phân biệt F⁺ và X⁺ — cực dễ nhầm:**

| Ký hiệu | Chứa gì | Dùng để |
|---|---|---|
| **F⁺** | Tất cả **FD** suy ra được từ F | Kiểm equivalence, minimal cover |
| **X⁺** | Tất cả **attribute** suy ra được từ X dựa trên F | Tìm superkey/CK, kiểm `X→Y` |

```
F = {A→B, B→C}
F⁺ chứa: A→B, B→C, A→C, AB→C, …  (các luật)
A⁺ = {A, B, C}                    (các cột)
```

**Các loại FD:**

| Loại | Định nghĩa |
|---|---|
| **Trivial** | `X → Y` với `Y ⊆ X` |
| **Non-trivial** | `X → Y` với `Y ⊄ X` |
| **Full FD** | `X → A` không tồn tại `Y ⊂ X` với `Y → A` |
| **Partial FD** | `X → A` và ∃ `Y ⊂ X` với `Y → A` (gây vi phạm 2NF) |
| **Transitive FD** | `X → Y → A`, Y không phải CK (gây vi phạm 3NF nếu A nonprime) |

---

### 6.2. Armstrong Inference Rules — bắt buộc thuộc

🔑 **Keywords (EN):** Armstrong's axioms, reflexivity, augmentation, transitivity, union rule, decomposition rule, pseudotransitivity rule.

```
Gốc (sound & complete):
  IR1 Reflexive:     Y ⊆ X           ⟹  X → Y
  IR2 Augmentation:  X → Y           ⟹  XZ → YZ
  IR3 Transitive:    X → Y, Y → Z    ⟹  X → Z

Suy ra (derived):
  Decomposition:     X → YZ          ⟹  X → Y  và  X → Z
  Union:             X → Y, X → Z    ⟹  X → YZ
  Pseudo-transitive: X → Y, WY → Z   ⟹  WX → Z
```

> 🔥 **Bẫy VoTien Q5/Q6 (QUIZ 8):** Union rule cho `X → YZ`, KHÔNG suy ra `Y → Z`. Không có **Symmetry rule** — `X → Y` KHÔNG suy ra `Y → X`.

> 🔥 **Bẫy FD derivability (HK211-Q27):** `R(A,B,C,D,E)`, `F={AB→CE, B→D, D→A}`. `B→E` có suy ra được không?  
> `B⁺ = {B} → B→D → {B,D} → D→A → {A,B,D}` — không có C, không thể kích hoạt AB→CE.  
> → `B⁺ = {A,B,D}`, E ∉ B⁺ → **B→E KHÔNG suy ra được**. Luôn kiểm bằng closure của LHS, đừng suy diễn bằng "cảm giác".

---

### 6.3. Tính X⁺ (Algorithm 16.1) — kỹ năng cốt lõi

🔑 **Keywords (EN):** attribute closure, X⁺ algorithm, superkey test, FD derivability test.

```
X⁺ := X
repeat
    for each FD Y → Z in F:
        if Y ⊆ X⁺:  X⁺ := X⁺ ∪ Z
until X⁺ không đổi

→ X⁺ = R  ⟺  X là superkey
→ X superkey VÀ minimal  ⟺  X là candidate key (CK)
→ X → Y suy ra được từ F  ⟺  Y ⊆ X⁺
```

**Ví dụ có bước:** `R(A,B,C,D,E)`, `F = {AB→C, CD→E, DE→B}` (VoTien Q8/Q9):

```
{A,B}⁺:
  AB→C: {A,B,C}   Hết → {A,B,C}  ≠ R → không phải superkey

{A,B,D}⁺:
  AB→C: {A,B,C,D}
  CD→E: {A,B,C,D,E} = R → superkey ✓
  Có thể bỏ A? {B,D}⁺: BD→C(không), CD→E(C chưa có) → {B,D} → không đủ
  → {A,B,D} là candidate key
```

**Ví dụ closure chuỗi (HK192):** `F = {A→BC, CD→E, B→D, E→A}`

```
{A}⁺:
  A→BC: {A,B,C}
  B→D:  {A,B,C,D}
  CD→E: {A,B,C,D,E}
  E→A:  đã có A
  → {A}⁺ = {A,B,C,D,E} = R → A là superkey (và candidate key nếu minimal)
```

---

### 6.4. Tìm tất cả Candidate Keys (Phương pháp U_l / U_r / U_b)

🔑 **Keywords (EN):** candidate key, U_left, U_right, U_both, key-finding algorithm, minimal superkey.

```
Phân loại attribute:
  U_l = chỉ xuất hiện ở LHS  → BẮT BUỘC trong MỌI CK
  U_r = chỉ xuất hiện ở RHS  → KHÔNG BAO GIỜ trong CK
  U_b = cả hai vế             → cần thử

Quy trình:
  1. Tính U_l⁺. Nếu = R → U_l là CK duy nhất.
  2. Nếu chưa đủ: thử U_l ∪ (tập con của U_b), tính closure.
     - closure = R VÀ tối giản → CK
     - closure = R không tối giản → superkey
```

**Ví dụ đầy đủ — QUIZ 8 Q1:** `R(A,B,C,D,G,H,I,J)`, `F = {AB→DHI, H→G, C→BJ}`

```
Phân loại: U_l = {A,C}, U_r = {D,G,I}, U_b = {B,H,J}
(không có attribute hoàn toàn vắng — A và C đều chỉ ở LHS)

{A,C}⁺:
  C→BJ: {A,B,C,J}
  AB→DHI: {A,B,C,D,H,I,J}
  H→G: {A,B,C,D,G,H,I,J} = R ✓
  Bỏ A? {C}⁺ = {B,C,J,D,H,G,I} (không có A) → không đủ
  Bỏ C? {A}⁺ = {A} → không đủ
→ CK duy nhất = {A,C}   ← Đáp án QUIZ 8 Q1: E
```

**Ví dụ — QUIZ 8 Q2:** `R(A,B,C,D,G,H)`, `F = {AC→D, G→AB, C→GH}`

```
U_l = {} (không có), U_r = {D}, U_b = {A,B,C,G,H}
C⁺: C→GH → {C,G,H}; G→AB → {A,B,C,G,H}; AC→D → {A,B,C,D,G,H} = R ✓
Bỏ được gì từ C? Không thể (C là tập 1 phần tử)
→ CK = {C}   ← Đáp án QUIZ 8 Q2: A
```

**Ví dụ — QUIZ 8 Q8:** `R(A,B,C,D,E,G,H)`, `F = {AB→EH, A→CG, C→DE}`

```
(AB)⁺:
  A→CG: {A,B,C,G}
  C→DE: {A,B,C,D,E,G}
  AB→EH: {A,B,C,D,E,G,H} = R ✓
  Bỏ B? A⁺ = {A,C,D,E,G} → thiếu B,H
  → {A,B} là CK   ← Đáp án QUIZ 8 Q8: E
```

> 🔥 **Trap:** Algo "bỏ từng attribute" chỉ tìm **1 key** (phụ thuộc thứ tự). Muốn **tất cả CK** phải dùng phương pháp U_l/U_r/U_b.

---

### 6.5. Minimal Cover (Canonical Cover) — Algorithm 16.2

🔑 **Keywords (EN):** minimal cover, canonical cover, FD set equivalence, F covers G, redundant FD, extraneous attribute.

```
3 bước:
  B1. Tách RHS đơn:   AB→CD  ⟹  AB→C và AB→D
  B2. Rút LHS:        XY→A: bỏ Y nếu (X)⁺ đã chứa A
  B3. Bỏ FD thừa:     bỏ f nếu (F − {f})⁺ vẫn chứa f
```

**Ví dụ VoTien Q10:** `F = {AB→CD, A→C, C→D, D→E}`

```
B1: {AB→C, AB→D, A→C, C→D, D→E}
B2: AB→C: bỏ B (vì A→C đã có) → A→C (trùng → loại)
    AB→D: bỏ B (vì A→C, C→D → A→D) → A→D
B3: A→D dư vì A→C, C→D suy ra → loại
Kết quả: Fmin = {A→C, C→D, D→E}
```

**F ≡ G** ⟺ F covers G VÀ G covers F (kiểm: ∀ `X→Y ∈ G`, `Y ⊆ X⁺` theo F).

> 🔥 Minimal cover **không duy nhất** — có thể tồn tại nhiều tập minimal tương đương.

---

### 6.6. Prime vs Non-prime Attribute

🔑 **Keywords (EN):** prime attribute, non-prime attribute, candidate key membership.

```
Prime    = thuộc ít nhất MỘT candidate key
Non-prime = không thuộc CK nào
```

Ví dụ `TEACH(Student, Course, Instructor)`, CK = `{Student,Course}` và `{Student,Instructor}` → tất cả 3 attribute đều **prime**.

---

### 6.7. Normal Forms — Định nghĩa chính xác

🔑 **Keywords (EN):** 1NF, 2NF, partial dependency, 3NF, transitive dependency, BCNF (Boyce-Codd Normal Form), 4NF, MVD (multivalued dependency), 5NF (PJNF), lossless join, dependency preservation.

| NF | Điều kiện | Vi phạm điển hình |
|---|---|---|
| **1NF** | Mọi ô **atomic** (không composite, không multivalued, không nested) | Cell chứa nhiều giá trị |
| **2NF** | 1NF + mọi nonprime attribute **full FD** vào mọi CK | Tồn tại partial dep (phần của CK → nonprime) |
| **3NF** | ∀ FD non-trivial `X→A`: X **superkey** HOẶC A **prime** | Transitive dep qua nonprime (X→Y→A, Y không CK, A nonprime) |
| **BCNF** | ∀ FD non-trivial `X→A`: X **phải là superkey** | FD với LHS không phải superkey (kể cả A prime) |
| **4NF** | ∀ MVD non-trivial `X ↠ Y`: X **superkey** | Cartesian-product redundancy độc lập |
| **5NF** | ∀ join dependency non-trivial: implied by candidate keys | Join dep không suy ra từ CK |

**Thứ tự nghiêm ngặt:** 5NF ⊂ 4NF ⊂ BCNF ⊂ 3NF ⊂ 2NF ⊂ 1NF

> 🔥 **Quy tắc báo cáo NF:** Nếu 2NF bị vi phạm → highest NF = **1NF** (không phải "2NF không thỏa"). Luôn báo cáo dạng chuẩn **thấp nhất đã thỏa** mà không vi phạm gì cao hơn.

> 🔥 **Trick:** Mọi CK chỉ gồm **1 attribute đơn** ⟹ **tự động 2NF** (không thể có partial dep). Cẩn thận: phải **mọi CK** đều đơn; nếu còn 1 CK composite thì vẫn phải kiểm.

---

### 6.8. Worked Examples — Xác định NF cao nhất

🔑 **Keywords (EN):** highest normal form, NF determination, partial dependency check, transitive dependency check, BCNF violation.

**Ví dụ A — QUIZ 9 Q1 (1NF):** `R(A,B,C,D,G,H)`, `F = {A→C, BC→AD, G→H, B→G}`, Keys = `{AB, BC}`

```
Kiểm 2NF: B là tập con thực sự của CK {AB}.
  B→G: B ⊂ {AB}, G là nonprime → PARTIAL DEP → vi phạm 2NF
→ Highest NF = 1NF
Đáp án: "1NF because B→G violates 2NF's condition."
Trap: đáp án "2NF because B→G violates 3NF" là SAI — phải kiểm 2NF trước!
```

**Ví dụ B — QUIZ 9 Q2 (1NF):** `R(A,B,C,D,G,H)`, `F = {AB→CD, AD→BC, AC→B, D→GH}`, Keys = `{AB, AC, AD}`

```
Kiểm 2NF: D là tập con thực sự của CK {AD}.
  D→GH: D ⊂ {AD}, G và H là nonprime → PARTIAL DEP → vi phạm 2NF
→ Highest NF = 1NF
Đáp án: "1NF because D→GH violates 2NF's condition."
```

**Ví dụ C — QUIZ 9 Q3 (1NF):** `R(A,B,C,D,G,H,I,J)`, `F = {AB→DHI, H→G, C→BJ}`, Key = `{AC}`

```
Kiểm 2NF: C ⊂ {AC}, C→BJ: B và J nonprime → PARTIAL DEP → vi phạm 2NF
→ Highest NF = 1NF
Đáp án: "1NF because C→BJ violates 2NF's condition."
```

**Ví dụ D — QUIZ 9 Q4 (BCNF):** `R(A,B,C,D,G,H)`, `F = {AB→CD, AD→BC, AC→BGH}`, Keys = `{AB, AD, AC}`

```
Prime = {A,B,C,D} (mọi LHS của CK). G, H nonprime.
Kiểm từng FD:
  AB→CD: AB là CK ✓
  AD→BC: AD là CK ✓
  AC→BGH: AC là CK ✓
→ Mọi LHS là superkey → BCNF ✓
Đáp án: BCNF ← QUIZ 9 Q4
```

**Ví dụ E — VoTien Q16 / MCQ Q39 (3NF không BCNF):** `R(A,B,C,D,E,F)`, `F = {AB→EFDC, EF→A}`

```
CK: {AB} và {EFB} (tính: (EFB)⁺ = EFB→A→ABCDEF = R ✓)
Prime = {A,B,E,F}
Xét EF→A: EF không phải superkey. Nhưng A là prime → thỏa 3NF, vi phạm BCNF
→ Highest NF = 3NF
```

**Ví dụ F — QUIZ 9 Q7 / MCQ Q17 (3NF không BCNF):** `R(A,B,C,D,E)`, `F = {AB→C, CD→E, DE→B}`, Keys = `{ABD, ACD, ADE}`

```
Prime = {A,B,C,D,E} (tất cả prime)
Xét AB→C: AB không superkey (AB⁺ = {A,B,C} ≠ R), C là prime → 3NF OK, vi phạm BCNF
Xét CD→E: CD không superkey, E prime → 3NF OK, vi phạm BCNF
→ Highest NF = 3NF   ← QUIZ 9 Q7 đáp án B
```

**Ví dụ G — VoTien Q21 / MCQ Q44 (3NF không BCNF):** `R(A,B,C,D)`, `F = {A→BCD, BC→AD, D→B}`

```
CK: {A} và {BC}. D⁺ = {B,D} ≠ R → D không superkey.
D→B: D không superkey, B là prime (trong CK {BC}) → 3NF OK, vi phạm BCNF
→ Highest NF = 3NF
```

**Ví dụ H — BOOK (QUIZ 9 Q6 / MCQ Q16) (1NF):** `BOOK(Book_title, Author_name, Book_type, List_price, Author_affil, Publisher)`  
`F = {Book_title→{Publisher, Book_type}, Book_type→List_price, Author_name→Author_affil}`

```
Không có key được cung cấp tường minh → suy key = {Book_title, Author_name} (composite)
Author_name→Author_affil: Author_name ⊂ key, Author_affil nonprime → PARTIAL DEP → vi phạm 2NF
→ Highest NF = 1NF   ← QUIZ 9 Q6 đáp án A
```

**Ví dụ I — HK192 (3NF không BCNF):** `R(A,B,C,D)`, `F = {A→BCD, BC→AD, D→B}`

```
CK: {A} (A⁺ = ABCD = R ✓; minimal ✓)
    {BC} (BC⁺ = BC→AD → {A,B,C,D} = R ✓; B⁺={B}, C⁺={C} → minimal ✓)
Prime = {A, B, C}; Non-prime = {D}

Kiểm từng FD:
  A→BCD: A là CK ✓ (BCNF OK)
  BC→AD: BC là CK ✓ (BCNF OK)
  D→B: D không phải superkey (D⁺ = {B,D} ≠ R).
        B là prime (∈ CK {BC}) → 3NF OK (RHS prime), vi phạm BCNF
→ Highest NF = 3NF
```

---

### 6.9. Ví dụ kinh điển TEACH — 3NF nhưng không BCNF

🔑 **Keywords (EN):** TEACH relation, 3NF but not BCNF, dependency preservation loss, lossless decomposition.

```
TEACH(Student, Course, Instructor)
FD1: (Student, Course) → Instructor
FD2: Instructor → Course

CK: {Student, Course} và {Student, Instructor}
Prime: Student, Course, Instructor (tất cả prime)

FD2: Instructor → Course
  - Instructor không phải superkey
  - Course là prime → 3NF ✓ (vì RHS prime)
  - BCNF ✗ (vì LHS không superkey)
→ 3NF nhưng không BCNF
```

**Các cách phân rã nhị phân TEACH (tất cả 3 cách đều mất FD1):**

| Cặp phân rã | Lossless? | Dep. Preserving? |
|---|---|---|
| `{Student,Course}` + `{Student,Instructor}` | ✓ (SC∩SI={Student}, Student→…) | Mất FD1 (SC→I không tồn tại ở bảng nào) |
| `{Instructor,Course}` + `{Instructor,Student}` | ✓ (IC∩IS={Instructor}, I→C ✓) | Mất FD1 |
| `{Student,Course}` + `{Instructor,Course}` | Phụ thuộc FD | Mất FD1 |

> Cặp **{Instructor,Course} + {Instructor,Student}** là **desirable** — lossless (Instructor→Course ∈ F⁺, kiểm NJB: R1∩R2={Instructor}, R1−R2={Course}, Instructor→Course ✓) và hai bảng con tự nhiên. Tất cả cách phân rã BCNF đều mất FD1.

> 🔥 BCNF có thể **mất dependency preservation**. Khi đó thường giữ **3NF** — tốt hơn về mặt thực tế.  
> 🔥 **Wording chính thức (Elmasri):** "Property (1) non-additive join is EXTREMELY important and CANNOT be sacrificed; property (2) dependency preservation may be sacrificed when necessary."

---

### 6.10. BCNF Decomposition Algorithm

🔑 **Keywords (EN):** BCNF decomposition, lossless decomposition, dependency preservation, BCNF violation, spurious tuples.

```
D := {R}
while ∃ Q ∈ D vi phạm BCNF:
    tìm FD X→A trong Q mà X không phải superkey của Q
    thay Q bằng:
        Q1 = Q − {A}      (giữ mọi cột trừ A)
        Q2 = X ∪ {A}      (X + A)
return D
```

**Ví dụ đầy đủ — QUIZ 9 Q8 / MCQ Q18:** `R(A,B,C,D,E)`, `F = {A→D, AB→C, D→E}`, Key duy nhất = `{A,B}`

```
Bước 1: A→D: A không superkey (A⁺ = {A,D,E} ≠ R)
  → R1(A,D) Key={A}, R2(A,B,C) Key={A,B}

Bước 2: trong R1(A,D): D→E: D không superkey của R1 (D⁺ = {D,E} ≠ {A,D})
  → R11(D,E) Key={D}, R12(A,D) Key={A}
  (R12 = R1 trừ E, R11 = D+E)

Kết quả cuối: R1(A,B,C) Key={A,B} + R2(A,D) Key={A} + R3(D,E) Key={D}
← QUIZ 9 Q8 đáp án D
```

**Ví dụ BCNF — VoTien Q19 / MCQ Q41-42:** `R(A,B,C,D,E,F)`, `F = {A→B, C→AD, AF→CE}`

```
CK: {A,F}⁺ = {A,F} → AF→CE → {A,C,E,F} → A→B → {A,B,C,E,F} → C→AD → R = {A,B,C,D,E,F} ✓
    {C,F}⁺: C→AD → {A,C,D,F} → AF→CE → {A,C,D,E,F} → A→B → R ✓
Keys = {A,F}, {C,F}

A→B: A không superkey → phân rã R1(A,B), R2(A,C,D,E,F)
Trong R2(A,C,D,E,F): C→AD, C không superkey của R2
  → R21(C,A) = R22(C,A), R_temp = R2 − A = (C,D,E,F)
  Trong R_temp: C→D, C không superkey → R23(C,D), R21(C,E,F)

Kết quả BCNF: R1(A,B), R22(C,A), R21(C,E,F), R23(C,D)
```

---

### 6.11. NJB Test — Lossless (Non-additive) Join (Algorithm 16.5)

🔑 **Keywords (EN):** lossless join, non-additive join, NJB test, binary decomposition, spurious tuples, Algorithm 16.5.

```
Binary decomposition {R1, R2} lossless ⟺
  (R1 ∩ R2) → (R1 − R2) ∈ F⁺
  HOẶC (R1 ∩ R2) → (R2 − R1) ∈ F⁺
```

**Ví dụ cơ bản:** `R(A,B,C)`, `F = {A→B}`, `R1(A,B)`, `R2(A,C)`

```
R1 ∩ R2 = {A}
R1 − R2 = {B}
A→B ∈ F → LOSSLESS ✓
```

**Ví dụ ENROLLMENT (Algorithm 16.5 worked):**  
`ENROLLMENT(Student, Instructor, Course)`, `F = {Instructor→Course}`  
Phân rã: `R1(Instructor, Course)` + `R2(Student, Instructor)`

```
R1 ∩ R2 = {Instructor}
R1 − R2 = {Course}
Kiểm: Instructor → Course ∈ F ✓
→ LOSSLESS ✓
```

> 🔥 Lossless join **bắt buộc phải giữ** — không được đánh đổi. Dependency preservation có thể hy sinh nếu cần.

> 🔥 **Spurious tuples** sinh ra khi JOIN trên attribute không phải PK/FK → kết quả JOIN "phình" ra các tuple giả. Thiết kế đúng: JOIN luôn qua PK = FK.

---

### 6.12. 3 Anomalies & Mục đích Normalization

🔑 **Keywords (EN):** modification anomaly, insertion anomaly, deletion anomaly, data redundancy, normalization goals, informal design guidelines.

| Anomaly | Nguyên nhân | Ví dụ |
|---|---|---|
| **Modification** | 1 fact lưu nhiều dòng → sửa 1 phải sửa hết | Đổi tên phòng → update mọi nhân viên |
| **Insertion** | Không thể thêm entity nếu thiếu thông tin CK | Thêm phòng mới chưa có nhân viên |
| **Deletion** | Xóa entity cuối → mất thông tin liên quan | Xóa nhân viên cuối → mất thông tin phòng |

**Phân biệt QUAN TRỌNG — Mục tiêu hình thức vs. Informal guideline:**

| Loại | Nội dung |
|---|---|
| **Mục tiêu HÌNH THỨC của một phép phân rã** (normalization algorithm) | ① Attribute preservation · ② Dependency preservation · ③ Non-additive (lossless) join |
| **Informal design guidelines** (Elmasri Ch.14 — động cơ thiết kế) | Clear semantics · Giảm redundant info · Giảm anomalies · **Giảm NULL** · Tránh spurious tuples |

> 🔥 **F2024-Q24 (MCQ Trap):** Câu "đâu KHÔNG phải mục đích của normalization?" → đáp án = **"Minimize NULL values"**.  
> "Minimize NULL" là *informal guideline* (lý do thiết kế tốt), KHÔNG phải mục tiêu của thuật toán phân rã chuẩn hoá. Trong khi đó "lossless join", "dependency preservation", "attribute preservation" đều là mục tiêu hình thức.

**KHÔNG phải mục đích:** giảm số phép JOIN — chuẩn hóa thường **TĂNG** JOIN.

> 🔥 VoTien Q26 đáp án C = "giảm lưu trữ dữ liệu dư thừa". QUIZ 9 Q9: "attribute preservation, dependency preservation, lossless (nonadditive) join" (đáp án C).

> ⚠️ Mâu thuẫn đề cũ: HK202 Q12 có phương án "tất cả đều đúng" (bao gồm giảm join) — nếu gặp đúng wording đó, chọn theo đề đó. Mặc định và đề mới: **giảm dư thừa**.

---

### 6.13. 4NF & MVD — Multivalued Dependency + 5NF/PJNF

🔑 **Keywords (EN):** MVD (multivalued dependency), 4NF, trivial MVD, 4NF violation, Cartesian-product redundancy, 5NF, PJNF, join dependency, SPJ relation.

**MVD** `X ↠ Y`: nếu tồn tại `(x, y1, z1)` và `(x, y2, z2)` thì phải tồn tại `(x, y1, z2)` và `(x, y2, z1)` — Y và Z độc lập với nhau trên X.

- Mọi FD đều kéo theo MVD: `X → Y ⟹ X ↠ Y`
- **Trivial MVD:** `Y ⊆ X` **hoặc** `X ∪ Y = R` (tức phần còn lại Z = R − X − Y = ∅)
- **Non-trivial MVD:** `Y ⊄ X` **VÀ** `X ∪ Y ≠ R`

**4NF:** ∀ MVD non-trivial `X ↠ Y` → X là superkey.

**Worked STUDENT (4NF):** `STUDENT(StudentID, Major, Club)`

```
Giả sử 1 SV có 2 Major (CS, Math) và 2 Club (Chess, Drama):
→ 4 dòng bắt buộc (Cartesian product): (S,CS,Chess),(S,CS,Drama),(S,Math,Chess),(S,Math,Drama)

StudentID ↠ Major: non-trivial (Major ⊄ {StudentID}, {StudentID}∪{Major} ≠ R)
StudentID ↠ Club:  non-trivial
StudentID không phải superkey của STUDENT → vi phạm 4NF

Fix: STUDENT_MAJOR(StudentID, Major) + STUDENT_CLUB(StudentID, Club)
→ Lossless: (R1∩R2) = {StudentID}, R1−R2={Major}, StudentID ↠ Major ✓
```

**5NF / PJNF:**

```
Join dependency *(R1, R2, …, Rk): R = R1 ⋈ R2 ⋈ … ⋈ Rk
Non-trivial: không có Ri nào = R
5NF: mọi join dependency non-trivial đều implied by candidate keys của R
```

**Worked SPJ (5NF):** `SPJ(Supplier, Part, Project)`

```
Ngữ nghĩa: (S,P,J) ∈ SPJ ⟺ S cung cấp Part P ∧ S tham gia Project J ∧ J sử dụng Part P
→ 3-way join dependency *(SP, SJ, PJ)  (non-trivial vì không cái nào = SPJ)
→ Nếu không có FD nào, SPJ vi phạm 5NF
Fix: tách SP(Supplier,Part) + SJ(Supplier,Project) + PJ(Part,Project)
→ 3-way lossless join ✓ (nhưng chỉ đúng khi 3 constraints đồng thời thỏa)
```

---

### 6.14. Bảng so sánh NF & Decision Tree

| | 2NF | 3NF | BCNF |
|---|---|---|---|
| **Điều kiện** | Không partial dep (nonprime vào partial CK) | ∀ `X→A` non-trivial: X superkey **HOẶC** A prime | ∀ `X→A` non-trivial: X **phải** superkey |
| **Cho phép** | Full dep vào CK | Transitive dep nếu A prime | Không có ngoại lệ |
| **Vi phạm** | Partial dep (LHS ⊂ CK, RHS nonprime) | Transitive dep qua nonprime | LHS không superkey dù RHS prime |
| **Dep. preservation** | ✓ | Thường ✓ | Có thể mất |
| **Lossless join** | ✓ | ✓ | ✓ luôn |

**NF Decision Tree:**

```
1. Ô atomic?          No → 1NF vi phạm (báo không thỏa 1NF)
                      Yes ↓
2. Partial dep?        Yes → highest = 1NF
                       No ↓
3. Transitive dep      Yes (RHS nonprime) → highest = 2NF
   qua nonprime?       No ↓
4. ∃ FD X→A với        Yes → highest = 3NF
   X không superkey    No ↓
   nhưng A prime?      BCNF (nếu không có 4NF check)
```

---

### 6.15. Redundancy trong CAR_SALE — Ví dụ thực tế (QUIZ 9 Q5)

`CAR_SALE(Car_id, Option_type, Option_listprice, Sale_date, Option_discountedprice)`  
`Key = {Car_id, Option_type}`, `FD: Car_id→Sale_date; Option_type→Option_listprice; {Car_id,Option_type}→Option_discountedprice`

```
Option_type→Option_listprice: Option_type ⊂ key → PARTIAL DEP
→ Option_listprice lặp lại nhiều lần khi nhiều xe có cùng Option_type
→ Redundancy = Option_listprice
← Đáp án QUIZ 9 Q5: D
```

**Phân rã BCNF đúng (MCQ Q64):**  
`R1(Car_id, Sale_date)` + `R2(Option_type, Option_listprice)` + `R3(Car_id, Option_type, Option_discountedprice)`

---

### 6.16. Derived FD — Kiểm tra suy ra được

**QUIZ 8 Q6 / VoTien Q30:** `R(A,B,C,D,E)`, `F = {AB→CE, B→D, D→A}`. FD nào KHÔNG suy ra từ F?

```
AD→CE?
  AD⁺ = {A,D}
  D→A: đã có, B→D: B không có → không thêm được gì
  AD⁺ = {A,D} → CE ⊄ {A,D} → AD→CE KHÔNG suy ra được ✓
← Đáp án: AD→CE (VoTien Q30 đáp án D, QUIZ 8 Q6 đáp án C)

Kiểm nhanh B→E: B→D→A→(AB)→CE, B→E ✓ (suy ra được)
```

---

### 🎯 MCQ Traps §6

1. 🔥 **F⁺ ≠ X⁺** — F⁺ chứa FD, X⁺ chứa attribute. Nhầm 2 ký hiệu này = sai toàn bộ bài.
2. 🔥 **Union rule = `X→YZ`** (KHÔNG phải `Y→Z`). Không có symmetry rule.
3. 🔥 **X⁺ = R ⟹ superkey, chưa chắc CK** — phải kiểm tối giản.
4. 🔥 **NF cao nhất = dạng chuẩn thấp nhất đã thỏa**: vi phạm 2NF → báo 1NF, không phải "2NF không thỏa".
5. 🔥 **3NF: LHS superkey HOẶC RHS prime. BCNF: LHS superkey (only)** — BCNF nghiêm hơn, không có ngoại lệ RHS.
6. 🔥 **BCNF có thể mất dependency preservation** (TEACH là ví dụ kinh điển). Lossless join LUÔN bắt buộc.
7. 🔥 **B→G vi phạm 2NF** khi B là tập con thực sự của composite CK và G là nonprime — không phải 3NF.
8. 🔥 **Mọi CK đều đơn (1 attribute) ⟹ tự động 2NF** — nhưng phải MỌI CK, không chỉ primary key.
9. 🔥 **Normalization = giảm dư thừa + giảm anomaly**. KHÔNG giảm số JOIN (thường TĂNG JOIN).
10. 🔥 **Minimal cover không duy nhất** — bài có thể có nhiều đáp án đúng khác nhau về canonical form.
11. 🔥 **FD do semantics quyết định** (database designer) — không suy từ 1 instance. Instance chỉ bác bỏ FD.
12. 🔥 **U_r KHÔNG BAO GIỜ trong CK; U_l BẮT BUỘC trong mọi CK** — nhầm là mất toàn bộ bài tìm key.
13. 🔥 **3NF cho phép transitive dep nếu đích đến là prime attribute** (ví dụ TEACH, QUIZ 9 Q7).
14. 🔥 **F2024-Q24 — "Minimize NULL values" KHÔNG phải mục tiêu hình thức của normalization** — đây là *informal design guideline* (Elmasri Ch.14). Mục tiêu hình thức là: attribute preservation + dependency preservation + lossless join. → Khi hỏi "cái nào KHÔNG phải mục đích normalization" mà có option "Minimize NULL", chọn nó.
15. 🔥 **Superkey ≠ Candidate Key ≠ Primary Key** — "K sao cho t1[K]≠t2[K]" là định nghĩa SUPERKEY (chỉ đòi duy nhất, không đòi minimal). CK = minimal superkey. PK = 1 CK được chọn.
16. 🔥 **FD derivability trap:** Muốn kiểm `X→Y` có suy ra từ F không → tính `X⁺` theo F, kiểm `Y ⊆ X⁺`. Đừng suy bằng chuỗi "cảm giác" — ví dụ B→E với F={AB→CE,B→D,D→A}: B⁺={A,B,D} → E∉B⁺ → B→E không suy ra được.
17. 🔥 **TEACH — tất cả cách phân rã BCNF đều mất FD1** (Student,Course→Instructor). Cặp ưu tiên là {Instructor,Course}+{Instructor,Student} (lossless, Instructor→Course làm key join). Giữ 3NF nếu dep preservation là ưu tiên.

---

### 🪄 Câu thần chú §6

1. **`X → Y`: biết X chắc chắn biết Y — do database designer quyết định, không suy từ mẫu.**
2. **`F⁺` = closure của TẬP FD (chứa luật); `X⁺` = closure của TẬP THUỘC TÍNH (chứa cột). Đừng nhầm.**
3. **`X⁺ = R ⟺ superkey; tối giản ⟺ CK`. Superkey chỉ đòi duy nhất — không đòi minimal.**
4. **U_l bắt buộc trong mọi CK; U_r không bao giờ trong CK; U_b thì thử.**
5. **Minimal cover 3 bước: tách RHS đơn → rút LHS → bỏ FD thừa. Kết quả không duy nhất.**
6. **1NF: atomic. 2NF: không partial (nonprime full-dep vào mọi CK). 3NF: không transitive qua nonprime. BCNF: mọi LHS là superkey.**
7. **3NF: X superkey HOẶC A prime. BCNF: X superkey chấm hết — không có ngoại lệ nào.**
8. **BCNF ⊊ 3NF. TEACH (Instructor→Course): 3NF ✓, BCNF ✗ — ví dụ kinh điển.**
9. **Vi phạm 2NF → highest NF = 1NF. Luôn báo dạng chuẩn THẤP nhất đã thỏa.**
10. **NJB lossless (Alg 16.5): `(R1∩R2) → (R1−R2)` hoặc `(R1∩R2) → (R2−R1)` thuộc F⁺.**
11. **BCNF luôn lossless join nhưng có thể MẤT dependency preservation. Lossless KHÔNG thể bỏ.**
12. **Mục tiêu HÌNH THỨC của normalization = attribute preservation + dependency preservation + lossless join. "Minimize NULL" là informal guideline — KHÔNG phải mục tiêu hình thức (F2024-Q24).**
13. **Spurious tuple = join trên attribute không phải PK/FK → dữ liệu giả phình ra.**
14. **4NF diệt MVD non-trivial: X↠Y (Y⊄X và X∪Y≠R) đòi X là superkey. 5NF diệt join dependency tổng quát.**
15. **NULL có 3 nghĩa: (a) không áp dụng, (b) chưa biết, (c) biết nhưng chưa nhập. Đây là lý do informal tránh NULL, không phải mục tiêu phân rã.**

---

## §7. DATA STORAGE & INDEXING — Trọng số đề: 4 câu

> **Tài liệu gốc:** `Lectures/08_DataStorageIndexingStructures.pdf` · `Final/VoTien/Storage.pdf` · `Tutorial/DB-Chapter8.md`
>
> **Tập trung:** bfr & b tính toán (4 trường hợp), 3 loại index & entry count, multilevel cost, B-tree vs B+-tree, "1 Primary OR 1 Clustering", disk geometry.

---

### 7.1. Physical Design — Vị trí trong kiến trúc

```
Miniworld → ERD/EERD (DBMS-independent)
          → Logical schema (relational model)
          → PHYSICAL DESIGN → Internal Schema
```

Song song: thiết kế chương trình ứng dụng + giao dịch → ứng dụng hoàn chỉnh.

🔑 **Keywords (EN):** physical design, internal schema, storage structures, access paths, index.

---

### 7.2. Disk Geometry

```
Disk pack
→ Disk surface  (n đĩa hai mặt → 2n surfaces)
→ Track         (vòng đồng tâm trên 1 surface; capacity ≈ 4–50 KB)
→ Sector/Block  (đơn vị đọc/ghi disk ↔ RAM; B cố định 512–4096 B)
→ Cylinder      (tập track CÙNG bán kính trên TẤT CẢ surfaces)
```

| Thuật ngữ | Bẫy thường gặp |
|---|---|
| **Cylinder** | KHÔNG phải 1 track; KHÔNG phải 1 surface — là tập track cùng bán kính |
| **Interblock gap G** | KHÔNG chứa data hữu ích — chỉ để phân tách block vật lý |
| **Block size B** | Cố định cho hệ thống; địa chỉ = (Cylinder#, Surface/Track#, Block#) |

🔑 **Keywords (EN):** disk pack, surface, track, sector, block, cylinder, interblock gap (G), physical block address.

**Disk geometry formulas:**
```
Rotation time       = 60 000 / p  (ms)          [p = vòng/phút, rpm]
Rotational delay rd = 60 000 / (2p)  (ms)       ← trung bình NỬA VÒNG
Track TOTAL cap     = n × (B + G)               [n = blocks/track]
Track USEFUL cap    = n × B
Transfer rate    tr = track_total_cap / rotation_time
Block transfer time btt = B / tr
Bulk transfer rate btr  = (B / (B + G)) × tr    ← tỉ lệ data thực
Cylinder capacity   = track_cap × #surfaces
Disk pack capacity  = cylinder_cap × #cylinders
```

**Access time (quan trọng nhất):**
```
Access time = s + rd + btt
  s   = seek time (đầu đọc di chuyển tới đúng cylinder)
  rd  = rotational delay (chờ block quay tới đầu đọc)
  btt = block transfer time (truyền 1 block vào RAM)
```

Ví dụ: `p = 7 200 rpm`, `s = 5 ms`, `btt = 0.1 ms` → `rd = 60 000/(2×7200) = 4.17 ms` → `Access = 5 + 4.17 + 0.1 = 9.27 ms`.

**Double buffering:** khi đọc nhiều block LIÊN TIẾP, dùng 2 buffer — CPU xử lý block n trong buffer 1 trong khi disk nạp block n+1 vào buffer 2 → tiết kiệm rotational delay + seek time giữa các block. "20 random blocks" không hưởng lợi; "20 consecutive blocks + double buffering" = nhanh hơn rõ rệt.

🔑 **Keywords (EN):** seek time (s), rotational delay (rd), block transfer time (btt), bulk transfer rate, access time formula, double buffering.

---

### 7.3. File of Records & Block Allocation

**File header (descriptor)** = field names/types, record format, block addresses, file organization — "bìa hồ sơ" của file.

**Block allocation — 3 cách:**

| Cách | Mô tả | Bfr formula |
|---|---|---|
| **Contiguous** | Block liên tiếp; đọc tuần tự nhanh | `⌊B / R⌋` |
| **Linked** | Block rời rạc; mỗi block dành `p` bytes cho pointer | `⌊(B − p) / R⌋` |
| **Indexed** | Index block lưu danh sách địa chỉ; truy cập block thứ k nhanh | như linked |

🔑 **Keywords (EN):** file header, contiguous allocation, linked allocation, indexed allocation, block pointer (p).

---

### 7.4. Record Format & Blocking Factor

| Loại | Mô tả |
|---|---|
| **Fixed-length** | Tất cả record cùng kích thước |
| **Variable-length** | Trường độ dài thay đổi; thường dùng spanned |
| **Unspanned** | Record KHÔNG được phép nằm trên 2 block; phần thừa block bỏ trống |
| **Spanned** | Record có thể chia ra nhiều block liên tiếp |

⚠️ **Deletion marker:** "An additional byte is used as a deletion marker" → cộng **+1 byte** vào `R` trước mọi tính toán.

🔑 **Keywords (EN):** fixed-length record, variable-length record, spanned, unspanned, blocking factor (bfr), deletion marker.

---

### 7.5. FORMULA SHEET — Bắt buộc thuộc

```
══════════════════════ BLOCKING FACTOR ══════════════════════
Unspanned + Contiguous:     bfr = ⌊B / R⌋
Unspanned + Linked:         bfr = ⌊(B − p) / R⌋

══════════════════════ SỐ BLOCK ══════════════════════════════
Unspanned (cả 2 loại):      b = ⌈r / bfr⌉
Spanned + Contiguous:       b = ⌈(r × R) / B⌉
Spanned + Linked:           b = ⌈(r × R) / (B − p)⌉

══════════════════════ SEARCH COST ══════════════════════════
Heap / pile (avg):          b / 2
Heap / pile (worst):        b
Ordered, binary search:     ⌈log₂ b⌉
Hashed (no collision):      1
Insert Heap:                2   (đọc last + ghi)
Insert Ordered:             ⌈log₂ b⌉ + b   (search + shift)

══════════════════════ INDEX ════════════════════════════════
Index entry (sparse — Primary / Clustering):   Rᵢ = V + P
Index entry (dense  — Secondary on key):       Rᵢ = V + PR
  ↑ P  = block pointer (vd 6 B); PR = record pointer (vd 7 B)
bfrᵢ   = ⌊B / Rᵢ⌋
bᵢ     = ⌈#entries / bfrᵢ⌉

#entries theo loại index:
  Primary index   → #data blocks            (sparse)
  Clustering index → #distinct values       (sparse)
  Secondary (key) → #records                (dense)

Single-level index access: ⌈log₂ bᵢ⌉ + 1   ← +1 = data block
Multilevel index access:   L + 1            ← L = số mức index
```

---

### 7.6. 3 File Organizations

| | **Heap (Pile)** | **Ordered (Sequential)** | **Hashed** |
|---|---|---|---|
| Sắp thứ tự? | Không | Theo ordering field | Theo hash function h(K) |
| **Insert** | **Nhanh nhất** — append cuối | **Chậm nhất** — overflow + merge | Nhanh (nếu không collision) |
| **Search (equality)** | b/2 (avg) | ⌈log₂ b⌉ | **1** (no collision) |
| **Range search** | b (worst) | ⌈log₂ b⌉ + scan | **Vô dụng** |
| **Read theo thứ tự** | Phải sort lại | Rất nhanh | Kém |

**Ordered file — overflow (transaction) file:** để tránh insert chậm (phải dịch chuyển record), file ordered duy trì thêm 1 **overflow file** (transaction file) không sắp xếp cho các record mới. Tìm kiếm phải search cả 2 file; định kỳ **merge** overflow vào file chính và sort lại. Đây là lý do ISAM suy giảm khi insert nhiều (xem §7.10).

**Collision resolution (Hashing):**
- **Open addressing** (linear probing): tìm slot trống tiếp theo
- **Chaining**: linked list overflow tại bucket
- **Multiple hashing**: dùng hàm h₂ khi h₁ collision

Load factor tốt = **70–80%**; Dynamic hashing tránh tràn khi file tăng trưởng.

🔑 **Keywords (EN):** heap file, pile, ordered file, sequential file, binary search, overflow file, transaction file, merge, hashed file, external hashing, bucket, hash function h(K), collision, open addressing, chaining, multiple hashing, dynamic hashing, extendible hashing.

---

### 7.7. 3 Loại Single-Level Index — Bảng vàng

| Index | File ordered? | Field type | #entries | Dense/Sparse | Max/file |
|---|---|---|---|---|---|
| **Primary** | Yes — theo **key** | Key | **#data blocks** | **Sparse (Nondense)** | **1** |
| **Clustering** | Yes — theo **non-key** | Non-key | **#distinct values** | **Sparse (Nondense)** | **1** |
| **Secondary (key)** | No | Key | **#records** | **Dense** | Nhiều |
| **Secondary (non-key)** | No | Non-key | Phụ thuộc option | Dense (option 1) | Nhiều |

🔥 **Quy tắc vàng:** 1 file chỉ có **1 Primary HOẶC 1 Clustering** (do chỉ có 1 thứ tự vật lý), **KHÔNG đồng thời cả hai**. Secondary có thể có **nhiều**.

🔥 **Primary = sparse** (1 entry/block); **Secondary on key = dense** (1 entry/record). Đừng lẫn.

🔑 **Keywords (EN):** primary index (ordering key field, sparse, block anchor), clustering index (ordering non-key, sparse, distinct values), secondary index (non-ordering field, dense), dense index, sparse/nondense index.

---

### 7.8. Secondary Index on Non-key Field — 3 Options

Vấn đề: 1 non-key value ánh xạ tới **nhiều** record → phải xử lý:

| Option | Cơ chế | Đặc điểm |
|---|---|---|
| **Opt 1** | 1 entry/record, key lặp lại nhiều lần | Dense; index file lớn |
| **Opt 2** | 1 entry/distinct value → list pointers thẳng | **Nondense** (1 entry/value); list có độ dài thay đổi → khó fixed-size |
| **Opt 3** | 1 entry/distinct value → block trung gian chứa list | **Phổ biến thực tế**; entry kích thước đều |

🔑 **Keywords (EN):** secondary index on non-key, extra indirection block, option 3 (phổ biến).

---

### 7.9. Multilevel Index

Vì file index cũng là file **sorted** → xây primary index trên chính nó → nhiều mức:
```
Level 1 (data index) → bᵢ₁ = ⌈#entries / bfrᵢ⌉
Level 2             → bᵢ₂ = ⌈bᵢ₁ / bfrᵢ⌉
Level 3             → bᵢ₃ = ⌈bᵢ₂ / bfrᵢ⌉
Dừng khi top level fits vừa 1 block → L mức
Access cost = L + 1
```

**Nhược điểm:** Insert/Delete tốn vì phải giữ sorted mọi mức → sinh ra **B-tree/B+-tree** là dynamic multilevel index khắc phục.

🔑 **Keywords (EN):** multilevel index, L levels, top level fits 1 block, search cost = L + 1.

---

### 7.10. Search Tree & ISAM

**Search tree order p:** mỗi node có tối đa `p` tree pointers và `p−1` search keys.
- `P₁` trỏ subtree key `< K₁`; `P₂` trỏ subtree `K₁ < X < K₂`; ... `Pₚ` trỏ subtree `X > K_{p-1}`.
- Node fitting constraint (B+-tree internal): `p × P_tree + (p−1) × V ≤ B`

**ISAM (Indexed Sequential Access Method):**
```
= Multilevel index tĩnh + Ordered data file + Overflow area
```
- Insert ngẫu nhiên → record đi vào overflow chain → overflow dài → search chậm → cần **REORGANIZE**.
- ISAM kém linh hoạt hơn B+-tree (static structure).

🔑 **Keywords (EN):** search tree order p, ISAM, overflow area, reorganize.

---

### 7.11. B-tree vs B+-tree

| Đặc tính | **B-tree** | **B+-tree** |
|---|---|---|
| Data pointer | Ở **mọi level** (internal + leaf) | **CHỈ ở leaf** |
| Internal node | key + data ptr + tree ptr | Chỉ key + tree ptr (nhỏ hơn) |
| Leaf node | key + data ptr | key + data ptr + **P_next** |
| **Fanout** | Nhỏ hơn (internal entry to hơn) | **Lớn hơn** |
| **Chiều cao** | Cao hơn | **Thấp hơn** → search nhanh hơn |
| Range query | Khó (phải duyệt mọi level) | **Dễ** (theo P_next ở leaf) |
| Equality query | Tốt | Tốt |
| Ứng dụng | Ít dùng | **MySQL InnoDB, PostgreSQL — phổ biến nhất** |

**Tự cân bằng:**
- **Insert** vào node đầy → **Split** thành 2, lan tỏa lên cha.
- **Delete** gây underflow (< ⌈p/2⌉) → **Merge** với sibling.
- Min-occupancy: mọi node (trừ root) ≥ ⌈p/2⌉ tree pointers.
- Mọi leaf ở **cùng level** (cây cân bằng hoàn toàn).

🔥 **QUIZ 10 chính xác:** "B+-tree: internal nodes có different structure — no data pointer in internal nodes; no tree pointer in leaf nodes" (C). Insert vào B-tree không rebuild toàn bộ cây — chỉ split node (E đúng).

🔑 **Keywords (EN):** B-tree, B+-tree, data pointer, tree pointer, leaf level, P_next, split, merge, balanced, min-occupancy ⌈p/2⌉, fanout.

---

### 7.12. Oracle Index Types (8 loại)

| Loại | Dùng khi |
|---|---|
| **B-tree indexes** | Mặc định; equality + range |
| **Index-organized tables** | Toàn bộ table nằm trong B+-tree |
| **Reverse key indexes** | Đảo byte → phân tán insert tuần tự, tránh hot block |
| **Descending indexes** | `ORDER BY col DESC` |
| **B-tree cluster indexes** | Cụm bảng (cluster key) |
| **Bitmap / Bitmap join** | Cột **low-cardinality** (Gender, Status) — tốt cho DW |
| **Function-based** | Index trên expression hoặc `UPPER(col)` |
| **Application domain** | User-defined |

```sql
-- Standard B-tree / Unique / Descending / Reverse
CREATE [UNIQUE | BITMAP] INDEX idx_name
ON table_name (col [ASC | DESC], ...) [REVERSE];

-- Bitmap join index (low-cardinality, Data Warehouse)
CREATE BITMAP INDEX emp_bm_idx
ON EMPLOYEES(JOBS.job_title)
FROM EMPLOYEES, JOBS
WHERE EMPLOYEES.job_id = JOBS.job_id;
```

**Khi NÊN / KHÔNG NÊN index:**
- NÊN: cột high-cardinality, tìm kiếm thường xuyên, range query, foreign key.
- KHÔNG NÊN: bảng nhỏ, cột update rất nhiều (volatile), cột hiếm query.

**Index selection với workload hỗn hợp (F2024-Q32):** Employee table — 80% transactions update `Salary` → KHÔNG index Salary dù bị query (quá volatile, overhead write > lợi read); 75% queries range-compare `Dno` → index `Dno`; equality search trên `SSN` → index `SSN`. Kết luận: index `{SSN, Dno}`, loại bỏ Salary. Bẫy: chọn phương án "Salary + SSN + Dno" vì Salary bị query.

---

### 7.13. RAID & SAN

**RAID = Redundant Arrays of Inexpensive Disks.**

| Level | Cơ chế | Redundancy | Chịu fail | Dùng khi |
|---|---|---|---|---|
| **0** | Block striping | **Không** | 0 disk | Tốc độ tối đa |
| **1** | Mirror | 100% | 1 disk | Log, critical data |
| **2** | Hamming code | Bit parity | 1 disk | Hiếm dùng |
| **3** | Byte striping + 1 parity disk | Single parity | 1 disk | Transfer rate cao |
| **4** | Block striping + 1 parity disk | Single parity | 1 disk | Ghi tắc (parity bottleneck) |
| **5** | Block striping, **parity rải đều** | Distributed parity | 1 disk | **Phổ biến nhất server** |
| **6** | Block striping + **P+Q (Reed-Solomon)** | 2 parity | **2 disk** | Backup quan trọng |

**SAN (Storage Area Network):** mạng lưu trữ tốc độ cao; server ↔ storage many-to-many qua Fiber channel; khoảng cách ≤ 10 km cáp quang.

🔑 **Keywords (EN):** RAID (Redundant Arrays of Inexpensive Disks) 0/1/3/5/6, striping, mirroring, parity, Reed-Solomon, SAN, Fiber channel.

---

### 7.14. Worked Numeric Examples (BKTBK, full step-by-step)

---

#### EX-1: Unspanned linked vs Spanned linked (QUIZ 10 Q2 & Q4 — BK-LMS verbatim)

**Setup:** Employee, `r = 25 000`, `R = 75 B`, `B = 512 B`, `p = 6 B`.

**Unspanned + Linked (Q2 → 4 167):**
1. Usable = `B − p = 512 − 6 = 506 B`
2. `bfr = ⌊506 / 75⌋ = ⌊6.75⌋ = 6`
3. `b = ⌈25 000 / 6⌉ = ⌈4 166.67⌉ = 4 167` ✅

**Spanned + Linked (Q4 → 3 706):**
1. Total record bytes = `25 000 × 75 = 1 875 000 B`
2. Usable = `506 B`
3. `b = ⌈1 875 000 / 506⌉ = ⌈3 705.53⌉ = 3 706` ✅

🔥 **Trap:** Spanned → ít block hơn (không lãng phí cuối block); Unspanned → nhiều block hơn.

---

#### EX-2: So sánh 4 phương pháp lưu trữ trên cùng một file (dạng VoTien)

**Setup minh hoạ:** `r = 30 000` record, `R = 100 B`, `B = 1 024 B`, block pointer `p = 8 B`. Tính số block `b` theo cả 4 phương pháp.

| Phương pháp | Công thức | Bước tính | Kết quả `b` |
|---|---|---|---|
| **Unspanned / Contiguous** | `bfr=⌊B/R⌋` → `b=⌈r/bfr⌉` | `bfr=⌊1024/100⌋=10`; `b=⌈30000/10⌉` | **3 000** |
| **Unspanned / Linked** | `bfr=⌊(B−p)/R⌋` → `b=⌈r/bfr⌉` | `bfr=⌊1016/100⌋=10`; `b=⌈30000/10⌉` | **3 000** |
| **Spanned / Contiguous** | `b=⌈(r×R)/B⌉` | `⌈3 000 000/1024⌉=⌈2929.69⌉` | **2 930** |
| **Spanned / Linked** | `b=⌈(r×R)/(B−p)⌉` | `⌈3 000 000/1016⌉=⌈2952.76⌉` | **2 953** |

**Nhận xét (đây là điểm hay hỏi):**
1. **Unspanned lãng phí cuối block** (1024 − 10×100 = 24 B/block bỏ trống) → tốn block hơn spanned.
2. **Spanned tận dụng hết block** → ít block hơn, nhưng record bị cắt qua 2 block → đọc 1 record có thể tốn 2 block access.
3. **Linked** trừ `p` byte/block cho pointer → usable nhỏ hơn → cần nhiều block hơn contiguous (thấy rõ ở dòng spanned: 2953 > 2930).

🔥 **Trap:** đề thường cho 4 đáp án rất gần nhau (lệch vài block) — phải xác định đúng **spanned/unspanned** và **contiguous/linked** rồi áp đúng công thức; tuyệt đối không nhầm `floor` (bfr) với `ceil` (b).

---

#### EX-3: Canonical ordered-file + Primary index (VoTien Q7–Q8, nguồn HK191/192)

**Setup chuẩn:** `r = 300 000`, `R = 100 B`, `B = 4 096 B` (unspanned), `V = 9 B`, `P = 6 B`.

**Bước 1 — File gốc:**
1. `bfr = ⌊4096 / 100⌋ = 40`
2. `b = ⌈300 000 / 40⌉ = 7 500`
3. Binary search (không index): `⌈log₂ 7500⌉ = ⌈12.87⌉ = 13` lần truy cập

**Bước 2 — Primary index:**
4. `Rᵢ = V + P = 9 + 6 = 15 B` (sparse entry — block pointer)
5. `bfrᵢ = ⌊4096 / 15⌋ = 273`
6. #entries = b = `7 500` (sparse, 1 entry/block)
7. `bᵢ = ⌈7500 / 273⌉ = ⌈27.47⌉ = 28`
8. Cost = `⌈log₂ 28⌉ + 1 = 5 + 1 = 6` ← **nhanh hơn gấp đôi so với 13**

🔥 **Trap:** +1 data block cuối cùng bắt buộc — quên = sai.

---

#### EX-4: Clustering index — VoTien Q9

**Setup:** `r = 300 000`, `B = 4 096 B`. Sorted theo Zipcode (1 000 distinct values). `V_zip = 5 B`, `P = 6 B`.

1. `Rᵢ = 5 + 6 = 11 B`
2. `bfrᵢ = ⌊4096 / 11⌋ = 372`
3. #entries = 1 000 (distinct values)
4. `bᵢ = ⌈1000 / 372⌉ = ⌈2.69⌉ = 3`
5. Cost = `⌈log₂ 3⌉ + 1 = 2 + 1 = 3` lần truy cập

🔥 **Trap:** Clustering → #entries = #distinct values (KHÔNG phải #records, không phải #blocks).

---

#### EX-5: Multilevel index — VoTien Q10 / HK211 Q38 chuẩn

**Setup:** `B = 1 024 B`, `p = 6 B`, `r = 50 000`, `R = 60 B`, `V = 9 B`. `bfr = 17`.

1. `b = ⌈50 000 / 17⌉ = ⌈2 941.18⌉ = 2 942`
2. `Rᵢ = 9 + 6 = 15 B`; `bfrᵢ = ⌊1024 / 15⌋ = 68`
3. **Level 1:** `bᵢ₁ = ⌈2942 / 68⌉ = ⌈43.26⌉ = 44`
4. **Level 2:** `bᵢ₂ = ⌈44 / 68⌉ = 1` → fits 1 block → **DỪNG**
5. L = 2 mức → Cost = `L + 1 = 2 + 1 = 3` ✅

🔥 **Trap:** MCQ Q38 đáp án A = "12" — đây là `⌈log₂ 2942⌉ = 12` (binary search trên **data file**), KHÔNG phải multilevel index cost. Multilevel index = **3**. Khi đề hỏi "multilevel index" → dùng **L + 1 = 3**, không phải 12.

---

#### EX-6: HK191 series — orderNo/orderDate/BillNo (VoTien Q18–Q22)

**Setup:** `B = 512 B`, `r = 30 000`, `R = 45 B` (orderNo 13+qty 1+amount 4+status 1+orderDate 13+BillNo 13), file sorted theo **orderNo** (PK); BillNo = candidate key; `p = 6 B`, `V_{orderNo} = 13 B`.

**Q18 — Phân loại index:**
- orderNo = PK, file sorted theo orderNo → **Primary index**
- BillNo = candidate key (unique), file KHÔNG sorted theo BillNo → **Secondary index** (dense, #entries=#records)
- orderDate = non-key, non-ordering → **Secondary index** ✅ **Đáp án D**

> ⚠️ **Tranh luận HK191-Q36 (BillNo):** Đáp án chính thức của đề gọi BillNo là "clustering index", nhưng phân tích đúng: BillNo là *candidate key* trên file KHÔNG sắp thứ tự theo BillNo → phải là **Secondary index (dense)**, không phải clustering (clustering = non-key ordering field). Ghi chú "có thể là lỗi đề" — khi thi, nếu xuất hiện lại hãy chọn Secondary dense và giải thích.

**Q19 — bfr:**
1. `bfr = ⌊512 / 45⌋ = ⌊11.38⌋ = 11` ✅ (Đáp án A)

**Q20 — b:**
2. `b = ⌈30 000 / 11⌉ = ⌈2727.27⌉ = 2 728` ✅ (Đáp án C)

**Q21 — Primary index bfrᵢ:**
3. `Rᵢ = V + P = 13 + 6 = 19 B`
4. `bfrᵢ = ⌊512 / 19⌋ = ⌊26.95⌋ = 26` ✅ (Đáp án D)

**Q22 — Primary index access cost:**
5. #entries = b = `2 728`
6. `bᵢ = ⌈2728 / 26⌉ = ⌈104.9⌉ = 105`
7. Cost = `⌈log₂ 105⌉ + 1 = 7 + 1 = 8` ✅ (Đáp án B)

---

#### EX-7: Secondary index (dense) vs Primary (VoTien Q10 secondary variant)

**Setup giống EX-3:** `r = 300 000`, `b = 7 500`, `B = 4 096`, `V_secondary = 9 B`, `P_R = 6 B`.

1. `Rᵢ = 9 + 6 = 15 B` (dense: V + P_R — record pointer)
2. `bfrᵢ = ⌊4096 / 15⌋ = 273`
3. #entries = r = **300 000** (dense, 1 entry/record)
4. `bᵢ = ⌈300 000 / 273⌉ = ⌈1 098.9⌉ = 1 099`
5. Cost = `⌈log₂ 1099⌉ + 1 = 11 + 1 = 12`

So sánh: Primary → 6 lần; Secondary (dense) → 12 lần; Linear heap → b/2 = 3 750 lần.

---

#### EX-8: Multilevel index — tính số mức L từ tham số thô (HK241-Q17)

**Setup:** `r = 30 000`, `B = 1 024 B`, `R = 100 B`, `V = 9 B`, `Pb = 6 B` (block pointer).

1. `bfr = ⌊1024 / 100⌋ = 10`
2. `b = ⌈30 000 / 10⌉ = 3 000` (data blocks = #entries level 1)
3. Index entry: `Rᵢ = V + Pb = 9 + 6 = 15 B`; `bfrᵢ = ⌊1024 / 15⌋ = 68`
4. **Level 1:** `bᵢ₁ = ⌈3 000 / 68⌉ = ⌈44.12⌉ = 45`
5. **Level 2:** `bᵢ₂ = ⌈45 / 68⌉ = 1` → fits 1 block → **DỪNG**
6. **L = 2 mức** → Access cost = `L + 1 = 3` ✅

🔥 **Trap HK241-Q17:** đáp án nhiễu là "45" (level-1 blocks), "3000" (data blocks), "10" (bfr). Câu hỏi hỏi số lần truy cập → L + 1 = **3**.

---

### 7.15. File Operations

| Operation | Mô tả | Ghi chú |
|---|---|---|
| **OPEN** | Mở file, set current record pointer | |
| **FIND** | Tìm record đầu tiên thỏa điều kiện | |
| **FINDNEXT** | Tìm record kế tiếp thỏa điều kiện | |
| **READ** | Đọc current record vào biến | |
| **INSERT** | Thêm record mới | |
| **DELETE** | Xóa current record — thường **mark invalid** | Xóa vật lý qua REORGANIZE |
| **MODIFY** | Sửa field của current record | |
| **CLOSE** | Đóng file | |
| **REORGANIZE** | Tổ chức lại file, xóa vật lý record đã mark | |
| **READ_ORDERED** | Đọc theo thứ tự field | |

🔑 **Keywords (EN):** OPEN, FIND, FINDNEXT, READ, INSERT, DELETE (mark), MODIFY, REORGANIZE, current record pointer.

---

### 7.16. So sánh tổng hợp — Primary vs Clustering vs Secondary

| | Primary | Clustering | Secondary (key) |
|---|---|---|---|
| File ordered? | Yes | Yes | No |
| Field type | Key | Non-key | Key hoặc Non-key |
| #entries | #blocks | #distinct values | #records |
| Dense/Sparse | Sparse | Sparse | Dense |
| Max per file | 1 | 1 | Nhiều |
| Coexistence | Không cùng Clustering | Không cùng Primary | OK với cả 2 |

---

### 🎯 MCQ Traps §7

1. 🔥 `bfr = ⌊B/R⌋` **floor** — 11.37 → 11, KHÔNG round up. `b = ⌈r/bfr⌉` **ceil** — không bao giờ floor.
2. 🔥 **Primary index**: #entries = **#data blocks** (sparse); bẫy: nhiều người nghĩ là #records.
3. 🔥 **Clustering index**: #entries = **#distinct values** (KHÔNG phải #blocks, KHÔNG phải #records).
4. 🔥 **Secondary on key**: #entries = **#records** (dense); entry = `V + PR` (record pointer PR, không phải block pointer P).
5. 🔥 **+1 bắt buộc** sau `⌈log₂ bᵢ⌉` khi tính index cost (+1 = data block) — quên = sai.
6. 🔥 Multilevel cost = **L + 1**. "12" trong Q38 là binary search trên data file, KHÔNG phải multilevel cost.
7. 🔥 **1 file CHỈ 1 Primary HOẶC 1 Clustering** — không đồng thời cả hai. Many Secondary = OK. Nếu đề có 3 phương án đều vi phạm quy tắc này → chọn "tất cả đều sai" (HK241-Q18).
8. 🔥 **B+-tree**: data pointer chỉ ở leaf; internal nodes chỉ có key + tree pointer. B-tree: data pointer ở mọi level.
9. 🔥 **Hashing** = cực tốt equality (`=`), **vô dụng** cho range (`<`, `>`, `BETWEEN`).
10. 🔥 **Insert heap = 2** (rẻ — chỉ đọc last block + ghi); insert ordered = đắt (binary search + dịch chuyển).
11. 🔥 **RAID 5** = phổ biến nhất (parity rải đều, tolerate 1 fail); **RAID 6** = chịu **2** disk fail.
12. 🔥 **Index trên unordered file = Secondary** — không phải Primary (Primary đòi file phải sorted theo field đó).
13. 🔥 **Secondary index Option 2** (1 entry/distinct value → list pointers) = **nondense**, không phải dense — chỉ Option 1 (key lặp lại) mới là dense.
14. 🔥 **Chọn index theo workload:** cột volatile (update nhiều) → KHÔNG index dù bị query; ưu tiên cột high-cardinality + truy vấn thường xuyên. Exclude Salary nếu 80% write.
15. 🔥 **BillNo (HK191-Q36):** đáp án chính thức "clustering" có thể sai — BillNo là candidate key trên file không sắp theo BillNo → đúng là **Secondary dense**. Tranh luận: "lỗi đề".

---

### 🪄 Câu thần chú §7

59. `bfr = ⌊B/R⌋` floor; `b = ⌈r/bfr⌉` ceil — không đổi.
60. Heap b/2; Ordered ⌈log₂ b⌉; Hashed 1.
61. Primary + Clustering = **nondense (sparse)**; Secondary on key = **dense**.
62. 1 file CHỈ **1 Primary HOẶC 1 Clustering**; có thể nhiều Secondary.
63. Single index search: `⌈log₂ bᵢ⌉ + 1` (+1 = data block, BẮT BUỘC).
64. Multilevel: `L + 1`; dừng khi top level vừa 1 block.
65. B+-tree: data pointer **CHỈ ở leaf**; leaf nối P_next → range query nhanh.
66. B-tree internal có data ptr → entry to → fanout nhỏ → cây cao hơn B+-tree.
67. Hashing: cực tốt equality, **vô dụng** range query.
68. RAID = Redundant Arrays of Inexpensive Disks; RAID 5 phổ biến (parity rải); RAID 1 mirror; RAID 6 chịu 2 fail; RAID 0 không redundancy.
69. Access time = **s + rd + btt**; rd = 60 000/(2p) — trung bình nửa vòng, không phải 1 vòng.
70. Disk access unit = **Block** (KHÔNG phải record, KHÔNG phải file).
71. `P` = block pointer (entry sparse); `PR` = record pointer (entry dense) — đừng nhầm.
72. Double buffering tăng tốc đọc block **liên tiếp** — không giúp gì cho random I/O.
73. Ordered file dùng overflow/transaction file cho insert nhanh; merge định kỳ để giữ thứ tự.

---

## §8. DATABASE SECURITY — Trọng số đề: 3 câu

> **Exam weight:** ~3 MCQ / 50. Open-book → skim keyword tables và micro-examples.  
> **DBA** là người chịu trách nhiệm tổng thể về bảo mật CSDL.

---

### 8.1 Tổng quan — Các loại & mối đe dọa

#### Phân loại vấn đề bảo mật (Types of Security)

| Loại | Ví dụ |
|---|---|
| **Legal and ethical issues** | GDPR, HIPAA — quy định pháp lý bảo vệ dữ liệu cá nhân |
| **Policy issues** | Quy tắc công ty: ai được xem dữ liệu lương |
| **System-related issues** | Chọn bảo mật ở tầng phần cứng, OS, hay DBMS |
| **Multiple security levels** | Phân loại dữ liệu: Public / Confidential / Top Secret |

🔑 **Keywords (EN):** `legal`, `ethical`, `policy`, `system-related`, `multiple security levels`

---

#### Ba khái niệm nền tảng 🔥

| Khái niệm | Định nghĩa |
|---|---|
| **Authentication** | Xác minh danh tính — "người dùng có đúng là họ không?" |
| **Authorization** | Cấp quyền — cho phép chủ thể truy cập hợp lệ vào đối tượng |
| **Access Control** | Cơ chế DBMS hạn chế truy cập vào CSDL |

**Thứ tự khi đăng nhập:** `Identification → Authentication → Authorization`

🔑 **Keywords (EN):** `authentication`, `authorization`, `access control`, `identification`

---

#### Ba mối đe dọa chính đối với CSDL 🔥

| Mối đe dọa | Ý nghĩa |
|---|---|
| **Loss of integrity** | Dữ liệu bị sửa đổi trái phép → không còn chính xác, nhất quán |
| **Loss of availability** | Dữ liệu/hệ thống không thể truy cập khi cần |
| **Loss of confidentiality** | Dữ liệu bị lộ cho người không có quyền |

> Integrity = dữ liệu **chính xác và nhất quán** (accurate and consistent) — không phải "bảo mật" hay "không dư thừa".

**Phân biệt CIA nhanh:**

| Thuộc tính | Ý nghĩa cốt lõi | Ví dụ |
|---|---|---|
| **Confidentiality** | Chặn truy cập **trái phép** | Người ngoài không đọc được dữ liệu |
| **Integrity** | Chặn **sửa đổi trái phép** | Dữ liệu không bị alter không có thẩm quyền |
| **Availability** | Đảm bảo **truy cập được khi cần** | Người dùng hợp lệ gửi request và nhận được dữ liệu |

> **Bẫy thường gặp (F2024-Q33):** "Hành khách xem được thông tin chuyến bay của mình khi request; chỉ manager được sửa" — tính chất cấp cho hành khách là **Availability** (truy cập được khi cần), **KHÔNG phải Confidentiality**. SV dễ nhầm vì nghĩ "chỉ xem dữ liệu của mình = confidential" — sai. Confidentiality nói về ngăn truy cập trái phép, không nói về việc chủ thể hợp lệ truy cập được.

🔑 **Keywords (EN):** `loss of integrity`, `loss of availability`, `loss of confidentiality`

---

#### Bốn biện pháp đối phó (Countermeasures)

| Biện pháp | Mục đích |
|---|---|
| **Access control** | Kiểm soát ai được truy cập gì |
| **Inference control** | Ngăn suy diễn thông tin cá nhân từ truy vấn thống kê |
| **Flow control** | Ngăn thông tin chảy đến người không có quyền |
| **Encryption** | Mã hóa dữ liệu nhạy cảm khi lưu/truyền |

🔑 **Keywords (EN):** `access control`, `inference control`, `flow control`, `encryption`

---

#### Hai loại cơ chế bảo mật DBMS

| Loại | Đặc điểm | Ví dụ |
|---|---|---|
| **Discretionary security mechanisms** | Chủ sở hữu tự quyết định ai được quyền gì | `GRANT SELECT ON Employee TO Alice;` |
| **Mandatory security mechanisms** | Hệ thống quyết định dựa trên nhãn phân loại | User clearance Secret không đọc được Top Secret |

---

### 8.2 Discretionary Access Control (DAC) 🔥

**Định nghĩa:** Người dùng kiểm soát dữ liệu họ sở hữu; có thể grant/revoke quyền cho người khác; tự định nghĩa kiểu truy cập (read/write/execute…).

🔑 **Keywords (EN):** `discretionary access control`, `GRANT`, `REVOKE`, `privilege`, `owner`, `WITH GRANT OPTION`, `access matrix model`

---

#### Hai cấp độ đặc quyền DAC

| Cấp | Đặc quyền |
|---|---|
| **Account level** | DBA cấp quyền cho account bất kể relation nào: `CREATE SCHEMA`, `CREATE TABLE`, `CREATE VIEW`, `ALTER`, `DROP`, `MODIFY` (INSERT/DELETE/UPDATE), `SELECT` |
| **Relation/Table level** | Quyền trên từng relation R cụ thể: `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `REFERENCES` |

> `UPDATE` và `INSERT` ở relation-level có thể giới hạn chỉ trên **một số cột** nhất định.  
> `SELECT` và `DELETE` **không** attribute-specific.

---

#### Cú pháp GRANT / REVOKE

```sql
-- Cấp quyền cơ bản
GRANT SELECT, INSERT ON Employee, Department TO A2;

-- Cấp với quyền truyền tiếp (WITH GRANT OPTION)
GRANT SELECT ON Employee, Department TO A3 WITH GRANT OPTION;

-- Cấp trên cột cụ thể
GRANT UPDATE ON Employee (Salary) TO A4;

-- Thu hồi (kèm cascade tự động)
REVOKE SELECT ON Employee FROM A3;
```

---

#### Micro-example: GRANT OPTION + Cascading REVOKE 🔥

```
A1 tạo bảng Employee (A1 là owner).

Bước 1: A1 → GRANT SELECT ON Employee TO A3 WITH GRANT OPTION;
Bước 2: A3 → GRANT SELECT ON Employee TO A4;          (không có GRANT OPTION)
Bước 3: A4 không thể tiếp tục propagate (vì không có GRANT OPTION).

Bước 4: A1 → REVOKE SELECT ON Employee FROM A3;
         ↳ Hệ thống tự động REVOKE SELECT từ A4 luôn!
         ↳ A4 mất quyền vì quyền của A4 phụ thuộc vào A3.
```

> **Quy tắc cascade REVOKE:** Khi A1 revoke từ A3, **tất cả quyền mà A3 đã propagate** cũng bị thu hồi tự động.

**Kịch bản nhiều tầng (từ MCQ):**  
`A1 →(GRANT OPTION)→ A2 →(GRANT OPTION)→ A3 → A4`  
Nếu A1 REVOKE từ A2 → A2, A3, A4 đều mất quyền. ✓

---

#### Views như cơ chế bảo mật 🔥

Dùng VIEW khi muốn giới hạn:
- **Theo hàng (row filtering):** `CREATE VIEW v5 AS SELECT * FROM Employee WHERE Dno=5;`
- **Theo cột (column filtering):** `CREATE VIEW v_safe AS SELECT Name, Bdate FROM Employee;`
- **Kết hợp:** UNION để ẩn salary của nhóm cụ thể

```sql
-- MCQ pattern: Wong là manager dno=1, cần xem nhân viên dno=1
CREATE VIEW wong_view AS
  SELECT * FROM Employee WHERE dno = 1;
GRANT SELECT ON wong_view TO Wong;
-- ❌ GRANT SELECT ON Employee WHERE dno=1 TO Wong; -- KHÔNG HỢP LỆ TRONG SQL
-- ❌ GRANT SELECT ON Employee, wong_view TO Wong;  -- Thừa và cấp quá nhiều
```

> Để tạo view, account phải có `SELECT` trên **tất cả** relations trong view definition.

---

#### Điểm yếu của DAC — Trojan Horse

DAC dễ bị tấn công **Trojan Horse**: malicious program đọc dữ liệu từ object người dùng có quyền đọc, rồi ghi sang object khác mà kẻ tấn công có quyền đọc — không cần vi phạm access control trực tiếp.

🔑 **Keywords (EN):** `Trojan horse`, `DAC weakness`, `unrestricted information flow`

---

### 8.3 Mandatory Access Control (MAC) 🔥

**Định nghĩa:** Hệ thống **tự quyết định** quyền truy cập (read/write) dựa trên nhãn phân loại bảo mật của chủ thể (subject) và đối tượng (object) — không phụ thuộc vào ý muốn của chủ sở hữu dữ liệu.

🔑 **Keywords (EN):** `mandatory access control`, `security classification`, `clearance level`, `security label`, `Bell-LaPadula`, `subject`, `object`

---

#### Cấp độ phân loại (Security Classes) 🔥

```
Top Secret (TS)  ≥  Secret (S)  ≥  Confidential (C)  ≥  Unclassified (U)
```

- **Subject** (người dùng) có **clearance level**
- **Object** (dữ liệu) có **classification level**

---

#### Bell-LaPadula Model — Hai quy tắc cốt lõi 🔥

| Quy tắc | Tên | Điều kiện đọc/ghi |
|---|---|---|
| **No read-up** (simple security property) | Không đọc lên | S đọc O khi: `class(S) ≥ class(O)` |
| **No write-down** (star property / \* property) | Không ghi xuống | S ghi O khi: `class(S) ≤ class(O)` |

**Mục đích:** Bảo vệ **tính bí mật (confidentiality)** — không phải integrity hay availability.

🔑 **Keywords (EN):** `no read-up`, `no write-down`, `simple security property`, `star property`, `*-property`, `confidentiality`

---

#### Micro-example: Quyết định đọc/ghi Bell-LaPadula

```
Subject S có clearance = Secret (S).
Object O1 có classification = Confidential (C): S ≥ C → S ĐƯỢC ĐỌC O1. ✓
Object O2 có classification = Top Secret (TS): S < TS → S KHÔNG ĐƯỢC ĐỌC O2. ✗

Về ghi:
S ghi O1 (C): S > C → vi phạm no write-down → KHÔNG ĐƯỢC GHI. ✗
S ghi O3 (TS): S ≤ TS → ĐƯỢC GHI O3. ✓
```

---

#### So sánh DAC vs MAC 🔥

| Tiêu chí | DAC | MAC |
|---|---|---|
| **Ai quyết định** | Chủ sở hữu dữ liệu | Hệ thống (dựa trên nhãn) |
| **Độ linh hoạt** | Cao — phù hợp nhiều lĩnh vực | Thấp — chỉ dùng trong môi trường hạn chế |
| **Mức độ bảo mật** | Thấp hơn | **Cao hơn** |
| **Nguy cơ** | Dễ bị Trojan Horse | Ngăn được Trojan Horse |
| **Ứng dụng** | Thương mại phổ thông | Quân sự, chính phủ |
| **Cài đặt** | Dễ hơn | Phức tạp hơn |

> DAC **không ngăn được** Trojan Horse. MAC **có thể ngăn** vì flow information bị kiểm soát chặt.

---

### 8.4 Multilevel Relations & Polyinstantiation

#### Cấu trúc Multilevel Relation

Trong hệ thống MAC + relational model, mỗi relation có dạng:

```
R(A1, C1, A2, C2, ..., An, Cn, TC)
```

- `Ci`: classification attribute của attribute `Ai`
- `TC` (Tuple Classification): nhãn bảo mật **cao nhất** trong tất cả `Ci` của tuple
- **Apparent key**: primary key của relation bình thường (tất cả giá trị key phải cùng classification, không được NULL)

🔑 **Keywords (EN):** `multilevel relation`, `apparent key`, `tuple classification (TC)`, `classification attribute`, `polyinstantiation`

---

#### Ví dụ hiển thị theo clearance level 🔥

Bảng gốc (chỉ admin TS thấy đầy đủ):

| Name | Salary | JobPerformance | TC |
|---|---|---|---|
| Smith `U` | 40000 `C` | Fair `S` | S |
| Brown `C` | 80000 `S` | Good `C` | S |

| User clearance | Thấy gì |
|---|---|
| **S (Secret)** | Cả hai rows đầy đủ |
| **C (Confidential)** | Smith: JobPerformance→NULL; Brown: Salary→NULL; TC hạ xuống C |
| **U (Unclassified)** | Chỉ thấy Smith (TC=S > U → Brown ẩn); Salary=NULL, JobPerformance=NULL |

> **Quy tắc:** User chỉ thấy **attribute** có `C_attr ≤ clearance(user)`, giá trị cao hơn → NULL.  
> User chỉ thấy **row** nếu có thể thấy **apparent key** của row đó.

---

#### Polyinstantiation 🔥

**Định nghĩa:** Nhiều tuples có cùng apparent key nhưng giá trị attribute **khác nhau** ở các classification level khác nhau.

**Tại sao cần polyinstantiation?** Để **ngăn covert channel** (information leak): nếu DBMS từ chối INSERT của user U vì 'Brown' đã tồn tại ở level cao hơn → user U biết Brown tồn tại → thông tin bị lộ.

```
Ví dụ: User C UPDATE Employee SET JobPerformance='Excellent' WHERE Name='Smith'

Kết quả (polyinstantiation):
Smith U | 40000 C | Fair S      | TC=S   ← row cũ (S-level thấy)
Smith U | 40000 C | Excellent C | TC=C   ← row mới (C-level thấy)
```

**Điều kiện toàn vẹn entity (entity integrity) trong multilevel:**
- Tất cả attributes thuộc apparent key phải **NOT NULL** và có **cùng classification**
- Mọi attribute khác trong tuple phải có classification ≥ classification của apparent key

---

### 8.5 Role-Based Access Control (RBAC)

**Định nghĩa:** Quyền gắn với **roles** (vai trò); users được gán vào roles phù hợp.

```sql
CREATE ROLE manager;
GRANT SELECT, UPDATE ON Employee TO manager;
GRANT manager TO Alice;
DESTROY ROLE manager;
```

**Đặc điểm:**
- Nổi lên mạnh từ thập niên 1990
- Hỗ trợ **role hierarchy** (phân cấp vai trò)
- Hỗ trợ **temporal constraints** (giới hạn thời gian kích hoạt role)
- Phù hợp với enterprise và web-based applications — nơi DAC/MAC không đủ mạnh
- Vấn đề **Role Explosion** khi số roles quá lớn → ABAC giải quyết

🔑 **Keywords (EN):** `role`, `role hierarchy`, `CREATE ROLE`, `DESTROY ROLE`, `role-based access control`, `role explosion`

---

### 8.6 Attribute-Based & Context-Based Access Control

#### ABAC (Attribute-Based Access Control)

Đánh giá **thuộc tính** thay vì roles:

| Loại attribute | Ví dụ |
|---|---|
| Subject attributes | Job title, department, clearance level |
| Object attributes | Document type, classification, creation date |
| Environment conditions | Time of day, IP address, location |

Kiến trúc: `User → PEP (Enforcement) → PDP (Decision) → Policy → Allow/Deny`

🔑 **Keywords (EN):** `ABAC`, `subject attributes`, `object attributes`, `environment conditions`, `PEP`, `PDP`, `fine-grained access control`

#### CBAC (Context-Based Access Control)

Kiểm soát dựa trên **bối cảnh môi trường** tại thời điểm yêu cầu: thời gian, địa điểm, thiết bị, mạng. Nền tảng cho mô hình **Zero Trust**.

---

#### So sánh 4 mô hình Access Control

| Model | Căn cứ đánh giá | Đặc điểm |
|---|---|---|
| **DAC** | Chủ sở hữu quyết định | Linh hoạt, dễ triển khai, dễ bị Trojan Horse |
| **MAC** | Nhãn phân loại hệ thống | Bảo mật cao, cứng nhắc, phức tạp |
| **RBAC** | Vai trò (roles) | Dễ quản lý, phù hợp enterprise, có thể bùng nổ roles |
| **ABAC** | Thuộc tính đa chiều | Granular cao, linh hoạt, phức tạp cài đặt |
| **CBAC** | Bối cảnh môi trường | Động, thêm tầng bảo mật real-time |

---

### 8.7 Mã hóa (Encryption)

#### Các loại mã hóa

| Loại | Cơ chế | Ví dụ thuật toán |
|---|---|---|
| **Symmetric encryption** | Cùng 1 key để mã hóa và giải mã | AES (128/192/256-bit), DES, 3DES |
| **Asymmetric encryption** | Public key + Private key | RSA, ECC |
| **Hashing** | Hàm một chiều (one-way) | SHA-256, bcrypt, Argon2 |

#### Asymmetric Encryption — Quy tắc sử dụng key 🔥

| Mục đích | Key dùng để mã hóa | Key dùng để giải mã |
|---|---|---|
| **Data confidentiality** (bảo mật nội dung) | **Public key** của người nhận | Private key của người nhận |
| **Authentication / Digital signature** (xác thực / chữ ký) | **Private key** của người gửi | Public key của người gửi |

> MCQ kinh điển: "Alice muốn đảm bảo tính toàn vẹn (integrity / authentication) của message gửi Bob" → Alice dùng **private key của Alice** để mã hóa.

🔑 **Keywords (EN):** `public key`, `private key`, `asymmetric encryption`, `digital signature`, `data confidentiality`, `authentication`, `TDE` (Transparent Data Encryption), `TLS/SSL`

---

### 8.8 Statistical Database Security & Inference Control

**Vấn đề:** CSDL thống kê chỉ cho phép truy vấn tổng hợp (AVG, COUNT, SUM) nhưng vẫn có thể bị suy diễn để lộ dữ liệu cá nhân.

**Inference attack example:**
```sql
SELECT COUNT(*) FROM Emp WHERE Dept='CS' AND Gender='F'  → 1
SELECT AVG(Salary) FROM Emp WHERE Dept='CS' AND Gender='F' → 85000
-- ⇒ Lộ lương cá nhân của người duy nhất đó!
```

**Biện pháp Inference Control:**

| Kỹ thuật | Mô tả |
|---|---|
| **Query Set Size Control** | Từ chối truy vấn nếu result set < ngưỡng (vd: < 5 records) |
| **Query Restriction / Auditing** | Log và block chuỗi truy vấn đáng ngờ |
| **Data Perturbation** | Thêm noise vào kết quả trước khi trả về |
| **Data Swapping** | Hoán đổi giá trị giữa records, giữ nguyên thống kê |
| **Differential Privacy** | Thêm noise có tính toán toán học (Apple, Google) |

🔑 **Keywords (EN):** `statistical database`, `inference attack`, `inference control`, `tracker attack`, `query set size control`, `data perturbation`, `differential privacy`

---

### 8.9 Flow Control & Covert Channels

**Flow control:** Ngăn thông tin chảy theo cách vi phạm chính sách bảo mật.

**Covert channel:** Kênh truyền thông tin **ngầm, không trực tiếp** — vi phạm chính sách bảo mật mà không dùng access control thông thường.

> Ví dụ covert channel: Process bí mật cao mã hóa dữ liệu bằng cách thay đổi pattern CPU usage hoặc lock/unlock file → process bí mật thấp quan sát pattern và giải mã — không cần đọc trực tiếp.

🔑 **Keywords (EN):** `flow control`, `covert channel`, `implicit information flow`, `security policy`

---

### 8.10 Auditing & Audit Trail

- DBMS ghi nhật ký (**system log / audit trail**) tất cả thao tác trên CSDL theo từng user session.
- Khi nghi ngờ có xâm phạm → thực hiện **database audit**: review log tất cả accesses trong khoảng thời gian nhất định.
- **Audit trail**: log dùng chủ yếu cho mục đích bảo mật.

🔑 **Keywords (EN):** `audit trail`, `database audit`, `system log`, `login session`

---

### 8.11 SQL Injection

**Định nghĩa:** Kẻ tấn công chèn SQL code độc hại vào input của ứng dụng để thao túng truy vấn cơ sở dữ liệu.

#### Micro-example nhận diện SQL Injection

```sql
-- Input hợp lệ:
SELECT * FROM users WHERE name='alice' AND pwd='secret';

-- Tautology attack (luôn đúng):
-- Input: ' OR '1'='1
SELECT * FROM users WHERE name='' OR '1'='1' AND pwd='';
-- → Luôn trả về rows → bypass authentication

-- Piggy-backed query:
-- Input: alice'; DROP TABLE users; --
SELECT * FROM users WHERE name='alice'; DROP TABLE users;--

-- UNION-based:
-- Input: ' UNION SELECT username,password FROM admin--
```

#### Phân loại SQL Injection & Phòng chống

| Loại tấn công | Đặc điểm |
|---|---|
| **Tautology** | Chèn điều kiện luôn đúng (`OR 1=1`) |
| **Union-based** | Dùng `UNION` để lấy thêm dữ liệu từ bảng khác |
| **Piggy-backed queries** | Chèn thêm câu SQL thứ hai sau dấu `;` |

| Biện pháp phòng chống | Mô tả |
|---|---|
| **Bind variables / Parameterized queries** | `?` hoặc `:param` — input không bao giờ được parse thành SQL code |
| **Input validation** | Kiểm tra, escape ký tự đặc biệt (quotes, semicolons…) |
| **Stored procedures** | Gọi procedure thay vì xây dựng SQL động |
| **Principle of least privilege** | Tài khoản DB chỉ có quyền tối thiểu cần thiết |

🔑 **Keywords (EN):** `SQL injection`, `tautology`, `union attack`, `piggy-backed query`, `bind variables`, `parameterized queries`, `input validation`, `stored procedures`

---

### 8.12 Privacy & Data Protection

- **Privacy:** quyền của cá nhân kiểm soát thông tin về bản thân.
- **Data protection regulations:** GDPR (EU), HIPAA (US healthcare), CCPA.
- Liên quan đến **data anonymization** và **differential privacy** khi công bố dữ liệu thống kê.

🔑 **Keywords (EN):** `privacy`, `data protection`, `GDPR`, `anonymization`

---

### 8.13 MCQ Traps — Bẫy thường gặp

1. **DAC vs MAC confusion 🔥**  
   - DAC: **chủ sở hữu** quyết định → dễ triển khai, ít bảo mật.  
   - MAC: **hệ thống** quyết định theo nhãn → bảo mật cao hơn DAC. MAC **không** phải dễ triển khai hơn DAC.

2. **Bell-LaPadula direction trap 🔥**  
   - "No read-**up**" → không đọc dữ liệu có classification **cao hơn** mình: `class(S) ≥ class(O)` để ĐỌC.  
   - "No write-**down**" → không ghi dữ liệu có classification **thấp hơn** mình: `class(S) ≤ class(O)` để GHI.  
   - Bell-LaPadula bảo vệ **confidentiality** (không phải integrity, không phải availability).  
   - BiBa model (ngược lại: no read-down, no write-up) bảo vệ **integrity**.

3. **GRANT OPTION propagation cascade 🔥**  
   - Revoke từ B → **tất cả** quyền B đã grant (kể cả qua nhiều tầng) bị thu hồi.  
   - A→B(GRANT OPTION)→C(GRANT OPTION)→D: A revoke B → B, C, D đều mất. ✓

4. **WITH GRANT OPTION vs WITH ADMIN OPTION**  
   - `WITH GRANT OPTION` dùng cho privileges (object-level).  
   - `WITH ADMIN OPTION` dùng cho roles — khác nhau, không dùng lẫn.

5. **VIEW + GRANT là cách đúng để filter rows/columns 🔥**  
   - `GRANT SELECT ON Employee WHERE Dno=5 TO u1;` — **KHÔNG HỢP LỆ** trong SQL.  
   - Đúng: tạo VIEW với WHERE, rồi GRANT SELECT trên VIEW.  
   - GRANT trên view **không** kèm GRANT trên base table.

6. **TC (Tuple Classification) = giá trị cao NHẤT 🔥**  
   - TC = max của tất cả `Ci` trong tuple — **không phải** của apparent key.  
   - Apparent key classification ≤ các attribute classification khác trong cùng tuple.

7. **Asymmetric key: public vs private 🔥**  
   - Mã hóa bằng **public key** → đảm bảo **confidentiality** (chỉ người nhận có private key mới giải được).  
   - Mã hóa bằng **private key** → đảm bảo **authentication/signature** (ai cũng verify được bằng public key).

8. **RBAC ≠ DAC**  
   - RBAC **không phải** chỉ là tên khác của DAC. RBAC là mô hình độc lập — permissions gắn với roles, users gắn với roles.

9. **DBA là người chịu trách nhiệm bảo mật**  
   - Không phải CEO, CIO hay programmer.

10. **Polyinstantiation: tại sao không reject INSERT/UPDATE?**  
    - Reject → user cấp thấp biết có tuple cấp cao tồn tại → **covert channel** → lộ thông tin.  
    - Giải pháp: tạo tuple mới (polyinstantiation) thay vì reject.

11. **Availability vs Confidentiality trap 🔥 (F2024-Q33)**  
    - "User xem được dữ liệu của chính mình khi request" = **Availability** — không phải Confidentiality.  
    - Ví dụ: hành khách request xem thông tin chuyến bay của mình → tính chất được đảm bảo là **Availability** (truy cập được khi cần).  
    - SV dễ nhầm: "chỉ xem dữ liệu của mình = confidential" → **SAI**. Confidentiality = ngăn truy cập **trái phép**; Availability = đảm bảo truy cập **hợp lệ** thành công.

12. **Cross-DBMS comparison: cái gì universal, cái gì không 🔥 (HK211mock-Q35)**  
    - Oracle, SQL Server, MySQL đều dùng: **relational data model** ✓ (universal)  
    - "Đều hỗ trợ MAC" → **SAI** ✗ — MAC không phải tính năng chuẩn của cả 3.  
    - "Đều dùng cùng cấu trúc index" → **SAI** ✗ — index structure là vendor-specific.  
    - Quy tắc nhanh: relational model = universal ✓; MAC = không phổ quát ✗; index implementation = vendor-specific ✗.

---

### 8.14 Quick-ref: Công thức Bell-LaPadula (ôn nhanh)

```
READ  hợp lệ khi: clearance(Subject) ≥ classification(Object)   [read DOWN = OK]
WRITE hợp lệ khi: clearance(Subject) ≤ classification(Object)   [write UP  = OK]

Nhớ nhanh: "Đọc thấp, Ghi cao" — Subject chỉ đọc được xuống dưới, chỉ ghi được lên trên.
```

---

## §9. ADVANCED TOPICS — Trọng số đề: 4 câu

---

### §9.1. Data Warehouse & OLAP

#### 9.1.1. Khái niệm và Động lực

**Data Warehouse** là kho lưu trữ dữ liệu trung tâm, tích hợp dữ liệu từ nhiều nguồn khác nhau (OLTP databases, flat files, APIs của bên thứ ba…), được làm sạch và chuẩn hóa, giữ lại lịch sử lâu dài, phục vụ phân tích và ra quyết định kinh doanh.

🔑 **Keywords (EN):** **Data Warehouse**, **integrated**, **subject-oriented**, **non-volatile**, **time-variant**, **ETL**, **Business Intelligence (BI)**, **decision support**

Bốn đặc điểm cốt lõi của Data Warehouse (Bill Inmon):
1. **Subject-Oriented** — tập trung vào chủ đề (Sales, Customers, Products), không phải quy trình giao dịch
2. **Integrated** — dữ liệu từ nhiều nguồn được hợp nhất vào một định dạng chuẩn
3. **Non-Volatile** — dữ liệu được tải vào và không bị xóa; chỉ thêm mới (append-only)
4. **Time-Variant** — lưu lịch sử theo thời gian (snapshots), cho phép phân tích xu hướng

---

#### 9.1.2. OLTP vs OLAP 🔥

| Tiêu chí | OLTP (On-line Transactional Processing) | OLAP (On-line Analytical Processing) |
|---|---|---|
| **Mục tiêu** | Xử lý giao dịch nghiệp vụ hàng ngày | Phân tích đa chiều, hỗ trợ ra quyết định |
| **Loại thao tác** | Heavy Writes (INSERT, UPDATE, DELETE) | Heavy Reads (SELECT aggregations) |
| **Dữ liệu** | Liên tục thay đổi | Mostly read-only sau khi tải |
| **Thời gian đáp ứng** | Milliseconds (phải tức thời) | Seconds, minutes, hoặc hours |
| **Khối lượng/Query** | Tiny (vài hàng) | Millions of rows at once |
| **Thiết kế DB** | Highly Normalized (2D Tables) | Multidimensional (3D Cubes) |
| **Ưu tiên** | Speed and exact accuracy | Deep analysis and complex calculations |
| **Ví dụ** | Hệ thống đặt vé, thanh toán, đơn hàng | Báo cáo doanh thu, dự báo xu hướng |

🔑 **Keywords (EN):** **OLTP**, **OLAP**, **normalized**, **multidimensional**, **aggregation**, **management reporting**, **analytical processing**

---

#### 9.1.3. Kiến trúc Data Warehouse & ETL 🔥

```
SOURCES → STAGE/ETL → DATA WAREHOUSE → MODELING → REPORT & BI
```

**ETL (Extract, Transform, Load):**
- **Extract** — kéo dữ liệu thô từ các nguồn (CRMs, flat files, legacy databases, APIs)
- **Transform** — làm sạch: loại bỏ duplicates, chuẩn hóa format, áp dụng business rules
- **Load** — ghi dữ liệu đã chuẩn bị vào Data Warehouse (bảng cuối)

**Data Lake** → lưu mọi dữ liệu thô (unstructured), kể cả chưa biết sẽ dùng; **Data Warehouse** → dữ liệu đã clean, structured, sẵn cho BI.

🔑 **Keywords (EN):** **ETL**, **Extract**, **Transform**, **Load**, **Data Lake**, **staging**, **bronze/silver/gold layer**, **schema-on-read** (Data Lake) vs **schema-on-write** (DW)

---

#### 9.1.4. Schema: Star vs Snowflake 🔥

**Fact Table** — bảng trung tâm, chứa các **measures** (số liệu đo lường: doanh thu, số lượng bán) và **foreign keys** trỏ đến dimension tables.

**Dimension Table** — bảng mô tả các chiều phân tích (Time, Product, Customer, Store…).

| Tiêu chí | Star Schema | Snowflake Schema |
|---|---|---|
| **Cấu trúc** | Fact table nối thẳng với dimension tables (1 cấp) | Dimension tables được chuẩn hóa thêm (nhiều cấp) |
| **Normalization** | Denormalized dimensions | Normalized dimensions |
| **Query performance** | Nhanh hơn (ít JOIN hơn) | Chậm hơn (nhiều JOIN hơn) |
| **Dung lượng lưu trữ** | Lớn hơn (dữ liệu lặp lại) | Nhỏ hơn |
| **Độ phức tạp** | Đơn giản | Phức tạp hơn |
| **Khi nào dùng** | Khi cần hiệu suất query cao | Khi muốn tối ưu bộ nhớ |

🔑 **Keywords (EN):** **Star schema**, **Snowflake schema**, **Fact table**, **Dimension table**, **measures**, **denormalized**, **foreign key**, **multidimensional cube**

---

#### 9.1.5. OLAP Operations & Data Mart

**OLAP Operations** trên multidimensional cube:
- **Roll-up (drill-up)** — tổng hợp lên mức cao hơn (ngày → tháng → năm; thành phố → tỉnh → quốc gia)
- **Drill-down** — phân rã xuống mức chi tiết hơn (năm → quý → tháng → ngày)
- **Slice** — cắt một chiều với giá trị cụ thể (chỉ xem dữ liệu quý 1)
- **Dice** — cắt nhiều chiều cùng lúc (quý 1 + region = HCMC)
- **Pivot (Rotate)** — xoay trục để thay đổi góc nhìn

**Data Mart** — subset nhỏ hơn, chuyên biệt của Data Warehouse cho một team cụ thể (Marketing Mart, Sales Mart); dữ liệu đã được pre-aggregated.

🔑 **Keywords (EN):** **Roll-up**, **Drill-down**, **Slice**, **Dice**, **Pivot**, **Data Mart**, **pre-aggregated**, **OLAP cube**, **multidimensional model**

---

### §9.2. Distributed Database

#### 9.2.1. Định nghĩa & Phân loại

**Distributed Database (DDBMS)** là một tập hợp dữ liệu có liên quan về mặt logic, được lưu trữ vật lý trên nhiều node mạng khác nhau nhưng hoạt động như một hệ thống thống nhất.

Các loại Distributed Database:
| Loại | Đặc điểm |
|---|---|
| **Homogeneous** | Tất cả sites dùng cùng DBMS và schema. Dễ đồng bộ, ít phức tạp. |
| **Heterogeneous** | Các sites dùng DBMS/schema/model khác nhau. Cần translation mechanisms. |
| **Client-Server** | Server quản lý dữ liệu, client yêu cầu. Centralized control. |
| **Peer-to-Peer (P2P)** | Mọi node đều bình đẳng (no dedicated server). Decentralized, no single point of failure. |
| **Cloud-Based** | Triển khai trên cloud, auto-scaling, high availability, pay-as-you-go. |

🔑 **Keywords (EN):** **Distributed Database**, **DDBMS**, **homogeneous**, **heterogeneous**, **logically interrelated**, **multiple network nodes**, **unified system**

---

#### 9.2.2. Data Fragmentation 🔥

**Fragmentation** là chia nhỏ quan hệ thành các mảnh (fragments) lưu ở các site khác nhau.

**Ba loại fragmentation:**

| Loại | Cách chia | Điều kiện tái tạo |
|---|---|---|
| **Horizontal Fragmentation** | Chia theo hàng (rows) dựa trên điều kiện (e.g., Region = 'HN') | UNION của tất cả fragments |
| **Vertical Fragmentation** | Chia theo cột (columns); **bắt buộc giữ Primary Key** ở mỗi fragment | JOIN trên Primary Key |
| **Hybrid (Mixed) Fragmentation** | Áp dụng cả horizontal và vertical | JOIN + UNION |

**Correctness Rules (Tính đúng đắn của Fragmentation):**
1. **Completeness** — Fragment1 ∪ Fragment2 = Relation gốc (không mất dữ liệu)
2. **Reconstruction** — Có thể khôi phục quan hệ gốc từ fragments (bằng UNION hoặc JOIN)
3. **Disjointness** — Trong horizontal fragmentation, một record chỉ xuất hiện ở đúng 1 fragment (không trùng lặp)

> **Ví dụ:** Bảng Employee với cột (ID, Name, Department, Region, Salary):
> - **Horizontal**: Fragment1 = Region='HN'; Fragment2 = Region='HCM'
> - **Vertical**: Fragment_HR = (ID, Name, Department, Region); Fragment_Acc = (ID, Salary)
> - **Hybrid**: Chỉ lấy (ID, Salary) của nhân viên Region='HN'

🔑 **Keywords (EN):** **Horizontal fragmentation**, **vertical fragmentation**, **hybrid fragmentation**, **completeness**, **reconstruction**, **disjointness**, **primary key retention**

---

#### 9.2.3. Replication & Transparency

**Replication** — lưu bản sao dữ liệu ở nhiều sites:
- **Synchronous replication** — đảm bảo strong consistency; trade-off: higher latency (chờ tất cả replicas xác nhận)
- **Asynchronous replication** — ưu tiên availability và low latency; trade-off: có thể đọc dữ liệu cũ trong thời gian ngắn

**Các loại Transparency trong DDBMS:**
- **Distribution/Location Transparency** — người dùng không cần biết dữ liệu nằm ở đâu
- **Replication Transparency** — người dùng không biết có bao nhiêu bản sao
- **Fragmentation Transparency** — người dùng không biết dữ liệu bị phân mảnh như thế nào

🔑 **Keywords (EN):** **Replication**, **synchronous**, **asynchronous**, **distribution transparency**, **location transparency**, **replication transparency**, **fragmentation transparency**

---

#### 9.2.4. Two-Phase Commit (2PC) 🔥

**Vấn đề:** Các sites không thể commit độc lập — nếu site A commit nhưng site B crash, hệ thống không nhất quán.

**Giải pháp: 2PC Protocol** để đảm bảo Atomicity trong distributed transactions.

**Phase 1 — Prepare/Voting Phase:**
1. Coordinator gửi `VOTE_REQUEST` đến tất cả participants
2. Mỗi participant đánh giá điều kiện cục bộ (data integrity, constraints)
3. Nếu sẵn sàng: ghi `PREPARE LOG` vào stable storage, giữ locks, trả lời `YES`
4. Nếu không sẵn sàng: trả lời `NO`

**Phase 2 — Decision Phase:**
- Nếu **tất cả YES** → Coordinator gửi global `COMMIT`
- Nếu **bất kỳ NO hoặc timeout** → Coordinator gửi global `ABORT`
- Participants thực thi quyết định, ghi log và release locks

**Điểm yếu:** **Blocking problem** — nếu Coordinator crash sau Prepare phase, participants không thể tự commit hay abort, bị mắc kẹt cho đến khi Coordinator recover.

🔑 **Keywords (EN):** **Two-Phase Commit (2PC)**, **coordinator**, **participants**, **VOTE_REQUEST**, **PREPARE LOG**, **global COMMIT**, **global ABORT**, **atomicity**, **blocking problem**, **distributed transaction**

---

### §9.3. NoSQL

#### 9.3.1. Giới thiệu & Đặc điểm

**NoSQL** ("Not Only SQL") được phát triển để xử lý Big Data với Volume, Velocity, Variety lớn mà SQL truyền thống không đáp ứng được.

Đặc điểm chính của NoSQL:
- **Horizontal Scaling (Scale-Out)** — thêm node thay vì nâng cấp máy (↔ vertical scaling của SQL)
- **Schema-less / Schema-on-read** — không cần định nghĩa cấu trúc trước
- **Eventual Consistency** — dữ liệu đồng bộ dần dần (thay vì strong consistency ngay lập tức)
- **Sharding** — phân tán dữ liệu theo horizontal partitioning qua nhiều node
- **Replication** — sao chép dữ liệu để high availability
- **Simplified queries** — CRUD qua API thay vì complex SQL; No built-in JOINs

🔑 **Keywords (EN):** **NoSQL**, **Not Only SQL**, **horizontal scaling**, **schema-less**, **eventual consistency**, **sharding**, **replication**, **Big Data**, **Volume/Velocity/Variety**

---

#### 9.3.2. CAP Theorem 🔥

**CAP Theorem (Brewer, 2000):** Một hệ thống phân tán **không thể đồng thời đảm bảo cả 3** tính chất sau:

- **C — Consistency**: Mọi node đều thấy cùng dữ liệu tại cùng thời điểm (most recent write hoặc error)
- **A — Availability**: Mọi request đều nhận được response (có thể là dữ liệu cũ)
- **P — Partition Tolerance**: Hệ thống tiếp tục hoạt động dù mạng bị chia đôi (network partition)

> **Thực tế:** P là bắt buộc cho bất kỳ distributed system nào. Lựa chọn thực sự là **C vs A** khi xảy ra partition.

| Hệ thống | CAP Choice | Ví dụ |
|---|---|---|
| CP | Consistency + Partition Tolerance | HBase, Neo4j (Causal Clustering) |
| AP | Availability + Partition Tolerance | Cassandra, DynamoDB |
| CA | Consistency + Availability | RDBMS (không distributed) |

🔑 **Keywords (EN):** **CAP theorem**, **Consistency**, **Availability**, **Partition Tolerance**, **network partition**, **Brewer**, **CP**, **AP**, **CA**

---

#### 9.3.3. ACID vs BASE 🔥

| Thuộc tính | ACID (SQL/RDBMS) | BASE (NoSQL) |
|---|---|---|
| **A** | Atomicity — all-or-nothing | Basically Available — luôn có response |
| **C** | Consistency — valid state → valid state | Soft state — trạng thái có thể thay đổi theo thời gian |
| **I** | Isolation — transactions không can thiệp nhau | Eventual consistency — các replicas hội tụ về cùng giá trị |
| **D** | Durability — committed data tồn tại sau crash | — |
| **Ưu tiên** | Strong consistency, correctness | High availability, scalability |

🔑 **Keywords (EN):** **ACID**, **BASE**, **Atomicity**, **Consistency**, **Isolation**, **Durability**, **Basically Available**, **Soft state**, **Eventual consistency**

---

#### 9.3.4. 4 Loại NoSQL 🔥

| Loại | Data Model | Điểm mạnh | Use Cases | Ví dụ |
|---|---|---|---|---|
| **Key-Value Store** | Massive dictionary: key → value (black box) | Lightning-fast read/write; đơn giản | Caching, session management, shopping carts | Redis, Amazon DynamoDB |
| **Document Store** | JSON/BSON documents (self-describing, nested) | Flexible schema, rich query, maps to app objects | CMS, e-commerce catalogs, complex user profiles | MongoDB, Couchbase |
| **Wide-Column Store** | Rows với dynamic columns; Partition key + Clustering columns | Write-optimized; massive scale; time-series | IoT sensor logs, event tracking, time-series data | Apache Cassandra, HBase |
| **Graph Database** | Nodes (entities) + Edges (relationships) + Properties | Instant traversal; relationship-first; O(1) per hop | Social networks, recommendation engines, fraud detection | Neo4j, Amazon Neptune |

🔑 **Keywords (EN):** **Key-Value**, **Document**, **Wide-Column**, **Graph**, **Redis**, **MongoDB**, **Cassandra**, **HBase**, **Neo4j**, **sharding**, **partition key**, **clustering column**

---

#### 9.3.5. SQL vs NoSQL — So sánh tổng quan

| Tiêu chí | SQL | NoSQL |
|---|---|---|
| **Goal** | Absolute Consistency | Availability |
| **Model** | ACID | BASE |
| **Schema** | Schema-on-write, Strict (predefined) | Schema-on-read, Flexible (schema-less) |
| **Architecture** | Centralized, Vertical Scaling | Distributed, Horizontal Scaling |
| **Joins** | Native SQL JOINs | No joins (application-side logic) |
| **Transactions** | Full ACID transactions | Limited; eventual consistency |
| **Khi dùng** | Structured data, strong consistency | Semi/unstructured, high volume, speed |

> **Lưu ý thi:** NoSQL = "Not Only SQL" — không phải thay thế hoàn toàn SQL, mà là **complementary tool** (polyglot persistence).

---

### §9.4. Neo4j — Graph Database

#### 9.4.1. Property Graph Model 🔥

Neo4j dựa trên **Property Graph Model** với 4 thành phần:

1. **Nodes (Vertices)** — đại diện cho entities (danh từ). Mỗi node có:
   - **Labels** — phân loại (`:Student`, `:Course`); 1 node có thể có nhiều labels
   - **Properties** — key-value pairs tùy ý (e.g., `name: "Alice"`, `gpa: 3.8`)

2. **Relationships (Edges)** — đại diện cho connections (động từ). Mỗi relationship:
   - Có **hướng** (directed), nhưng có thể traverse cả 2 chiều
   - Có đúng **1 Type** (e.g., `:ENROLLED_IN`, `:FRIEND_WITH`)
   - Có thể có **Properties** riêng (e.g., `since: 2023`)

3. **Labels** — cơ chế phân loại (categorization)

4. **Properties** — key-value pairs lưu trực tiếp trên nodes/relationships (không cần bảng riêng)

**Index-Free Adjacency:** Relationships được lưu vật lý như pointers trực tiếp đến nodes — không cần B-Tree index để traverse. Độ phức tạp traversal: **O(k × d)** (k = số hops, d = average degree), thay vì **O(k × log N)** của SQL JOIN.

🔑 **Keywords (EN):** **Property Graph Model**, **Nodes**, **Relationships**, **Labels**, **Properties**, **Index-Free Adjacency**, **directed**, **typed relationship**, **pre-materialized**

---

#### 9.4.2. Cypher Query Language 🔥

Cypher dùng cú pháp **ASCII-Art** để biểu diễn graph patterns:

```
(n)                    — node variable n
(n:Label)              — node với label
(n {prop: val})        — node với property filter
-[:TYPE]->             — directed relationship
-[:TYPE*1..3]->        — variable-length path (1 đến 3 hops)
(a)--(b)               — undirected relationship
```

**Các mệnh đề Cypher quan trọng:**

| Mệnh đề | Chức năng |
|---|---|
| `MATCH` | Tìm kiếm pattern trong graph |
| `OPTIONAL MATCH` | Left outer join (trả về NULL nếu không match) |
| `WHERE` | Lọc theo điều kiện |
| `RETURN` | Trả về kết quả |
| `CREATE` | Tạo node/relationship mới |
| `MERGE` | Upsert — tạo nếu chưa tồn tại (idempotent) |
| `SET / REMOVE` | Cập nhật/xóa properties |
| `DELETE / DETACH DELETE` | Xóa node (DETACH xóa cả relationships) |
| `WITH` | Pipeline (chuyển kết quả sang bước tiếp theo) |

**Ví dụ Cypher cơ bản:**

```cypher
// Tạo node và relationship
CREATE (a:Student {name: "Alice", gpa: 3.8})
CREATE (b:Course {code: "CO2013", name: "Database Systems"})
CREATE (a)-[:ENROLLED_IN {semester: "HK2"}]->(b)

// Tìm kiếm
MATCH (s:Student)-[:ENROLLED_IN]->(c:Course)
WHERE c.code = "CO2013"
RETURN s.name, c.name

// Variable-length path (bạn bè trong vòng 3 hops)
MATCH (me:Student {name: "Alice"})-[:FRIEND*1..3]-(network:Student)
WHERE network <> me
RETURN network.name
```

🔑 **Keywords (EN):** **Cypher**, **MATCH**, **CREATE**, **MERGE**, **RETURN**, **WHERE**, **DETACH DELETE**, **pattern matching**, **variable-length path**, **ASCII-art syntax**, **openCypher**

---

#### 9.4.3. Neo4j vs Relational DB

| Tiêu chí | Neo4j (Graph) | Relational DB |
|---|---|---|
| **Relationship representation** | First-class objects, pre-materialized on disk | Derived at query time via JOIN + index scan |
| **Traversal cost** | O(k × d) — constant per hop | O(k × log N) — grows with data size |
| **Schema** | Flexible (schema-optional) | Rigid (predefined) |
| **Joins** | Native O(1) per hop (pointer following) | Expensive index-based hash/merge join |
| **Relationship properties** | Stored directly on relationship | Cần alter JOIN table |
| **Phù hợp** | Complex, connected, deep relationships | Flat, structured, tabular data |

🔑 **Keywords (EN):** **Graph traversal**, **index-free adjacency**, **relationship as first-class citizen**, **pointer following**, **ACID** (Neo4j là ACID-compliant), **Causal Clustering**, **Raft consensus**

---

### §9.5. Data Anonymization

#### 9.5.1. Khái niệm cơ bản

**Data Anonymization** là quá trình biến đổi dữ liệu có hệ thống, cắt đứt khả năng nhận diện cá nhân trong khi vẫn giữ giá trị phân tích của dữ liệu.

**Phân loại thuộc tính:**
- **Direct Identifiers (PII — Personally Identifiable Information)** — xác định trực tiếp 1 người: Name, Phone number, Address, IP address
- **Quasi-Identifiers (QIDs)** — không xác định trực tiếp nhưng khi kết hợp có thể tái nhận diện: Zip code, Birthdate, Gender

> 🔥 **87% người dùng có thể bị tái nhận diện chỉ với 3 QIDs: Zip code + Birthdate + Gender** (Sweeney, 2000)

**Các kiểu tấn công:**
- **Linkage Attack** — re-identify bằng cách ghép QIDs với dữ liệu công khai khác
- **Predicate Singling-Out Attack** — dùng logical query để cô lập 1 cá nhân trong dữ liệu đã tổng quát hóa
- **Downcoding Attack** — khai thác cấu trúc phân cấp kết hợp với prior knowledge

🔑 **Keywords (EN):** **Data Anonymization**, **Direct Identifiers**, **PII**, **Quasi-Identifiers (QIDs)**, **Linkage Attack**, **re-identification**, **Predicate Singling-Out**

---

#### 9.5.2. Transformation Mechanisms

- **Generalization** — nhóm các giá trị cụ thể vào category rộng hơn, nhất quán về mặt ngữ nghĩa
  - Ví dụ: `Date of Birth → Birth Year`; `Age 28 → Age Range 20-30`; `ZIP 700123 → Region HCM`
- **Suppression** — xóa hoàn toàn hoặc che những giá trị ngoại lệ không thể tổng quát hóa
  - Ví dụ: `ZIP 700123 → 700***`

🔑 **Keywords (EN):** **Generalization**, **Suppression**, **equivalence class**, **masking**, **bucketing**, **data utility**

---

#### 9.5.3. k-Anonymity, l-Diversity, t-Closeness 🔥

| Mô hình | Định nghĩa | Bảo vệ chống | Điểm yếu |
|---|---|---|---|
| **k-Anonymity** | Mỗi record không phân biệt được với ít nhất **k-1** records khác dựa trên QIDs. Nếu k=3: attacker thấy nhóm ≥3 hồ sơ giống nhau | Linkage Attack | Homogeneity Attack |
| **l-Diversity** | Mỗi equivalence class phải có ít nhất **l giá trị sensitive phân biệt**. Chance đoán đúng sensitive attribute ≤ 1/l | Homogeneity Attack | Background knowledge attack; skewness attack |
| **t-Closeness** | Phân phối sensitive attribute trong mỗi group phải **gần** với phân phối toàn bộ bảng (khoảng cách ≤ t) | Background knowledge attack | Giảm data utility nhiều hơn |

**Homogeneity Attack:** k-anonymity thất bại khi tất cả records trong một group chia sẻ cùng sensitive attribute. Ví dụ: nhóm 3 người đều có "Stomach Cancer" — attacker không biết ai trong nhóm nhưng **biết chắc** target có Stomach Cancer.

> **Ví dụ k=3:** Group với Age 20-30 gồm Alice, Bob, Charlie — nếu cả 3 đều có Stomach Cancer → vi phạm l-diversity (cần l≥2 tức ≥2 diseases khác nhau).

🔑 **Keywords (EN):** **k-anonymity**, **l-diversity**, **t-closeness**, **equivalence class**, **Homogeneity Attack**, **sensitive attribute**, **generalization**, **suppression**, **quasi-identifiers**

---

#### 9.5.4. Differential Privacy (Modern Model) 🔥

**Differential Privacy** — bảo vệ query outputs thay vì chỉ bảo vệ cấu trúc bảng. Kết quả query phải **gần như giống nhau** dù một người cụ thể có trong database hay không.

**Privacy budget ε (epsilon):** Kiểm soát trade-off giữa privacy strength và result accuracy:
- ε nhỏ → privacy mạnh hơn, noise nhiều hơn, kém chính xác
- ε lớn → privacy yếu hơn, noise ít hơn, chính xác hơn

**Laplace Mechanism** — kỹ thuật phổ biến:
1. Tính aggregate thật: `AVG(salary) = $52,000`
2. Thêm Laplace noise (phụ thuộc ε và query sensitivity): `Noise = -$660`
3. Trả về output riêng tư: `$51,340`

**Giới hạn thực tế:**
- Repeated queries → privacy budget bị cạn kiệt theo thời gian
- Quá nhiều noise → kết quả phân tích sai lệch
- Cần query logging, access control, và governance nghiêm ngặt

🔑 **Keywords (EN):** **Differential Privacy**, **privacy budget (ε)**, **Laplace mechanism**, **noise calibration**, **query sensitivity**, **membership inference**, **GDPR**

---

### §9.6. MCQ Traps — Advanced Topics

> Những cặp từ dễ nhầm trong trắc nghiệm:

| Trap | Sai (distractor) | Đúng |
|---|---|---|
| **NoSQL thay thế SQL?** | "NoSQL replaces SQL" | NoSQL = "Not Only SQL" — **complementary**, không thay thế |
| **NoSQL scalability key?** | "Eventual consistency" hoặc "schema-less" | **Data distribution that allows horizontal scale** (đây là key contribution theo QUIZ) |
| **Big Data = too many X?** | Too many users / too long transactions / too many apps | **Too much data to handle with traditional technologies** |
| **Velocity trong Big Data?** | Monthly reports, batch processing | **Real-time / sensor-based monitoring** (phải xử lý ngay lập tức) |
| **k-anonymity bảo vệ gì?** | Sensitive attribute leakage | Linkage Attack — **k-anonymity KHÔNG bảo vệ khỏi Homogeneity Attack** |
| **l-diversity đảm bảo gì?** | Đảm bảo k groups | Đảm bảo ≥ l **distinct sensitive values** trong mỗi group |
| **Schema trong SQL vs NoSQL** | "SQL cần schema, NoSQL không cần" | SQL = **predefined schema (schema-on-write)**; NoSQL = **schema-less / schema-on-read** |
| **NoSQL distributed?** | "NoSQL là distributed, SQL không phải" | SQL systems **cũng có thể distributed** — không phải đặc điểm độc quyền của NoSQL |
| **Document DB = Table?** | Document ≈ table/relation | Document ≈ **record/row** (1 JSON document = 1 record) |
| **2PC blocking?** | Coordinator crashes trước Prepare | Blocking xảy ra khi Coordinator crash **sau** Prepare phase |
| **Vertical fragmentation?** | Có thể bỏ Primary Key | **Bắt buộc giữ Primary Key** để reconstruction bằng JOIN |
| **Star vs Snowflake faster?** | Snowflake nhanh hơn | **Star schema nhanh hơn** (ít JOINs hơn) |
| **OLTP vs OLAP writes?** | OLAP heavy writes | OLAP = **heavy reads**; OLTP = heavy writes |
| **Neo4j NoSQL model?** | Document, Key-Value | Neo4j = **Graph** model (Neo4j → graph, Redis → key-value, MongoDB → document, HBase/Cassandra → wide-column) |
| **CAP: P là optional?** | Có thể bỏ P | P **bắt buộc** với distributed systems; lựa chọn thực là C vs A |

---

> **Bộ Neo4j mapping (thường ra MCQ):**
> - **(a) Neo4j → (iii) graph** — **(b) Redis → (iv) key-value** — **(c) MongoDB → (ii) document** — **(d) HBase → (i) wide-column**

---

# §10. CÂU THẦN CHÚ TRƯỚC KHI VÀO PHÒNG THI

> Bản tổng hợp các one-liner phải thuộc, đánh số liên tục, nhóm theo chương. 🔥 = câu critical. Ôn riêng mục này đêm trước thi (mỗi chương đã có "🪄 Câu thần chú §N" chi tiết hơn ở trên).

**§1 — Overview**
1. 🔥 Database System = DB + DBMS + Application + Users — KHÔNG phải chỉ DBMS.
2. 🔥 Schema = bản vẽ (intension, hiếm đổi) · State/Instance/Snapshot = dữ liệu thực tế (extension, đổi liên tục).
3. 🔥 3-schema: External (ai thấy gì) → Conceptual (có gì) → Internal (lưu thế nào). Mục tiêu = data independence.
4. 🔥 Physical independence (đổi internal, conceptual giữ nguyên) DỄ hơn Logical independence (đổi conceptual, external giữ nguyên).
5. 🔥 SQL = non-procedural/declarative; relational algebra = procedural. KHÔNG phải mọi DML đều non-procedural.
6. Metadata lưu trong System Catalog (Data Dictionary). Conceptual design = DBMS-independent; Physical design mới phụ thuộc DBMS.

**§2 — ERD & EERD** 🔥🔥
7. 🔥 Danh từ → Entity · Tính chất → Attribute · Động từ → Relationship · Unique/SSN → Key.
8. 🔑 Weak entity = `no key of its own` + `partial key` + `identifying relationship` (◇◇) + `total participation` + `existence-dependent`. PK = {owner_PK, partial_key}.
9. 🔥 Cardinality ratio ("bao nhiêu": 1:1/1:N/M:N) và Participation ("có bắt buộc": total/partial) là HAI TRỤC ĐỘC LẬP.
10. 🔥 Attribute M:N BẮT BUỘC nằm trên relationship (Hours trên WORKS_ON) — không migrate.
11. Multivalued = oval đôi · Derived = oval đứt (không lưu) · Composite = oval cha-con (flatten khi map).
12. 🔥 `|Sup| = |Sub1| + |Sub2|` ⟺ **Total AND Disjoint**.
13. 🔥 Shared subclass = AND/∩ (thuộc TẤT CẢ cha) · Category/Union type = OR/∪ (thuộc CHỈ 1 cha, owner khác key → surrogate key).
14. Specialization = top-down · Generalization = bottom-up · vẽ giống nhau. Subclass IS-A superclass; subclass/superclass luôn 1:1.
15. Fan trap = pathway mơ hồ (≥2 nhánh 1:N) · Chasm trap = pathway đứt (partial participation).

**§3 — Relational Mapping**
16. 🔥 1:1 → FK phía total (UNIQUE) · 1:N → FK phía N · M:N → bảng riêng + 2 FK (PK = cả 2).
17. Multivalued → bảng riêng · Composite → flatten · Derived → bỏ.
18. 🔥 Ternary A:1, B:N, C:N → PK = (B,C); A là FK KHÔNG vào PK.
19. 🔥 Total participation phía N/weak → `FK NOT NULL` đủ; phía "1"/M:N → cần CHECK/assertion/trigger.
20. Specialization: 8B chỉ Total+Disjoint · 8C không xử lý Overlap · 8D tốt cho Overlap · 8A luôn an toàn.
21. 🔥 4 ràng buộc của Relational Model = Domain · Key · Entity integrity (PK≠NULL) · Referential integrity. Participation KHÔNG thuộc nhóm này.
22. DELETE vi phạm Referential integrity · INSERT vi phạm Entity integrity/Key/Referential. Relation = SET (không tuple trùng, atomic).

**§4 — Relational Algebra**
23. 🔥 σ cắt HÀNG · π cắt CỘT (tự loại trùng) · ρ đổi tên.
24. 🔥 ∪/∩/− đòi union-compatible (− KHÔNG giao hoán) · × và ⋈ KHÔNG cần.
25. 🔥 Natural join `*` nối cột CÙNG TÊN (bỏ 1 cột trùng); khác tên (SSN≠ESSN, Dnum≠Dnumber) → phải `⋈_{cond}`.
26. 🔥 Division ÷ = "for all/every" = double `NOT EXISTS`. "do not/without" = set difference. "for each/per" = group 𝓕.
27. `|RA π| ≤ |SQL SELECT|` (RA là set, SQL là multiset). `R ⟕ S = S ⟖ R`. RA = procedural, Calculus = non-procedural.

**§5 — SQL** 🔥🔥
28. 🔥 Thứ tự: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. WHERE lọc tuple, HAVING lọc nhóm (aggregate → HAVING).
29. 🔥 NULL: dùng `IS NULL`/`IS NOT NULL`, KHÔNG `= NULL`. `CHECK(X>1)` không chặn NULL (UNKNOWN).
30. 🔥 `> ALL` = `> MAX` · `> ANY` = `> MIN` · `= ANY` = `IN`.
31. 🔥 "Làm TẤT CẢ" = double `NOT EXISTS` ("không có X nào mà chưa làm"). `EXISTS` = "ít nhất 1" ≠ `COUNT(*)=1` = "đúng 1".
32. 🔥 `LEFT JOIN … WHERE rightKey IS NULL` = anti-join ("không có"). `COUNT(*)` sau LEFT JOIN đếm cả NULL → dùng `COUNT(col)`.
33. 🔥 Procedure: gọi `EXEC`, có thể nhiều result set, OUTPUT param phải `SET @out=(...)`. Function: `dbo.f()` trong SELECT/WHERE, TVF trong FROM.
34. 🔥 Trigger: `INSERTED`=row mới, `DELETED`=row cũ (UPDATE có cả 2). Khác procedure ở activation (tự động theo event vs gọi tường minh).
35. `ON DELETE CASCADE` khai ở bảng CON. `SECONDARY KEY` không có cú pháp → dùng `UNIQUE`. ACID: A = Atomicity (KHÔNG phải Accuracy).

**§6 — FD & Normalization** 🔥
36. 🔥 `F⁺` = closure TẬP FD (chứa luật) · `X⁺` = closure TẬP THUỘC TÍNH (chứa cột). Đừng nhầm.
37. 🔥 `X⁺ = R` ⟺ superkey; tối giản ⟺ candidate key. Tính `X⁺`, đừng đoán key.
38. U_left bắt buộc trong mọi CK · U_right không bao giờ trong CK · U_both thì thử.
39. 🔥 1NF atomic · 2NF không partial · 3NF (X superkey HOẶC A prime) · BCNF (X superkey — không ngoại lệ).
40. 🔥 Vi phạm 2NF → dạng chuẩn cao nhất = 1NF. Luôn báo dạng chuẩn THẤP nhất đạt được.
41. 🔥 BCNF luôn lossless join nhưng có thể MẤT dependency preservation (TEACH: Instructor→Course là 3NF, không BCNF).
42. NJB lossless: `(R1∩R2)→(R1−R2)` hoặc `(R1∩R2)→(R2−R1)` ∈ F⁺. Normalization = giảm dư thừa (KHÔNG giảm JOIN).

**§7 — Storage & Indexing**
43. 🔥 `bfr = ⌊B/R⌋` (linked: `⌊(B−p)/R⌋`) · `b = ⌈r/bfr⌉`.
44. 🔥 Heap search avg `b/2`, worst `b` · Ordered (binary) `⌈log₂ b⌉` · Hashed = 1.
45. 🔥 Primary index #entries = #block (sparse, field KEY + file ordered) · Clustering = #distinct values (non-key ordered) · Secondary on key = #record (dense).
46. 🔥 1 file CHỈ 1 Primary HOẶC 1 Clustering (1 thứ tự vật lý), nhiều Secondary. Index search = ⌈log₂ bᵢ⌉ + 1; multilevel = L + 1.
47. B+-tree: con trỏ dữ liệu CHỈ ở leaf; B-tree có thể ở internal. Heap = insert nhanh nhất.

**§8 — Security**
48. 🔥 DAC = chủ sở hữu cấp quyền (GRANT/REVOKE, WITH GRANT OPTION) · MAC = hệ thống quyết định theo nhãn (U<C<S<TS), bảo mật cao hơn DAC.
49. 🔥 Bell-LaPadula: **no read-up** (đọc khi clearance ≥ class) + **no write-down** (ghi khi clearance ≤ class) → bảo vệ Confidentiality. Biba ngược lại → Integrity.
50. 🔥 REVOKE cascade: thu hồi của 1 người → thu hồi luôn mọi quyền người đó đã cấp tiếp.
51. 🔥 Lọc theo hàng/cột để cấp quyền → tạo VIEW rồi GRANT trên view (KHÔNG `GRANT … WHERE`).
52. Asymmetric: confidentiality → mã hoá bằng **public key người nhận**; chữ ký/authentication → ký bằng **private key người gửi**.
53. CIA: modify→Integrity · read/disclose→Confidentiality · accessible on request→Availability. DBA chịu trách nhiệm bảo mật.

**§9 — Advanced Topics**
54. 🔥 OLTP = heavy writes, normalized · OLAP = heavy reads, multidimensional. Star schema nhanh hơn (ít JOIN) Snowflake (chuẩn hoá dimension).
55. 🔥 CAP: P bắt buộc với distributed → chọn C vs A. ACID (SQL) vs BASE (NoSQL: Basically Available, Soft state, Eventually consistent).
56. 🔥 4 loại NoSQL: Key-Value (Redis) · Document (MongoDB) · Wide-Column (Cassandra/HBase) · Graph (Neo4j).
57. 🔥 NoSQL key scalability = data distribution → horizontal scaling. NoSQL = "Not Only SQL" (bổ trợ, không thay thế).
58. Fragmentation: Horizontal (rows, tái tạo bằng UNION) · Vertical (cols, GIỮ PK, tái tạo bằng JOIN). Đúng đắn = completeness + reconstruction + disjointness. 2PC: blocking nếu coordinator crash sau Prepare.
59. Neo4j = property graph (Nodes + Relationships có hướng + Labels + Properties), index-free adjacency, Cypher `MATCH … RETURN`.
60. 🔥 Data anonymization: k-anonymity (chống linkage, yếu trước homogeneity) → l-diversity (≥ l sensitive value/group) → t-closeness. Quasi-identifiers (Zip+Birthdate+Gender) tái nhận diện 87%.
61. 🔥 "NOT an ACID property" = **Accuracy**. SQL query processing: Parse → Optimize → Generate → Execute.

---

# §11. "IF YOU SEE X → THINK Y" + ĐÁP ÁN GÂY TRANH CÃI

> Bảng tra tốc độ trong phòng thi (open-book): thấy cụm từ bên trái → ánh xạ ngay sang khái niệm/đáp án bên phải.

## 11.1. Speed-recap "if you see X → think Y"

| Thấy trong đề | Nghĩ ngay tới |
|---|---|
| "set of concepts describing data + relationships + constraints" | **Data model** (không phải schema) |
| figure: tên bảng + cột + data rows cụ thể | **Database state / snapshot** (không phải schema) |
| đổi cách lưu/index, conceptual giữ nguyên | **Physical data independence** |
| đổi conceptual, external giữ nguyên | **Logical data independence** (khó hơn) |
| no key of its own / partial key / identifying | **Weak entity** |
| "must / at least one" | **Total participation** |
| "may / optional / some have none" | **Partial participation** |
| `|Sup| = |Sub1| + |Sub2|` | **Total AND Disjoint** |
| thuộc TẤT CẢ cha (AND/∩) | **Shared subclass** |
| thuộc CHỈ 1 cha (OR/∪), owner khác key | **Category / Union type** → surrogate key |
| pathway mơ hồ (≥2 nhánh 1:N) | **Fan trap** |
| pathway đứt (partial participation giữa) | **Chasm trap** |
| 1:N mapping | FK ở phía **N** |
| M:N mapping / multivalued attribute | **bảng riêng** |
| composite attribute | **flatten** thành components |
| ternary A:1, B:N, C:N | PK = (B,C); A là FK không vào PK |
| "for each / per / mỗi" | **GROUP BY / 𝓕** |
| "do not / without / no / không" | **set difference** (RA) / `NOT EXISTS` (SQL) |
| "for all / every / tất cả / mọi" | **division ÷** (RA) / **double `NOT EXISTS`** (SQL) |
| `> ALL (subquery)` | strictly greater than **MAX** |
| `> ANY` / `= ANY` | greater than **MIN** / **IN** |
| aggregate dùng để lọc nhóm | **HAVING** (không bao giờ WHERE) |
| so sánh với NULL | `IS NULL` / `IS NOT NULL` (không `=`/`<>`) |
| `LEFT JOIN … WHERE rightKey IS NULL` | rows **không có** bản ghi liên quan (anti-join) |
| natural join `*` với cột khác tên | SAI → dùng `⋈_{cond}` hoặc `ρ` |
| gọi `EXEC` | **procedure** (function gọi `dbo.f()`, TVF trong `FROM`) |
| `INSERTED` / `DELETED` trong code | **trigger** (mới / cũ; UPDATE có cả 2) |
| `ON DELETE CASCADE` ở đâu | khai báo ở **bảng con** (chứa FK) |
| vi phạm 2NF | dạng chuẩn cao nhất = **1NF** |
| determinant luôn là superkey | **BCNF** |
| `X→A`: X không superkey nhưng A prime | **3NF nhưng không BCNF** |
| tính key | tính **`X⁺`** (đừng đoán) |
| `bfr` | `⌊B/R⌋` (linked: `⌊(B−p)/R⌋`) |
| `b` (số block) | `⌈r/bfr⌉` |
| heap search | avg `b/2`, worst `b` |
| ordered search trên ordering field | `⌈log₂ b⌉` |
| primary index #entries | = **#data blocks** (sparse) |
| clustering index #entries | = **#distinct values** |
| secondary index on key #entries | = **#records** (dense) |
| multilevel search cost | **#levels + 1** |
| modify / change / unauthorized modification | **Integrity** |
| read / view / disclose / secret | **Confidentiality** |
| shown on request / accessible when needed | **Availability** |
| username/password access | Identification → Authentication → Authorization |
| owner cấp quyền (GRANT/REVOKE) | **DAC** |
| U/C/S/TS, subject/object classification | **MAC** |
| roles Admin/Lecturer/Student | **RBAC** |
| no read-up / no write-down | **Bell-LaPadula** → Confidentiality |
| no read-down / no write-up | **Biba** → Integrity |
| "only Bob can read" | Bob's **public** key |
| "prove Alice sent / not tampered" | Alice's **private** key |
| GRANT chỉ một số dòng/cột | CREATE **VIEW** + GRANT on view |
| sensor stream / real-time | **Velocity** |
| too much data for traditional tech | **Volume / Big Data** |
| NoSQL scalability | **horizontal scaling / data distribution** |
| Neo4j / Redis / MongoDB / HBase·Cassandra | Graph / Key-value / Document / Wide-column |
| OLTP vs OLAP | OLTP heavy-write normalized · OLAP heavy-read multidimensional |
| Star vs Snowflake | Star = denormalized, ít JOIN, nhanh hơn |
| vertical fragmentation | **giữ Primary Key** để JOIN tái tạo |
| NOT an ACID property | **Accuracy** |
| k-anonymity yếu trước | **Homogeneity attack** → cần l-diversity |
| user xem dữ liệu của chính mình khi yêu cầu | **Availability** (không phải Confidentiality) |
| "minimize NULL values" là mục đích normalization? | KHÔNG — đó là informal guideline; mục tiêu hình thức = attribute/dependency preservation + lossless join |
| "external level" | = **view level** (2 thuật ngữ tương đương) |
| Shared File Approach phát sinh vấn đề gì | **rigid data structure**, physical data dependency, no concurrency control |
| INNER JOIN = RIGHT OUTER JOIN khi nào | khi **không có NULL** ở cột FK (mọi dòng đều match) |
| "phân tích nhu cầu lưu trữ" là việc của ai | **Database Designer**, KHÔNG phải DBA |
| chỉ mệnh đề nào bắt buộc trong SQL | **SELECT** (+FROM); WHERE/GROUP BY/HAVING/ORDER BY optional |
| 1:1 mapping FK | phía total + phải **UNIQUE** (thiếu UNIQUE → thành N:1) |
| ràng buộc theo thời gian trôi (sau N ngày…) | **scheduled job/cron**, trigger không làm được |
| fan trap đúng nghĩa | **1:N + 1:N** từ cùng hub (M:N+1:N thì không phải fan trap thuần) |

## 11.2. Đáp án gây tranh cãi (class key ≠ lý thuyết chuẩn)

> Nếu đề lặp lại **nguyên văn** câu cũ → theo class key; nếu là phát biểu lý thuyết chuẩn → theo lý thuyết. Luôn đọc kỹ wording/quy ước thứ tự đề công bố.

| Chủ đề | Class key | Lý thuyết chuẩn / Ghi chú |
|---|---|---|
| Asymmetric crypto — Alice đảm bảo **integrity/authentication** | A | Alice ký bằng **private key của Alice** → theory = D |
| Bell-LaPadula no-write-down (U<C<S<TS) | B | Ghi hợp lệ khi `class(S) ≤ class(O)`; có thể đề dùng quy ước thứ tự đảo |
| VIEW giấu lương nhân viên kinh nghiệm | C | Option C (`WHERE superssn IS NOT NULL`) làm **mất** nhân viên → cần **UNION/CASE** (mask) → D |
| `DROP TABLE … CASCADE` | E | Chuẩn SQL: xóa bảng + ràng buộc/view phụ thuộc — KHÔNG xóa cả schema, KHÔNG phải DELETE |
| "set of concepts describing data…" (Overview) | C (schema) | Định nghĩa chuẩn = **Data model** (D); schema là thiết kế cụ thể trong một model |
| Multilevel index cost (Storage Q38) | A (12) | 12 = `⌈log₂ 2942⌉` = binary search trên **data file**; multilevel index cost chuẩn = **3** |
| "many clustering indexes on one file" (Storage) | — | SAI — 1 thứ tự vật lý ⇒ tối đa 1 primary/clustering index |
| FD holds on instance (FD Q6) | E (`C→D`) | `A→B` cũng đúng trên instance đó → câu hỏi lỏng lẻo; instance chỉ **bác bỏ** được FD |
| BillNo index type (HK191 Q36) | A (clustering) | BillNo = candidate key trên file KHÔNG sắp theo BillNo → đúng phải là **Secondary index (dense)**; clustering = file sắp theo NON-key → đáp án chính thức có thể là lỗi đề |
| "Minimize NULL" là mục đích normalization? (F2024 Q24) | — | "Minimize NULL" là **informal design guideline**, KHÔNG phải mục tiêu hình thức của phép phân rã → khi hỏi "cái nào KHÔNG phải mục đích normalization" thì CHỌN nó |

> ⚠️ **Nguyên tắc khi mâu thuẫn:** với đáp án dạng "(Đáp án chỉ mang tính tham khảo)" → ưu tiên **giáo trình/định nghĩa chuẩn**. Open-book → mang theo bảng này để tra nhanh.

---

# §12. MẸO LÀM BÀI TRẮC NGHIỆM (OPEN-BOOK)

> Đề **open-book** → lợi thế là tra cứu, nhưng **bẫy nằm ở câu chữ**, không phải ở việc nhớ. 50 câu / 90 phút ≈ **1.8 phút/câu** → phải nhanh.

1. **Chuẩn bị "trang tra nhanh".** In sẵn **§0 Quick Reference** + **§0bis Golden Rules** + **§11 If-you-see-X**. Khi gặp câu lý thuyết → Ctrl+F keyword EN trong file này; gặp câu tính → mở §0 Formula sheet.

2. **Dịch đề thành điều kiện kỹ thuật TRƯỚC khi đọc đáp án** (§0bis.1). Gạch chân keyword: "all / at least one / controlled by / belongs to / must / may". Đề trường **bắt keyword** — đọc kỹ cụm danh từ + lượng từ.

3. **Loại đáp án theo Golden Rules:** câu quá tuyệt đối (always/never/all) thường sai; "đúng khái niệm sai chủ thể"; over-privileged (vi phạm least privilege); giữ sai số dòng/bỏ cột.

4. **Câu tính (Storage/FD): luôn dùng công thức, đừng nhớ đáp án cũ.** Xác định đang hỏi **record / block / index entry / index block / block access** — khác nhau. FD: **tính `X⁺`**, đừng đoán key. Kiểm 2NF trước 3NF trước BCNF (báo dạng chuẩn THẤP nhất).

5. **Câu SQL/RA: đọc CỘT mà code thực sự lọc.** `Employee.Dno` (belongs-to) ≠ `Project.Dnum` (controlled-by). Natural join `*` chỉ nối cột **cùng tên**. "Tất cả" = double `NOT EXISTS`.

6. **Câu ER/EER: tách 2 trục.** Cardinality (1:1/1:N/M:N) độc lập với Participation (total/partial). Disjoint/Overlap độc lập với Total/Partial. Đếm subclass chỉ cộng được khi **Total AND Disjoint**.

7. **Đánh dấu câu phân vân, làm câu chắc trước.** Trọng số: ưu tiên chắc điểm §2 (10) và §5 (9) — gần 40% đề. Đừng kẹt 1 câu khó §9.

8. **Khi 2 đáp án "đều có vẻ đúng":** chọn cái khớp **keyword EN nguyên văn slide/sách** + khớp với đáp án QUIZ BK-LMS đã học. Tra §11.2 nếu là câu đáp án gây tranh cãi.

---

# §13. CHECKLIST TRƯỚC KHI LOCK MỖI ĐÁP ÁN

Hỏi nhanh trước khi chọn:

- [ ] Đáp án có dùng natural join khi tên cột khác nhau không? (SSN≠ESSN, Dnum≠Dnumber)
- [ ] Hai vế của set difference có union-compatible không?
- [ ] Multivalued attribute có bị nhét vào 1 cột không? (vi phạm 1NF)
- [ ] `Other` có bị thêm vào dưới specialization **Total** không? (sai — Total buộc thuộc ≥1 subclass)
- [ ] Có thiếu phép `π` khi đề đòi "tất cả thông tin nhân viên" không?
- [ ] Aggregate đặt đúng clause chưa? (`WHERE` lọc tuple vs `HAVING` lọc nhóm)
- [ ] MAC: đang suy luận từ **clearance của user**, không phải từ raw data?
- [ ] Đáp án có quá tuyệt đối không? (always/never/all/none)
- [ ] Đáp án có over-privileged không? (vi phạm least privilege)
- [ ] Đáp án có xoá dòng trong khi chỉ cần mask giá trị không?
- [ ] Đã tính `X⁺` thay vì đoán key chưa?
- [ ] Đã đọc kỹ code lọc `Dno` (belongs-to) hay `Dnum` (controlled-by)?
- [ ] So sánh NULL có dùng `IS NULL`/`IS NOT NULL` không? (không `=`/`<>`)
- [ ] Báo dạng chuẩn THẤP nhất đã thoả (vi phạm 2NF → 1NF)?
- [ ] Index: câu hỏi đang hỏi #record / #block / #entry / #block access?
- [ ] Cardinality ratio và Participation đã tách thành 2 trục độc lập chưa?
- [ ] Shared subclass (AND/∩) hay Category (OR/∪)? Owner có cùng key không (→ surrogate key)?

---

# §14. KẾT LUẬN + CHIẾN LƯỢC 3 NGÀY

## 14.1. Bảng đối chiếu chương ↔ nguồn ↔ số câu

| § | Chủ đề | Nguồn lecture/slide | Số câu | % đề |
|---|---|---|---|---|
| 1 | Database System Overview | `00_Introduction`, `01_Database System Concepts` | 5 | 10% |
| 2 | ERD & EERD 🔥🔥 | `02_ER Model`, `03_EER Model` | 10 | 20% |
| 3 | Relational Mapping | `04_Relational Data Model and Relational Mapping` | 5 | 10% |
| 4 | Relational Algebra | `05_Relational Algebra` | 4 | 8% |
| 5 | SQL 🔥🔥 | `06_SQL`, `2_SQL`, `3_Advanced SQL`, `6_Exercise_SQL` | 9 | 18% |
| 6 | FD & Normalization 🔥 | `07_FD`, `4_Normalization`, VoTien/Normalization | 6 | 12% |
| 7 | Data Storage & Indexing | `08_DataStorage`, `5_Indexing`, VoTien/Storage | 4 | 8% |
| 8 | Database Security | `6_DatabaseSecurity` | 3 | 6% |
| 9 | Advanced Topics | `7_DATA WAREHOUSE`, `8_DistributedDatabase`, `9_NoSQL`, `11_Neo4j`, `12_data_anonymization` | 4 | 8% |
| | **TỔNG** | | **50** | **100%** |

> Đối chiếu QUIZ BK-LMS (`Final/Important/`): QUIZ 1→§1 · QUIZ 2,3→§2 · QUIZ 4→§3 · QUIZ 5→§4 · QUIZ 6,7→§5 · QUIZ 8,9→§6 · QUIZ 10→§7+§8. Đây là nguồn dự đoán sát nhất — **làm lại hết QUIZ 1–10 trước khi thi**.

## 14.2. Chiến lược ôn 3 ngày

**Ngày 1 — Khối nặng (35/50 câu):**
- §2 ERD & EERD (10) → §5 SQL (9) → §6 FD & Normalization (6). Làm lại QUIZ 2,3,6,7,8,9.
- Mục tiêu: thuộc keyword EN + làm trôi worked example (closure `X⁺`, normalization, double NOT EXISTS, procedure/trigger).

**Ngày 2 — Khối vừa + tính toán (18/50 câu):**
- §1 Overview (5) → §3 Mapping (5) → §4 Relational Algebra (4) → §7 Storage & Indexing (4). Làm lại QUIZ 1,4,5,10.
- Mục tiêu: thuộc 7+2 steps mapping; thuộc công thức `bfr`/`b`/index + làm trôi 1 bài Storage end-to-end.

**Ngày 3 — Khối lý thuyết cuối + tổng ôn (7/50 câu + chốt):**
- §8 Security (3) → §9 Advanced Topics (4). Học bảng keyword + bảng so sánh.
- Tổng ôn: đọc **§10 Câu thần chú** 2 lượt + **§11 If-you-see-X**. In **§0 + §0bis + §11** mang vào phòng thi (open-book).

## 14.3. Lời cuối

- Đề **bắt keyword** → với mỗi định nghĩa, nhớ **cụm tiếng Anh nguyên văn** (đã bôi đậm `🔑 Keywords (EN)` xuyên suốt file) — đó là phần khớp đáp án.
- Đề **open-book** nhưng 1.8 phút/câu → không có thời gian đọc từ đầu; phải đã **hiểu + tra nhanh**. File này thiết kế để Ctrl+F.
- Câu tính: **tin công thức, không tin trí nhớ đáp án cũ**. Câu lý thuyết: **khớp keyword + loại đáp án tuyệt đối**.

> 🎯 **Mục tiêu: ĐIỂM 10.** Bao phủ 100% slide lecture của môn, không lọc theo đề. Chúc thi tốt! 💪
