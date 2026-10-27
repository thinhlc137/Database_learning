# Kết quả kiểm tra bản bàn giao · 26/10/2026

## Đã thực hiện

| Phần | Kết quả |
|---|---|
| Nguồn | SHA-256 khớp đủ 9 file upload; không bỏ phần văn bản nào |
| Build | 164 phần nguồn + 18 trang hướng dẫn/lab = 182 phần đọc |
| Python | 27 test methods pass; có 40 SQL cases với expected rows độc lập |
| SQLite WebAssembly | Đủ 40 query cho cùng expected rows như Python |
| Trình đọc | Mở/render toàn bộ 182 phần, không ảnh thiếu, không Mermaid fallback |
| Công thức | KaTeX hiển thị trong bài có công thức |
| Tương tác | Tìm không dấu; đánh dấu đã học; lưu qua reload; quiz phản hồi/lọc/lưu |
| Công cụ | FD trace/keys/input lỗi; storage; LEFT JOIN ON/WHERE |
| SQL editor | Query tự sửa, lỗi SQL, đổi fixture, kết quả thật |
| Offline | Browser context ngắt mạng; không gửi request HTTP/HTTPS |
| Responsive | Kiểm desktop 1440px và điện thoại 390px; không tràn ngang ở các màn hình được kiểm |

Môi trường local: Python 3.12.14, SQLite 3.53.1; Playwright 1.62.1 với Chromium headless 134. Browser suite nằm trong tests/browser.cjs; không yêu cầu người học cài các công cụ QA này.

## Giới hạn của kết quả

Kiểm tra không đồng nghĩa mọi nhận định/đáp án được dẫn trong 9 nguồn đã được xác minh độc lập. Xem chú giải biên tập để phân biệt nội dung nguồn, phần bổ sung, dialect và các file tham chiếu chưa được cung cấp.

Repo đích do người dùng chỉ định: `thinhlc137/Database_learning`, nhánh `main`. Các kiểm tra ở bảng trên đã thực hiện local; trạng thái CI từ xa xem tại tab Actions của repo. GitHub Pages là bước xuất bản tùy chọn trong PUBLISHING.md.

## Cập nhật 27/10/2026 · Database browser

Bổ sung phần xem trực tiếp bảng/view trong SQL Playground, dùng cùng connection SQL.js với editor. Kiểm thử trình duyệt offline đã pass cho COMPANY/ANIME; PK/FK và khóa ghép; nhảy qua bảng cha; INSERT/UPDATE/DELETE; CREATE/ALTER/DROP; rollback và script lỗi sau một thay đổi; phân trang/lọc có binding; tên bảng/cột chứa dấu nháy; escape HTML trong dữ liệu; TEMP tables/views; database rỗng; reset và giao diện 390px. Đã kiểm tra thêm thao tác tìm kiếm sau phân trang và FK tham chiếu bằng tên khác kiểu hoa/thường.

Bộ hồi quy 182 phần đọc và 40 SQL query đã pass. 27 Python test methods giữ nguyên kết quả pass; JavaScript mới được kiểm cú pháp trong CI. Script kiểm thử giao diện mới nằm ở tests/database-browser.cjs và được gọi từ tests/browser.cjs.
