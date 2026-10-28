# Đối chiếu nguồn → phần học và thực hành

Các file gốc được nhập đủ; bảng này dùng cùng manifest và docs/coverage.json để audit độ bao phủ.

| Nguồn | Hướng dẫn | Phần đọc gốc | Liên hệ thực hành |
|---|---|---:|---|
| [DB-Chapter1.md](materials/DB-Chapter1.md) | [lessons/01-foundations.md](lessons/01-foundations.md) | 18 | Lab 01: setup / catalog |
| [DB-Chapter2.md](materials/DB-Chapter2.md) | [lessons/02-er.md](lessons/02-er.md) | 18 | Capstone: Chen và quan hệ |
| [DB-Chapter3.md](materials/DB-Chapter3.md) | [lessons/03-eer.md](lessons/03-eer.md) | 18 | Capstone: total + overlapping |
| [DB-Chapter4.md](materials/DB-Chapter4.md) | [lessons/04-mapping.md](lessons/04-mapping.md) | 17 | Schema + kiểm FK/semantic constraints |
| [DB-Chapter5.md](materials/DB-Chapter5.md) | [lessons/05-algebra.md](lessons/05-algebra.md) | 18 | Q17–Q26; division/anti join |
| [DB-Chapter6.md](materials/DB-Chapter6.md) | [lessons/06-sql.md](lessons/06-sql.md) | 20 | Q01–Q40; SQL Playground |
| [DB-Chapter7.md](materials/DB-Chapter7.md) | [lessons/07-normalization.md](lessons/07-normalization.md) | 18 | tools/fd.py và công cụ bao đóng |
| [DB-Chapter8.md](materials/DB-Chapter8.md) | [lessons/08-storage.md](lessons/08-storage.md) | 13 | tools/storage.py, index_demo.py |
| [DB-Final.md](materials/DB-Final.md) | [lessons/10-exam-roadmap.md](lessons/10-exam-roadmap.md) | 24 | 50 MCQ, security/advanced, đề tự luận |

## Hai PowerPoint SQL bổ sung ngày 28/10/2026

| Nguồn | Số slide | Đích học |
|---|---:|---|
| 4A_SQL.pptx | 107 | SQL 01–10, SQL 14 và đối chiếu SQL 18 |
| 4B_AdvancedSQL.pptx | 50 | SQL 11–16 và đối chiếu SQL 18 |

- [Mục lục 18 bài](lessons/06-sql.md), [bảng từng slide và hiệu đính](lessons/sql/18-slide-map-and-references.md).
- [Manifest slide](materials/sql-slides-manifest.json): SHA-256 và đích học của từng trang, gồm ảnh code/bảng và trang mục lục/kết thúc.
- Các PPTX được dùng làm nguồn biên soạn, không đóng gói bản nhị phân vào repository. 9 Markdown ban đầu vẫn giữ nguyên.
- 43 ví dụ SQLite trích từ bài, expected riêng ở sql/course-expectations.json; bộ T-SQL và phạm vi chưa thực thi được ghi ở sql/sqlserver/README.md.

## Chính sách hiệu đính

Bản nguồn không sửa. Reader chỉ sửa lỗi tiêu đề D# của Chương 1 khi hiển thị; chú giải được viết riêng. Hàm build kiểm tổng nhập và SHA-256. Chỉ hai PPTX 4A/4B bổ sung đã được đối chiếu; không suy những PDF/quiz khác được dẫn tên trong nguồn cũng đã được cung cấp.
