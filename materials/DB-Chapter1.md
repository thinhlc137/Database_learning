D# Chương 1: Khái niệm và Kiến trúc Hệ Cơ Sở Dữ Liệu — *Database System Concepts and Architecture*

> **Nguồn**: CO2013 Database Systems, HCMUT — Khoa KH&KT Máy tính
> **Giảng viên phụ trách**: TS. Trần Minh Quang
> **Giáo trình**: Elmasri & Navathe, *Fundamentals of Database Systems*, 7th Edition (Chương 1, 2 phần đầu)
> **File PDF gốc**: `Lectures/01_Database System Concepts and Architecture.pdf`
> **Số slide trong PDF gốc**: **42 slide** (slide 1 = title, slide 41 = Summary, slide 42 = Q & A)
> **Slide "Outline" lặp lại**: slide **2, 3, 22, 31, 34, 38** (6 slide) — đã gộp thành **một** mục lục duy nhất ở §0.4.
> **Slide có diagram/ảnh**: slide **5, 6, 8, 12, 17, 20, 21, 24, 27, 30, 37, 39** — đã tái tạo bằng Mermaid hoặc ASCII art.
>
> **Mục tiêu của tài liệu này**: một sinh viên năm 2 ngành CNTT, **chưa từng học CSDL**, đọc một mạch là đủ hiểu chương 1, **không cần mở slide gốc**, không cần đọc Elmasri.

---

## 0. Trước khi bắt đầu

### 0.1. Bạn cần biết gì trước? (Prerequisite)

Chương 1 là chương "vào bài" — hầu như **không yêu cầu kiến thức CSDL trước đó**. Tuy nhiên bạn nên có vài khái niệm sau (lấy từ môn Lập trình cơ bản và HĐH):

| Khái niệm nền | Giải thích siêu ngắn (đủ để bắt nhịp) |
|---|---|
| **File (tập tin)** | Nơi lưu dữ liệu trên máy tính, ví dụ `.txt`, `.csv`, `.dat`, file Excel. Trước khi có DBMS, ứng dụng tự đọc/ghi file này. Mỗi file là 1 dãy byte, có "đường dẫn" và "định dạng" riêng. |
| **Struct / Class** (C/C++/Python) | Bạn đã từng khai báo `struct Student { int id; char name[50]; }`. Đây là cách "khai báo cấu trúc" trong code; chương 1 sẽ thấy ý tưởng tương tự cho dữ liệu trên đĩa. |
| **Application Program (chương trình ứng dụng)** | Phần mềm xử lý dữ liệu: nhập liệu, in báo cáo, tính lương, tính điểm. |
| **Data (dữ liệu)** | Sự kiện có thể ghi lại được, ví dụ MSSV, lương, ngày sinh, mã phòng ban. |
| **Mảng/Bản ghi (record)** | Một bảng gồm nhiều hàng; mỗi hàng là 1 record, mỗi cột là 1 field. |
| **User (người dùng)** | Người hoặc hệ thống cần đọc/ghi/sửa/tìm dữ liệu — có thể là nhân viên, quản trị viên, lập trình viên, hoặc một hệ thống khác. |

> 💡 **Hiểu đơn giản:** Chương 1 trả lời 2 câu hỏi gốc:
> 1. *Vì sao không nên dùng file Excel/text để quản lý dữ liệu công ty?*
> 2. *Hệ CSDL khác file Excel ở chỗ nào về kiến trúc?*
>
> Mọi khái niệm sau đó (DBMS, schema, view, data independence, …) đều mọc ra từ 2 câu hỏi này.

### 0.2. Sau chương này bạn sẽ làm được gì? (Learning Outcomes)

Trích từ đề cương CO2013 (mục L.O.1) — sau chương này bạn cần:

1. **Phân biệt** *File-based Approach* và *Database Approach* qua ≥ 4 tiêu chí.
2. **Giải thích** được các vấn đề của file-based: *Data Redundancy, Data Inconsistency, Rigid data structure, Physical data dependency, No Concurrency Control*.
3. **Định nghĩa** chuẩn xác: *Data, Database, Metadata, DBMS, Database System*.
4. **Nhận biết** các thành phần chính của DBMS qua sơ đồ slide 17.
5. **Vẽ và giải thích** *Three-Schema Architecture* (External / Conceptual / Internal).
6. **Phân biệt** *Logical Data Independence* vs *Physical Data Independence* và cho ví dụ mỗi loại.
7. **Phân biệt** DDL / DML / DCL; *Procedural* vs *Non-Procedural DML*; *4GLs*.
8. **Phân biệt** *Data Model*, *Database Schema*, *Schema Diagram*, *Database State/Snapshot*.
9. **Nhìn được bức tranh tổng quan** *Data Management Systems Framework* và các hướng mở rộng DBMS hiện đại.

### 0.3. Lộ trình đọc đề xuất

| TT | Phần | Mức độ | Thời gian | Ghi chú |
|---:|---|---|---:|---|
| 1 | §1 File-based vs Database Approach | **CORE** | 45–60 phút | Hay ra trắc nghiệm + tự luận so sánh. |
| 2 | §2 Three-Schema Architecture & Data Independence | **CORE** | 50–60 phút | **Khó nhất chương** — cần đọc kỹ analogy. |
| 3 | §3 Database Languages | **CORE** | 20–25 phút | Ngắn, dễ. Nền cho Chương 6 (SQL). |
| 4 | §4 Data Models, Schema, State | **CORE** | 25–30 phút | Phân biệt 3 khái niệm dễ nhầm. |
| 5 | §5 Data Management Systems Framework | **NÂNG CAO** | 15 phút | Đọc lướt khi học lần đầu, quay lại sau. |

**Tổng:** ~150 phút đọc lần đầu, ~40 phút ôn lại trước thi.

### 0.4. Outline chương (gộp 6 slide Outline lặp lại)

Slide 2, 3, 22, 31, 34, 38 đều lặp cùng outline (chỉ highlight section sắp vào). Đã gộp:

> **Outline**
> 1. File-based Approach and Database Approach
> 2. Three-Schema Architecture and Data Independence
> 3. Database Languages
> 4. Data Models, Database Schema, Database State
> 5. Data Management Systems Framework

---

## 1. File-based Approach và Database Approach

### 1.1. Tại sao có concept này? (Motivation)

Trước khi có DBMS, cách "tự nhiên" để lưu dữ liệu là: mỗi ứng dụng tự tạo file riêng, tự định nghĩa cấu trúc trong code, tự đọc/ghi. Phòng Sales có file khách riêng, phòng Contracts cũng có file khách riêng. Cách này dễ làm khi nhỏ — nhưng khi tổ chức lớn, dữ liệu bị **lặp**, **lệch phiên bản**, **khó sửa cấu trúc**, **khó cho nhiều người dùng cùng lúc**. Database Approach ra đời để **tách dữ liệu khỏi chương trình** và đặt dữ liệu dưới sự quản lý tập trung của DBMS.

> 💡 **Hiểu đơn giản:** File-based Approach giống mỗi phòng ban tự giữ một cuốn sổ Excel riêng. Database Approach giống cả công ty dùng một hệ thống chung, có người quản trị, có luật kiểm tra, có quyền truy cập, có cách chống sửa đụng nhau.

### 1.2. Slide 4 — File-based Approach: định nghĩa

**Nội dung slide gốc** (đầy đủ 2 bullet):

- *Data is stored in one or more separate computer files.*
  → Dữ liệu được lưu trong một hoặc nhiều file riêng biệt.
- *Data is then processed by computer programs - applications.*
  → Dữ liệu được xử lý bởi các chương trình ứng dụng.

**Đặc trưng ngầm chứa trong 2 bullet này** (cực quan trọng): mỗi application **tự định nghĩa cấu trúc file riêng**, định nghĩa đó **bị đóng cứng trong code chương trình** (xem slide 5).

| Thuật ngữ (EN) | Tiếng Việt | Định nghĩa đầy đủ |
|---|---|---|
| File-based Approach | Cách tiếp cận dựa trên tập tin | Cách tổ chức trong đó dữ liệu lưu trong các file máy tính riêng biệt; chương trình ứng dụng tự đọc, ghi, xử lý các file này. |
| Computer file | Tập tin máy tính | Đơn vị lưu trữ trên hệ thống file (text, binary, CSV, Excel, …). |
| Application program | Chương trình ứng dụng | Phần mềm xử lý dữ liệu cho một nghiệp vụ cụ thể. |

### 1.3. Slide 5 — Diagram File-based: Sales vs Contracts (DreamHome)

> 📊 **Hình 1.1 — File-based Approach (slide 5):**
> ```mermaid
> flowchart LR
>   Sales[Sales user] <--> SalesApp[Sales application programs<br/>• Data entry & reports<br/>• File handling routines<br/>• File definition]
>   SalesApp <--> SalesFiles[(Sales files)]
>   Contracts[Contracts user] <--> ContractsApp[Contracts application programs<br/>• Data entry & reports<br/>• File handling routines<br/>• File definition]
>   ContractsApp <--> ContractsFiles[(Contracts files)]
> ```

**Sales Files schema** (slide ghi rõ):

| File | Thuộc tính trong file |
|---|---|
| `PropertyForRent` | `propertyNo, street, city, postcode, type, rooms, rent, ownerNo` |
| `PrivateOwner` | `ownerNo, fName, lName, address, telNo` |
| `Client` | `clientNo, fName, lName, address, telNo, prefType, maxRent` |

**Contracts Files schema**:

| File | Thuộc tính trong file |
|---|---|
| `Lease` | `leaseNo, propertyNo, clientNo, rent, paymentMethod, deposit, paid, rentStart, rentFinish, duration` |
| `PropertyForRent` | `propertyNo, street, city, postcode, rent` |
| `Client` | `clientNo, fName, lName, address, telNo` |

> 📊 **Đọc diagram này thế nào:**
> - Hai nhóm user (Sales & Contracts) có **chương trình riêng**, **file riêng**.
> - Trong mỗi app, "File definition" (cấu trúc file) **nằm chung khối với code** — không tách ra catalog.
> - **Đáng chú ý:** schema `Client` và `PropertyForRent` xuất hiện ở **cả 2 nhóm** với **thuộc tính khác nhau**:
>   - `Client` ở Sales có thêm `prefType, maxRent`; ở Contracts thì không.
>   - `PropertyForRent` ở Sales có `type, rooms, ownerNo`; ở Contracts chỉ giữ `propertyNo, street, city, postcode, rent`.
> - Đây là minh họa trực quan cho **Data Redundancy** + **Data Inconsistency** mà slide 7 sẽ đặt tên chính thức.

### 1.4. Slide 6 — File-based với 4 application

> 📊 **Hình 1.2 — File-based với 4 application (slide 6):**
> ```mermaid
> flowchart LR
>   CO[Customer Orders] --> CF1[Customer File]
>   CO --> SF1[Stock File]
>   CO --> OF1[Order File]
>   CI[Customer Invoicing] --> CF2[Customer File]
>   CI --> SF2[Stock File]
>   CI --> OF2[Order File]
>   PO[Purchase Orders] --> SF3[Stock File]
>   PO --> SupF[Supplier File]
>   SC[Stock Control] --> SF4[Stock File]
>   SC --> OF3[Order File]
> ```

**Phân tích từng application:**

| Application | File được dùng | Ý nghĩa nghiệp vụ |
|---|---|---|
| Customer Orders | Customer File, Stock File, Order File | Nhận đơn hàng — biết khách là ai, hàng còn không, lưu đơn |
| Customer Invoicing | Customer File, Stock File, Order File | Xuất hóa đơn — cần thông tin khách + hàng + đơn |
| Purchase Orders | Stock File, Supplier File | Đặt hàng nhập kho |
| Stock Control | Stock File, Order File | Kiểm soát tồn kho |

> 📊 **Đọc diagram này thế nào:** `Customer File` xuất hiện ở 2 chỗ; `Stock File` xuất hiện ở 4 chỗ; `Order File` xuất hiện ở 3 chỗ. Mỗi app **giữ một bản copy riêng** → 1 customer đổi địa chỉ → phải vào 2 app sửa. Quên 1 chỗ = dữ liệu mâu thuẫn.

### 1.5. Slide 7 — Problems / Limitations

**Nội dung slide gốc:**

- File-based Approach
  - Problems / Limitations
    - **Data Redundancy** (dư thừa dữ liệu)
    - **Data Inconsistency** (không nhất quán dữ liệu)
    - More details: see [2]

| Thuật ngữ (EN) | Tiếng Việt | Định nghĩa |
|---|---|---|
| Data Redundancy | Dư thừa dữ liệu | Cùng một dữ liệu (hoặc tương đương) bị lưu lặp lại ở nhiều nơi. |
| Data Inconsistency | Không nhất quán dữ liệu | Các bản sao của cùng dữ liệu lệch nhau — không khớp. |

