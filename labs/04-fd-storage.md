# Lab 04 · Tính tay rồi đối chiếu thuật toán

## Bao đóng và candidate keys

```bash
python tools/fd.py --attrs A,B,C,D,E --fds "A->B,C;B->D;C,D->E" --start A
python tools/fd.py --attrs A,B,C --fds "A->B;B->A" --start C
```

Tên thuộc tính phân cách bằng dấu phẩy: `StudentID,CourseID`, không viết dính thành `StudentIDCourseID`. FD phân cách bằng dấu chấm phẩy; đặt toàn chuỗi trong dấu nháy để shell không hiểu `;` là tách lệnh. Bản CLI và công cụ trong trình đọc giới hạn 12 thuộc tính vì tìm mọi candidate key có chi phí tăng theo tổ hợp.

Thử thứ tự FD ngược: `B->C;A->B`. Với start A, thuật toán phải lặp thêm vòng để suy C; không dừng sau một lần quét.

## Minimal cover

Thử F=`A->B,C;B->C;A,B->C`. Một kết quả tối giản tương đương là A→B, B→C. Tự kiểm: mọi FD gốc suy được từ cover và mọi FD cover suy được từ F. Hai cover tương đương không nhất thiết có cùng biểu diễn.

## Storage

```bash
python tools/storage.py
python tools/storage.py --records 10001 --record-bytes 120 --block-bytes 4096 --overhead 8
```

Trước khi chạy, viết riêng: hữu dụng mỗi block, bfr, data blocks, entry size, index capacity, từng mức index, tổng accesses. Công cụ chỉ mô hình hóa **unspanned + sparse primary multilevel index**; không tự giải mọi biến thể đề storage.

## Tiêu chí hoàn thành

Giải thích được từng dòng trace closure; chứng minh key là tối thiểu; kiểm một output có phép chia không nguyên; từ chối bộ số R lớn hơn block; nêu rõ giả thiết cache. Kết quả âm hoặc fan-out 1 phải báo input không hợp lệ, không được rơi vào vòng lặp vô hạn.
