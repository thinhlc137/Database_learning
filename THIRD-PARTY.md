# Nguồn, giấy phép và thư viện đóng gói

## Tài liệu học

Chín Markdown trong materials/ là bản do người dùng cung cấp, có nhắc đến môn CO2013 HCMUT và Elmasri–Navathe. Những lời dẫn này được giữ lại để thể hiện xuất xứ; project không nhận mình là giáo trình hoặc đáp án chính thức của trường. Không có slide PDF, ảnh quiz, đề thi gốc hoặc sách được đóng gói thêm.

Project chưa áp một giấy phép chung lên toàn bộ nguồn học do quyền của từng phần phụ thuộc tác giả gốc. Các hướng dẫn/lab/code bổ sung được tách thư mục để người quản lý dễ xác định phạm vi khi chọn giấy phép cho repo.

## Vendor phục vụ offline

| Thư viện | Bản đóng gói | Giấy phép kèm theo | Mục đích |
|---|---|---|---|
| Marked | 17.0.5 | `docs/vendor/marked-LICENSE.md` | Render Markdown |
| Mermaid | 11.12.0 | `docs/vendor/mermaid-LICENSE` | Render sơ đồ từ nguồn |
| KaTeX | 0.16.22 | `docs/vendor/katex/LICENSE` | Render công thức; font đóng gói cùng dist |
| SQL.js | 1.13.0 | `docs/vendor/sqljs/LICENSE` | SQLite WebAssembly trong trình duyệt |

Các bản này được pin để tái lập, không có nghĩa là phiên bản mới nhất. Không tự gọi CDN, analytics hoặc font web. `wasm-data.js` là bản base64 của sql-wasm.wasm để mở trực tiếp qua file://; giữ cả binary cho kiểm tra hash và các cách phân phối khác.

Nguồn package: [Marked](https://github.com/markedjs/marked), [Mermaid](https://github.com/mermaid-js/mermaid), [KaTeX](https://github.com/KaTeX/KaTeX), [SQL.js](https://github.com/sql-js/sql.js).