> 💡 **Hiểu đơn giản:** Redundancy giống bạn ghi cùng số điện thoại của bạn vào danh bạ Zalo, danh bạ máy, sổ tay, file Excel. Khi đổi số, bạn quên cập nhật sổ tay → hôm sau tra sổ tay gọi sai. Inconsistency là cái "gọi sai" đó.

> 💡 **Ví dụ với COMPANY:** Phòng nhân sự lưu nhân viên `Ssn=123456789` thuộc `Dno=5`. Phòng dự án lại lưu nhân viên đó thuộc `Dno=4`. Khi thống kê nhân viên mỗi phòng → kết quả sai.

### 1.6. Slide 8 — Diagram so sánh File-based vs Shared File

> 📊 **Hình 1.3a — File-based truyền thống (mỗi app file riêng):**
> ```mermaid
> flowchart LR
>   CO1[Customer Orders] --> CF1[Customer File]
>   CO1 --> SF1[Stock File]
>   CO1 --> OF1[Order File]
>   CI1[Customer Invoicing] --> CF2[Customer File]
>   CI1 --> SF2[Stock File]
>   CI1 --> OF2[Order File]
>   PO1[Purchase Orders] --> SF3[Stock File]
>   PO1 --> SupF1[Supplier File]
>   SC1[Stock Control] --> SF4[Stock File]
>   SC1 --> OF3[Order File]
> ```

> 📊 **Hình 1.3b — Shared File Approach (file dùng chung):**
> ```mermaid
> flowchart LR
>   CO2[Customer Orders] --> CF[Customer File]
>   CO2 --> SF[Stock File]
>   CO2 --> OF[Order File]
>   CI2[Customer Invoicing] --> CF
>   CI2 --> SF
>   CI2 --> OF
>   PO2[Purchase Orders] --> SF
>   PO2 --> SupF[Supplier File]
>   SC2[Stock Control] --> SF
>   SC2 --> OF
> ```

> 📊 **Đọc 2 diagram này thế nào:** Bên trái: nhiều file cùng tên xuất hiện ở nhiều nhóm app. Bên phải: 4 app cùng trỏ đến **một bộ file dùng chung** (`Customer File`, `Stock File`, `Order File`, `Supplier File`) — mỗi file chỉ còn 1 bản, hết redundancy nội dung.

### 1.7. Slide 9 — Shared File Approach: lợi ích

**Nội dung slide gốc:**

- *Data (files) is shared between different applications.*
- *Data redundancy problem **is alleviated**.* (giảm nhẹ — không hết hoàn toàn)
- *Data inconsistency problem across **different versions of the same file** is solved.*

Lưu ý: shared file **chưa phải Database Approach hoàn chỉnh** — nó vẫn là file, vẫn phụ thuộc cấu trúc vật lý, thiếu metadata catalog, concurrency control, recovery, security, integrity constraints.

### 1.8. Slide 10 — Shared File Approach: 3 vấn đề còn lại

**Nội dung slide gốc:**

- **Rigid data structure**: *If applications have to share files, the file structure that suits one application might not suit another.*
- **Physical data dependency**: *If the structure of the data file needs to be changed in some way, this alteration will need to be reflected in all application programs that use that data file.*
- **No support of concurrency control**: *While a data file is being processed by one application, the file will not be available for other applications or for ad hoc queries.*

| Vấn đề | Giải thích | Ví dụ |
|---|---|---|
| **Rigid data structure** | Cấu trúc file phù hợp app A có thể không hợp app B; cuối cùng dùng "trung dung" và không ai hài lòng. | HR cần `Bdate`, payroll cần `Salary`, project cần `Hours` — gộp tất cả vào 1 file `EMPLOYEE.txt` thì cồng kềnh. |
| **Physical data dependency** | Đổi cấu trúc file → tất cả app dùng file đó phải sửa code. | `EMPLOYEE.txt` ban đầu lưu `Ssn, Fname, Lname, Salary`; thêm cột `Dno` vào giữa → app cũ đọc nhầm `Dno` thành `Salary`. |
| **No concurrency control** | 1 app xử lý file → file bị "khóa", app khác không dùng được. | 2 nhân viên HR cùng mở file Excel rồi cùng sửa → người lưu sau ghi đè người lưu trước. |

> 💡 **Hiểu đơn giản:** Shared file giống nhà trọ chia phòng tắm chung — bớt chuyện mỗi đứa xây 1 phòng tắm riêng, nhưng giờ ai vào trước thì khóa cửa, người sau phải đợi. Phòng tắm đã xây rồi, ai muốn lắp thêm vòi sen phải dỡ cả lên.

> 📝 **Tóm lại §1.2–1.8 (File-based và Shared File):**
> - File-based truyền thống → **Redundancy + Inconsistency**.
> - Shared File → giảm redundancy, **nhưng vẫn còn** Rigid structure, Physical dependency, No concurrency.
> - Cội nguồn chung của 2 vấn đề: **definition cấu trúc data nằm trong code app, không tách ra**.
>
> **Một câu ghi nhớ:** *Khi data nằm trong file mà cấu trúc data nằm trong code, mỗi lần sửa data sẽ kéo theo sửa code — đó là cội nguồn của mọi bất tiện.*

### 1.9. Slide 11 — Database Approach: vì sao xuất hiện?

**Nội dung slide gốc:**

- **Arose because:**
  - *Definition of data was embedded in application programs, rather than being stored separately and independently.*
  - *No control over access and manipulation of data beyond that imposed by application programs.*
- **Result:** *The Database and Database Management System (DBMS).*

Database Approach giải bằng cách:
1. **Tách định nghĩa dữ liệu ra khỏi code**, lưu vào *system catalog (metadata)*.
2. **Đặt một lớp middleware giữa app và file gốc** — gọi là *DBMS*.
3. Mọi truy cập đều phải qua DBMS, không ai chọc thẳng vào file.

### 1.10. Slide 12 — Diagram Database Approach

> 📊 **Hình 1.4 — Database Approach (slide 12):**
> ```mermaid
> flowchart LR
>   Sales[Sales user] <--> SalesApp[Sales application programs<br/>Data entry & reports]
>   Contracts[Contracts user] <--> ContractsApp[Contracts application programs<br/>Data entry & reports]
>   subgraph DatabaseSystem["Database system"]
>     SalesApp --> DBMS[(DBMS)]
>     ContractsApp --> DBMS
>     DBMS <--> DB[(Database<br/>PropertyForRent, PrivateOwner,<br/>Client, Lease<br/>+ File definitions)]
>   end
> ```

**Schema trong slide 12** (chung cho cả Sales lẫn Contracts):

| Relation | Thuộc tính |
|---|---|
| `PropertyForRent` | `propertyNo, street, city, postcode, type, rooms, rent, ownerNo` |
| `PrivateOwner` | `ownerNo, fName, lName, address, telNo` |
| `Client` | `clientNo, fName, lName, address, telNo, prefType, maxRent` |
| `Lease` | `leaseNo, propertyNo, clientNo, rent, paymentMethod, deposit, paid, rentStart, rentFinish` |

> 📊 **Đọc diagram này thế nào:**
> - Mọi truy vấn từ app phải đi qua **DBMS**, không app nào chạm trực tiếp vào "Database".
> - "Database" chứa cả **dữ liệu thật** (`PropertyForRent`, `Client`, …) **lẫn định nghĩa cấu trúc** (file definitions). Đây là điểm khác biệt cốt lõi vs file-based.

**So sánh ngắn:**

| File-based Approach | Database Approach |
|---|---|
| Application có file riêng hoặc truy cập file trực tiếp. | Application truy cập dữ liệu **qua DBMS**. |
| File definition nằm trong code application. | Định nghĩa dữ liệu lưu trong **system catalog**. |
| Kiểm soát quyền/ràng buộc/đồng thời/phục hồi do từng app tự lo. | DBMS cung cấp cơ chế **tập trung**. |
| Dễ dư thừa và không nhất quán. | Dữ liệu chia sẻ **có kiểm soát**. |

### 1.11. Slide 13 — Định nghĩa Data và Database

**Nội dung slide gốc:**

- **Data**
  - *Known facts that can be recorded and that have **implicit meaning**.*
  - Information? Knowledge?
  - More: www.whatis.com
- **Database**: *Shared collection of logically related data and a description of this data, designed to meet the **information needs** of an organization.*

Phân biệt nhanh:

| Khái niệm | Đặc trưng | Ví dụ |
|---|---|---|
| **Data** | Sự kiện thô | `38°C`, `Lan`, `123-45` |
| **Information** | Data có ngữ cảnh | "Nhiệt độ Sài Gòn hôm nay 38°C" |
| **Knowledge** | Information đã đúc kết thành quy luật | "Sài Gòn tháng 4 thường > 35°C → mặc đồ mỏng" |

**Phân tích định nghĩa Database:**
- *"shared"* → nhiều user/app cùng dùng được.
- *"logically related"* → không gom lung tung; phải có quan hệ logic.
- *"description of this data"* → cấu trúc dữ liệu cũng nằm trong DB (metadata).
- *"information needs of an organization"* → DB tồn tại vì nhu cầu tổ chức, không phải để demo.

> 💡 **Ví dụ với COMPANY:**
> - Data: `Ssn = 123456789`, `Dno = 5`, `Salary = 30000`.
> - Information: Nhân viên có Ssn `123456789` thuộc phòng ban số 5, lương 30000.
> - Knowledge: Phòng 5 có lương trung bình thấp hơn → cần xem lại chính sách lương.

### 1.12. Slide 14 — System Catalog, Logically Related Data, DBMS

**Nội dung slide gốc:**

- *System catalog (metadata) provides description of data to enable **program-data independence**.*
- *Logically related data comprises **entities, attributes, and relationships** of an organization's information.*
- **DataBase Management System (DBMS)**: *a general-purpose software system that facilitates the processes of **defining, constructing, manipulating, and sharing** databases among various users and applications (or a software system that enables users to define, create, maintain, and control access to the database).*

**5 chức năng chính của DBMS:**

| Chức năng | Ý nghĩa |
|---|---|
| **Defining** | Định nghĩa schema, kiểu dữ liệu, ràng buộc (qua DDL). |
| **Constructing** | Tạo và đưa dữ liệu vào lưu trữ. |
| **Manipulating** | Truy vấn, thêm, xóa, sửa (qua DML). |
| **Sharing** | Nhiều user/app cùng dùng dữ liệu. |
| **Control access** | Bảo trì, phân quyền, kiểm soát truy cập. |

**3 thành phần của "logically related data"** (chương 2 sẽ dạy chi tiết):

- **Entities** (thực thể) — đối tượng cần lưu, ví dụ `EMPLOYEE`, `DEPARTMENT`, `PROJECT`.
- **Attributes** (thuộc tính) — đặc điểm của entity, ví dụ `Fname`, `Salary`.
- **Relationships** (mối liên kết) — quan hệ giữa entity, ví dụ employee *works for* department.

> 💡 **Hiểu đơn giản:** Hình dung DB như **kho chung** của công ty, DBMS là **thủ kho**. Người ta không tự ý vào kho lấy hàng — phải qua thủ kho. Anh ta biết hàng nào ở đâu (catalog), kiểm tra giấy tờ (security), tránh 2 người lấy cùng món (concurrency), và nếu sập đèn anh ta nhớ cách phục hồi (recovery).

> 💡 **Ví dụ DBMS thật:** MySQL, PostgreSQL, Oracle Database, SQL Server, SQLite. File Excel **không phải DBMS** — Excel không có catalog, ràng buộc, transaction, concurrency, recovery theo nghĩa đầy đủ.

### 1.13. Slide 15 — DDL, DML, Controlled Access, Database System

**Nội dung slide gốc:**

- **Data Definition Language (DDL)**
  - *Permits specification of data types, structures and any data constraints to be stored in the database.*
  - *All specifications are stored in the database.* (chính là system catalog)
- **Data manipulation language (DML)**
  - *Query language: retrieve (query), update (insert, delete, modify).*
- **Controlled access** to database may include:
  - **a security system** — phân quyền
  - **an integrity system** — đảm bảo dữ liệu hợp lệ
  - **a concurrency control system** — kiểm soát truy cập đồng thời
  - **a recovery control system** — khôi phục khi crash
  - **a user-accessible catalog** — cho user tra cứu metadata
- **Database System = the Database + DBMS software.**

```sql
-- Ví dụ minh họa DDL (không có trong slide 15 — mở rộng để học):
CREATE TABLE DEPARTMENT (
    Dnumber INT PRIMARY KEY,
    Dname VARCHAR(15) UNIQUE NOT NULL,
    Mgr_ssn CHAR(9),
    Mgr_start_date DATE
);
```

