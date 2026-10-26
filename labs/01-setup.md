# Lab 01 · Khởi động và kiểm tra ràng buộc

## Yêu cầu và cách chạy

Cài Python 3.10 trở lên có module sqlite3 (bản Python thông thường trên Windows/macOS/Linux có sẵn). Không cần pip, Node, Docker hoặc database server để chạy các lab. Trình đọc `docs/index.html` mở được ngay bằng trình duyệt và dùng tài nguyên đóng gói trong repo.

```bash
python tools/check.py
python tools/lab.py --exercise Q01
python tools/lab.py --database anime --query "SELECT * FROM anime"
```

Nếu máy dùng lệnh `python3`, thay `python` bằng `python3`; trên Windows cũng có thể dùng `py`. Chạy từ thư mục gốc project sau khi giải nén.

## Tự quan sát constraint

```python
import sys
sys.path.insert(0, 'tools')
from common import connect_fixture
import sqlite3
con = connect_fixture('anime')
print(con.execute('PRAGMA foreign_keys').fetchone())  # (1,)
try:
    con.execute('INSERT INTO rating VALUES(1,1,11)')
except sqlite3.IntegrityError as exc:
    print(type(exc).__name__)
con.rollback()
```

Thử điểm 11 trên cặp `(viewer_id=1, anime_id=1)` còn có thể đụng PK trùng; để cô lập CHECK, thử cặp chưa tồn tại `(3,2,11)`. Kiểm tra từng constraint bằng một input chỉ vi phạm constraint đó. Đây là kỹ năng thiết kế phép thử, không chỉ là chạy đến khi có lỗi.

Các phép thử nên làm: thêm PK trùng; FK không tồn tại; NULL ở cột NOT NULL; CHECK score ngoài 1..10. Dùng connection mới cho mỗi phép thử nếu không muốn ảnh hưởng state trước đó.

## Fixture COMPANY có gì khác mẫu quen thuộc?

Có 9 employee và 4 department. Ngoài các tên COMPANY quen thuộc, Mai chưa có salary và assignment; Innovation không có employee và manager. Những hàng này chủ ý giúp thử NULL, LEFT JOIN, anti join và empty set. Không dùng output fixture như đáp án cho một database có seed khác.
