# Chương 4: Mô hình Quan hệ và Ánh xạ ER/EER → Quan hệ — *Relational Data Model and ER/EER-to-Relational Mapping*

> **Nguồn:** CO2013 Database Systems, HCMUT — Khoa KH&KT Máy tính
> **Giảng viên phụ trách:** TS. Trần Minh Quang
> **Giáo trình:** Elmasri & Navathe, *Fundamentals of Database Systems*, 7th Edition (Chapters 3, 9)
> **File PDF gốc:** `Lectures/04_Relational Data Model and Relational Mapping.pdf`
> **Số slide trong PDF gốc:** **90 slide** (slide 1 = title, slide 90 = Q&A)
> **Slide "Outline" lặp lại:** slide **2, 3, 29, 36, 53, 59, 66, 76, 89** (9 slide) — đã gộp ở §0.4.
> **Slide có diagram chính:** 8, 12, 17-18, 21, 23, 31, 34-35, 41, 45, 47-50, 52, 55-58, 62, 67-69, 71-74, 79-80, 82-83, 85-86, 88.
>
> **Mục tiêu của tài liệu này:** một sinh viên đã học chương 2 (ER) và chương 3 (EER), đọc một mạch là đủ làm được mapping ER/EER → Relational cho miniworld bất kỳ, **đủ kiến thức cho BTL1** (chương 4 là **chương quan trọng nhất** cho BTL1).

---

## 0. Trước khi bắt đầu

### 0.1. Bạn cần biết gì trước? (Prerequisite)

Đây là chương "kết nối" — cần kiến thức từ 2 chương trước:

| Concept đã học | Chương | Sẽ dùng để |
|---|---|---|
| **Entity, Attribute, Relationship** | 2 (ER) | Step 1–7 mapping |
| **Cardinality 1:1, 1:N, M:N** | 2 (ER) | Quyết định mapping approach |
| **Total / Partial Participation** | 2 (ER) | Quyết định FK ở bên nào |
| **Weak Entity, Partial Key** | 2 (ER) | Step 2 mapping |
| **Multivalued / Composite / Derived Attribute** | 2 (ER) | Step 6 mapping |
| **N-ary Relationship** | 2 (ER) | Step 7 mapping |
| **Subclass / Superclass / Specialization** | 3 (EER) | Step 8 mapping |
| **Category / Union Type** | 3 (EER) | Step 9 mapping |
| **Shared Subclass** | 3 (EER) | Mapping shared subclass |

> 💡 **Hiểu đơn giản:** Chương 2 dạy bạn **vẽ ER** (mức conceptual), chương 3 mở rộng thành **EER**. Chương 4 trả lời câu hỏi: *"Tôi đã có EER diagram đẹp. Làm sao chuyển nó sang **bảng SQL** để cài đặt thật?"* Đây là **bước nối** giữa thiết kế ý niệm và DB chạy thật.

> 💡 **Hiểu đơn giản (analogy):** ERD giống bản vẽ kiến trúc của một ngôi nhà. Relational schema giống bản vẽ kỹ thuật để thợ xây thật sự thi công. Chương này dạy cách chuyển từ "bản vẽ ý tưởng" sang "bản vẽ bảng/cột/khóa" để DBMS hiểu được.

### 0.2. Sau chương này bạn sẽ làm được gì? (Learning Outcomes)

Trích từ đề cương (mục L.O.1.2 + L.O.2.2):

1. **Định nghĩa** Relational Data Model: relation, schema, tuple, attribute, domain, degree, cardinality.
2. **Phân biệt** schema (lược đồ) và instance/state (trạng thái dữ liệu).
3. **Phân biệt** 4 loại Integrity Constraints: domain, key, entity integrity, referential integrity (+ semantic).
4. **Hiểu** Superkey, Key, Candidate Key, Primary Key, Secondary Key, Foreign Key.
5. **Hiểu** update operations (INSERT/DELETE/MODIFY) và 4 actions khi vi phạm (REJECT/CASCADE/SET NULL/custom).
6. **Áp dụng 9 quy tắc mapping ER/EER → Relational** — kỹ năng cốt lõi.
7. **Phân biệt 4 options 8A/8B/8C/8D** cho mapping specialization, biết khi nào dùng option nào.
8. **Áp dụng surrogate key** khi mapping Union Type (category) có superclass key khác nhau.

### 0.3. Lộ trình đọc đề xuất

| TT | Phần | Mức độ | Thời gian | Ghi chú |
|---:|---|---|---:|---|
| 1 | §1.1–§1.3 Relational Data Model — Basic concepts + Constraints | **CORE** | 50–60 phút | Nền cho SQL, RA, FD. |
| 2 | §1.4 Update Operations | **CORE** | 10–15 phút | Hiểu CASCADE/SET NULL/REJECT. |
| 3 | §2 Main Phases | **CORE** | 10–15 phút | Định vị mapping trong workflow. |
| 4 | §3.1–§3.8 ER mapping (Step 1–7) | **CORE** | 90–120 phút | Kỹ năng then chốt cho BTL1. |
| 5 | §3.9 Bảng tương ứng ER ↔ Relational | **CORE** | 5 phút | Trang vàng để học thuộc. |
| 6 | §3.10 Step 8 — 4 options 8A/8B/8C/8D | **CORE** | 40–50 phút | Hay ra thi tự luận. |
| 7 | §3.11 Step 9 — Union Types + Surrogate | **CORE** | 20 phút | Concept khó, đặc trưng EER. |
| 8 | §4 COMPANY full mapping result | **CORE** | 15 phút | Học thuộc PK + FK list. |
| 9 | Exercises ôn tập | **CORE** | 60–90 phút | Y format thi cuối kỳ. |

**Tổng:** ~5–6 giờ đọc lần đầu + 2 giờ làm bài tập. **Đây là chương dài thứ 2** sau SQL, và **quan trọng nhất cho BTL1**.

### 0.4. Outline chương (gộp 9 slide Outline lặp)

Slide 2, 3, 29, 36, 53, 59, 66, 76, 89 đều cùng outline (slide 53/59/66 còn highlight sub-step). Đã gộp:

> **Outline**
> 1. **Relational Data Model**
> 2. **Main Phases of Database Design**
> 3. **ER-/EER-to-Relational Mapping**
>    - Step 1: Mapping of Regular Entity Types
>    - Step 2: Mapping of Weak Entity Types
>    - Step 3: Mapping of Binary 1:1 Relationship Types
>    - Step 4: Mapping of Binary 1:N Relationship Types
>    - Step 5: Mapping of Binary M:N Relationship Types
>    - Step 6: Mapping of Multivalued attributes
>    - Step 7: Mapping of N-ary Relationship Types
>    - Step 8: Options for Mapping Specialization/Generalization (8A, 8B, 8C, 8D)
>    - Step 9: Mapping of Union Types (Categories)

---

## 1. Relational Data Model

### 1.1. Tại sao có concept này? (Motivation)

Chương 1 đã giới thiệu sơ Relational Model là một trong các "data model" (slide 35 chương 1). Chương 2-3 dạy bạn **vẽ ER/EER**, là *conceptual model*. Để **cài đặt** trên DBMS thật (Oracle, PostgreSQL, MySQL), bạn cần một mô hình *implementational* — đó là **Relational Model** mà E.F. Codd đề xuất năm 1970.

> 💡 **Hiểu đơn giản:** Relational Model = **biểu diễn data dưới dạng BẢNG 2 chiều** (rows + columns). Đây là cách "trung gian" giữa ER (đẹp về mặt khái niệm) và file vật lý (chạy được nhưng khó hiểu). DBMS sẽ làm cầu nối từ "bảng" xuống file.

### 1.2. Slide 4 — Section overview

**Nội dung slide gốc:**

- Basic Concepts: relational data model, relation schema, domain, tuple, cardinality & degree, database schema, etc.
- Relational Integrity Constraints
  - key, primary key & foreign key
  - entity integrity constraint
  - referential integrity
- Update Operations on Relations

### 1.3. Slide 5 — Lịch sử

**Nội dung slide gốc:**

- *The relational model of data is based on the concept of a **relation**.*
- *A relation is a **mathematical concept** based on the ideas of **sets**.*
- *The model was first proposed by **Dr. E.F. Codd of IBM in 1970** in: "A Relational Model for Large Shared Data Banks," Communications of the ACM, June 1970.*

→ **Codd's paper (1970)** là một trong những bài báo có ảnh hưởng nhất ngành CS — khiến RDBMS thắng thế Network/Hierarchical model thập niên 70-80.

### 1.4. Slide 6 — Relational Data Model & Relation Schema

**Nội dung slide gốc:**

- **Relational data model**: *Represents a database in the form of **relations** — 2-dimensional table with rows and columns of data.*
- **Relation schema**: *R(A₁, A₂, …, Aₙ) is made up of a relation name R and a list of **attributes** A₁, A₂, …, Aₙ. Each attribute Aᵢ is the name of a role played by some **domain D** in the relation schema R.*

| Thuật ngữ (EN) | Tiếng Việt | Định nghĩa |
|---|---|---|
| **Relation** | Quan hệ | Bảng 2 chiều — đơn vị cơ bản. |
| **Relation Schema** | Lược đồ quan hệ | Mô tả relation: tên + danh sách attribute. |
| **Attribute** | Thuộc tính | Cột của bảng. |
| **Domain D** | Miền giá trị | Tập các giá trị nguyên tử (atomic) hợp lệ + ràng buộc. |

**Ví dụ COMPANY:**
```text
EMPLOYEE(Fname, Minit, Lname, Ssn, Bdate, Address, Sex, Salary, Super_ssn, Dno)
```
- `EMPLOYEE` = relation name. `Fname, …, Dno` = attributes.
- `dom(Salary)` = số thực không âm. `dom(Sex)` = `{'M', 'F'}`.

> 💡 **Hiểu đơn giản (Schema vs Instance):** Schema = bản thiết kế nhà; instance = căn nhà cụ thể hôm nay có bàn ghế, người ở.

### 1.5. Slide 7 — Degree & Domain

**Nội dung slide gốc:**

- **Degree of a relation**: *The number of attributes n of its relation schema.*
- **Domain D**: *D is called the domain of Aᵢ and is denoted by **dom(Aᵢ)**. It is a set of atomic values and a set of integrity constraints.*
- *Example: STUDENT(Name, SSN, HomePhone, Address, OfficePhone, Age, GPA)*
  - *Degree = ??*
  - *dom(GPA) = ??*

**Đáp án:**
- `Degree(STUDENT) = 7` (7 attribute).
- `dom(GPA) = {x ∈ ℝ | 0.0 ≤ x ≤ 4.0}` (thang Mỹ) hoặc `{x | 0 ≤ x ≤ 10}` (thang VN).

### 1.6. Slide 8 — Tuple, Cardinality, Database Schema (COMPANY)

**Nội dung slide gốc:**

- **Tuple**: row/record in table.
- **Cardinality**: number of tuples in a table.
- **Database schema** S = {R₁, R₂, …, Rₘ}.

**Schema diagram for COMPANY relational database (PK gạch chân):**

| Relation | Attributes |
|---|---|
| `EMPLOYEE` | Fname, Minit, Lname, **Ssn**, Bdate, Address, Sex, Salary, Super_ssn, Dno |
| `DEPARTMENT` | Dname, **Dnumber**, Mgr_ssn, Mgr_start_date |
| `DEPT_LOCATIONS` | **Dnumber**, **Dlocation** |
| `PROJECT` | Pname, **Pnumber**, Plocation, Dnum |
| `WORKS_ON` | **Essn**, **Pno**, Hours |
| `DEPENDENT` | **Essn**, **Dependent_name**, Sex, Bdate, Relationship |

→ **Schema chuẩn của môn**, dùng làm ví dụ xuyên suốt.