```sql
-- Ví dụ minh họa DML:
SELECT Dnumber, Dname
FROM DEPARTMENT
WHERE Dname = 'Research';
```

> 💡 **Hiểu đơn giản (controlled access):** DBMS giống thư viện có thủ thư. Không chỉ giữ sách, thủ thư còn kiểm tra ai được mượn (security), sách có hợp lệ không (integrity), 2 người không mượn cùng 1 bản sao (concurrency), và nếu cháy mất sổ thì khôi phục được (recovery).

### 1.14. Slide 16 — Roles in the Database Environment

**Nội dung slide gốc** (4 vai trò):

- **Database Administrator (DBA)** *— responsible for:*
  - authorizing access to DB
  - coordinating & monitoring its use
  - acquiring software and hardware resources
  - security breach, poor response time
- **Database Designers** *— responsible for:*
  - identifying the data to be stored in DB
  - choosing appropriate structures to represent and store this data
- **Application Programmers**
- **End Users**
- *More details: see [1,2]-chapter 1*

| Role (EN) | Tiếng Việt | Trách nhiệm | Ví dụ trên COMPANY |
|---|---|---|---|
| **DBA** | Quản trị viên CSDL | Cấp quyền, giám sát, mua phần cứng/phần mềm, xử lý security breach + hiệu năng kém | Cấp quyền cho HR đọc bảng `EMPLOYEE` nhưng không xem `Salary` |
| **Database Designer** | Thiết kế viên CSDL | Xác định data nào lưu, chọn cấu trúc lưu trữ phù hợp | Quyết định `EMPLOYEE` có khóa chính `Ssn`, có FK `Dno` |
| **Application Programmer** | Lập trình viên ứng dụng | Viết app dùng DBMS | Viết API `GET /employees`, `POST /projects` |
| **End User** | Người dùng cuối | Tương tác qua giao diện app | Nhân viên HR nhập hồ sơ, nhân viên xem hồ sơ cá nhân |

> 💡 **Hiểu đơn giản (analogy "xây nhà"):** DBA = chủ tịch ban quản lý chung cư (cấp thẻ ra vào, giám sát bảo vệ, mua thang máy mới). Designer = kiến trúc sư vẽ bản thiết kế. App Programmer = thợ thi công nội thất từng căn. End User = cư dân.

### 1.15. Slide 17 — DBMS Components

> 📊 **Hình 1.5 — Các thành phần bên trong DBMS (slide 17):**
> ```mermaid
> flowchart TB
>   Programmers[Programmers<br/>Application programs] --> DML[DML preprocessor]
>   Users[Users<br/>Queries] --> QP[Query processor]
>   DBA[DBA<br/>Database schema] --> DDL[DDL compiler]
>   subgraph DBMSBox["DBMS"]
>     DML --> POC[Program object code]
>     POC --> DM[Database manager]
>     QP --> DM
>     DDL --> Dict[Dictionary manager]
>     DM <--> Dict
>   end
>   DM <--> FM[File manager]
>   FM <--> Access[Access methods]
>   Access <--> Buffers[System buffers]
>   Buffers <--> Storage[(Database and<br/>system catalog)]
> ```

**Giải thích từng thành phần:**

| Thành phần | Vai trò |
|---|---|
| **DML preprocessor** | Xử lý các lệnh DML nhúng trong app, chuyển để DBMS hiểu. |
| **Query processor** | Phân tích, tối ưu, thực thi query do user gửi. |
| **DDL compiler** | Biên dịch lệnh định nghĩa schema, cập nhật metadata. |
| **Program object code** | Mã đối tượng của app sau khi xử lý. |
| **Database manager** | Điều phối truy cập DB, kiểm tra quyền/ràng buộc cấp quản lý. |
| **Dictionary manager** | Quản lý dictionary/catalog chứa metadata. |
| **File manager** | Quản lý file vật lý trên bộ nhớ phụ. |
| **Access methods** | Phương pháp truy cập dữ liệu (scan, index access). |
| **System buffers** | Vùng đệm RAM trao đổi block giữa disk và DBMS. |
| **Database and system catalog** | Nơi chứa dữ liệu thật + metadata. |

> 📊 **Đọc diagram này thế nào:** 3 nguồn input (Programmer, User, DBA) đi qua 3 cửa nhận tương ứng (DML preprocessor, Query processor, DDL compiler). Tất cả nói chuyện với **Database manager** + **Dictionary manager**. Bên dưới là tầng OS thật (File manager, Access methods, System buffers) đọc/ghi xuống đĩa. **Không có mũi tên nào từ app/query trực tiếp xuống đĩa** — đây chính là cơ chế kiểm soát truy cập.

### 1.16. Slide 18 — 4 Đặc trưng của Database Approach

**Nội dung slide gốc** (slide cực hay ra trắc nghiệm):

- **Self-describing nature** of a database system
- **Insulation between programs and data, and data abstraction**
  - *Program-data independence + Program-operation independence = Data abstraction*
  - *A data model is a type of data abstraction*
- **Support of multiple views** of the data
- **Sharing of data** and multi-user transaction processing
- *Other advantages: see [1]-1.6*

| Đặc trưng | Ý nghĩa | Ví dụ |
|---|---|---|
| **1. Self-describing** | DB chứa cả data lẫn metadata mô tả data đó. | Mở DB lên là biết `EMPLOYEE` có cột nào, kiểu gì — không cần xem code app. |
| **2. Insulation + Data Abstraction** | Program-data independence + Program-operation independence. App không biết chi tiết lưu trữ. | App viết SQL không cần biết block disk. |
| **3. Multiple views** | Cùng 1 DB, mỗi nhóm user thấy 1 view khác. | HR thấy lương; Project Manager thấy giờ làm dự án; Employee chỉ thấy thông tin của mình. |
| **4. Sharing & multi-user transaction** | Nhiều user dùng cùng lúc, được kiểm soát bằng transaction. | Hai nhân viên HR cùng cập nhật → DBMS dùng locking & ACID để không phá nhau. |

> 💡 **Hiểu đơn giản (đặc trưng 1, "self-describing"):** Như ổ cứng có "header" mô tả format. Đem ổ cứng sang máy khác vẫn đọc được vì format nằm trong chính ổ. Ngược lại, file `.bin` của một game cũ — không có code game thì không ai đọc được.

> 💡 **Hiểu đơn giản (đặc trưng 4, "transaction"):** Transaction giống chuyển khoản ngân hàng — trừ tiền A và cộng tiền B phải xảy ra cùng nhau; lỗi giữa chừng → hủy cả 2.

### 1.17. Slide 19 — Lịch sử các thế hệ DBMS

**Nội dung slide gốc:**

- **History of database systems**
  - First generation: **Hierarchical and Network**
  - Second generation: **Relational**
  - Third generation: **Object-Relational, Object-Oriented**
- *Brief history of database applications: see [1]-section 1.7*

| Thế hệ | Mô hình | Đặc điểm | Ví dụ |
|---|---|---|---|
| **First** (1960s–70s) | Hierarchical, Network | Dạng cây/đồ thị; truy cập bằng con trỏ | IBM IMS (1968) |
| **Second** (từ 1970, Codd) | Relational | Dạng bảng; chủ đạo hiện nay | Oracle, MySQL, PostgreSQL, SQL Server |
| **Third** (1990s+) | Object-Relational, Object-Oriented | Hỗ trợ kiểu phức tạp (đa phương tiện, không gian) | PostgreSQL (extensions), Db4o |

### 1.18. Slide 20 — Network Model Schema (Elmasri Figure 2.8)

> 📊 **Hình 1.6 — Network Model Schema (slide 20):**
> ```mermaid
> flowchart TD
>   STUDENT[STUDENT]
>   COURSE[COURSE]
>   SECTION[SECTION]
>   PREREQ[PREREQUISITE]
>   GRADE[GRADE_REPORT]
>   STUDENT -- STUDENT_GRADES --> GRADE
>   COURSE -- COURSE_OFFERINGS --> SECTION
>   SECTION -- SECTION_GRADES --> GRADE
>   COURSE -- HAS_A --> PREREQ
>   PREREQ -- IS_A --> COURSE
> ```

> 📊 **Đọc diagram này thế nào:**
> - 5 record type: STUDENT, COURSE, SECTION, GRADE_REPORT, PREREQUISITE.
> - 5 "set" (mũi tên có tên): `STUDENT_GRADES`, `COURSE_OFFERINGS`, `SECTION_GRADES`, `IS_A`, `HAS_A`.
> - **Đặc điểm Network**: liên kết = con trỏ thực sự — duyệt DB bằng "đi theo mũi tên". Khác Relational dùng JOIN trên giá trị trùng.

> 💡 **Hiểu đơn giản:** Network model giống bản đồ đường đi: muốn tìm gì phải đi từ node nào sang node nào. Relational model giống bảng Excel có cột chung; ta dùng cột chung để JOIN.

### 1.19. Slide 21 — Relational Model Schema + Instance (Elmasri Figure 1.2)

Slide 21 hiển thị **dữ liệu thật** của 4 bảng — minh họa "cùng một database University, lần này theo Relational Model".

**Bảng COURSE:**

| Course_name | Course_number | Credit_hours | Department |
|---|---|---:|---|
| Intro to Computer Science | CS1310 | 4 | CS |
| Data Structures | CS3320 | 4 | CS |
| Discrete Mathematics | MATH2410 | 3 | MATH |
| Database | CS3380 | 3 | CS |

**Bảng SECTION:**

| Section_identifier | Course_number | Semester | Year | Instructor |
|---:|---|---|---:|---|
| 85 | MATH2410 | Fall | 04 | King |
| 92 | CS1310 | Fall | 04 | Anderson |
| 102 | CS3320 | Spring | 05 | Knuth |
| 112 | MATH2410 | Fall | 05 | Chang |
| 119 | CS1310 | Fall | 05 | Anderson |
| 135 | CS3380 | Fall | 05 | Stone |

**Bảng GRADE_REPORT:**

| Student_number | Section_identifier | Grade |
|---:|---:|---|
| 17 | 112 | B |
| 17 | 119 | C |
| 8 | 85 | A |
| 8 | 92 | A |
| 8 | 102 | B |
| 8 | 135 | A |

**Bảng PREREQUISITE:**

| Course_number | Prerequisite_number |
|---|---|
| CS3380 | CS3320 |
| CS3380 | MATH2410 |
| CS3320 | CS1310 |

> 📊 **Ý nghĩa slide 21:** So với Network (slide 20) cần con trỏ vật lý, Relational chỉ cần các giá trị (Course_number, Section_identifier) "trỏ" nhau qua **giá trị trùng** giữa các bảng. Đây là nền của khái niệm **Foreign Key** sẽ học ở chương 4.

> 📝 **Tóm lại §1 (toàn section):**
> - File-based "đẻ ra" Database vì 2 lý do: data definition nhúng trong code, không kiểm soát được truy cập.
> - DBMS = phần mềm trung gian, đứng giữa app và data; cung cấp DDL/DML, security, integrity, concurrency, recovery, catalog.
> - 4 đặc trưng nhận diện Database Approach: *Self-describing, Insulation/Abstraction, Multiple views, Sharing & multi-user.*
> - 4 vai trò: DBA, Designer, Application Programmer, End User.
> - 3 thế hệ DBMS: Hierarchical/Network → Relational → Object-Relational/OO.
>
> **Một câu ghi nhớ:** *Database Approach = tách dữ liệu ra khỏi chương trình, đặt một lớp DBMS ở giữa để chương trình không còn phải biết file nằm đâu hay format ra sao.*

> ❓ **Tự kiểm tra §1:**
> 1. Phân biệt Data Redundancy và Data Inconsistency. Cái nào là *nguyên nhân*, cái nào là *hậu quả*?
> 2. Shared File Approach giải quyết được vấn đề gì? Còn để lại vấn đề gì?
> 3. Trong slide 5, bảng `Client` xuất hiện ở Sales và Contracts với 2 schema khác nhau. Đây là minh họa cho khái niệm nào?
> 4. Liệt kê 4 đặc trưng của Database Approach. Đặc trưng nào là tiền đề trực tiếp cho data independence?
> 5. Phân biệt vai trò DBA và Database Designer. Ai làm gì khi công ty đổi từ Oracle sang PostgreSQL?
> 6. So sánh ngắn Network model (slide 20) và Relational model (slide 21).
> *(Đáp án ở §12 cuối chương.)*

---

## 2. Three-Schema Architecture và Data Independence

### 2.1. Tại sao có concept này? (Motivation)

