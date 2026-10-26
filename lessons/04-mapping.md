# 04 · Từ ER/EER đến bảng, khóa và ràng buộc

> Đọc cùng **DB-Chapter4.md**. Một mapping tốt cần chỉ ra cả điều đã bảo đảm bằng DDL và điều còn phải kiểm tra thêm.

![Lược đồ quan hệ anime với khóa và bảng liên kết](../docs/assets/schema.svg)

## Bảy bước ER mapping qua cùng một miniworld

| ER construct | Bảng/cột tạo ra | Khóa/ràng buộc |
|---|---|---|
| Strong ANIME | `anime(anime_id,title,release_year)` | PK `anime_id` |
| Weak EPISODE | `episode(anime_id,episode_no,...)` | PK ghép + owner FK |
| 1:N viewer—watch list | FK `viewer_id` trong watch_list | NOT NULL nếu mỗi list phải có owner |
| 1:1 quan hệ | FK ở một phía phù hợp nghiệp vụ | UNIQUE; NOT NULL nếu phía đó total |
| M:N Has_genre | `anime_genre(anime_id,genre_id)` | PK cặp + 2 FK |
| M:N Contains | `contains(list_id,anime_id,added_at)` | PK cặp; giữ thuộc tính quan hệ |
| Multivalued phone | `account_phone(account_id,phone)` | PK cặp + owner FK |
| N-ary relationship | Một bảng có khóa của các participant | Xác định candidate key từ cardinality/FD |

Với quan hệ ternary, không tự động khẳng định cả ba FK là candidate key tối thiểu. Nếu nghiệp vụ nói với mỗi cặp supplier–part chỉ có một project thì cặp đó xác định project; phải xét các phụ thuộc trước khi chọn PK.

## Vì sao FK thường ở phía N?

Mỗi watch list có đúng một owner, nên mỗi hàng list giữ một `viewer_id`. Nếu đặt `list_id` trong viewer, một viewer có nhiều list sẽ cần cột lặp hoặc danh sách trong ô. Khi FK NOT NULL và được enforce, mỗi list chắc chắn trỏ tới một viewer hợp lệ.

Nhưng quy tắc “mỗi viewer có ít nhất một list” là chiều ngược lại. FK trong list không bắt viewer phải được tham chiếu. Cần kiểm tra tồn tại hoặc cơ chế nghiệp vụ bổ sung.

## Khóa: unique và minimal là hai bước

Với ENROLLMENT(StudentID, CourseID, Semester, Grade), nếu một sinh viên có thể học lại cùng môn ở kỳ khác thì `(StudentID, CourseID)` không đủ duy nhất. Giả sử mỗi kỳ chỉ có một lần đăng ký, `(StudentID, CourseID, Semester)` là candidate key. Thêm `Grade` vào vẫn là superkey nhưng không còn tối thiểu.

Primary key là một candidate key được chọn. Các candidate key còn lại thường gọi **alternate keys**. “Secondary key” đôi khi có nghĩa khóa tìm kiếm không duy nhất trong ngữ cảnh index, nên không dùng thuật ngữ đó như đồng nghĩa tuyệt đối với alternate key.

## Total ở phía M:N cần kiểm tra riêng

```sql
-- SQLite: tìm anime vi phạm yêu cầu ít nhất một genre.
SELECT a.anime_id, a.title
FROM anime AS a
WHERE NOT EXISTS (
 SELECT 1 FROM anime_genre AS ag WHERE ag.anime_id=a.anime_id
);
```

Trên fixture anime, kết quả rỗng. Nếu thêm anime mới nhưng chưa thêm anime_genre, query trả hàng vi phạm. Một row-level CHECK thông thường không giải quyết được điều kiện nhiều bảng này; SQLite không cho subquery trong CHECK. Với hệ hỗ trợ thích hợp có thể dùng deferred constraint trigger; với SQLite cần gom thao tác nghiệp vụ vào transaction rồi kiểm tra trước COMMIT.

## ON DELETE không phải “cứ CASCADE là tốt”

Xóa watch list có thể cascade xóa Contains vì hàng liên kết không còn nghĩa khi mất list. Xóa genre đang được dùng có thể nên bị chặn để người quản trị quyết định lại phân loại. `SET NULL` chỉ có nghĩa khi cột FK cho phép NULL và nghiệp vụ chấp nhận mất liên kết. Phân biệt `DROP ... CASCADE` (đối tượng schema) với `ON DELETE CASCADE` (hàng dữ liệu).

## Bài tập

1. M:N Produced_by ánh xạ thành bảng gì? Đặt `StudioID` duy nhất trong ANIME có đủ không?
2. Vì sao PK episode phải có AnimeID khi số tập chỉ duy nhất trong một anime?
3. Quan hệ 1:1 dùng FK mà không có UNIQUE có còn bảo đảm 1:1 không?
4. PK/FK đã enforce có chứng minh được mọi semantic constraint đều đúng không?

<details><summary>Lời giải</summary>

1. `produced_by(anime_id,studio_id)`, PK cặp; một cột đơn trong ANIME không biểu diễn được nhiều studio cho một anime.
2. Hai anime đều có tập 1; khóa phải phân biệt hai owner.
3. Không. Nhiều hàng có thể cùng tham chiếu một hàng cha.
4. Không. Ví dụ total phía “1”, total phía M:N và total specialization cần kiểm tra riêng.

</details>
