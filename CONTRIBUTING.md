# Đóng góp nội dung và code

Mỗi thay đổi kiến thức nên nêu: vấn đề, định nghĩa đúng, ví dụ tối thiểu và nguồn chính thức khi cần. Với SQL, bổ sung dữ liệu biên để phân biệt lời giải đúng/sai: NULL, hàng không match, trùng, tie và tập rỗng.

Không sửa ngầm nguồn trong `materials/`. Muốn hiệu đính hãy viết ghi chú ở `lessons/11-corrections-and-sources.md` hoặc thêm bài hướng dẫn, giữ xuất xứ rõ ràng. Manifest dùng để nhận biết nguồn gốc, không phải để ngăn bổ sung tài liệu mới; khi thêm nguồn phải cập nhật builder/mapping có chủ ý.

## Kiểm tra bắt buộc

```bash
python tools/diagrams.py
python tools/build.py
python tools/check.py
```

Sửa đề/lời giải SQL trong `sql/exercises.json` và quiz trong `docs/quiz.json`; build tự cập nhật tài liệu thực hành và SQL tương ứng. Không cần dependency Python bên ngoài. Một FD exercise mới cần expected key/closure có lập luận độc lập, không chỉ chụp output thuật toán rồi gọi là đáp án. Với SQL, expected rows phải do tác giả xác định và được người review kiểm tra ngữ nghĩa.

## UI regression tùy chọn

Cần Node, package Playwright và Chromium chỉ cho người phát triển giao diện:

```bash
npm install
npx playwright install chromium
npm run test:browser
```

Browser suite mở trực tiếp file index.html và kiểm nội dung/SQL/quiz/công cụ/di động. Việc dùng project không cần các dependency này.