Ở §1.8, "Physical data dependency" là vấn đề chí mạng của shared file: muốn đổi cấu trúc → phải sửa hàng trăm app. Trong công ty lớn 10 năm tuổi, điều đó **không khả thi**. Cần một kiến trúc cho phép **đổi tầng này mà không ảnh hưởng tầng khác** — đó là **Three-Schema Architecture** (do ANSI/SPARC đề xuất 1975), và "lợi thế cốt lõi" của nó là **Data Independence**.

> 💡 **Hiểu đơn giản:** Three-level architecture giống nhà hàng:
> - Khách nhìn **menu** (external view).
> - Bếp trưởng có **công thức chuẩn** (conceptual schema).
> - Kho/bếp có **cách sắp nguyên liệu thật** (internal schema).
> - Khách không cần biết kho xếp thịt ở ngăn nào; nếu kho đổi cách sắp, menu không cần đổi.

### 2.2. Slide 23 — Mục tiêu của Three-Schema Architecture

**Nội dung slide gốc** (5 mục tiêu):

1. *All users should be able to access **same data**.*
2. *Users should not need to know **physical** database storage details.*
3. *DBA should be able to change **database storage structures** without affecting the users' views.*
4. *Internal structure of database should be unaffected by changes to **physical aspects of storage**.*
5. *DBA should be able to change **conceptual structure** of database without affecting all users.*

5 mục tiêu này = định nghĩa của data independence — mỗi mục tiêu là 1 trường hợp cụ thể của "đổi 1 tầng, không ảnh hưởng tầng khác".

### 2.3. Slide 24 — Diagram Kiến trúc 3 mức

> 📊 **Hình 2.1 — Three-level architecture and data independence (slide 24):**
> ```mermaid
> flowchart TB
>   U1[User 1] --> V1[View 1]
>   U2[User 2] --> V2[View 2]
>   Un[User n] --> Vn[View n]
>   V1 --- ExtLevel[External level]
>   V2 --- ExtLevel
>   Vn --- ExtLevel
>   ExtLevel --> ConLevel[Conceptual level<br/>Conceptual schema]
>   ConLevel --> IntLevel[Internal level<br/>Internal schema]
>   IntLevel --> Phys[(Physical data<br/>organization<br/>Database)]
> ```

| Level | Tiếng Việt | Ai quan tâm? | Trả lời câu hỏi gì? |
|---|---|---|---|
| **External level** | Mức ngoài / mức khung nhìn | End users, application programmers | User này cần nhìn phần dữ liệu nào? |
| **Conceptual level** | Mức khái niệm / logic toàn cục | Database designers, DBA, developers | Toàn tổ chức lưu data gì và quan hệ ra sao? |
| **Internal level** | Mức trong / mức vật lý | DBA, DBMS engineers | Data lưu trên máy thế nào? File, index, block, pointer ra sao? |

> 📊 **Đọc diagram này thế nào:** 3 schema là **mô tả** về data, không phải data thật. Data thật ở "Physical data organization" dưới cùng.

### 2.4. Slide 25–26 — External / Conceptual / Internal Level

**Slide 25:**

- **External Level**
  - *Users' view of the database.*
  - *Describes that part of database that is **relevant to a particular user**.*
- **Conceptual Level**
  - *Community view of the database.*
  - *Describes what data is stored in database and **relationships among the data**.*

**Slide 26:**

- **Internal Level**
  - *Physical representation of the database on the computer.*
  - *Describes **how** the data is stored in the database.*

**Lưu ý:** Internal level vẫn là **schema** (mô tả), không phải bit thật trên đĩa. Tầng "bit thật" là *Physical data organization* — nằm ngoài 3 schema.

**Ví dụ trên COMPANY:**

| Level | Ví dụ |
|---|---|
| External level | HR view: `EMPLOYEE(Ssn, Fname, Lname, Bdate, Address, Dno)`. Payroll view: `EMPLOYEE(Ssn, Fname, Lname, Salary)`. Project Manager view: `WORKS_ON(Essn, Pno, Hours)`. |
| Conceptual level | Schema logic đầy đủ: EMPLOYEE, DEPARTMENT, PROJECT, WORKS_ON, DEPENDENT + các quan hệ. |
| Internal level | File `EMPLOYEE.dat` lưu heap; B+ tree index trên `Ssn`; block size 4KB; cluster theo `Dno`. |

### 2.5. Slide 27 — Ví dụ cụ thể 3 mức (STAFF)

> 📊 **Hình 2.2 — STAFF qua 3 tầng (slide 27):**
> ```
> External view 1                       External view 2
> ┌────┬──────┬──────┬─────┬───────┐    ┌────────┬──────┬─────────┐
> │sNo │fName │lName │ age │salary │    │staffNo │lName │branchNo │
> └────┴──────┴──────┴─────┴───────┘    └────────┴──────┴─────────┘
>          │                                       │
>          ▼                                       ▼
> Conceptual level
> ┌────────┬───────┬───────┬─────┬────────┬─────────┐
> │staffNo │ fName │ lName │ DOB │ salary │branchNo │
> └────────┴───────┴───────┴─────┴────────┴─────────┘
>          │
>          ▼
> Internal level (định nghĩa kiểu C):
> ```
> ```c
> struct STAFF {
>     int  staffNo;
>     int  branchNo;
>     char fName[15];
>     char lName[15];
>     struct date dateOfBirth;
>     float salary;
>     struct STAFF *next;        /* pointer to next Staff record */
> };
> index staffNo; index branchNo; /* define indexes for staff */
> ```

**Phân tích quan trọng:**
- **External view 1** thấy `age` — **không có** ở Conceptual; được **suy ra (derived)** từ `DOB` qua external/conceptual mapping. *Lý do lưu DOB chứ không lưu age:* age đổi mỗi sinh nhật, lưu DOB rồi tính `age = today - DOB`.
- **External view 2** chỉ thấy 3 cột tối giản — bỏ luôn `salary`.
- **Conceptual** lưu canonical: `staffNo, fName, lName, DOB, salary, branchNo`.
- **Internal** dùng C struct + 2 index trên `staffNo` và `branchNo`; có pointer `*next` (linked list).

> 💡 **Ví dụ với COMPANY:** Payroll view có `Salary`; Project Manager view không có `Salary`. Cả hai cùng lấy từ conceptual schema `EMPLOYEE`, qua 2 external mapping khác nhau.

### 2.6. Slide 28 — Data Independence + Logical Data Independence

**Nội dung slide gốc:**

- **Data Independence** is the *capacity to change the schema at one level of a database system **without having to change the schema at the next higher level**.*
- **Logical Data Independence**
  - *Refers to **immunity of external schemas** to changes in conceptual schema.*
  - *Conceptual schema changes (e.g. addition/removal of entities) should not require changes to external schema or rewrites of application programs.*

| Thuật ngữ (EN) | Tiếng Việt | Định nghĩa |
|---|---|---|
| Data Independence | Độc lập dữ liệu | Khả năng đổi schema ở 1 mức mà không phải đổi schema ở mức cao hơn kế tiếp. |
| Logical Data Independence | Độc lập dữ liệu logic | External schema miễn nhiễm với thay đổi của conceptual schema. |

> 💡 **Ví dụ Logical DI:** Thêm bảng `TRAINING_COURSE` vào conceptual schema COMPANY để lưu khóa đào tạo. HR view cũ chỉ xem `EMPLOYEE` → không cần đổi.

### 2.7. Slide 29 — Physical Data Independence

**Nội dung slide gốc:**

- **Physical Data Independence**
  - *Refers to **immunity of conceptual schema** to changes in the internal schema.*
  - *Internal schema changes (e.g. using different file organizations, storage structures/devices) should not require changes to conceptual or external schemas.*

| Thuật ngữ | Định nghĩa |
|---|---|
| Physical Data Independence | Conceptual schema miễn nhiễm với đổi của internal schema (đổi file organization, thêm index, đổi storage device). |

> 💡 **Ví dụ Physical DI:** DBA thêm B+ tree index trên `EMPLOYEE(Ssn)` để tìm nhân viên nhanh hơn. Form tra cứu HR không cần đổi.

### 2.8. Slide 30 — Mappings và 2 loại Data Independence

> 📊 **Hình 2.3 — Mappings và Data Independence (slide 30):**
> ```mermaid
> flowchart TB
>   E1[External<br/>schema] --- M1
>   E2[External<br/>schema] --- M1
>   E3[External<br/>schema] --- M1
>   M1[External / conceptual mapping<br/><i>Logical data independence</i>] --- C[Conceptual<br/>schema]
>   C --- M2[Conceptual / internal mapping<br/><i>Physical data independence</i>]
>   M2 --- I[Internal<br/>schema]
> ```

> 📊 **Đọc diagram này thế nào:** 2 mapping nối 3 schema:
> - **External / conceptual mapping** → **Logical Data Independence**.
> - **Conceptual / internal mapping** → **Physical Data Independence**.
> - Mỗi lần 1 schema đổi, **chỉ mapping liên quan cần update**, không phải sửa các schema khác.

**So sánh Logical vs Physical DI:**

| Tiêu chí | Logical DI | Physical DI |
|---|---|---|
| Thay đổi ở mức nào? | Conceptual schema | Internal schema |
| Mức được bảo vệ | External schema + application | Conceptual + external schema |
| Ví dụ thay đổi | Thêm entity, thêm thuộc tính, đổi quan hệ logic | Đổi file organization, thêm index, đổi disk |
| Khó hay dễ? | **Khó hơn** | Dễ hơn |
| Lý do | External gắn chặt với code app | Internal được mapping ẩn đi tốt |

> 💡 **Hiểu đơn giản (cải tạo nhà):**
> - **Physical DI** = thay sàn gỗ tầng trệt. Tầng 2 không cần xây lại.
> - **Logical DI** = sửa lại bố cục tầng 2. Cách bố trí phòng tầng 3, 4 (view của từng cư dân) vẫn giữ nguyên.

> 📝 **Tóm lại §2 (Three-Schema và Data Independence):**
> - 3 schema: External, Conceptual, Internal.
> - 2 mapping: external/conceptual và conceptual/internal.
> - Mỗi mapping cho 1 loại data independence: **Logical** (conceptual đổi, external khỏe) và **Physical** (internal đổi, conceptual khỏe).
> - Logical DI khó hơn Physical DI.
>
> **Một câu ghi nhớ:** *3-Schema = 3 cách nhìn cùng 1 DB; 2 Mapping = 2 lớp kính cách âm giữ cho việc đổi tầng dưới không vọng lên tầng trên.*

> ❓ **Tự kiểm tra §2:**
> 7. Trong ví dụ STAFF (slide 27), `age` có ở External view 1 nhưng không ở Conceptual. Vì sao? Đây có vi phạm 3-schema không?
> 8. Công ty đổi từ Oracle sang PostgreSQL. Việc này gây thay đổi ở mức nào? Loại data independence nào "đỡ đòn"?
> 9. *"Logical data independence dễ đạt hơn Physical data independence."* Đúng hay sai? Giải thích.
> 10. DBA thêm index trên `EMPLOYEE(Ssn)` — đây là loại data independence nào?

---

## 3. Database Languages

### 3.1. Tại sao có concept này? (Motivation)

DBMS đứng giữa app và data; app phải nói chuyện với DBMS bằng **ngôn ngữ chuẩn** — không thể gọi function private. Sinh ra họ "Database Languages" chia theo chức năng: định nghĩa cấu trúc, thao tác dữ liệu, kiểm soát quyền — đó là **DDL, DML, DCL**.

> 💡 **Hiểu đơn giản:** DBMS giống cơ quan hành chính — muốn xây nhà cần hồ sơ thiết kế (DDL), muốn xin thông tin cần biểu mẫu truy vấn (DML), muốn cấp quyền cần văn bản phân quyền (DCL).

### 3.2. Slide 32 — DDL, DML, DCL

**Nội dung slide gốc:**

- **DDL (Data Definition Language)** *— allows the DBA or user to describe and name **entities, attributes, and relationships** required for the application plus any associated **integrity and security constraints**.*
- **DML (Data Manipulation Language)** *— provides basic data manipulation operations on data held in the database.*
- **DCL (Data Control Language)** *— defines activities that are not in the categories of those for the DDL and DML, such as **granting privileges to users**, and defining when proposed changes to a databases should be **irrevocably made**.*

| Language | Tiếng Việt | Dùng để làm gì? | Ví dụ SQL |
|---|---|---|---|
| **DDL** | Ngôn ngữ định nghĩa dữ liệu | Mô tả & đặt tên entity/attribute/relationship + integrity/security constraints | `CREATE TABLE`, `ALTER TABLE`, `DROP TABLE` |
| **DML** | Ngôn ngữ thao tác dữ liệu | Truy vấn, thêm, xóa, sửa data | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |
| **DCL** | Ngôn ngữ điều khiển dữ liệu | Cấp/thu quyền, commit/rollback transaction | `GRANT`, `REVOKE`, `COMMIT`, `ROLLBACK` |

