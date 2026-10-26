# Lab 06 · Capstone Anime Streaming

![Lược đồ thực hành](../docs/assets/schema.svg)

## Phạm vi

Đây là miniworld học tập độc lập lấy cảm hứng từ chủ đề BTL của bạn, **không phải bản thay thế EERD cuối cùng của nhóm**. Account có thể vừa viewer vừa content admin; anime có genre và studio qua M:N; episode yếu theo anime; watch list chứa nhiều anime và lưu AddedAt tại Contains.

| Thực thể/quan hệ | Bảng | Điều cần chú ý |
|---|---|---|
| Account, Viewer, Admin | account, viewer, content_admin | Total + overlapping theo giả thiết lab |
| Anime, Genre, Has_genre | anime, genre, anime_genre | Anime phải có ít nhất một genre |
| Studio, Produced_by | studio, produced_by | Bảng liên kết cho M:N |
| Episode | episode | PK (anime_id, episode_no) |
| Watch list, Contains | watch_list, contains | AddedAt thuộc quan hệ Contains |
| Rating | rating | Một viewer đánh giá một anime tối đa một hàng; score 1..10 |

## Chạy luồng có validation

```bash
python tools/capstone.py
```

Hàm add_anime mở transaction, thêm anime, thêm genre liên kết, kiểm invariants rồi commit. Nếu genre rỗng, hàm ném ValueError và transaction rollback. Đây là **validation ở tầng service**; người chạy raw SQL ngoài hàm vẫn có thể tạo state vi phạm. Xóa liên kết genre cuối cùng cũng phải đi qua một transaction có kiểm tra tương tự trong sản phẩm hoàn chỉnh.

## Năm truy vấn tự luyện và output

```sql
-- 1. Anime có nhiều hơn một genre: Sky Academy, Orbit City.
SELECT a.title,COUNT(*) AS genres FROM anime a
JOIN anime_genre ag ON ag.anime_id=a.anime_id
GROUP BY a.anime_id,a.title HAVING COUNT(*)>1 ORDER BY a.anime_id;

-- 2. Anime chưa có rating: Paper Moon.
SELECT title FROM anime a WHERE NOT EXISTS(
 SELECT 1 FROM rating r WHERE r.anime_id=a.anime_id
) ORDER BY anime_id;

-- 3. Score trung bình: Sky Academy=9, Quiet Garden=8, Orbit City=9.
SELECT a.title,AVG(r.score) AS avg_score FROM anime a
JOIN rating r ON r.anime_id=a.anime_id
GROUP BY a.anime_id,a.title ORDER BY a.anime_id;

-- 4. Account thuộc cả hai subclass: chi.
SELECT a.username FROM account a
JOIN viewer v ON v.account_id=a.account_id
JOIN content_admin c ON c.account_id=a.account_id ORDER BY a.account_id;

-- 5. List Weekend và thứ tự thêm: Sky Academy, Quiet Garden.
SELECT a.title,c.added_at FROM watch_list w
JOIN contains c ON c.list_id=w.list_id JOIN anime a ON a.anime_id=c.anime_id
WHERE w.list_id=1 ORDER BY c.added_at,c.anime_id;
```

## Bài phát triển tiếp có tiêu chí chấm

1. Thêm lịch sử xem theo viewer–episode, định nghĩa rõ một lần xem hay trạng thái xem hiện tại (2đ).
2. Viết query progress theo anime và tránh nhân số dòng khi join genre (2đ).
3. Chứng minh hai PK ghép phù hợp nghiệp vụ (2đ).
4. Kiểm soát xóa genre cuối và account mất role cuối trong transaction (2đ).
5. Tạo dữ liệu biên: anime chưa được rating, watch list rỗng, viewer kiêm admin (2đ).

Đây là bài mở; một sản phẩm tốt phải nêu assumptions và kiểm invariants, không chỉ có đủ CREATE TABLE.