### 1.7. Slide 9 — Relation r (Instance)

**Nội dung slide gốc:**

- *A **relation r** (or **relation state, relation instance**) of the relation schema R(A₁, A₂, …, Aₙ), also denoted by r(R), is a set of **n-tuples** r = {t₁, t₂, …, tₘ}.*
- *Each n-tuple t is an ordered list of n values t = ⟨v₁, v₂, …, vₙ⟩, where each value vᵢ, i=1..n, is an element of dom(Aᵢ) or is a special **null** value. The iᵗʰ value in tuple t is referred to as **t[Aᵢ]**.*

### 1.8. Slide 10 — 6 khái niệm cơ bản (review)

Slide chỉ liệt kê 6 khái niệm cốt lõi (cảnh báo "phải nắm cả 6 trước khi đi tiếp"):

1. Relational data model
2. Database schema
3. Relation schema
4. Relation
5. Tuple
6. Attribute

### 1.9. Slide 11 — Tính chất của Relation as Table

**Nội dung slide gốc:**

- *A relation can be conveniently represented by a table.*
- *The columns of the tabular relation represent **attributes**.*
- *Each attribute has a **distinct name**, and is always **referenced by that name, never by its position**.*
- *Each row of the table represents a **tuple**.*
- *The **ordering of the tuples is immaterial** and **all tuples must be distinct**.*

→ 4 tính chất quan trọng:
1. **Cột** = attribute, có tên duy nhất, **không xét theo vị trí**.
2. **Hàng** = tuple.
3. **Thứ tự hàng không quan trọng** (set property).
4. **Mọi tuple phải khác nhau** (set property).

### 1.10. Slide 12 — Ví dụ STUDENT

> 📊 **Hình 1.1 — Bảng STUDENT (slide 12):**
> ```
> STUDENT
> ┌────────────────┬─────────────┬───────────────┬─────────────────────┬───────────────┬─────┬──────┐
> │ Name           │ Ssn         │ Home_phone    │ Address             │ Office_phone  │ Age │ Gpa  │
> ├────────────────┼─────────────┼───────────────┼─────────────────────┼───────────────┼─────┼──────┤
> │ Benjamin Bayer │ 305-61-2435 │ (817)373-1616 │ 2918 Bluebonnet Lane│ NULL          │ 19  │ 3.21 │
> │ Chung-cha Kim  │ 381-62-1245 │ (817)375-4409 │ 125 Kirby Road      │ NULL          │ 18  │ 2.89 │
> │ Dick Davidson  │ 422-11-2320 │ NULL          │ 3452 Elgin Road     │ (817)749-1253 │ 25  │ 3.53 │
> │ Rohan Panchal  │ 489-22-1100 │ (817)376-9821 │ 265 Lark Lane       │ (817)749-6492 │ 28  │ 3.93 │
> │ Barbara Benson │ 533-69-1238 │ (817)839-8461 │ 7384 Fontana Lane   │ NULL          │ 19  │ 3.25 │
> └────────────────┴─────────────┴───────────────┴─────────────────────┴───────────────┴─────┴──────┘
> Cardinality = 5, Degree = 7. Có NULL ở Home_phone và Office_phone.
> ```

### 1.11. Slide 13 — Formal vs Informal Terminology

| Formal Terms | Informal Terms |
|---|---|
| Relation | **Table** |
| Attribute | **Column Header** |
| Domain | **All possible Column Values** |
| Tuple | **Row** |
| Schema of a Relation | **Table Definition** |
| State of the Relation | **Populated Table** |

→ Khi học SQL (chương 6), thường dùng "table/row/column" — informal. Khi viết tự luận / chứng minh, dùng "relation/tuple/attribute" — formal.

### 1.12. Slide 14-15 — Integrity Constraints + NULL

**Slide 14 — 4 loại constraint chính:**

> *Constraints are **conditions** that must hold on **all valid relation instances**.*
>
> Main types:
> - **Domain constraints**
> - **Key constraints**
> - **Entity integrity constraints**
> - **Referential integrity constraints**

**Slide 15 — NULL value:**

- *Represents value for an attribute that is currently **unknown** or **inapplicable** for tuple.*
- *Deals with **incomplete** or **exceptional** data.*
- *Represents the **absence of a value** and is **not the same as zero or spaces**, which are values.*

> 💡 **Hiểu đơn giản:** NULL ≠ 0, ≠ '', ≠ false. NULL là "không có giá trị". Trong SQL, `NULL = NULL` trả về `UNKNOWN` (không phải `TRUE`) — gây nhiều bug nếu không hiểu rõ.

### 1.13. Slide 16-18 — Key Constraints

**Slide 16 — Superkey và Key:**

- **Superkey** of R: *A set of attributes SK of R such that **no two tuples** in any valid relation instance r(R) will have the same value for SK. That is, for any distinct tuples t₁ and t₂ in r(R), **t₁[SK] ≠ t₂[SK]**.*
- **Key** of R: *A "**minimal**" superkey; that is, a superkey K such that **removal of any attribute from K results in a set of attributes that is not a superkey**.*

**Slide 17 — CAR example:**