```sql
-- DDL: tạo bảng
CREATE TABLE EMPLOYEE (
    Ssn CHAR(9) PRIMARY KEY,
    Fname VARCHAR(15),
    Lname VARCHAR(15),
    Salary DECIMAL(10, 2),
    Dno INT
);

-- DML: truy vấn dữ liệu
SELECT Fname, Lname, Salary
FROM EMPLOYEE
WHERE Dno = 5;

-- DCL: cấp quyền đọc bảng EMPLOYEE cho user hr_user
GRANT SELECT ON EMPLOYEE TO hr_user;
```

*Lưu ý:* Đoạn SQL trên là **ví dụ minh họa** (không phải code xuất hiện trực tiếp trong slide chương 1). Chương 6 sẽ học SQL chi tiết.

> 💡 **Hiểu đơn giản (xây nhà):**
> - **DDL** = bản vẽ kỹ thuật + công nhân thi công khung nhà — quyết định nhà có mấy tầng.
> - **DML** = thợ trang trí nội thất — kê bàn, thay rèm, dán tường.
> - **DCL** = bảo vệ + chìa khóa cửa — ai vào tầng nào, ai có thẩm quyền "khóa sổ kế toán hôm nay" (commit) hay hủy sổ vừa làm (rollback).

### 3.3. Slide 33 — Procedural DML, Non-Procedural DML, 4GLs

**Nội dung slide gốc:**

- **Procedural DML** *— allows user to tell system **exactly how** to manipulate data (e.g., Network and hierarchical DMLs).*
- **Non-Procedural DML (declarative language)** *— allows user to state **what** data is needed rather than **how** it is to be retrieved (e.g., SQL, QBE).*
- **Fourth Generation Languages (4GLs)**
  - Non-procedural languages: SQL, QBE, etc.
  - Application generators, report generators, etc. (see [2])

| Loại | Người dùng nói gì? | Ví dụ |
|---|---|---|
| **Procedural DML** | Nói **cách làm** từng bước | "Đi từ record A theo pointer sang B" trong Network/Hierarchical DB |
| **Non-Procedural DML** (declarative) | Nói **muốn gì**, hệ thống tự lo cách | `SELECT * FROM EMPLOYEE WHERE Dno = 5;` |

**Vì sao SQL là non-procedural?** Khi viết:
```sql
SELECT Fname, Lname FROM EMPLOYEE WHERE Dno = 5;
```
Bạn chỉ nói: "Tôi muốn họ tên nhân viên thuộc phòng 5". Bạn **không** nói DBMS phải scan bảng hay dùng index, đọc block nào trước, JOIN ra sao. DBMS có **query optimizer** tự chọn kế hoạch tối ưu.

**4GLs** gồm:
- SQL, QBE.
- Application generators.
- Report generators.

Mục tiêu 4GL: giảm code thủ công, cho user mô tả nhu cầu ở mức cao.

> 💡 **Hiểu đơn giản:** Procedural = "đi 200m rẽ trái, qua đèn xanh đèn đỏ, …" / Non-procedural = "tới 268 Lý Thường Kiệt giúp anh" (Grab tự đi).

> 📝 **Tóm lại §3 (Database Languages):**
> - 3 nhóm theo chức năng: **DDL** (định nghĩa), **DML** (thao tác), **DCL** (kiểm soát).
> - DML chia 2 phong cách: **procedural** (HOW) và **non-procedural** (WHAT). SQL là declarative.
>
> **Một câu ghi nhớ:** *DDL dựng nhà, DML kê đồ, DCL phát chìa khóa — và SQL là declarative DML cộng thêm DDL+DCL gói chung.*

> ❓ **Tự kiểm tra §3:**
> 11. SQL chứa cả DDL, DML lẫn DCL. Kể 1 câu lệnh SQL mỗi loại.
> 12. `CREATE TABLE` thuộc DDL, DML hay DCL? Vì sao?
> 13. `SELECT Fname FROM EMPLOYEE WHERE Dno = 5` là procedural hay non-procedural?
> 14. Vì sao non-procedural DML thắng thế procedural DML trên thực tế?

---

## 4. Data Models, Database Schema và Database State

### 4.1. Tại sao có concept này? (Motivation)

§2 nói "schema" rất nhiều. Nhưng schema **khác** instance/state thế nào? Schema được **mô tả bằng** "data model" nào? Đây là 3 khái niệm hay bị nhầm — thi rất hay hỏi.

### 4.2. Slide 35 — Data Model

**Nội dung slide gốc:**

- **Data Model**: *An integrated collection of concepts for describing **data, relationships between data, and constraints** on the data in an organization.*
- **Categories of data models include:**
  - **Object-based (Conceptual)**: ERD, Object-Oriented, …
  - **Record-based (Representational)**: Relational, Network, Hierarchical
  - **Physical**: used to describe data at the internal level
- *Object-based and record-based models describe data at the conceptual & external levels.*

| Category | Ví dụ | Dùng khi nào? | Ví dụ trên COMPANY |
|---|---|---|---|
| **Object-based** (Conceptual) | ERD, Object-Oriented | Phân tích yêu cầu, thiết kế ý niệm, nói chuyện với user | ERD: `EMPLOYEE` works for `DEPARTMENT`, `DEPARTMENT` controls `PROJECT` |
| **Record-based** (Representational) | Relational, Network, Hierarchical | Chuyển thiết kế sang DBMS có thể cài đặt logic | Relational: bảng `EMPLOYEE`, `DEPARTMENT`, `PROJECT`, `WORKS_ON` |
| **Physical** | File org, index, storage struct | Tối ưu lưu trữ, truy cập, hiệu năng | Heap file vs ordered file, B+ tree index trên `Ssn` |

> 💡 **Hiểu đơn giản:** Data model = **kiểu bản vẽ kỹ thuật**. Cùng 1 ngôi nhà, kiến trúc sư có thể vẽ "phối cảnh 3D" (object-based), "mặt bằng từng tầng" (record-based), hay "bản vẽ điện-nước" (physical).

### 4.3. Slide 36 — Database Schema, Schema Diagram, Database State

**Nội dung slide gốc:**

- **Database Schema**: *the description of a database, which is specified during database design and is **not expected to change frequently**.*
- **Schema Diagram**: *a displayed schema.*
- **Database State (Snapshot)**: *the data in the database at a **particular moment in time**.*

**Schema vs State:**

| Tiêu chí | Schema | State / Snapshot / Instance |
|---|---|---|
| Bản chất | Cấu trúc / thiết kế | Dữ liệu cụ thể hiện tại |
| Thay đổi? | **Ít** thay đổi | **Liên tục** (insert/update/delete) |
| Ví dụ trên COMPANY | `EMPLOYEE(Fname, Lname, Ssn, Salary, Dno)` | Dòng `('John', 'Smith', '123456789', 30000, 5)` |
| Ví dụ đời thường | Mẫu phiếu đăng ký | Các phiếu đã điền của từng người |

**So sánh 3 khái niệm dễ nhầm:**

| Khái niệm | Nội dung | Ví dụ | Tần suất đổi |
|---|---|---|---|
| **Data Model** | Tập khái niệm dùng để mô tả schema | Relational, ER, Network | Vài chục năm |
| **Schema** | Mô tả cụ thể của 1 DB, viết theo data model | "STUDENT(Name, Student_number, Class, Major)" | Vài tháng/năm |
| **State (Instance)** | Dữ liệu thật ở 1 thời điểm | {("Lan", 17, "K22", "CS"), …} | Liên tục |

> 💡 **Hiểu đơn giản:**
> - Data model = **quyển từ điển**.
> - Schema = **bài văn viết bằng từ điển đó**.
> - State = **bản nháp ghi tay đang được sửa từng giây**.
> - Hoặc: Schema = **khuôn bánh**; state = **các bánh đổ ra từ khuôn ở 1 thời điểm**.

### 4.4. Slide 37 — Schema Diagram (Elmasri Figure 2.1)

> 📊 **Hình 4.1 — Schema diagram của University DB (slide 37):**
> ```mermaid
> erDiagram
>     STUDENT {
>         string Name
>         string Student_number
>         string Class
>         string Major
>     }
>     COURSE {
>         string Course_name
>         string Course_number
>         int Credit_hours
>         string Department
>     }
>     PREREQUISITE {
>         string Course_number
>         string Prerequisite_number
>     }
>     SECTION {
>         string Section_identifier
>         string Course_number
>         string Semester
>         string Year
>         string Instructor
>     }
>     GRADE_REPORT {
>         string Student_number
>         string Section_identifier
>         string Grade
>     }
> ```

> 📊 **Đọc diagram này thế nào:**
> - 5 bảng (relation).
> - **Schema diagram chỉ vẽ tên bảng + tên cột**, KHÔNG vẽ dữ liệu.
> - Bạn không thấy "Anderson" hay "Fall 04" như slide 21 — vì 21 vẽ **state**, còn 37 vẽ **schema**.
> - Schema diagram cũng **không hiển thị ràng buộc động** (kiểu "Grade phải thuộc {A, B, C, D, F}").

**So sánh slide 21 và slide 37:**

| Slide | Vai trò |
|---|---|
| Slide 21 | Hiển thị relational model schema **kèm dữ liệu mẫu** (state) |
| Slide 37 | Hiển thị schema diagram: **tên relation + attributes**, không có dữ liệu |

> 📝 **Tóm lại §4 (Data Models, Schema, State):**
> - **Data Model** = khung khái niệm.
> - **Schema** = bản thiết kế DB cụ thể, ít đổi.
> - **State (Snapshot)** = dữ liệu thật, đổi liên tục.
>
> **Một câu ghi nhớ:** *Data model là quyển từ điển; schema là bài văn viết bằng từ điển đó; state là bản nháp đang được sửa từng giây.*

> ❓ **Tự kiểm tra §4:**
> 15. Phân biệt Data Model và Database Schema.
> 16. Vì sao Database Schema thường ít đổi còn State đổi liên tục?
> 17. Với COMPANY, `EMPLOYEE(Fname, Lname, Ssn, Salary)` là schema hay state? Một dòng nhân viên cụ thể là gì?
> 18. Phân biệt Schema và State qua 1 ví dụ thực tế (trường đại học).

---

## 5. Data Management Systems Framework (NÂNG CAO)

### 5.1. Tại sao có concept này? (Motivation)

Section 5 cho ta biết DBMS truyền thống nằm trong một hệ sinh thái lớn hơn. Slide 39 đặt câu hỏi *"Where are we?"* để giúp SV thấy **CSDL nằm ở đâu** trong tổng thể hệ thống thông tin của 1 tổ chức.

### 5.2. Slide 39 — Where are we?

**Bảng framework slide gốc:**

| Layer lớn | Sub-layer | Components |
|---|---|---|
| **Application Layer** | (single) | Visualization, Collaborative Computing, Mobile Computing, Knowledge-based Systems |
| **Data Management Layer** | Layer 3: information extraction & sharing | Data Warehousing, Data Mining, Internet DBs, Collaborative, P2P & Grid Data Management |
| | Layer 2: interoperability & migration | Heterogeneous DB Systems, Client/Server DBs, Multimedia DB Systems, Migrating Legacy DBs |
| | Layer 1: DB technologies | DB Systems, Distributed DB Systems |
| **Supporting Layer** | (single) | Networking, Mass Storage, Agents, Grid Computing Infrastructure, Parallel & Distributed Processing, Distributed Object Management |

> 📊 **Đọc bảng này thế nào:**
> - 3 tầng: **app gần user** (trên) → **hạ tầng** (dưới).
> - **Data Management Layer** chia 3 sub-layer:
>   - **Layer 1 — DB technologies**: chính là CO2013 dạy. Là chương 1–8.
>   - **Layer 2 — interoperability**: nói chuyện giữa nhiều DBMS (Oracle ↔ PostgreSQL), migrate legacy.
>   - **Layer 3 — extraction & sharing**: data warehouse, data mining (môn nâng cao).

**Ví dụ ánh xạ vào ứng dụng thật:**
- Mobile banking app → **Application Layer**.
- DB giao dịch ngân hàng → **Data Management Layer 1**.
- Data warehouse lưu lịch sử giao dịch để phân tích → **Layer 3**.
- Network/storage/cloud → **Supporting Layer**.

### 5.3. Slide 40 — Extending Database Capabilities

**Nội dung slide gốc:**

- **Extending database capabilities for new applications**
  - Example applications: **storage and retrieval of images, videos**, **data mining** (large amounts of data), **spatial databases**, **time series applications**, …
  - More complex data structures than relational representation
  - New data types except for the basic numeric and character string types
  - New operations and query languages for new data types
  - New storage and retrieval methods
  - New security mechanisms
  - …

