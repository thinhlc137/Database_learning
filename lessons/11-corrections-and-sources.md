# Ghi chú biên tập và nguồn đối chiếu

## Phạm vi thực sự đã có trong project

Project nhập nguyên vẹn 9 file Markdown người dùng cung cấp. SHA-256 trong `materials/manifest.json` cho phép so sánh từng byte. Các dẫn chiếu đến slide PDF, quiz BK-LMS, đề thi hoặc file trong `Lectures/`, `Final/Important/` thuộc lời dẫn của nguồn; **những file đó không nằm trong bộ upload**, nên project không thể xác minh nội dung của chúng.

Hướng dẫn mới ở `lessons/`, lab, fixture và đề tự luyện là phần biên soạn bổ sung. Không gọi chúng là đáp án chính thức HCMUT. Bản gốc có các lời khẳng định “full điểm”, “đủ điểm 10”; đó không phải cam kết của project.

Trình đọc còn xuống dòng các attribute trong Mermaid ER viết gộp bằng dấu chấm phẩy để tương thích renderer; không đổi file nguồn. Mermaid ER dùng Crow's Foot, không phải ký hiệu Chen. Khi học cardinality/participation, ưu tiên câu nghiệp vụ và chú giải của từng hệ ký hiệu.

## Những điểm cần đọc cùng chú giải

| Vị trí hoặc cách ghi trong nguồn | Cách hiểu chính xác hơn |
|---|---|
| Chương 1 mở đầu `D#` | Lỗi ký tự; trình đọc sửa tiêu đề hiển thị, file gốc giữ nguyên |
| Chương 6 có chỗ xếp COMMIT/ROLLBACK vào DCL | Ở hướng dẫn mới dùng TCL; các giáo trình có cách chia nhóm khác nhau |
| CAP “3 chọn 2” | Trong partition, không bảo đảm đồng thời C và A theo định nghĩa CAP; xem nguồn [4] |
| Full/direct dependency dùng như đồng nghĩa | Full là không tồn tại proper subset LHS vẫn xác định RHS; “direct” không thay thế định nghĩa này |
| BCNF không nhắc nontrivial ở một số câu tóm tắt | Chỉ xét FD không tầm thường; A→A không bắt A phải là superkey |
| “BCNF luôn lossless” | Thuật toán phân rã BCNF chuẩn bảo đảm lossless; tùy ý tách các bảng BCNF không đủ |
| Total M:N → CHECK/assertion/trigger | CHECK thường chỉ kiểm tra hàng; SQLite không hỗ trợ subquery trong CHECK; cần cơ chế liên bảng và transaction phù hợp |
| Secondary key là candidate key không chọn | Dùng “alternate key” khi muốn tránh nhầm với search key/secondary index |
| WITH LOCAL CHECK OPTION bỏ mọi kiểm tra view cha | Với PostgreSQL, view cha có CHECK OPTION riêng vẫn có thể được enforce; xem [3] |
| Công thức lưu trữ | Chỉ áp dụng sau khi ghi giả thiết về header, pointer, spanned, cache và occupancy |

Đây là **các chú giải trọng yếu**, không phải chứng nhận rằng từng khẳng định, từng bài giải và mọi dẫn nguồn trong 9 file đã được kiểm chứng độc lập. Khi có mâu thuẫn, dùng định nghĩa hình thức, phản ví dụ và tài liệu DBMS đúng phiên bản.

## Dialect thực hành

| Tính năng | SQLite lab | Đọc thêm |
|---|---|---|
| FK | Bật PRAGMA foreign_keys trên từng connection | [1] |
| CHECK và NULL | CHECK không thay thế NOT NULL | [2] |
| GROUP BY | SQLite cho bare columns trong một số dạng; bài giải project tránh dựa vào chúng | [2] |
| GRANT/REVOKE theo database role | Không mô phỏng bằng SQLite | PostgreSQL/SQL Server trong nguồn |
| ANY/ALL subquery, ASSERTION | Không dùng như code SQLite chạy được | Đọc như SQL chuẩn/dialect tương ứng |
| Updatable view/CHECK OPTION | Không cùng hành vi với PostgreSQL | [3] |
| Procedure/cursor/T-SQL INSERTED, DELETED | Không thuộc SQLite fixture | Đọc theo SQL Server |
| Window functions trong Q33–Q34 | Phần mở rộng thực hành; cần SQLite có hỗ trợ window | [2] |

## Tài liệu chính thức được đối chiếu

1. [SQLite Foreign Key Support](https://www.sqlite.org/foreignkeys.html)
2. [SQLite SELECT](https://www.sqlite.org/lang_select.html), [CREATE TABLE](https://www.sqlite.org/lang_createtable.html), [Python sqlite3](https://docs.python.org/3/library/sqlite3.html)
3. [PostgreSQL 18 CREATE VIEW](https://www.postgresql.org/docs/18/sql-createview.html)
4. [FoundationDB — CAP theorem](https://apple.github.io/foundationdb/cap-theorem.html), [Gilbert & Lynch — Perspectives on the CAP theorem](https://dspace.mit.edu/entities/publication/dfcb6512-af44-4fc9-8e8b-1a8f28f1b53a)
5. [Mermaid documentation](https://mermaid.js.org/intro/), [KaTeX documentation](https://katex.org/docs/api), [Marked](https://github.com/markedjs/marked)
6. [GitHub Pages: publish from a branch](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

Các nội dung giải thích là biên soạn và diễn giải, không sao chép dài từ các nguồn web. Tham chiếu kỹ thuật được kiểm tra ngày 26/10/2026.