> *CAR(State, Reg#, SerialNo, Make, Model, Year)* has two keys:
> - Key1 = {State, Reg#}
> - Key2 = {SerialNo}
>
> {SerialNo, Make} là superkey nhưng **không phải** key (vì có thể bỏ Make mà vẫn unique).
>
> *If a relation has several **candidate keys**, one is chosen arbitrarily to be the **primary key**. The primary key attributes are **underlined**.*
>
> **Secondary key**: candidate key không được chọn làm primary.

| Loại key | Định nghĩa | Ví dụ trên CAR |
|---|---|---|
| **Superkey** | Tập attribute đảm bảo unique (có thể có thừa) | {SerialNo}, {SerialNo, Make}, {State, Reg#, Year} |
| **Candidate Key** | Superkey **tối thiểu** (không thừa) | {State, Reg#}, {SerialNo} |
| **Primary Key (PK)** | Candidate key được chọn — **gạch chân** | {SerialNo} (giả sử) |
| **Secondary Key** | Candidate key còn lại | {State, Reg#} |

**Slide 18 — CAR với data mẫu:**

| License_number | Engine_serial_number | Make | Model | Year |
|---|---|---|---|---|
| Texas ABC-739 | A69352 | Ford | Mustang | 02 |
| Florida TVP-347 | B43696 | Oldsmobile | Cutlass | 05 |
| New York MPO-22 | X83554 | Oldsmobile | Delta | 01 |
| California 432-TFY | C43742 | Mercedes | 190-D | 99 |
| California RSK-629 | Y82935 | Toyota | Camry | 04 |
| Texas RSK-629 | U028365 | Jaguar | XJS | 04 |

→ License_number được chọn làm PK (gạch chân). Engine_serial_number cũng là candidate.

> 💡 **Hiểu đơn giản (CCCD analogy):** Superkey giống "danh sách thông tin định danh" có thể chứa thông tin **dư thừa** ({CCCD, Tên, SĐT}). Key/Candidate Key = phiên bản **rút gọn tối đa** vẫn unique ({CCCD}). Primary Key = cái bạn **chọn làm chính** dùng cho ID.

### 1.14. Slide 19 — Entity Integrity

**Nội dung slide gốc:**

- **Relational Database Schema**: *A set S of relation schemas that belong to the same database. S = {R₁, R₂, …, Rₙ}.*
- **Entity Integrity**: *Primary key attributes PK of each relation schema R in S **cannot have null values** in any tuple of r(R) because primary key values are used to identify the individual tuples: **t[PK] ≠ null** for any tuple t in r(R).*

→ **Quy tắc Entity Integrity:** PK **KHÔNG ĐƯỢC** là NULL.

> 💡 **Hiểu đơn giản:** Nếu Ssn (PK của EMPLOYEE) là NULL, làm sao biết tuple đó nói về AI? Không định danh được → vô nghĩa.

### 1.15. Slide 20 — Referential Integrity Constraint

**Nội dung slide gốc:**

- *A constraint involving **two relations**.*
- *Tuples in the referencing relation R₁ have attributes **FK** (called **foreign key attributes**) that reference the primary key attributes **PK** of the referenced relation R₂. A tuple t₁ in R₁ is said to reference a tuple t₂ in R₂ if **t₁[FK] = t₂[PK]**.*
- *A referential integrity constraint can be displayed as a **directed arc** from R₁.FK to R₂.*

| Thuật ngữ | Định nghĩa |
|---|---|
| **Foreign Key (FK)** | Attribute trong R₁ tham chiếu đến PK của R₂. |
| **Referencing relation** | Bảng chứa FK (R₁). |
| **Referenced relation** | Bảng chứa PK được tham chiếu (R₂). |

### 1.16. Slide 21 — Ví dụ DEPARTMENT-EMPLOYEE

> 📊 **Hình 1.2 — DEPARTMENT-EMPLOYEE (slide 21):**
> ```
> DEPARTMENT
> ┌────────────────┬─────────┬───────────┬────────────────┐
> │ DNAME          │ DNUMBER │ MGRSSN    │ MGRSTARTDATE   │
> ├────────────────┼─────────┼───────────┼────────────────┤
> │ Research       │ 5       │ 333445555 │ 1988-05-22     │
> │ Administration │ 4       │ 987654321 │ 1995-01-01     │
> │ Headquarters   │ 1       │ 888665555 │ 1981-06-19     │
> └────────────────┴─────────┴───────────┴────────────────┘
>          ▲           ▲
>          │           │
>          │           └─── DNO ─────┐
>          └─── reference ───────┐   │
>                                │   │
> EMPLOYEE                       │   │
> ┌─────────┬───────┬─────────┬──┴───┬────────────┬─────┬────────┬───────────┬─────┐
> │ FNAME   │ MINIT │ LNAME   │ SSN  │ BDATE      │ SEX │ SALARY │ SUPERSSN  │ DNO │
> ├─────────┼───────┼─────────┼──────┼────────────┼─────┼────────┼───────────┼─────┤
> │ John    │ B     │ Smith   │ 123… │ 1965-01-09 │ M   │ 30000  │ 333445555 │ 5   │
> │ Franklin│ T     │ Wong    │ 333… │ 1955-12-08 │ M   │ 40000  │ 888665555 │ 5   │
> │ ...     │ ...   │ ...     │ ...  │ ...        │ ... │ ...    │ ...       │ ... │
> │ James   │ E     │ Borg    │ 888… │ 1937-11-10 │ M   │ 55000  │ NULL      │ 1   │
> └─────────┴───────┴─────────┴──────┴────────────┴─────┴────────┴───────────┴─────┘
>
> Mũi tên: EMPLOYEE.DNO ──→ DEPARTMENT.DNUMBER (referential integrity).
> ```

### 1.17. Slide 22 — FK có thể NULL

**Nội dung slide gốc:**

- *The value in the foreign key column FK of the referencing relation R₁ can be either:*
  - *(1) a value of an existing primary key value of the corresponding primary key PK in R₂, or*
  - *(2) a NULL.*
- *In case (2), the FK in R₁ should not be a part of its own primary key.*

→ 2 trường hợp hợp lệ cho FK: match 1 PK trong bảng được tham chiếu, hoặc NULL (chỉ khi FK không là một phần của PK của chính bảng đó).

> 💡 **Ví dụ:** EMPLOYEE.Super_ssn (FK tới EMPLOYEE.Ssn) = NULL khi nhân viên đó là sếp cao nhất, không có ai supervise.

### 1.18. Slide 23 — Toàn cảnh Referential Integrity COMPANY

**Tổng hợp 8 FK trong COMPANY (slide 23):**

| Referencing Relation . FK | Referenced Relation . PK |
|---|---|
| `EMPLOYEE.Super_ssn` | `EMPLOYEE.Ssn` (self-reference) |
| `EMPLOYEE.Dno` | `DEPARTMENT.Dnumber` |
| `DEPARTMENT.Mgr_ssn` | `EMPLOYEE.Ssn` |
| `DEPT_LOCATIONS.Dnumber` | `DEPARTMENT.Dnumber` |
| `PROJECT.Dnum` | `DEPARTMENT.Dnumber` |
| `WORKS_ON.Essn` | `EMPLOYEE.Ssn` |
| `WORKS_ON.Pno` | `PROJECT.Pnumber` |
| `DEPENDENT.Essn` | `EMPLOYEE.Ssn` |

### 1.19. Slide 24 — Other Types of Constraints

**Nội dung slide gốc:**

- **Semantic Integrity Constraints**:
  - *Based on application semantics and **cannot be expressed by the model per se**.*
  - *E.g., "the max. no. of hours per employee for all projects he/she works on is **56 hrs per week**".*
  - *SQL-99 allows **triggers** and **ASSERTIONS**.*
- **State / static constraints** (so far) — kiểm tra trạng thái hiện tại.
- **Transition / dynamic constraints**: e.g., *"the salary of an employee can **only increase**"*.

| Loại constraint | Ví dụ |
|---|---|
| **State constraint** | Sex ∈ {'M', 'F'}; Salary > 0 |
| **Transition constraint** | New_salary ≥ Old_salary |
| **Semantic** | Tổng giờ/tuần của 1 employee ≤ 56h |

### 1.20. Slide 25-28 — Update Operations

**Slide 25 — 3 thao tác:**

- **INSERT** a tuple
- **DELETE** a tuple
- **MODIFY** a tuple

*Integrity constraints should not be violated by the update operations.*

**Slide 26 — Insertion phải đảm bảo:**

- Giá trị attribute thuộc đúng **domain** (đúng kiểu).
- Giá trị **prime attribute** (PK) không NULL → Entity Integrity.
- Giá trị key **không trùng** với tuple đã có.
- Giá trị **FK** (nếu có) phải tham chiếu đến tuple tồn tại → Referential Integrity.

**Slide 27 — Deletion + Modification:**

- **Deletion**: tuple phải tồn tại; không được vi phạm referential integrity.
- **Modification**: thay đổi attribute của tuple. Constraint tương tự insert/delete.

**Slide 28 — Actions on integrity violation:**

- **Cancel** the operation that causes the violation (**REJECT** option).
- **Perform** the operation but **inform** the user.
- **Trigger additional updates** (**CASCADE** option, **SET NULL** option).
- **Execute** a user-specified error-correction routine.

| Option | Ý nghĩa | Ví dụ |
|---|---|---|
| **REJECT** | Hủy operation | DELETE DEPARTMENT đang có EMPLOYEE → từ chối |
| **CASCADE** | Lan truyền | DELETE DEPARTMENT → xóa luôn EMPLOYEE |
| **SET NULL** | Đặt FK về NULL | DELETE DEPARTMENT → set EMPLOYEE.DNO = NULL |
| **SET DEFAULT** | Đặt về giá trị mặc định | DELETE DEPARTMENT → set EMPLOYEE.DNO = 'Unassigned' |

> 💡 **Hiểu đơn giản:** Khi viết `CREATE TABLE ... FOREIGN KEY (DNO) REFERENCES DEPARTMENT(Dnumber) ON DELETE CASCADE`, bạn đang nói với DBMS: *"khi 1 department bị xóa, hãy xóa hết employee thuộc nó."* (Chương 6 dạy SQL chi tiết.)

> 📝 **Tóm lại §1:**
> - Relational model = bảng 2 chiều, dựa trên set theory.
> - Schema (cố định) vs Instance (thay đổi). Relation = set of tuples.
> - 4 integrity constraints: Domain, Key, Entity Integrity (PK ≠ NULL), Referential Integrity.
> - Superkey ⊇ Candidate Key ⊇ Primary Key.
> - Update operations: 4 options khi vi phạm — REJECT, CASCADE, SET NULL, custom.
>
> **Một câu ghi nhớ:** *Relation là bảng có quy tắc — set theory: tuple distinct + không thứ tự; key constraint: PK không NULL; FK constraint: bảng trỏ nhau hợp lệ.*

> ❓ **Tự kiểm tra §1:**
> 1. STUDENT(Name, Ssn, Phone, GPA): `Degree` = ? `dom(GPA)` = ?
> 2. Phân biệt Superkey, Candidate Key, Primary Key.
> 3. CAR có 2 candidate key. Nếu chọn {State, Reg#} làm PK, {SerialNo} gọi là gì?
> 4. Entity integrity yêu cầu gì? Vì sao quan trọng?
> 5. FK của EMPLOYEE.Super_ssn có thể NULL không? Vì sao?
> 6. Khi xóa DEPARTMENT đang có EMPLOYEE, 4 options nào có thể xảy ra?

---

## 2. Main Phases of Database Design

### 2.1. Tại sao có concept này?

Chương 1 đã giới thiệu sơ workflow thiết kế DB (slide 6 chương 1). Chương 4 nhắc lại để **xác định vị trí** của ER/EER-to-Relational Mapping trong toàn bộ workflow.

### 2.2. Slide 30 — 3 Main Phases

**Nội dung slide gốc:**

- **Conceptual database design**
- **Logical database design**
- **Physical database design**

| Phase | Output | Công cụ | DBMS-dependent? |
|---|---|---|---|
| **Conceptual** | ER / EER schema | Chương 2, 3 | Không |
| **Logical** | Relational schema | **Chương 4 (mapping)** + Chương 7 (normalization) | Có (relational vs network) |
| **Physical** | File organization, index, storage | Chương 8 | Có (Oracle vs Postgres khác) |

### 2.3. Slide 31-32 — Overview Diagram

> 📊 **Hình 2.1 — Database Design Process (slide 31, giống chương 2 slide 6):**
> ```
>            Miniworld
>                │
>                ▼
>     REQUIREMENTS - COLLECTION & ANALYSIS
>      │                      │
>      ▼                      ▼
> Functional req       Data requirements
>      │                      │
>      ▼                      ▼
> FUNCTIONAL ANALYSIS   CONCEPTUAL DESIGN ← Chương 2, 3
>      │                      │
>      │                      ▼
>      │              Conceptual schema
>      │                      │
>      │                      ▼
>      │              LOGICAL DESIGN     ← CHƯƠNG 4
>      │              (DATA MODEL MAPPING)
>      │                      │
>      ▼                      ▼
> APPLICATION PROGRAM    Database schema
>      │                      │
>      ▼                      ▼
> TRANSACTION             PHYSICAL DESIGN ← Chương 8
> IMPLEMENTATION          (file, index)
>                              │
>                              ▼
>                          Internal schema
> ```

### 2.4. Slide 33 — Logical Database Design

**Nội dung slide gốc:**

- *The process of constructing a model of the data based on a specific data model (e.g. relational), but **independent of a particular DBMS**.*
- **ER- & EER-to-Relational Mapping** ← chương 4
- *Normalization* ← chương 7

→ **Logical Design = 2 việc**: (1) Mapping ER/EER → Relational và (2) Normalization. Chương 4 làm (1); chương 7 làm (2).

### 2.5. Slide 34-35 — COMPANY ERD → Relational Result

Slide 34 vẽ COMPANY ER (giống chương 2). Slide 35 cho kết quả mapping = relational schema (đã liệt kê ở §1.6 trên).

> 📝 **Tóm lại §2:**
> - 3 phases: Conceptual → Logical → Physical.
> - Chương 4 = **Logical Design (Data Model Mapping)**.
> - Logical = Mapping (ch. 4) + Normalization (ch. 7).
>
> **Một câu ghi nhớ:** *Conceptual = "vẽ ER/EER"; Logical = "dịch ER/EER → bảng quan hệ"; Physical = "tối ưu lưu trữ".*

---

## 3. ER-/EER-to-Relational Mapping

### 3.1. Slides 37-38 — 9 Steps Overview

**Nội dung slide gốc:**

- **ER:**
  - Step 1: Mapping of Regular Entity Types
  - Step 2: Mapping of Weak Entity Types
  - Step 3: Mapping of Binary 1:1 Relationship Types
  - Step 4: Mapping of Binary 1:N Relationship Types
  - Step 5: Mapping of Binary M:N Relationship Types
  - Step 6: Mapping of Multivalued attributes
  - Step 7: Mapping of N-ary Relationship Types
- **EER:**
  - Step 8: Options for Mapping Specialization or Generalization (4 options 8A-8D)
  - Step 9: Mapping of Union Types (Categories)

> 💡 **Hiểu đơn giản:** 9 steps thực hiện **theo thứ tự** — không bỏ qua. Mỗi step nhận EER diagram làm input, sinh ra **một số bảng** hoặc **chỉnh sửa bảng đã sinh** (vd thêm FK). Sau bước 9 → relational schema hoàn chỉnh.

### 3.2. Step 1 — Mapping of Regular (Strong) Entity Types

**Slide 39 — Quy tắc:**

- Entity → Relation
- Attribute of entity → Attribute of relation
- Primary key of entity → Primary key of relation

**Lưu ý:**
- **Composite attribute** → tách thành các simple component attribute.
- **Multivalued attribute** → KHÔNG xử lý ở Step 1, để Step 6.
- **Derived attribute** → KHÔNG đưa vào (tính khi cần).

**Slide 40-41 — Ví dụ COMPANY (sau Step 1):**

> 📊 **Hình 3.1 — Sau Step 1 (slide 41):**
> ```
> EMPLOYEE
> ┌──────┬───────┬───────┬─────┬───────┬─────────┬─────┬────────┐
> │FNAME │MINIT  │LNAME  │ SSN │ BDATE │ ADDRESS │ SEX │ SALARY │
> └──────┴───────┴───────┴──↑──┴───────┴─────────┴─────┴────────┘
>                          PK
> DEPARTMENT
> ┌────────┬─────────┐
> │ DNAME  │ DNUMBER │
> └────────┴────↑────┘
>              PK
>
> PROJECT
> ┌───────┬─────────┬───────────┐
> │ PNAME │ PNUMBER │ PLOCATION │
> └───────┴────↑────┴───────────┘
>             PK
> ```
>
> **Lưu ý:**
> - `Name` (composite: Fname, Minit, Lname) đã tách thành 3 simple attribute.
> - `Locations` (multivalued của DEPARTMENT) **chưa có** — sẽ làm ở Step 6.
> - `Number_of_employees` (derived) **không đưa vào**.
> - `Mgr_ssn`, `Mgr_start_date` (DEPARTMENT) **chưa có** — Step 3 (1:1 MANAGES).
> - `Dno`, `Super_ssn`, `DNum` **chưa có** — Step 4.

### 3.3. Step 2 — Mapping of Weak Entity Types

**Slide 43 — Quy tắc:**

> *For each weak entity type W in the ER schema with owner entity type E, create a relation R and include all simple attributes (or simple components of composite attributes) of W as attributes of R.*
>
> *In addition, include as **foreign key attributes** of R the **primary key attribute(s)** of the relation(s) that correspond to the owner entity type(s).*
>
> *The primary key of R is the **combination** of the primary key(s) of the owner(s) and the partial key of the weak entity type W, if any.*

**Slide 45 — Ví dụ DEPENDENT:**

DEPENDENT là weak entity, owner = EMPLOYEE qua relationship `DEPENDENTS_OF`. Partial key = `Name` (gạch chân nét đứt).

> 📊 **Hình 3.2 — Sau Step 2 (slide 45):**
> ```
> DEPENDENT
> ┌──────┬─────────────────┬─────┬───────┬──────────────┐
> │ ESSN │ DEPENDENT_NAME  │ SEX │ BDATE │ RELATIONSHIP │
> └──↑───┴────────↑────────┴─────┴───────┴──────────────┘
>    │           │
>    └─PK──── PK ┘
>    └─ FK → EMPLOYEE.SSN
>
> Primary Key = {ESSN, DEPENDENT_NAME} (composite).
> Note: ON DELETE CASCADE — khi EMPLOYEE bị xóa, DEPENDENT cũng bị xóa.
> ```

> 💡 **Hiểu đơn giản:** Weak entity = "đứa con không có CCCD riêng". Phải dùng CCCD của bố/mẹ + tên để định danh. → PK = {Owner_PK, Partial_key}.

### 3.4. Step 3 — Mapping of Binary 1:1 Relationship Types

**Slides 47-50 — 3 approaches:**

**Approach 1 — Foreign Key Approach:**

> *Choose one of the relations — E2, say — and include as a foreign key in E2 the primary key of E1. It is **better to choose** an entity type with **total participation (mandatory)** in R in the role of E2.*

```
ER:  E1 ─1─◇R◇─1─ E2

→  E1(K1)
   E2(K2, K1)   ← FK K1 đặt ở E2 (bên total participation)
```

**Approach 2 — Merged Relation Approach (chỉ khi cả 2 total):**

> *When **both participations are total**, merge the two entity types and the relationship into a **single relation**.*

```
ER:  E1 ═1═◇R◇═1═ E2  (cả 2 đường đôi)

→  E12(K1, K2, ... attributes of E1, E2, R)
   PK can be K1 or K2.
```

**Approach 3 — Cross-reference / Relationship Relation:**

> *Set up a third relation R for the purpose of cross-referencing the primary keys of the two relations E1 and E2.*

```
ER:  E1 ─1─◇R◇─1─ E2

→  E1(K1)
   E2(K2)
   R(K1, K2)   PK của R có thể là K1 hoặc K2
```

**Slide 51-52 — Ví dụ MANAGES (1:1, EMPLOYEE-DEPARTMENT):**

DEPARTMENT phải có quản lý → total participation phía DEPARTMENT.
→ Dùng Approach 1, đặt FK ở DEPARTMENT:

```
DEPARTMENT
┌────────┬─────────┬───────────┬────────────────┐
│ DNAME  │ DNUMBER │ MGRSSN    │ MGRSTARTDATE   │
└────────┴─────────┴────↑──────┴────────────────┘
                        FK → EMPLOYEE.SSN
```

### 3.5. Step 4 — Mapping of Binary 1:N Relationship Types

**Slide 54 — 2 approaches:**

**Approach 1 — Foreign Key Approach (phổ biến nhất):**

> *Include as foreign key in **E2 (N-side)** the primary key of the relation E1 (1-side).*

```
ER:  E1 ─1─◇R◇─N─ E2

→  E1(K1)
   E2(K2, K1)   ← FK K1 đặt ở E2 (bên N-side)
```

**Approach 2 — Relationship Relation Approach (almost optional):**

> *Create a separate relation R whose attributes are the primary keys of E1 and E2. The primary key of R is the foreign key from the entity type at the **N-side**.*
>
> *This option can be used if **few tuples** in E2 participate in the relationship to **avoid excessive NULL** values.*

```
ER:  E1 ─1─◇R◇─N─ E2  (E2 partial — almost optional)

→  E1(K1)
   E2(K2)
   R(K1, K2)   PK = K2
```

**Slide 56-57 — Ví dụ COMPANY (3 relationship 1:N):**

| Relationship | Cardinality | Mapping |
|---|---|---|
| **WORKS_FOR** | EMPLOYEE (N) — DEPARTMENT (1) | FK `EMPLOYEE.Dno → DEPARTMENT.Dnumber` |
| **CONTROLS** | DEPARTMENT (1) — PROJECT (N) | FK `PROJECT.Dnum → DEPARTMENT.Dnumber` |
| **SUPERVISION** | EMPLOYEE Supervisor (1) — EMPLOYEE Supervisee (N) | FK `EMPLOYEE.Super_ssn → EMPLOYEE.Ssn` (recursive) |

**Slide 58 — Ví dụ BORROWER-BOOK:**

> *BORROWER ─1─◇ON_LOAN◇─N─ BOOK*
>
> One possible representation:
> ```
> BORROWER(BNUMBER, NAME, ADDRESS, ...)
> BOOK(ISBN, TITLE, ..., BNUMBER)   ← FK
> ```
>
> A better alternative (nếu nhiều book chưa được mượn → tránh NULL):
> ```
> BORROWER(BNUMBER, NAME, ADDRESS, ...)
> BOOK(ISBN, TITLE, ...)
> ON_LOAN(ISBN, BNUMBER)
> ```

### 3.6. Step 5 — Mapping of Binary M:N Relationship Types

**Slide 60 — Quy tắc:**

> *An M:N relationship is **always** represented by a **new relation** which consists of the prime attributes of both participating entity types together with **any attributes of the relationship**.*
>
> *The combination of the prime attributes will form the **primary key** of the new relation.*

```
ER:  E1 ─M─◇R(attrs)◇─N─ E2

→  E1(K1)
   E2(K2)
   R(K1, K2, attrs)   PK = {K1, K2} (composite)
```

→ **Không có lựa chọn nào khác** — M:N **bắt buộc** tách thành relation riêng.

**Slide 61-62 — Ví dụ WORKS_ON (M:N giữa EMPLOYEE và PROJECT):**

```
WORKS_ON
┌──────┬─────┬───────┐
│ ESSN │ PNO │ HOURS │
└──↑───┴──↑──┴───────┘
   │     └── FK → PROJECT.PNUMBER
   └─────── FK → EMPLOYEE.SSN
Primary Key = {ESSN, PNO}.
```

### 3.6a. Recursive (Involuted) Relationships — Slides 63-65

**Slide 63 — Quy tắc:**

> *Relationship among different instances of the **same entity**. The name(s) of the prime attribute(s) needs to be **changed to reflect the role** each entity plays.*

3 ví dụ:

**Slide 64 — Example 1: PERSON-MARRY (1:1, optional cả 2):**

```
PERSON(ID, NAME, ADDRESS, ...)
MARRY(HUSBAND_ID, WIFE_ID, DATE_OF_MARRIAGE)
       PK = HUSBAND_ID hoặc WIFE_ID
```
→ Dùng Approach 3 (cross-reference) vì cả 2 phía optional → tránh NULL.

**Slide 65 — Example 2: EMPLOYEE-SUPERVISE (1:M):**

- *Mandatory hoặc almost mandatory:*
  ```
  EMPLOYEE(ID, ENAME, ..., SUPERVISOR_ID)
                            ↑ FK → EMPLOYEE.ID (self-ref)
  ```
- *Optional:*
  ```
  EMPLOYEE(ID, ENAME, ...)
  SUPERVISE(ID, START_DATE, ..., SUPERVISOR_ID)
            PK = ID
  ```

**Example 3: PART-COMPRISE (N:M):**

```
PART(PNUMBER, DESCRIPTION, ...)
COMPRISE(MAJOR_PNUMBER, MINOR_PNUMBER, QUANTITY)
          PK = {MAJOR_PNUMBER, MINOR_PNUMBER}
          (Vd: 1 xe đạp gồm 2 bánh + 1 khung)
```

> 💡 **Hiểu đơn giản:** Recursive = entity tham chiếu chính nó. Cần **đổi tên** prime attribute (Ssn → Super_ssn, ID → SUPERVISOR_ID) để phân biệt 2 vai trò.

### 3.7. Step 6 — Mapping of Multivalued Attributes

**Slide 67 — Quy tắc:**

> *For each multivalued attribute A, create a new relation R. This relation R will include an attribute corresponding to A, plus the primary key attribute K — as a foreign key in R — of the relation that represents the entity type or relationship type that has A as an attribute.*
>
> *The primary key of R is the **combination of A and K**. If the multivalued attribute is composite, we include its simple components.*

```
ER:  Entity E with multivalued attr A

→  E(K, ...other simple attrs)
   E_A(K, A)   PK = {K, A}, FK K → E.K
```

**Slide 68-69 — Ví dụ DEPT_LOCATIONS:**

```
DEPT_LOCATIONS
┌─────────┬───────────┐
│ DNUMBER │ DLOCATION │
└────↑────┴────↑──────┘
     │         │
     └────── PK ─────┘  (composite)
     └── FK → DEPARTMENT.DNUMBER
```

### 3.8. Step 7 — Mapping of N-ary Relationship Types

**Slide 70 — Quy tắc:**

> *For each n-ary relationship type R, where n > 2, create a new relationship S to represent R.*
>
> *Include as foreign key attributes in S the primary keys of the relations that represent the participating entity types.*
>
> *Also include any simple attributes of the n-ary relationship type as attributes of S.*

**Slide 71-74 — Ví dụ ternary SUPPLY (SUPPLIER, PROJECT, PART, attribute Quantity):**

```
SUPPLIER(SNAME, ...)
PROJECT(PROJNAME, ...)
PART(PARTNO, ...)

SUPPLY(SNAME, PROJNAME, PARTNO, QUANTITY)
       PK mặc định = {SNAME, PROJNAME, PARTNO}
```

**Note quan trọng (slide 71-74):**

> *If the cardinality constraint on any of the entity types E participating in the relationship is **1**, the PK should **not include** the FK attributes that reference the relation E' corresponding to E.*

| Cardinality | PK của SUPPLY |
|---|---|
| N:N:N (cả 3 đều N) | {SNAME, PROJNAME, PARTNO} |
| 1:N:N (SUPPLIER là 1) | {PROJNAME, PARTNO} (bỏ SNAME) |
| 1:1:N (SUPPLIER, PROJECT là 1) | {PARTNO} |
| 1:1:1 | Không xác định được — cần thêm constraint |

### 3.9. Slide 75 — Bảng tương ứng ER ↔ Relational

**🌟 Đây là bảng vàng — học thuộc!**

| ER Model | Relational Model |
|---|---|
| Entity type | "Entity" relation |
| 1:1 or 1:N relationship type | Foreign key (or "relationship" relation) |
| M:N relationship type | "Relationship" relation & 2 foreign keys |
| n-ary relationship type | "Relationship" relation & n foreign keys |
| Simple attribute | Attribute |
| Composite attribute | Set of simple component attributes |
| Multivalued attribute | Relation and foreign key |
| Value set | Domain |
| Key attribute | Primary (or secondary) key |

### 3.10. Step 8 — Mapping Specialization/Generalization (4 Options)

**Slide 77 — 4 options overview:**

> *Convert each specialization with m subclasses {S1, S2, …, Sm} and generalized superclass C, where the attributes of C are {k, a1, …, an} and k is the (primary) key, into relational schemas using one of the four following options:*

#### 3.10.1. Option 8A — Superclass + Subclasses (slide 78)

> *Create a relation L for C with attributes Attrs(L) = {k, a1, …, an} and PK(L) = k. Create a relation Li for each subclass Si with attributes Attrs(Li) = {{k} ∪ {attributes of Si}} and PK(Li) = k.*
>
> *This option works for **ANY** specialization (total or partial, disjoint or overlapping).*

→ **Tạo m+1 bảng**: 1 cho superclass + m cho subclass.

**Slide 79 — Ví dụ Option 8A (EMPLOYEE → SECRETARY/TECHNICIAN/ENGINEER):**

```
EMPLOYEE(SSN, FName, MInit, LName, BirthDate, Address, JobType)
SECRETARY(SSN, TypingSpeed)        FK SSN → EMPLOYEE.SSN
TECHNICIAN(SSN, TGrade)            FK SSN → EMPLOYEE.SSN
ENGINEER(SSN, EngType)             FK SSN → EMPLOYEE.SSN
```

→ ✅ **Ưu:** Linh hoạt, áp dụng được cho mọi loại specialization.
→ ❌ **Nhược:** Truy vấn cần JOIN nhiều bảng.

#### 3.10.2. Option 8B — Subclass relations only (slide 78)

> *Create a relation Li for each subclass Si with attributes Attr(Li) = {{attributes of Si} ∪ {k, a1, …, an}} and PK(Li) = k.*
>
> *This option **only works for a specialization whose subclasses are TOTAL**.*
>
> *It is **only recommended if the specialization has the disjointness constraint**. If overlapping, the same entity may be duplicated.*

→ **Bỏ superclass**, tất cả attribute superclass được copy vào mỗi subclass.

**Slide 80 — Ví dụ Option 8B (VEHICLE → CAR/TRUCK, total):**

```
CAR(VehicleId, LicensePlateNo, Price, MaxSpeed, NoOfPassengers)
TRUCK(VehicleId, LicensePlateNo, Price, NoOfAxles, Tonnage)
```

→ Mỗi vehicle nằm trong 1 trong 2 bảng (vì disjoint + total).

#### 3.10.3. Option 8C — Single relation with one type attribute (slide 81)

> *Create a single relation L with attributes Attrs(L) = {k, a1, …, an} ∪ {attributes of S1} ∪ … ∪ {attributes of Sm} ∪ {t} and PK(L) = k.*
>
> *The attribute t is called a **type (or discriminating) attribute** that indicates the subclass to which each tuple belongs.*
>
> *This option **works only for a specialization whose subclasses are disjoint**.*

→ **Gộp tất cả vào 1 bảng**, thêm 1 cột `type` để phân biệt.

**Slide 82 — Ví dụ Option 8C (EMPLOYEE):**

```
EMPLOYEE(SSN, FName, MInit, LName, BirthDate, Address, JobType,
         TypingSpeed, TGrade, EngType)
```

→ Với mỗi tuple:
- Nếu `JobType = 'Secretary'` → `TypingSpeed` có giá trị, `TGrade` và `EngType` NULL.
- Nếu `JobType = 'Technician'` → `TGrade` có giá trị, hai cái kia NULL.

→ ❌ **Nhược:** Nhiều NULL.

#### 3.10.4. Option 8D — Single relation with multiple type attributes (slide 81)

> *Create a single relation schema L with attributes Attrs(L) = {k, a1, …, an} ∪ {attributes of S1} ∪ … ∪ {attributes of Sm} ∪ {t1, t2, …, tm} and PK(L) = k. Each ti is a **Boolean type attribute** indicating whether a tuple belongs to the subclass Si.*

→ **Gộp 1 bảng**, có **m flag boolean** thay vì 1 type attribute.

**Slide 83 — Ví dụ Option 8D (PART → MANUFACTURED/PURCHASED, overlapping):**

```
PART(PartNo, Description, MFlag, DrawingNo, ManufactureDate, BatchNo,
     PFlag, SupplierName, ListPrice)
```

- `MFlag = TRUE` → là MANUFACTURED_PART.
- `PFlag = TRUE` → là PURCHASED_PART.
- Cả hai TRUE → vừa được sản xuất nội bộ, vừa mua từ supplier.

#### 3.10.5. 🌟 Bảng so sánh 4 options — Decision Matrix

| Option | Số bảng | Hỗ trợ Disjoint? | Hỗ trợ Overlapping? | Hỗ trợ Total? | Hỗ trợ Partial? | Số NULL | Khi nào dùng |
|---|---:|:---:|:---:|:---:|:---:|---|---|
| **8A** | m+1 | ✅ | ✅ | ✅ | ✅ | Ít | **Linh hoạt mặc định** — áp dụng được mọi case |
| **8B** | m | ✅ | ⚠ Duplicate | ✅ | ❌ | Ít | Total + Disjoint, ít attribute chung |
| **8C** | 1 | ✅ | ❌ | ✅ | ✅ | Nhiều | Disjoint, đơn giản, ít subclass |
| **8D** | 1 | ✅ | ✅ | ✅ | ✅ | Rất nhiều | **Overlapping** (8C không xử lý được) |

**Quyết định nhanh:**
- Cần linh hoạt → **8A** (mặc định an toàn)
- Total + Disjoint, ít attr chung → **8B**
- Disjoint, ít subclass → **8C**
- **Overlapping** → **8D** (hoặc 8A)

#### 3.10.6. Mapping Shared Subclasses (slides 84-86)

**Slide 84:**

> *A shared subclass, such as STUDENT_ASSISTANT, is a subclass of several classes, indicating multiple inheritance. These classes must all have the **same key attribute**; otherwise, the shared subclass would be modeled as a category.*

**Slide 85-86 — Ví dụ UNIVERSITY lattice:**

> 📊 **Mapping kết quả (slide 86):**
> ```
> PERSON(Ssn, Name, Birth_date, Sex, Address)
>
> EMPLOYEE(Ssn, Salary, Employee_type, Position, Rank, Percent_time,
>          Ra_flag, Ta_flag, Project, Course)
>          FK Ssn → PERSON.Ssn
>
> ALUMNUS(Ssn)
>          FK Ssn → PERSON.Ssn
>
> ALUMNUS_DEGREES(Ssn, Year, Degree, Major)
>          FK Ssn → ALUMNUS.Ssn
>          (Degrees là multivalued composite của ALUMNUS → tách thành bảng riêng)
>
> STUDENT(Ssn, Major_dept, Grad_flag, Undergrad_flag, Degree_program,
>         Class, Student_assist_flag)
>         FK Ssn → PERSON.Ssn
> ```
>
> **Lưu ý:**
> - PERSON dùng option 8A (superclass riêng).
> - EMPLOYEE chia thành STAFF/FACULTY/STUDENT_ASSISTANT — dùng 8C (Employee_type) + 8D (Ra_flag/Ta_flag).
> - STUDENT có Grad_flag/Undergrad_flag (8D) + Student_assist_flag.

### 3.11. Step 9 — Mapping of Union Types (Categories)

**Slide 87 — Surrogate Key:**

> *For mapping a category whose defining superclass have **different keys**, it is customary to specify a new key attribute, called a **surrogate key**, when creating a relation to correspond to the category.*

→ Khi superclass của category có **key khác nhau** (vd PERSON.Ssn vs BANK.BName vs COMPANY.CName) → tạo **surrogate key** mới.

**Slide 88 — Ví dụ OWNER:**

> 📊 **Mapping (slide 88):**
> ```
> PERSON(Ssn, Driver_license_no, Name, Address, Owner_id)
>                                              ↑ FK → OWNER.Owner_id
> BANK(Bname, Baddress, Owner_id)
>                       ↑ FK → OWNER.Owner_id
> COMPANY(Cname, Caddress, Owner_id)
>                          ↑ FK → OWNER.Owner_id
>
> OWNER(Owner_id)   ← surrogate key (mới sinh)
>
> REGISTERED_VEHICLE(Vehicle_id, License_plate_number)
>
> CAR(Vehicle_id, Cstyle, Cmake, Cmodel, Cyear)
>      FK Vehicle_id → REGISTERED_VEHICLE.Vehicle_id
> TRUCK(Vehicle_id, Tmake, Tmodel, Tonnage, Tyear)
>      FK Vehicle_id → REGISTERED_VEHICLE.Vehicle_id
>
> OWNS(Owner_id, Vehicle_id, Purchase_date, Lien_or_regular)
>      PK = {Owner_id, Vehicle_id}
> ```
>
> **Đặc điểm:**
> - OWNER chỉ có **1 cột** = surrogate key.
> - PERSON/BANK/COMPANY mỗi cái thêm `Owner_id` để tham chiếu lên OWNER.
> - REGISTERED_VEHICLE có key chung `Vehicle_id` — không cần surrogate.

> 💡 **Hiểu đơn giản:** Surrogate key = "ID nhân tạo" do hệ thống sinh, dùng khi không có natural key chung. Trong thực tế, đây cũng là pattern phổ biến — vd Django ORM tự sinh `id` (auto-increment) cho mỗi bảng.

> 📝 **Tóm lại §3:**
> - **9 steps** áp dụng tuần tự lên ER/EER → relational schema.
> - **ER (Step 1-7)**: Regular entity → bảng; Weak → bảng + composite PK; 1:1 → 3 approaches; 1:N → FK ở N-side; M:N → bảng riêng; multivalued → bảng riêng; n-ary → bảng + n FK.
> - **EER (Step 8-9)**: Specialization có **4 options 8A/8B/8C/8D**; Category dùng **surrogate key**.
> - Recursive: đổi tên attribute để phân biệt 2 vai trò.
>
> **Một câu ghi nhớ:** *Mọi entity → bảng. 1:N → FK ở phía N. M:N → bảng riêng. Multivalued → bảng riêng. Specialization → 4 options chọn theo disjoint/overlap × total/partial. Category → surrogate key.*

> ❓ **Tự kiểm tra §3:**
> 7. Step 1 và Step 2 khác nhau về cách xử lý PK?
> 8. Trong COMPANY, MANAGES là 1:1. Vì sao FK đặt ở DEPARTMENT mà không ở EMPLOYEE?
> 9. Vì sao M:N **bắt buộc** tạo bảng riêng?
> 10. Multivalued attribute Locations của DEPARTMENT mapping thành gì?
> 11. Trong recursive 1:N SUPERVISION, FK gọi là gì? Vì sao đổi tên?
> 12. Liệt kê 4 options của Step 8. Khi nào dùng option nào?
> 13. Cho specialization PART → {MANUFACTURED, PURCHASED} (overlapping). Option nào phù hợp?
> 14. Khi nào cần surrogate key cho category? Cho ví dụ.

---

## 4. Toàn bộ kết quả mapping COMPANY ER schema

Sau khi áp dụng đầy đủ 9 steps lên COMPANY ER (chương 2 + slide 34 chương 4), kết quả là:

### 4.1. Relational Schema đầy đủ

```
EMPLOYEE(Fname, Minit, Lname, Ssn, Bdate, Address, Sex, Salary, Super_ssn, Dno)
DEPARTMENT(Dname, Dnumber, Mgr_ssn, Mgr_start_date)
DEPT_LOCATIONS(Dnumber, Dlocation)
PROJECT(Pname, Pnumber, Plocation, Dnum)
WORKS_ON(Essn, Pno, Hours)
DEPENDENT(Essn, Dependent_name, Sex, Bdate, Relationship)
```

### 4.2. Primary Keys

| Relation | Primary Key | Lý do |
|---|---|---|
| EMPLOYEE | `Ssn` | Step 1 — entity key |
| DEPARTMENT | `Dnumber` | Step 1 — entity key |
| DEPT_LOCATIONS | {`Dnumber`, `Dlocation`} | Step 6 — composite (FK + multivalued attr) |
| PROJECT | `Pnumber` | Step 1 — entity key |
| WORKS_ON | {`Essn`, `Pno`} | Step 5 — composite của 2 PK |
| DEPENDENT | {`Essn`, `Dependent_name`} | Step 2 — owner_PK + partial_key |

### 4.3. Foreign Keys

| FK | → Referenced PK | Step |
|---|---|---|
| `EMPLOYEE.Super_ssn` | `EMPLOYEE.Ssn` | Step 4 (recursive 1:N SUPERVISION) |
| `EMPLOYEE.Dno` | `DEPARTMENT.Dnumber` | Step 4 (1:N WORKS_FOR) |
| `DEPARTMENT.Mgr_ssn` | `EMPLOYEE.Ssn` | Step 3 (1:1 MANAGES) |
| `DEPT_LOCATIONS.Dnumber` | `DEPARTMENT.Dnumber` | Step 6 |
| `PROJECT.Dnum` | `DEPARTMENT.Dnumber` | Step 4 (1:N CONTROLS) |
| `WORKS_ON.Essn` | `EMPLOYEE.Ssn` | Step 5 (M:N) |
| `WORKS_ON.Pno` | `PROJECT.Pnumber` | Step 5 (M:N) |
| `DEPENDENT.Essn` | `EMPLOYEE.Ssn` | Step 2 (weak) |

→ Tổng **8 foreign keys** trong COMPANY. **Học thuộc bảng này** — hay ra thi cuối kỳ và thi BTL1.

---

## 5. Bảng Tổng Hợp Thuật Ngữ Chương 4

| STT | Thuật ngữ (EN) | Tiếng Việt | Định nghĩa ngắn | Slide | Ví dụ COMPANY |
|---:|---|---|---|---:|---|
| 1 | Relational Data Model | Mô hình quan hệ | Bảng 2 chiều, dựa set theory | 5, 6 | EMPLOYEE, DEPARTMENT là relations |
| 2 | Relation | Quan hệ | Bảng | 6 | EMPLOYEE |
| 3 | Relation Schema R(A₁,…,Aₙ) | Lược đồ quan hệ | Tên + danh sách attribute | 6 | `EMPLOYEE(Fname, …, Dno)` |
| 4 | Attribute | Thuộc tính | Cột | 6 | Salary, Ssn |
| 5 | Domain D / dom(Aᵢ) | Miền giá trị | Tập giá trị nguyên tử + ràng buộc | 7 | dom(Sex) = {'M', 'F'} |
| 6 | Degree | Bậc | Số attribute | 7 | Degree(EMPLOYEE) = 10 |
| 7 | Tuple | Bộ | Hàng | 8, 9 | 1 hàng employee |
| 8 | Cardinality | Lực lượng | Số tuple | 8 | #EMPLOYEE = 8 |
| 9 | Database Schema | Lược đồ CSDL | Tập relation schemas | 8, 19 | COMPANY = {EMPLOYEE, DEPT, …} |
| 10 | Relation r / Instance / State | Thể hiện | Bảng có data tại 1 thời điểm | 9 | Bảng EMPLOYEE hiện tại |
| 11 | NULL | Giá trị rỗng | Không có giá trị | 15 | EMPLOYEE.Super_ssn = NULL |
| 12 | Domain Constraint | Ràng buộc miền | Giá trị thuộc đúng domain | 14 | Sex ∈ {'M', 'F'} |
| 13 | Key Constraint | Ràng buộc khóa | Không có 2 tuple cùng key | 14, 16 | 2 employee không cùng Ssn |
| 14 | Superkey | Siêu khóa | Tập attr đảm bảo unique | 16 | {Ssn, Fname} |
| 15 | Key | Khóa | Superkey tối thiểu | 16 | {Ssn} |
| 16 | Candidate Key | Khóa ứng viên | Mọi key của relation | 17 | EMPLOYEE chỉ có 1 candidate {Ssn} |
| 17 | Primary Key (PK) | Khóa chính | Candidate key được chọn | 17 | EMPLOYEE.Ssn (gạch chân) |
| 18 | Secondary Key | Khóa phụ | Candidate không được chọn | 17 | Trường hợp CAR: {State, Reg#} |
| 19 | Entity Integrity | Toàn vẹn thực thể | PK ≠ NULL | 19 | Ssn không được NULL |
| 20 | Referential Integrity | Toàn vẹn tham chiếu | FK trỏ đến tuple tồn tại hoặc NULL | 20-22 | EMPLOYEE.Dno → DEPARTMENT.Dnumber |
| 21 | Foreign Key (FK) | Khóa ngoại | Attr tham chiếu PK bảng khác | 20 | EMPLOYEE.Dno |
| 22 | Referencing Relation | Quan hệ tham chiếu | Bảng chứa FK | 20 | EMPLOYEE chứa Dno |
| 23 | Referenced Relation | Quan hệ được tham chiếu | Bảng chứa PK | 20 | DEPARTMENT chứa Dnumber |
| 24 | Semantic Constraint | Ràng buộc ngữ nghĩa | Constraint không biểu diễn trực tiếp | 24 | Hours ≤ 56 / tuần |
| 25 | State Constraint | Ràng buộc trạng thái | Kiểm tra trạng thái hiện tại | 24 | Salary > 0 |
| 26 | Transition Constraint | Ràng buộc chuyển trạng thái | Kiểm tra chuyển | 24 | Salary chỉ tăng |
| 27 | INSERT/DELETE/MODIFY | Thêm/Xóa/Sửa | 3 thao tác cập nhật | 25 | INSERT INTO EMPLOYEE |
| 28 | REJECT/CASCADE/SET NULL | 3 actions vi phạm | Hủy / lan / NULL | 28 | ON DELETE CASCADE |
| 29 | Step 1: Regular Entity | Step entity mạnh | Entity → bảng | 39 | EMPLOYEE → bảng EMPLOYEE |
| 30 | Step 2: Weak Entity | Step entity yếu | Bảng + PK kết hợp | 43 | DEPENDENT(Essn, Dependent_name) |
| 31 | Step 3: Binary 1:1 | Step 1:1 | 3 approaches | 47-49 | MANAGES → DEPARTMENT.Mgr_ssn |
| 32 | Step 4: Binary 1:N | Step 1:N | FK ở N-side | 54 | WORKS_FOR → EMPLOYEE.Dno |
| 33 | Step 5: Binary M:N | Step M:N | Bảng riêng + 2 FK | 60 | WORKS_ON(Essn, Pno, Hours) |
| 34 | Step 6: Multivalued attr | Step thuộc tính đa trị | Bảng riêng | 67 | DEPT_LOCATIONS |
| 35 | Step 7: N-ary | Step n-ary | Bảng + n FK | 70 | SUPPLY(SNAME, PROJNAME, PARTNO) |
| 36 | Step 8: Specialization | Step chuyên biệt | 4 options | 77 | EMPLOYEE → SEC/TECH/ENG |
| 37 | Option 8A | — | Superclass + subclasses | 78, 79 | EMPLOYEE + 3 subclass |
| 38 | Option 8B | — | Subclass only | 78, 80 | CAR + TRUCK (no VEHICLE) |
| 39 | Option 8C | — | Single + type attr | 81, 82 | EMPLOYEE với JobType |
| 40 | Option 8D | — | Single + Boolean flags | 81, 83 | PART với MFlag, PFlag |
| 41 | Step 9: Union Type | Step kiểu hợp | Surrogate key | 87 | OWNER với Owner_id |
| 42 | Surrogate Key | Khóa thay thế | Key nhân tạo (auto-id) | 87 | OWNER.Owner_id |
| 43 | Recursive Relationship | Quan hệ đệ quy | Entity tham chiếu chính nó | 63 | EMPLOYEE.Super_ssn |
| 44 | Type / Discriminating Attribute | Thuộc tính phân loại | Cột chỉ ra subclass | 81 | EMPLOYEE.JobType |
| 45 | Composite Key | Khóa kết hợp | PK gồm nhiều attribute | 43, 60 | DEPENDENT PK = {Essn, Dependent_name} |

---

## 6. Tổng Kết — Những Điểm Khả Năng Cao Ra Thi

1. **Định nghĩa khái niệm**: relation, schema, tuple, attribute, domain, degree, cardinality.
2. **4 loại Integrity Constraints**: Domain, Key, Entity Integrity, Referential Integrity.
3. **Phân biệt Superkey, Candidate Key, Primary Key, Secondary Key, Foreign Key**.
4. **Entity Integrity**: PK ≠ NULL.
5. **Referential Integrity**: FK ∈ PK_referenced ∪ {NULL}.
6. **4 actions khi vi phạm**: REJECT, CASCADE, SET NULL, custom.
7. **🌟 Bảng tương ứng ER ↔ Relational** (slide 75) — học thuộc.
8. **9 Steps mapping** — đặc biệt:
   - Step 2: PK weak entity = `{owner_PK, partial_key}`.
   - Step 3 (1:1): 3 approaches, ưu tiên đặt FK ở phía total participation.
   - Step 4 (1:N): FK ở phía N.
   - Step 5 (M:N): bảng riêng, PK = `{K1, K2}`.
   - Step 6: multivalued → bảng riêng.
   - Step 7 (N-ary): note về cardinality 1.
   - Step 8: 4 options 8A/8B/8C/8D — chọn theo (disjoint vs overlap) × (total vs partial).
   - Step 9: surrogate key cho category với superclass khác key.
9. **Recursive relationship**: đổi tên prime attribute (Ssn → Super_ssn).
10. **🌟 Toàn bộ COMPANY mapping result** (§4) — 6 bảng + 8 FK.

---

## 7. Bảng Tra Nhanh (Quick Reference)

| Tình huống | Mapping rule | Kết quả |
|---|---|---|
| Regular entity với attribute đơn giản | Step 1 | Bảng riêng, PK = key của entity |
| Composite attribute | Step 1 | Tách thành simple components |
| Multivalued attribute | Step 6 | Bảng riêng, PK = {entity_PK, attr} |
| Derived attribute | Step 1 | **KHÔNG** lưu (tính khi cần) |
| Weak entity | Step 2 | Bảng + composite PK = {owner_PK, partial_key}, FK → owner |
| Binary 1:1, total một bên | Step 3 (FK approach) | FK ở bên total |
| Binary 1:1, total cả 2 | Step 3 (Merged) | Gộp 2 entity vào 1 bảng |
| Binary 1:1, optional cả 2 | Step 3 (Cross-ref) | Bảng R riêng |
| Binary 1:N | Step 4 | FK ở phía N |
| Binary 1:N, N-side hiếm tham gia | Step 4 (Rel relation) | Bảng riêng → tránh NULL |
| Binary M:N | Step 5 | Bảng riêng + composite PK + 2 FK |
| Recursive 1:1 (MARRY) | Step 5 + đổi tên | MARRY(Husband_id, Wife_id) |
| Recursive 1:N (SUPERVISE) | Step 4 + đổi tên | EMPLOYEE.Super_ssn |
| Recursive M:N (COMPRISE) | Step 5 + đổi tên | COMPRISE(Major_pno, Minor_pno) |
| N-ary (n>2) | Step 7 | Bảng + n FK |
| Specialization disjoint partial | Step 8 (8A/8C) | 8A: linh hoạt; 8C: gọn |
| Specialization disjoint total | Step 8 (8A/8B/8C) | 8B: bỏ superclass |
| Specialization overlapping | Step 8 (8A/8D) | 8D: Boolean flags |
| Shared subclass (cùng key) | Step 8 + multiple inheritance | Áp dụng 8A/B/C/D |
| Category với superclass khác key | Step 9 | Surrogate key |

---

## 8. Sai lầm thường gặp (Common Mistakes)

| # | Sai lầm | Tại sao sai | Cách đúng |
|---|---|---|---|
| 1 | Đặt FK 1:N ở phía 1 thay vì phía N | Phía 1 sẽ có nhiều giá trị (multivalued) → vi phạm 1NF | FK luôn ở phía **N**. Mỗi tuple bên N tham chiếu 1 tuple bên 1. |
| 2 | Mapping M:N bằng cách đặt FK ở 1 trong 2 bảng | Vi phạm 1NF (FK phải multivalued) hoặc mất quan hệ | Bắt buộc tạo **bảng quan hệ riêng** với composite PK. |
| 3 | Quên FK CASCADE cho weak entity | Khi xóa owner, weak entity không tự xóa → orphan tuples | `ON DELETE CASCADE` cho FK của weak entity. |
| 4 | Multivalued attribute để chung bảng (vd `Phone` là cột) | Vi phạm 1NF — 1 cell có nhiều giá trị | Tách thành **bảng riêng**, PK = {entity_PK, attr}. |
| 5 | Lẫn FK với PK | FK là tham chiếu, PK là định danh | EMPLOYEE.Ssn là PK; EMPLOYEE.Dno là FK. |
| 6 | Dùng option 8B cho overlapping specialization | Sẽ duplicate entity ở nhiều bảng | Overlapping → dùng **8D** (flags) hoặc **8A** (multi relations). |
| 7 | Dùng option 8C cho overlapping specialization | Type attribute đơn trị không biểu diễn được nhiều subclass | Overlapping → **8D** với Boolean flags. |
| 8 | Quên surrogate key cho category với superclass khác key | Không có natural key chung | Tạo `Owner_id` (auto-id) làm PK của category. |
| 9 | Composite attribute để chung 1 cột (vd `Name` thay vì `Fname/Minit/Lname`) | DBMS không truy vấn được component | Tách thành **simple component attributes**. |
| 10 | Lưu derived attribute (vd `Age`) | Phải update mỗi khi thời gian trôi → bất tiện | Lưu `Bdate`, tính `Age = today - Bdate` khi cần. |
| 11 | Không đổi tên attr trong recursive relationship | 2 vai trò không phân biệt được | Đổi tên: `Ssn` → `Super_ssn` cho FK self-reference. |
| 12 | PK của bảng N:M là 1 trong 2 FK | Có thể duplicate (cùng employee làm cùng project nhiều giờ) | PK **luôn** là composite `{K1, K2}`. |
| 13 | FK của weak entity dùng ON DELETE SET NULL | Weak entity không tồn tại nếu owner mất → SET NULL vô nghĩa | Dùng **ON DELETE CASCADE**. |
| 14 | Step 7 N-ary, dùng PK = {tất cả n FK} bất kể cardinality | Sai khi 1 trong n entity có cardinality 1 | Bỏ FK đó ra khỏi PK (slide 71-74). |
| 15 | Mapping shared subclass mà superclass có key khác nhau | Không có key chung → không thể tham chiếu | Phải dùng **category + surrogate key**, không phải shared subclass. |

---

## 9. Bài tập tự luyện có lời giải

### Bài 1 (dễ — Step 1+2)

**Đề:** Cho ER:
- `STUDENT(Sid, Name, Class)` — entity mạnh
- `THESIS(Title, Year, Grade)` — weak entity, owner = STUDENT, partial key = Title

Vẽ relational schema sau Step 1 + Step 2.

<details><summary>Lời giải</summary>

```
STUDENT(Sid, Name, Class)         PK = Sid

THESIS(Sid, Title, Year, Grade)   PK = {Sid, Title}
                                  FK Sid → STUDENT.Sid (ON DELETE CASCADE)
```
</details>

### Bài 2 (trung bình — Step 4 + Step 6)

**Đề:** Cho ER:
- `DEPARTMENT(Dno, Dname, Locations[multivalued])` — DEPARTMENT có nhiều địa điểm
- `EMPLOYEE(Eid, Name)` — entity mạnh
- 1 EMPLOYEE thuộc 1 DEPARTMENT (relationship `WORKS_FOR`, 1:N)

Vẽ relational schema đầy đủ.

<details><summary>Lời giải</summary>

```
DEPARTMENT(Dno, Dname)            PK = Dno   (Step 1)

DEPT_LOCATIONS(Dno, Location)     PK = {Dno, Location}   (Step 6)
                                  FK Dno → DEPARTMENT.Dno

EMPLOYEE(Eid, Name, Dno)          PK = Eid   (Step 1 + Step 4)
                                  FK Dno → DEPARTMENT.Dno
```

**Giải thích:**
- DEPARTMENT có Locations multivalued → tách thành DEPT_LOCATIONS (Step 6).
- WORKS_FOR là 1:N (DEPARTMENT 1 — EMPLOYEE N) → FK Dno đặt ở EMPLOYEE (phía N) (Step 4).
</details>

### Bài 3 (trung bình — Step 5 với recursive)

**Đề:** Cho ER:
- `PART(PartNo, Name)` — entity mạnh
- Recursive M:N relationship `COMPRISE(Quantity)` trên PART (1 part có nhiều part con, 1 part con thuộc nhiều part)

Vẽ relational schema.

<details><summary>Lời giải</summary>

```
PART(PartNo, Name)              PK = PartNo

COMPRISE(MajorPart, MinorPart, Quantity)
                                PK = {MajorPart, MinorPart}
                                FK MajorPart → PART.PartNo
                                FK MinorPart → PART.PartNo
```

**Giải thích:**
- M:N → bảng riêng (Step 5).
- Recursive → đổi tên `PartNo` thành `MajorPart` và `MinorPart` để phân biệt 2 vai trò (Step 5 + slide 63-65).
</details>

### Bài 4 (khó — Step 8)

**Đề:** Cho EER:
- `EMPLOYEE(Ssn, Name, Salary)` — superclass
- Specialization `{TEACHER, ADMIN}` — disjoint, partial. Có nhân viên không phải teacher cũng không phải admin.
  - `TEACHER(SubjectArea)`
  - `ADMIN(OfficeNum)`

Vẽ relational schema theo cả **2 options** phù hợp. Giải thích vì sao không dùng các options còn lại.

<details><summary>Lời giải</summary>

**Vì là disjoint + partial:**
- ✅ **Option 8A** (linh hoạt, hỗ trợ partial)
- ✅ **Option 8C** (single relation với type attribute, hỗ trợ disjoint + partial)
- ❌ Option 8B: chỉ dùng cho **total** — không phù hợp.
- ❌ Option 8D: dùng cho overlapping — overkill cho disjoint.

**Option 8A:**
```
EMPLOYEE(Ssn, Name, Salary, JobType)
TEACHER(Ssn, SubjectArea)         FK Ssn → EMPLOYEE.Ssn
ADMIN(Ssn, OfficeNum)             FK Ssn → EMPLOYEE.Ssn
```

**Option 8C:**
```
EMPLOYEE(Ssn, Name, Salary, JobType, SubjectArea, OfficeNum)
```
- `JobType ∈ {'Teacher', 'Admin', NULL}`.
- Nhân viên không phải teacher/admin → JobType = NULL, SubjectArea & OfficeNum đều NULL.
- Teacher → SubjectArea có giá trị, OfficeNum NULL.
- Admin → OfficeNum có giá trị, SubjectArea NULL.

**So sánh:** 8A: 3 bảng, ít NULL, nhiều JOIN khi truy vấn. 8C: 1 bảng, nhiều NULL, truy vấn đơn giản.
</details>

### Bài 5 (khó — Step 9 với surrogate key)

**Đề:** Cho EER:
- 3 superclass: `INDIVIDUAL(Cmnd)`, `BUSINESS(Tax_id)`, `FOREIGNER(Passport)` — key khác nhau.
- Category `CUSTOMER` = INDIVIDUAL ∪ BUSINESS ∪ FOREIGNER.
- Relationship `BUYS` (M:N) giữa CUSTOMER và `PRODUCT(Pid, Pname)`.

Vẽ relational schema.

<details><summary>Lời giải</summary>

```
INDIVIDUAL(Cmnd, Name, Customer_id)
                       ↑ FK → CUSTOMER.Customer_id
BUSINESS(Tax_id, BName, Customer_id)
                        ↑ FK → CUSTOMER.Customer_id
FOREIGNER(Passport, Country, Customer_id)
                            ↑ FK → CUSTOMER.Customer_id

CUSTOMER(Customer_id)   ← surrogate key (auto-id)

PRODUCT(Pid, Pname)

BUYS(Customer_id, Pid, Date, Quantity)
       PK = {Customer_id, Pid}
       FK Customer_id → CUSTOMER.Customer_id
       FK Pid → PRODUCT.Pid
```

**Giải thích:**
- 3 superclass có key khác nhau (Cmnd vs Tax_id vs Passport) → cần **surrogate key** `Customer_id` cho CUSTOMER (Step 9 — slide 87).
- Mỗi superclass thêm cột `Customer_id` để link lên CUSTOMER.
- BUYS là M:N → bảng riêng với PK composite (Step 5).
</details>

---

## 10. Câu Hỏi Ôn Tập (từ slide gốc + đề cương)

PDF chương 4 không có exercise riêng. Câu hỏi tự luận điển hình:

1. Phân biệt Schema và Instance qua 1 ví dụ trên COMPANY.
2. Giải thích Entity Integrity và Referential Integrity. Cho ví dụ vi phạm mỗi loại.
3. Cho relation `CAR(State, Reg#, SerialNo, Make, Model, Year)`. Liệt kê 3 superkey và 2 candidate key.
4. Khi xóa 1 row trong DEPARTMENT có FK tham chiếu từ EMPLOYEE, có thể chọn action nào? Giải thích.
5. **(Quan trọng — y format thi)** Cho ER diagram COMPANY, áp dụng 9 step để vẽ relational schema kết quả.
6. **(Quan trọng)** Cho specialization {SECRETARY, ENGINEER, TECHNICIAN} disjoint partial của EMPLOYEE. Vẽ relational schema theo cả 4 options 8A, 8B, 8C, 8D. So sánh ưu nhược điểm.
7. **(Quan trọng)** Cho category OWNER = PERSON ∪ BANK ∪ COMPANY (key khác nhau). Vẽ relational schema, giải thích vì sao cần surrogate key.
8. Cho recursive 1:N SUPERVISION trên EMPLOYEE. Mapping thành relation thế nào?

---

## 11. Đáp án Tự kiểm tra

### §1 (câu 1-6)

**1.** STUDENT(Name, Ssn, Phone, GPA): `Degree = 4`. `dom(GPA)` tùy thang điểm, vd `{x ∈ ℝ | 0.0 ≤ x ≤ 4.0}` (thang Mỹ) hoặc `{x | 0 ≤ x ≤ 10}` (thang VN).

**2.** **Superkey** = bất kỳ tập attribute đảm bảo unique (có thể có thừa). **Candidate Key** = superkey tối thiểu. **Primary Key** = candidate key được chọn để gạch chân.

**3.** Nếu chọn {State, Reg#} làm PK, {SerialNo} là **Secondary Key**.

**4.** Entity Integrity: `t[PK] ≠ NULL` ∀ tuple t. Quan trọng vì PK dùng để định danh — NULL = "không biết là ai" = vô nghĩa.

**5.** **CÓ** thể NULL (slide 22 case 2). Khi nhân viên là sếp cao nhất (CEO), không có ai supervise → Super_ssn = NULL. Hợp lệ vì Super_ssn không phải part of PK.

**6.** 4 options: **REJECT** (hủy), **CASCADE** (xóa luôn EMPLOYEE), **SET NULL** (đặt EMPLOYEE.DNO = NULL), **custom routine**.

### §3 (câu 7-14)

**7.** **Step 1** (regular entity): PK = key của entity (1 attribute hoặc composite). **Step 2** (weak entity): PK = `{owner_PK, partial_key}` — composite, kết hợp với owner.

**8.** Trong COMPANY, mỗi DEPARTMENT **bắt buộc** có 1 manager (total participation phía DEPARTMENT). Slide 47 nói: *"better to choose total participation"* → đặt FK ở DEPARTMENT (DEPARTMENT.MgrSsn → EMPLOYEE.Ssn).

**9.** Vì M:N có thể có nhiều quan hệ giữa cùng cặp (E1, E2). Nếu đặt FK trong E1 hoặc E2, FK đó phải multivalued — vi phạm 1NF. → **Bắt buộc** tách thành bảng riêng có PK composite {K1, K2}.

**10.** Multivalued `Locations` của DEPARTMENT → bảng riêng `DEPT_LOCATIONS(Dnumber, Dlocation)` với PK = {Dnumber, Dlocation}, FK Dnumber → DEPARTMENT.Dnumber.

**11.** FK gọi là `Super_ssn` (đổi tên từ `Ssn`). Đổi tên vì cùng tham chiếu đến EMPLOYEE.Ssn nhưng đại diện cho **role khác** (sếp).

**12.** 4 options:
- **8A** (Multiple — superclass + subclasses): linh hoạt, mọi case.
- **8B** (Subclass only): total + disjoint; bỏ superclass.
- **8C** (Single + type attribute): disjoint, có cột type chỉ subclass.
- **8D** (Single + Boolean flags): overlapping.

**13.** PART → {MANUFACTURED, PURCHASED} **overlapping** → dùng **8D** (Boolean flags MFlag, PFlag) hoặc **8A** (3 bảng riêng). Không dùng 8B (overlap → duplicate); không dùng 8C (overlap không biểu diễn bằng 1 type attr đơn trị).

**14.** Khi superclass của category có **key khác nhau** (vd PERSON.Ssn vs BANK.BName vs COMPANY.CName) — không thể chọn key của bất kỳ superclass nào làm PK của category. → Tạo surrogate key mới (vd `Owner_id`), mỗi superclass thêm column FK Owner_id.

---

## 12. Mối Quan Hệ Với Các Chương Khác — Liên kết Lab/BTL

| Chương | Liên hệ với chương 4 |
|---|---|
| **Chương 1 — Architecture** | Phần "Logical Design" trong 3-Schema. |
| **Chương 2 — ER Model** | **Input** của chương 4. Step 1-7 mapping ER. |
| **Chương 3 — EER Model** | Step 8-9 mapping EER. |
| **Chương 5 — Relational Algebra** | Truy vấn trên relational schema được tạo từ chương 4. |
| **Chương 6 — SQL** | `CREATE TABLE` với PK, FK, constraint = **cài đặt thực tế** relational schema. `ON DELETE CASCADE/SET NULL` = slide 28. |
| **Chương 7 — FD & Normalization** | Sau khi mapping, kiểm tra schema có đúng 3NF/BCNF không. |
| **Chương 8 — Storage & Indexing** | Physical Design — sau Logical Design. |

| Hoạt động | Liên hệ |
|---|---|
| **BTL1** (`BTL1_DB_Lab/`) | **Đề bài chính**: cho miniworld, vẽ ER/EER → mapping sang relational schema (chương 4) → SQL. **Chương 4 là quan trọng nhất cho BTL1.** |
| **BTL2** (`BTL2_DB_Lab/`) | Cài đặt thực tế trên DBMS với toàn bộ FK constraint. |
| **Lab 1, 2** | Tập viết SQL cho schema được mapping theo chương 4. |

---

## 13. Phụ lục — Mapping 90 slide → Section

| Slide | Nội dung | Section |
|---:|---|---|
| 1 | Chapter title | Header |
| 2, 3, 29, 36, 89 | Outline (5 slide) | §0.4 |
| 4 | Section overview Relational Data Model | §1.2 |
| 5 | Codd 1970 | §1.3 |
| 6 | Relational data model + Relation schema | §1.4 |
| 7 | Degree, Domain | §1.5 |
| 8 | Tuple, Cardinality, Database schema (COMPANY) | §1.6 |
| 9 | Relation r, n-tuples | §1.7 |
| 10 | 6 key concepts review | §1.8 |
| 11 | Relation as table — 4 properties | §1.9 |
| 12 | STUDENT example | §1.10 |
| 13 | Formal vs Informal terms | §1.11 |
| 14 | 4 integrity constraints overview | §1.12 |
| 15 | NULL value | §1.12 |
| 16 | Superkey + Key | §1.13 |
| 17 | CAR — candidate, primary, secondary | §1.13 |
| 18 | CAR with sample data | §1.13 |
| 19 | Entity Integrity + Database Schema | §1.14 |
| 20 | Referential Integrity definition | §1.15 |
| 21 | DEPARTMENT-EMPLOYEE FK example | §1.16 |
| 22 | FK can be NULL | §1.17 |
| 23 | COMPANY full referential integrity | §1.18 |
| 24 | Semantic / state / transition constraints | §1.19 |
| 25 | INSERT/DELETE/MODIFY overview | §1.20 |
| 26 | Insertion details | §1.20 |
| 27 | Deletion + Modification | §1.20 |
| 28 | Actions on integrity violation | §1.20 |
| 30 | 3 main phases | §2.2 |
| 31 | Database Design Process diagram | §2.3 |
| 32 | Logical Design highlighted | §2.3 |
| 33 | Logical = Mapping + Normalization | §2.4 |
| 34 | COMPANY ERD | §2.5 |
| 35 | Result mapping COMPANY | §2.5 |
| 37 | 9 steps overview | §3.1 |
| 38 | Step 1 highlighted | §3.1 |
| 39 | Step 1 — Regular Entity definition | §3.2 |
| 40 | COMPANY ERD with regular entities highlighted | §3.2 |
| 41 | EMPLOYEE/DEPARTMENT/PROJECT after Step 1 | §3.2 |
| 42 | Step 2 highlighted | §3.3 |
| 43 | Step 2 — Weak Entity rule | §3.3 |
| 44 | DEPENDENT in ER (Owner's PK + Partial key) | §3.3 |
| 45 | DEPENDENT after Step 2 | §3.3 |
| 46 | Step 3 highlighted | §3.4 |
| 47 | Step 3 — Foreign key approach | §3.4 |
| 48 | Step 3 — Merged relation approach | §3.4 |
| 49 | Step 3 — Cross-reference approach | §3.4 |
| 50 | Step 3 — combined diagram | §3.4 |
| 51 | MANAGES highlighted in COMPANY | §3.4 |
| 52 | DEPARTMENT after Step 3 (MgrSsn FK) | §3.4 |
| 53 | Step 4 highlighted | §3.5 |
| 54 | Step 4 — FK + relationship relation approaches | §3.5 |
| 55 | Step 4 diagrams | §3.5 |
| 56 | WORKS_FOR/CONTROLS/SUPERVISION highlighted | §3.5 |
| 57 | COMPANY after Step 4 | §3.5 |
| 58 | BORROWER-BOOK example | §3.5 |
| 59 | Step 5 highlighted | §3.6 |
| 60 | Step 5 — M:N rule | §3.6 |
| 61 | WORKS_ON highlighted | §3.6 |
| 62 | WORKS_ON after Step 5 | §3.6 |
| 63 | Recursive relationships overview | §3.6a |
| 64 | Example MARRY | §3.6a |
| 65 | Examples SUPERVISE + COMPRISE | §3.6a |
| 66 | Step 6 highlighted | §3.7 |
| 67 | Step 6 — Multivalued rule | §3.7 |
| 68 | DEPT_LOCATIONS in ER | §3.7 |
| 69 | COMPANY full mapping result | §3.7 + §4 |
| 70 | Step 7 — N-ary rule | §3.8 |
| 71 | SUPPLY ternary N:N:N | §3.8 |
| 72 | SUPPLY ternary 1:N:N | §3.8 |
| 73 | SUPPLY ternary 1:1:N | §3.8 |
| 74 | SUPPLY ternary 1:1:1 | §3.8 |
| 75 | ER ↔ Relational correspondence table | §3.9 |
| 76 | Step 8 highlighted | §3.10 |
| 77 | Step 8 — 4 options list | §3.10 |
| 78 | Option 8A + 8B detail | §3.10.1, §3.10.2 |
| 79 | Example 8A (EMPLOYEE) | §3.10.1 |
| 80 | Example 8B (VEHICLE→CAR/TRUCK) | §3.10.2 |
| 81 | Option 8C + 8D detail | §3.10.3, §3.10.4 |
| 82 | Example 8C (EMPLOYEE single) | §3.10.3 |
| 83 | Example 8D (PART with flags) | §3.10.4 |
| 84 | Shared subclass mapping | §3.10.6 |
| 85 | UNIVERSITY lattice | §3.10.6 |
| 86 | UNIVERSITY mapping result | §3.10.6 |
| 87 | Step 9 — Union + Surrogate key | §3.11 |
| 88 | OWNER mapping example | §3.11 |
| 90 | Q & A | (slide kết) |

---

## 14. Bảng so sánh nguồn (Prompt 3 audit table)

| Section / Nội dung | A (Claude pass1) | B (CO2013) | Nguồn được chọn |
|---|---|---|---|
| Cấu trúc | Concept-based | Slide-by-slide chi tiết | **B làm khung** + insight A |
| 4 options 8A/8B/8C/8D + decision matrix | **CÓ** đầy đủ với khi nào dùng | Có cơ bản | **A** decision matrix |
| Recursive (MARRY/SUPERVISE/COMPRISE) | 3 examples + code mapping | có | **A∪B** |
| §4 COMPANY full mapping result (PK + FK list) | KHÔNG | **CÓ** | **B** |
| 14 câu tự kiểm tra + đáp án chi tiết | **A** | có ít hơn | **A** |
| Analogy đời thường | 5 (CCCD, weak="đứa con không CCCD", surrogate=auto-id, …) | ít hơn | **A** |
| Bảng glossary cột COMPANY | KHÔNG (45 hàng) | KHÔNG | **mới sinh** với COMPANY |
| TH2 Bảng tra nhanh | Không | Không | **tự sinh** (20 tình huống) |
| TH3 Sai lầm thường gặp | Không | Không | **tự sinh** (15 sai lầm) |
| TH4 Bài tập có lời giải | Không | Không | **tự sinh** (5 bài) |
| Phụ lục 90 slide map | Không | Không | **tự sinh** |

---

## 15. Checklist tổng hợp cuối cùng

### ✅ Checklist nội dung

| Hạng mục | A | B | Bản tổng hợp | Yêu cầu |
|---|---:|---:|---:|---|
| Số section đánh số | 3 | 3 | 4 (thêm §4 COMPANY) | ≥ max | ✅ |
| Số diagram | 20+ | 20+ | 22+ | ≥ max | ✅ |
| Số ví dụ COMPANY/CAR/STUDENT/UNIVERSITY | 12 | 12 | 14 | ≥ max | ✅ |
| Số analogy đời thường | 5 | 3 | 5 | ≥ max | ✅ |
| Số đoạn SQL/code | 1 | 2 | 3 | ≥ max | ✅ |
| Số quy tắc mapping | 9 | 9 | 9 | ≥ max | ✅ |
| Số thuật ngữ glossary | 45 | 40+ | **45 + cột COMPANY** | ≥ max | ✅ vượt |
| Số câu tự kiểm tra | 14 | 12 | 14 | ≥ max | ✅ |
| Mapping 90 slide → section | 0 | 0 | 90 | bắt buộc có | ✅ |

### ✅ Checklist riêng cho TỰ HỌC

| Hạng mục | Đạt? |
|---|---|
| Có **0.1 Prerequisite** (bảng concept ER+EER) | ✅ |
| Có **0.2 Learning Outcomes** (8 outcome) | ✅ |
| Có **0.3 Lộ trình đọc** | ✅ |
| Có **§4 COMPANY full mapping result** (PK + FK list) | ✅ |
| Có **Bảng tra nhanh §7** (20 tình huống) | ✅ |
| Có **Sai lầm thường gặp §8** (15 sai lầm) | ✅ |
| Có **5 Bài tập có lời giải đầy đủ** (§9) | ✅ |
| Có **liên kết Lab/BTL** (§12) | ✅ |
| Mọi concept khó có analogy | ✅ |
| Mọi thuật ngữ lần đầu có VN | ✅ |
| Có **Đáp án Tự kiểm tra** (§11) | ✅ |
| Phụ lục mapping 90 slide → section (§13) | ✅ |
| **Tự đánh giá: SV mất gốc đọc sẽ hiểu được?** | ✅ |

---

> **File này là bản TỔNG HỢP CUỐI CÙNG** cho Chương 4, ghép từ 2 nguồn:
> 1. `_drafts/DB-Chapter4-claude-pass1.md` (bản A — Claude, sau Prompt 1)
> 2. `_drafts/ch4_relational_data_model_mapping_notes.md` (bản B — slide-by-slide chi tiết + COMPANY full result)
>
> Sau finalize, có thể xóa 2 file `_drafts/` (đã merge xong).