| Hướng mở rộng | Ý nghĩa | Ví dụ |
|---|---|---|
| Storage of images/videos | Lưu media + metadata | Instagram lưu ảnh + tag |
| Data mining | Phân tích lượng lớn data tìm pattern | Phát hiện gian lận thẻ tín dụng |
| Spatial databases | Quản lý dữ liệu không gian | Google Maps, GIS |
| Time series | Quản lý theo thời gian | Chứng khoán, IoT, log hệ thống |
| New data types | JSON, XML, geometry, vector embedding | PostgreSQL JSONB; pgvector |
| New query languages | Spatial query, graph query, similarity search | `ST_Distance()`, Cypher, FAISS |

> 💡 **Hiểu đơn giản:** Section 5 nói "DBMS quan hệ truyền thống" mà bạn sắp học chỉ là **móng nhà**. Trên móng này người ta xây thêm: data warehouse, mining, spatial, multimedia, big data, NoSQL — và mỗi cái đẻ ra một họ DBMS riêng.

### 5.4. Slide 41 — Summary

**Nội dung slide gốc:**

- File-based Approach and Database Approach
- Three-Schema Architecture and Data Independence
- Database Languages
- Data Models Database Schema and Database State
- Data Management Systems Framework
- **Next week: ER Model**

→ Slide 41 báo trước **chương 2 sẽ học ER Model** — mô hình ý niệm đầu tiên để thiết kế database. Đây là nội dung sẽ áp dụng trong BTL1 (`BTL1_DB_Lab/`).

### 5.5. Slide 42 — Q & A

Slide cuối chương — dành cho hỏi đáp. Không có nội dung mới.

> 📝 **Tóm lại §5 (Framework):**
> - 3 tầng: Application — Data Management — Supporting.
> - Data Management chia 3 sub-layer (DB cơ bản → interoperability → extraction).
> - Ứng dụng mới (image, video, spatial, time series) đòi hỏi mở rộng kiểu dữ liệu, query, storage, security.
>
> **Một câu ghi nhớ:** *Môn CO2013 đang dạy bạn Layer 1 (DB technologies cơ bản); cả "đế chế" data ngoài kia mọc lên từ tầng đó.*

> ❓ **Tự kiểm tra §5:**
> 19. Trong khung "Where are we?", "Data Mining" thuộc layer nào? Cần gì ở layer dưới?
> 20. Kể 3 loại ứng dụng mới khiến DBMS cần mở rộng khả năng.
> 21. Trong slide 39, `DB Systems` và `Distributed DB Systems` nằm ở layer nào?

---

## 6. Bảng Tổng Hợp Thuật Ngữ Chương 1

| STT | Thuật ngữ (EN) | Thuật ngữ (VI) | Định nghĩa ngắn | Slide # | Ví dụ trên COMPANY |
|---:|---|---|---|---:|---|
| 1 | File-based Approach | Cách tiếp cận dựa trên tập tin | Lưu data trong file riêng, app tự xử lý | 4–10 | Mỗi phòng có file `EMPLOYEE.txt` riêng |
| 2 | Data Redundancy | Dư thừa dữ liệu | Cùng data lưu lặp nhiều nơi | 7 | Thông tin nhân viên lặp ở HR và Payroll |
| 3 | Data Inconsistency | Không nhất quán dữ liệu | Các bản sao lệch nhau | 7 | File HR: `Dno=5`; file Project: `Dno=4` |
| 4 | Shared File Approach | File dùng chung | Nhiều app dùng chung file để giảm lặp | 8–10 | Nhiều module cùng đọc `EMPLOYEE.dat` |
| 5 | Rigid data structure | Cấu trúc cứng nhắc | File chung khó hợp mọi app | 10 | HR cần `Bdate`, payroll cần `Salary` |
| 6 | Physical data dependency | Phụ thuộc vật lý | App phụ thuộc cách file lưu | 10 | Đổi cột trong `EMPLOYEE.txt` → app đọc sai |
| 7 | Concurrency Control | Kiểm soát đồng thời | Phối hợp nhiều user/app cùng truy cập | 10, 15, 18 | 2 HR cùng sửa 1 nhân viên không ghi đè lỗi |
| 8 | Database Approach | Tiếp cận CSDL | DBMS quản lý chung thay vì app đọc file | 11–19 | App truy cập `EMPLOYEE` qua DBMS |
| 9 | Data | Dữ liệu | Sự kiện đã biết, ghi lại được, có ý nghĩa ngầm | 13 | `Ssn=123456789`, `Salary=30000` |
| 10 | Database | Cơ sở dữ liệu | Shared collection of logically related data + description | 13 | COMPANY database |
| 11 | Metadata | Siêu dữ liệu | Dữ liệu mô tả dữ liệu | 14 | `Ssn` là `CHAR(9)`, là PK |
| 12 | System catalog | Danh mục hệ thống | Nơi DBMS lưu metadata/schema | 14, 17 | Catalog lưu `EMPLOYEE` có cột nào |
| 13 | DBMS | Hệ quản trị CSDL | Software cho define, construct, manipulate, share, control DB | 14 | PostgreSQL/MySQL/Oracle quản lý COMPANY |
| 14 | Database System | Hệ CSDL | Database + DBMS software | 15 | COMPANY data + PostgreSQL |
| 15 | DDL | Ngôn ngữ định nghĩa | Define schema/constraints | 15, 32 | `CREATE TABLE EMPLOYEE` |
| 16 | DML | Ngôn ngữ thao tác | Query/insert/delete/update | 15, 32–33 | `SELECT * FROM EMPLOYEE` |
| 17 | DCL | Ngôn ngữ điều khiển | Grant/revoke quyền, commit/rollback | 32 | `GRANT SELECT ON EMPLOYEE TO HR` |
| 18 | Procedural DML | DML thủ tục | Nói rõ HOW thao tác | 33 | Network/Hierarchical DML |
| 19 | Non-Procedural DML | DML phi thủ tục | Nói WHAT cần | 33 | SQL, QBE |
| 20 | 4GLs | Ngôn ngữ thế hệ 4 | SQL, QBE, generators | 33 | Report generator tạo báo cáo nhân viên |
| 21 | DBA | Quản trị viên CSDL | Cấp quyền, theo dõi, mua tài nguyên, bảo mật | 16 | Cấp quyền cho HR đọc `EMPLOYEE` |
| 22 | Database Designer | Thiết kế viên | Chọn data nào lưu + cấu trúc lưu | 16 | Quyết định khóa chính `Ssn` |
| 23 | Application Programmer | Lập trình viên | Viết app dùng DBMS | 16 | Backend dev viết API |
| 24 | End User | Người dùng cuối | Tương tác qua app | 16 | Nhân viên HR nhập hồ sơ |
| 25 | Self-describing | Tự mô tả | DB chứa cả data lẫn metadata | 18 | Mở DB là biết schema |
| 26 | Data Abstraction | Trừu tượng hóa | Program-data + program-operation independence | 18 | App viết SQL không cần biết block disk |
| 27 | Data Model | Mô hình dữ liệu | Tập khái niệm mô tả data, relationship, constraint | 18, 35 | ER model, Relational model |
| 28 | Object-based / Conceptual model | Mô hình đối tượng | ERD, OO — mức conceptual & external | 35 | ERD COMPANY |
| 29 | Record-based / Representational | Mô hình bản ghi | Relational, Network, Hierarchical | 35 | Relational COMPANY |
| 30 | Physical Data Model | Mô hình vật lý | Mức internal | 35 | B+ tree index, heap file |
| 31 | View | Khung nhìn | Phần DB user thấy ở external | 18, 25 | HR view có `Salary`; Project view không |
| 32 | External Schema | Lược đồ ngoài | Mô tả phần DB cho 1 user cụ thể | 24, 25 | HR view: `EMPLOYEE(Ssn, Fname, Salary)` |
| 33 | Conceptual Schema | Lược đồ khái niệm | Mô tả cấu trúc DB cấp tổ chức | 24, 25 | Schema đầy đủ COMPANY |
| 34 | Internal Schema | Lược đồ trong | Mô tả cấu trúc lưu trữ vật lý | 24, 26 | File `EMPLOYEE.dat` heap, B+ tree on `Ssn` |
| 35 | Three-Schema Architecture | Kiến trúc 3 lược đồ | Kiến trúc ANSI/SPARC chia DB thành 3 mức | 24 | — |
| 36 | Data Independence | Độc lập dữ liệu | Đổi schema 1 mức không phải đổi mức cao hơn | 28 | Thêm index không sửa app |
| 37 | Logical Data Independence | Độc lập logic | External miễn nhiễm với đổi của Conceptual | 28, 30 | Thêm bảng `TRAINING_COURSE`; HR view không đổi |
| 38 | Physical Data Independence | Độc lập vật lý | Conceptual miễn nhiễm với đổi của Internal | 29, 30 | Thêm index `Ssn`; schema logic không đổi |
| 39 | External / Conceptual Mapping | Ánh xạ ngoài/khái niệm | Lớp dịch giữa external và conceptual; tạo Logical DI | 30 | Tính `age = today - DOB` |
| 40 | Conceptual / Internal Mapping | Ánh xạ khái niệm/trong | Lớp dịch giữa conceptual và internal; tạo Physical DI | 30 | Map `EMPLOYEE` row → block trên đĩa |
| 41 | Database Schema | Lược đồ CSDL | Mô tả DB, ít khi đổi | 36 | `EMPLOYEE(Fname, Lname, Ssn, Salary)` |
| 42 | Schema Diagram | Sơ đồ lược đồ | Schema được vẽ ra | 36, 37 | Hình các bảng COMPANY |
| 43 | Database State / Snapshot / Instance | Trạng thái / Thể hiện | Dữ liệu thật ở 1 thời điểm | 36 | `('John','Smith','123456789',30000,5)` |
| 44 | Hierarchical Model | Mô hình phân cấp | DB thế hệ 1, dạng cây | 19 | IBM IMS (1968) |
| 45 | Network Model | Mô hình mạng | DB thế hệ 1, đồ thị có hướng | 19, 20 | CODASYL DBMS |
| 46 | Relational Model | Mô hình quan hệ | DB thế hệ 2, dạng bảng (chủ đạo) | 19, 21 | Oracle, MySQL, PostgreSQL |
| 47 | Object-Relational Model | Mô hình OO-Relational | DB thế hệ 3, OO + Relational | 19 | PostgreSQL extensions |
| 48 | Object-Oriented Model | Mô hình OO | DB thế hệ 3 thuần OO | 19 | Db4o |
| 49 | Integrity System | Hệ thống toàn vẹn | Đảm bảo data hợp lệ | 15 | `CHECK(Salary > 0)` |
| 50 | Recovery Control | Kiểm soát phục hồi | Khôi phục DB khi crash | 15 | WAL, redo log |

---

## 7. Tổng Kết — Những Điểm Khả Năng Cao Ra Thi

Đề thi CO2013 (50% trắc nghiệm + tự luận, 90 phút) hay ra:

1. **So sánh File-based vs Database Approach** — kể được ≥ 3 vấn đề của file-based, ≥ 3 đặc trưng của database.
2. **5 vấn đề của file-based / shared file** — Redundancy, Inconsistency, Rigid structure, Physical dependency, No Concurrency.
3. **Định nghĩa Database** — *shared collection of logically related data + description + designed to meet information needs*.
4. **5 chức năng DBMS** — defining, constructing, manipulating, sharing, control access.
5. **Database System = Database + DBMS software**.
6. **Metadata / System catalog** giúp program-data independence.
7. **Controlled access** — security, integrity, concurrency, recovery, user-accessible catalog.
8. **4 vai trò** — DBA, Designer, Programmer, End User.
9. **4 đặc trưng Database Approach** (slide 18) — *Self-describing, Insulation/Abstraction, Multiple views, Sharing & multi-user*.
10. **Three-Schema Architecture** — vẽ + gọi tên 3 schema + 2 mapping.
11. **Logical vs Physical Data Independence** — phân biệt + ví dụ.
12. **DDL / DML / DCL** — kể câu lệnh SQL mỗi loại.
13. **Procedural vs Non-Procedural DML** — SQL thuộc loại nào, vì sao.
14. **3 loại Data Model** — Object-based / Record-based / Physical, phân loại được ví dụ.
15. **Schema vs State** — phân biệt qua ví dụ.
16. **3 thế hệ DBMS** — kể tên + đại diện.

---

## 8. Bảng Tra Nhanh (Quick Reference)

