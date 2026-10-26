# Lab 02 · Tự viết SQL trong một phiên giữ state

## Mở Python REPL

Từ thư mục gốc chạy `python`, rồi:

```python
import sys
sys.path.insert(0, 'tools')
from common import connect_fixture, table
con = connect_fixture('company')
print(table(con.execute('SELECT Fname, Salary FROM EMPLOYEE ORDER BY Fname')))
```

Sửa query trong cùng phiên REPL để đọc lại state sau UPDATE. CLI `tools/lab.py` chủ ý tạo fixture mới mỗi lần chạy, nên UPDATE của lần trước không tồn tại ở lần sau.

## Một chu trình làm bài hoàn chỉnh

1. Đọc đề Q07 mà chưa mở lời giải.
2. Viết tay bảng đầu ra: Administration 4; Headquarters 1; Innovation 0; Research 4.
3. Thử INNER JOIN, ghi lại phòng bị mất.
4. Đổi LEFT JOIN nhưng dùng COUNT(*), quan sát Innovation thành 1.
5. Đổi COUNT(e.Ssn) và giải thích vì sao NULL do outer join tạo ra bị bỏ.

## Thử transaction

```python
old = con.execute("SELECT Salary FROM EMPLOYEE WHERE Ssn=?", ('123456789',)).fetchone()
try:
    with con:
        con.execute("UPDATE EMPLOYEE SET Salary=Salary+100 WHERE Ssn=?", ('123456789',))
        raise RuntimeError('Dừng giữa giao dịch')
except RuntimeError:
    pass
new = con.execute("SELECT Salary FROM EMPLOYEE WHERE Ssn=?", ('123456789',)).fetchone()
assert old == new
con.close()
```

Đừng chỉ so số hàng trả về; kiểm tra giá trị và tính chất nghiệp vụ. `sql/practice.sql` là đề để tự điền; `sql/solutions.sql` là đáp án chạy được; `exercises.json` giữ cả expected rows và lý do.
