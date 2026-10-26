# Lab 05 · Giao dịch, index và parameter binding

## Rollback và commit

```bash
python tools/transaction_demo.py
```

Trước: (1,1000), (2,500). Sau lỗi giữa giao dịch: giữ nguyên. Sau giao dịch thành công: (1,900), (2,600). Tổng tiền 1500 được giữ. Demo cố ý dùng số nguyên để không đưa sai số floating point vào bài toán tiền.

## Query plan trước/sau index

```bash
python tools/index_demo.py
```

Dữ liệu có 20.000 events, 1000 anime_id. Script tìm anime 137, kiểm chính xác 20 ID kỳ vọng và in plan trước/sau index. Thời gian chỉ là quan sát một lần chạy; plan được optimizer chọn tùy DBMS, dữ liệu và phiên bản. Không kết luận mọi CREATE INDEX đều làm mọi query nhanh hơn.

## Thử chuỗi giống SQL injection như dữ liệu

```python
import sys
sys.path.insert(0, 'tools')
from common import connect_fixture
con = connect_fixture('anime')
for username in ['an', "an' OR 1=1 --"]:
    rows = con.execute('SELECT account_id FROM account WHERE username=?', (username,)).fetchall()
    print(username, rows)
con.close()
```

Kết quả: username `an` trả [(1,)]; chuỗi còn lại trả []. Không cần dựng query dễ bị tấn công để kiểm chứng cách binding giữ input như một giá trị. Đừng áp dụng placeholder cho tên cột; dùng whitelist nếu người dùng được chọn trường sắp xếp.