| Khái niệm | 1-dòng định nghĩa | Ký hiệu/Ví dụ ngắn | Slide |
|---|---|---|---:|
| Data | Sự kiện thô có ý nghĩa ngầm | `Salary=30000` | 13 |
| Database | Shared logically related data + metadata, phục vụ tổ chức | COMPANY DB | 13 |
| DBMS | Phần mềm define/construct/manipulate/share DB | PostgreSQL | 14 |
| DBSystem | Database + DBMS | COMPANY + PostgreSQL | 15 |
| Metadata | Data về data | `Ssn` là `CHAR(9)` | 14 |
| DDL | Định nghĩa schema | `CREATE TABLE` | 15, 32 |
| DML | Truy vấn/cập nhật | `SELECT`, `INSERT` | 15, 32 |
| DCL | Quyền + transaction | `GRANT`, `COMMIT` | 32 |
| Procedural DML | Nói HOW | Network DML | 33 |
| Non-Procedural DML | Nói WHAT | SQL | 33 |
| External level | View của user | HR view | 24, 25 |
| Conceptual level | Schema toàn tổ chức | EMPLOYEE/DEPARTMENT/PROJECT | 24, 25 |
| Internal level | Cách lưu vật lý | Heap file + B+ tree | 24, 26 |
| Logical DI | External miễn nhiễm với đổi Conceptual | Thêm bảng `TRAINING` | 28 |
| Physical DI | Conceptual miễn nhiễm với đổi Internal | Thêm index | 29 |
| Schema | Mô tả DB, ít đổi | `EMPLOYEE(Ssn,Fname,...)` | 36 |
| State | Data tại 1 thời điểm, đổi liên tục | dòng cụ thể | 36 |
| Data Model | Khung khái niệm để mô tả | ER, Relational | 35 |
| Self-describing | DB chứa cả data + metadata | open DB ⇒ biết schema | 18 |
| Data Abstraction | program-data + program-operation independence | SQL không cần biết disk | 18 |
| Multiple views | Mỗi user 1 view | HR vs Payroll | 18 |
| Concurrency Control | Nhiều user cùng lúc không phá nhau | Locking | 10, 15, 18 |

---

## 9. Sai lầm thường gặp (Common Mistakes)

| # | Sai lầm | Tại sao sai | Cách đúng |
|---|---|---|---|
| 1 | Nghĩ "Database" = "DBMS" | Database là **dữ liệu**; DBMS là **phần mềm quản lý** dữ liệu. | Nhớ: *Database System = Database + DBMS software*. |
| 2 | Nói "Schema" và "State" giống nhau | Schema là cấu trúc, ít đổi. State là dữ liệu, đổi liên tục. | Mỗi lần INSERT → state đổi, schema không đổi. |
| 3 | Nói "Network model = relational model có mũi tên" | Network dùng **con trỏ thật** giữa record. Relational dùng **giá trị trùng** giữa bảng. | Xem slide 20 vs 21: cùng database, cách biểu diễn khác. |
| 4 | Nhầm Logical DI với Physical DI | Logical = đổi conceptual không ảnh hưởng external. Physical = đổi internal không ảnh hưởng conceptual. | Xem mức nào ĐỔI, mức nào ĐƯỢC BẢO VỆ. |
| 5 | Nghĩ "thêm index = thay đổi conceptual schema" | Index nằm ở **internal level**, không phải conceptual. | Đây là Physical DI — schema logic không đổi. |
| 6 | Nói "SQL chỉ là DML" | SQL có cả DDL (`CREATE`), DML (`SELECT`), DCL (`GRANT`). | SQL gói chung 3 nhóm. |
| 7 | Cho rằng Procedural DML mạnh hơn Non-Procedural | Non-procedural tận dụng query optimizer, code ngắn, ít bug. | Đó là lý do SQL thắng. |
| 8 | Vẽ 3-schema mà không có mappings | Mappings là **lớp dịch** giữa các schema; tạo data independence. | Phải có external/conceptual mapping + conceptual/internal mapping. |
| 9 | Nghĩ "Q&A slide" và "Summary slide" không cần đếm | Mọi slide đều cần đếm; chương 1 có 42 slide. | Slide 41 = Summary, slide 42 = Q&A. |
| 10 | Coi "physical data organization" = "internal schema" | Internal schema là **mô tả** về cách lưu. Physical data organization là **bit thật trên đĩa**. | Internal vẫn là schema; nằm trên physical. |

---

## 10. Bài tập tự luyện có lời giải

> **Bài 1 (mức độ: dễ — trắc nghiệm):**
> Đặc trưng nào sau đây **KHÔNG** thuộc về Database Approach (theo slide 18)?
> A. Self-describing nature
> B. Insulation between programs and data
> C. Tight coupling between application code and physical storage
> D. Multiple views of the data
>
> <details><summary>Lời giải</summary>
>
> **C.** Đặc trưng đúng của Database Approach là *Insulation* (B) — tức **không** tight coupling. Tight coupling là đặc trưng của file-based approach.
> </details>

> **Bài 2 (dễ — tự luận ngắn):**
> Phân biệt Data Redundancy và Data Inconsistency. Cái nào là nguyên nhân, cái nào là hậu quả?
>
> <details><summary>Lời giải</summary>
>
> **Data Redundancy** *(dư thừa)*: dữ liệu lưu lặp ở nhiều nơi. **Là nguyên nhân**.
> **Data Inconsistency** *(không nhất quán)*: các bản sao lệch nhau. **Là hậu quả** — khi update bản này quên bản kia.
> Không thể có Inconsistency mà không có Redundancy trước.
> </details>

> **Bài 3 (trung bình — tình huống):**
> Một công ty đang dùng database COMPANY trên Oracle. DBA quyết định:
> (a) Thêm B+ tree index trên `EMPLOYEE(Ssn)`.
> (b) Thêm bảng mới `TRAINING_COURSE` để lưu khóa đào tạo.
> (c) Đổi storage device từ HDD sang SSD.
> Hỏi: mỗi thay đổi cần loại data independence nào để **app đang chạy không phải sửa code**?
>
> <details><summary>Lời giải</summary>
>
> - (a) **Physical DI** — index ở internal level; conceptual schema không đổi.
> - (b) **Logical DI** — thêm entity ở conceptual level; external schema cũ (chỉ xem `EMPLOYEE`) không cần đổi.
> - (c) **Physical DI** — đổi storage device thuộc internal; conceptual schema không đổi.
>
> Tóm lại: Physical DI bảo vệ trước (a) và (c); Logical DI bảo vệ trước (b).
> </details>

> **Bài 4 (trung bình — vẽ + giải thích):**
> Vẽ Three-Schema Architecture (3 schema + 2 mapping) và đặt tên loại data independence cho mỗi mapping. Sau đó cho 1 ví dụ thay đổi tương ứng từng mapping.
>
> <details><summary>Lời giải</summary>
>
> ```
> External schema 1   External schema 2   External schema 3
>        \                  |                  /
>         \________________ | ________________/
>                            |
>          External / Conceptual mapping ← Logical Data Independence
>                            |
>                  Conceptual schema
>                            |
>          Conceptual / Internal mapping ← Physical Data Independence
>                            |
>                    Internal schema
>                            |
>                  Physical data organization
> ```
>
> Ví dụ:
> - Đổi `External / Conceptual mapping`: thêm bảng `TRAINING_COURSE` → mapping cho HR view (chỉ xem `EMPLOYEE`) phải biết bỏ qua bảng mới.
> - Đổi `Conceptual / Internal mapping`: thêm B+ tree index trên `EMPLOYEE(Ssn)` → mapping cho phép DBMS dùng index khi xử lý câu `SELECT ... WHERE Ssn = ?`.
> </details>

> **Bài 5 (khó — phân tích):**
> Một SV nói: *"Em chỉ cần học DDL là đủ vì DDL tạo bảng — quan trọng nhất."* Bạn phản biện thế nào? Liệt kê 3 lý do DML và DCL cũng quan trọng.
>
> <details><summary>Lời giải</summary>
>
> 1. **Không có DML** thì DBMS chỉ là "kho chữ" trống — không truy vấn được, không cập nhật được. SV không thể trả lời câu hỏi nghiệp vụ kiểu "có bao nhiêu nhân viên phòng Research?".
> 2. **Không có DCL** thì mọi user có quyền như DBA — không có security, không có transaction. Hai HR cùng cập nhật → ghi đè nhau (vì không có `COMMIT`/`ROLLBACK`).
> 3. **Trên thực tế**, DDL chỉ chạy 1 lần lúc thiết kế; DML chạy hàng triệu lần mỗi ngày trong production; DCL chạy mỗi lần phân quyền + mỗi giao dịch. → Tỷ lệ thời gian dev viết code: DML ≫ DCL ≫ DDL.
> </details>

---

## 11. Câu Hỏi Ôn Tập (từ slide gốc)

PDF chương 1 không có section "Review questions" riêng (chỉ có slide Q&A 42). Tổng hợp từ Summary (slide 41) và đề cương CO2013 (mục 1.8 *Self-study requirements: 8 hours*):

1. So sánh File-based Approach và Database Approach (≥ 4 tiêu chí).
2. Liệt kê và giải thích 4 characteristics của Database Approach (slide 18).
3. Vẽ và giải thích Three-Schema Architecture (slide 24, 30).
4. Phân biệt Logical Data Independence và Physical Data Independence; cho ví dụ mỗi loại.
5. So sánh DDL, DML, DCL — mỗi loại 2 câu lệnh SQL ví dụ.
6. Phân biệt Schema và State qua ví dụ DB trường đại học.
7. Liệt kê và giải thích các vai trò trong môi trường CSDL (slide 16).
8. Kể tên 3 thế hệ DBMS và đặc điểm chính của mỗi thế hệ.
9. Phân biệt Data Model, Database Schema, và Database State.
10. Trong framework slide 39, DB Systems thuộc layer nào?

---

## 12. Đáp án Tự kiểm tra

### §1 (câu 1–6)

**1. Redundancy vs Inconsistency:** Redundancy là **nguyên nhân** (dữ liệu lặp). Inconsistency là **hậu quả** (các bản copy lệch nhau). Không thể có inconsistency mà không có redundancy trước.

**2. Shared File:** Giải quyết được redundancy nội dung và inconsistency cross-version. Vẫn còn 3 vấn đề: Rigid data structure, Physical data dependency, No concurrency control.

**3. Slide 5:** Đây là minh họa cho **Data Redundancy** + **Data Inconsistency**. `Client` lưu ở 2 nơi với 2 schema khác nhau → khi đổi `telNo`, nếu chỉ sửa 1 file → 2 bản lệch.

**4. 4 đặc trưng + tiền đề DI:** Self-describing, Insulation+Abstraction, Multiple views, Sharing+multi-user. **"Insulation + Data Abstraction"** là tiền đề trực tiếp cho data independence: chương trình "cách ly" với data → đổi cấu trúc data không bắt sửa code.

**5. DBA vs Designer (Oracle → PostgreSQL):** Designer review schema (kiểm tra type Oracle-specific như `NUMBER(10,2)` → PostgreSQL `NUMERIC(10,2)`). DBA migrate data, set up cluster, training, đổi connection string.

**6. Network vs Relational:** Network dùng **set + mũi tên có hướng** giữa record types — duyệt bằng "đi theo mũi tên" (procedural). Relational dùng **bảng có giá trị trùng** giữa các bảng — truy vấn declarative bằng JOIN. Relational thắng vì đơn giản, không cần con trỏ vật lý, dễ dùng SQL.

### §2 (câu 7–10)

**7. Age không có ở Conceptual:** Vì lưu age sẽ phải update mỗi sinh nhật. Lưu DOB rồi tính `age = today - DOB`. External view 1 thấy age nhờ external/conceptual mapping suy ra. **KHÔNG vi phạm 3-schema** — đây là minh họa đẹp cho derived attribute ở external level.

**8. Oracle → PostgreSQL:** Đổi DBMS engine ảnh hưởng **chủ yếu Internal level**. Conceptual schema **không nhất thiết đổi** — đây là cái mà **Physical DI** đỡ đòn. Tuy nhiên một số tính năng Oracle-only (PL/SQL packages) có thể buộc đổi cả conceptual.

**9. SAI.** Logical DI **khó hơn** Physical DI. Lý do: external schema gắn chặt với code app (SELECT viết theo cột nào của bảng nào). Khi conceptual đổi (xóa bảng, đổi tên cột) → external mapping rất khó "tự bù đắp" nếu không có view phức tạp. Physical DI chỉ cần DBMS update conceptual/internal mapping.

**10. Index `EMPLOYEE(Ssn)` = Physical DI** — index ở internal level, conceptual + external không đổi.

### §3 (câu 11–14)

**11. SQL ví dụ 3 loại:**
- DDL: `CREATE TABLE Employee (Ssn INT PRIMARY KEY, Name VARCHAR(50));`
- DML: `SELECT * FROM Employee WHERE Salary > 30000;`
- DCL: `GRANT SELECT ON Employee TO Lan;` hoặc `COMMIT;`

**12. CREATE TABLE = DDL** vì định nghĩa cấu trúc dữ liệu/schema.

**13. SELECT ... WHERE Dno = 5 = Non-Procedural** — chỉ nói WHAT cần, không nói HOW lấy.

**14. Non-Procedural thắng vì:** (a) user/dev không cần biết cấu trúc lưu trữ; (b) DBMS có **query optimizer** tự chọn cách thực thi tối ưu (index nào, JOIN order nào); (c) code ngắn hơn, ít bug; (d) đổi index/cấu trúc không phải sửa query.

### §4 (câu 15–18)

**15. Data Model vs Schema:** Data Model là **bộ khái niệm** (Relational, ER, Network). Schema là **mô tả cụ thể** của 1 DB viết theo data model đó.

**16. Schema ít đổi vs State đổi liên tục:** Schema là bản thiết kế, đổi khi nghiệp vụ đổi (vài tháng/năm). State là dữ liệu — mỗi INSERT/UPDATE/DELETE thì state đổi (mỗi giây).

**17. COMPANY:** `EMPLOYEE(Fname,Lname,Ssn,Salary)` là **schema**. Dòng `('John','Smith','123456789',30000)` là **state/instance**.

**18. Ví dụ trường ĐH:**
- Schema STUDENT: `(Name, Student_number, Class, Major)` — cố định cả học kỳ.
- State 8h sáng: 5000 SV. State 8h30 (sau khi 1 SV mới đăng ký): 5001 SV. Schema không đổi, state đã đổi.

### §5 (câu 19–21)

**19. Data Mining = Layer 3** (information extraction & sharing). Cần **Layer 1** (DB technologies cơ bản — chính là CO2013) + **Layer 2** (interoperability — vì mining tổng hợp từ nhiều DB nguồn).

**20. 3 ứng dụng mới:** lưu trữ ảnh-video, data mining, spatial databases, time series applications (chọn 3).

**21. DB Systems + Distributed DB Systems = Data Management Layer 1: DB technologies**.

---

## 13. Mối Quan Hệ Với Các Chương Khác — Liên kết Lab/BTL

### Chương trước / sau

| Chương | Liên hệ với chương 1 |
|---|---|
| **Chương 0 — Introduction** | Tổng quan vai trò DB. Chương 1 đi sâu hơn vào **kiến trúc** + **vì sao** DB ra đời. |
| **Chương 2 — ER Model** | Slide 41 báo trước. Chương 2 dạy cách **xây Conceptual schema** bằng Entity-Relationship Model. Chương 1 nói "có conceptual schema", chương 2 dạy "vẽ nó ra". |
| **Chương 3 — EER Model** | Mở rộng ER với specialization, generalization, category — vẫn ở conceptual level. |
| **Chương 4 — Relational Mapping** | Dịch ER schema → relational schema = từ Object-based (slide 35) → Record-based. |
| **Chương 5 — Relational Algebra** | Procedural query language ở relational model (đối lập với SQL declarative). |
| **Chương 6 — SQL** | DDL (`CREATE`), DML (`SELECT`), DCL (`GRANT`) mà chương 1 chỉ giới thiệu — chương 6 dạy chi tiết. |
| **Chương 7 — FD & Normalization** | Giải quyết bài toán *Data Redundancy* mà chương 1 nêu — bằng cách hình thức (FD, BCNF). |
| **Chương 8 — Storage & Indexing** | Đi sâu vào **Internal level** — file organization, B+ tree, hash. Là tầng dưới cùng trong 3-schema. |

### Liên kết với Lab và BTL

| Hoạt động | Phần nào của chương 1 dùng tới |
|---|---|
| **Lab 1, Lab 2** (`Labs/`) | SQL = DDL + DML + DCL (slide 15, 32). Chương 1 đặt tên khái niệm; chương 6 dạy chi tiết SQL. |
| **BTL1** (`BTL1_DB_Lab/`) | Thiết kế DB từ ER → Relational. Hiểu **vì sao** dùng database approach (slide 11) thay vì file Excel. Hiểu **roles** (slide 16) để chia việc trong nhóm. |
| **BTL2** (`BTL2_DB_Lab/`) | Cài đặt SQL trên DBMS thật. Hiểu **DBMS components** (slide 17) để biết câu SQL đi qua đâu. |
| **Tutorial** (in-class) | Câu hỏi ôn tập slide 42 (Q&A) — thường lặp lại các câu trong §11 trên. |

### Concept của chương 1 sẽ "thấy lại" ở đâu

| Concept chương 1 | Tái hiện ở |
|---|---|
| Schema vs State | Chương 4 (relation schema vs instance), chương 7 (functional dependency holds trên schema, không trên state) |
| Three-Schema | Chương 6 (`CREATE VIEW` = external schema), chương 8 (`CREATE INDEX` = internal schema) |
| Data Independence | Chương 6 (view + ALTER TABLE), chương 8 (đổi storage không sửa query) |
| DBA / Designer / Programmer / End User | Chương 6 (DCL, security), trong nhóm BTL: ai làm role nào |
| Data Redundancy | Chương 7 — lý do gốc của Normalization |
| Network model con trỏ | Chương 8 — file organization có pointer giữa block |

---

## 14. Phụ lục — Mapping 42 slide → Section trong tài liệu này

| Slide | Nội dung | Section trong file này |
|---:|---|---|
| 1 | Chapter title | Header tài liệu |
| 2 | Outline | §0.4 (gộp) |
| 3 | Outline | §0.4 (gộp) |
| 4 | File-based Approach definition | §1.2 |
| 5 | File-based diagram + Sales/Contracts | §1.3 |
| 6 | File-based 4 application | §1.4 |
| 7 | Problems/Limitations | §1.5 |
| 8 | Shared file diagram | §1.6 |
| 9 | Shared File benefits | §1.7 |
| 10 | Shared File remaining problems | §1.8 |
| 11 | Database Approach motivation | §1.9 |
| 12 | Database Approach diagram | §1.10 |
| 13 | Data + Database definition | §1.11 |
| 14 | Metadata, logically related, DBMS | §1.12 |
| 15 | DDL/DML/Controlled access/DBSystem | §1.13 |
| 16 | Roles in DB Environment | §1.14 |
| 17 | DBMS components diagram | §1.15 |
| 18 | Characteristics of Database Approach | §1.16 |
| 19 | History of database systems | §1.17 |
| 20 | Network Model Schema | §1.18 |
| 21 | Relational Model instance tables | §1.19 |
| 22 | Outline | §0.4 (gộp) |
| 23 | Three-Schema objectives | §2.2 |
| 24 | Three-level architecture | §2.3 |
| 25 | External + Conceptual level | §2.4 |
| 26 | Internal level | §2.4 |
| 27 | STAFF 3-level example | §2.5 |
| 28 | Data Independence + Logical DI | §2.6 |
| 29 | Physical Data Independence | §2.7 |
| 30 | Mappings + 2 DI types | §2.8 |
| 31 | Outline | §0.4 (gộp) |
| 32 | DDL/DML/DCL | §3.2 |
| 33 | Procedural/Non-Procedural/4GLs | §3.3 |
| 34 | Outline | §0.4 (gộp) |
| 35 | Data Model categories | §4.2 |
| 36 | Schema/Schema diagram/State | §4.3 |
| 37 | Student-course schema diagram | §4.4 |
| 38 | Outline | §0.4 (gộp) |
| 39 | Data Management Systems Framework | §5.2 |
| 40 | Extending DB capabilities | §5.3 |
| 41 | Summary | §5.4 |
| 42 | Q & A | §5.5 |

---

## 15. Bảng so sánh nguồn (Prompt 3 — audit table)

| Section / Nội dung | A (Claude pass1) | B (CO2013) | Nguồn được chọn | Ghi chú |
|---|---|---|---|---|
| 0.1 Prerequisite | ✅ có | ✅ có (table) | A+B | Ghép cấu trúc table B + insight A |
| 0.3 Lộ trình đọc | ✅ có | ✅ có | A+B | Lấy A có time + ghi chú "khó nhất" rõ |
| §1.x slide-by-slide | gộp theo concept | ✅ chi tiết per slide | **B** | B làm khung |
| Hình 1.1–1.4 (slide 5,6,8,12) | ASCII đẹp | Mermaid | **B Mermaid** + tham khảo bảng A |
| Hình 1.5 (slide 17 components) | ASCII chi tiết | Mermaid đơn | **A ASCII** đầy đủ hơn |
| Hình 2.2 (STAFF slide 27) | ASCII + C code | Bảng + C code | **A** ASCII trực quan hơn |
| Hình 2.3 (mappings slide 30) | Mermaid | Mermaid (khác structure) | **A** Mermaid (lồng thông tin LDI/PDI) |
| Slide 21 (4 instance tables) | ✅ đủ | ✅ đủ | A=B | Giống nhau |
| Slide 37 (schema diagram) | ASCII | Mermaid `erDiagram` | **B Mermaid** đẹp hơn |
| Analogy đời thường | nhiều (Grab, kho, nhà hàng, xây nhà) | có (nhưng ít hơn) | **A** | Mermaid B + analogy A |
| Bảng tổng hợp thuật ngữ | 43 hàng, không có cột COMPANY | 34 hàng, có cột COMPANY | A+B | Union → 50 hàng có COMPANY |
| Đáp án tự kiểm tra | 14 câu chi tiết, có giải thích sâu | 15 câu ngắn | **A** chi tiết + B union các câu mới |
| Phụ lục 42-slide map | không có | ✅ có | **B** |
| TH2 Bảng tra nhanh | không có | không có | **tự sinh** |
| TH3 Sai lầm thường gặp | không có | không có | **tự sinh** (10 sai lầm) |
| TH4 Bài tập có lời giải | không có | không có | **tự sinh** (5 bài) |
| TH5 Liên kết Lab/BTL | có (ngắn) | có (chung) | A+B union → bảng chi tiết |

---

## 16. Checklist tổng hợp cuối cùng

### ✅ Checklist nội dung (so với 2 nguồn)

| Hạng mục | A | B | Bản tổng hợp | Yêu cầu |
|---|---:|---:|---:|---|
| Số section đánh số lớn | 5 | 5 | 5 | ≥ max | ✅ |
| Số diagram được mô tả | 10 | 13 | 13 | ≥ max | ✅ |
| Số ví dụ COMPANY | 6 | 12 | 14 | ≥ max | ✅ |
| Số analogy đời thường | 9 | 7 | 9 | ≥ max | ✅ |
| Số đoạn SQL code | 4 | 5 | 6 | ≥ max | ✅ |
| Số công thức RA / FD | 0 | 0 | 0 | (chương 1 không có) | ✅ |
| Số thuật ngữ glossary | 43 | 34 | **50** | ≥ max | ✅ vượt |
| Số câu hỏi tự kiểm tra | 14 | 15 | 21 | ≥ max | ✅ |
| Mapping 42 slide → section | 0 | 42 | 42 | bắt buộc có | ✅ |

### ✅ Checklist riêng cho TỰ HỌC

| Hạng mục | Đạt? |
|---|---|
| Có **0.1 Prerequisite** | ✅ |
| Có **0.2 Learning Outcomes** | ✅ |
| Có **0.3 Lộ trình đọc** | ✅ |
| Có **Bảng tra nhanh** cuối chương (§8) | ✅ |
| Có **Sai lầm thường gặp** (§9) | ✅ |
| Có **≥ 3 bài tập tự luyện có lời giải** (§10 — 5 bài) | ✅ |
| Có **liên kết Lab/BTL** (§13) | ✅ |
| Mọi concept trừu tượng có analogy | ✅ |
| Mọi thuật ngữ lần đầu có VN trong ngoặc | ✅ |
| Có **Đáp án Tự kiểm tra** (§12) | ✅ |
| Ví dụ dùng schema thật của slide (DreamHome, University) hoặc COMPANY (chuẩn môn) | ✅ |
| Phụ lục mapping 42 slide → section (§14) | ✅ |
| **Tự đánh giá: SV mất gốc đọc sẽ hiểu được?** | ✅ |

---

> **File này là bản TỔNG HỢP CUỐI CÙNG** cho Chương 1, ghép từ 2 nguồn:
> 1. `_drafts/DB-Chapter1-claude-pass1.md` (bản A — Claude, sau Prompt 1)
> 2. `_drafts/CO2013_Chuong1_Database_System_Concepts_and_Architecture.md` (bản B — nguồn ngoài)
>
> Sau khi finalize, có thể xóa 2 file `_drafts/` nếu không cần giữ làm reference.
