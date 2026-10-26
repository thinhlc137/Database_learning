# Ôn cuối kỳ: học chủ động, có sản phẩm sau mỗi buổi

> Trọng số 50 câu và hình thức open-book xuất hiện trong DB-Final.md do người dùng cung cấp. Project không có thông báo gốc của học kỳ hiện tại để kiểm chứng chúng. Lịch dưới là đề xuất học, không dự đoán chắc đề thi.

## Chọn một trong ba nhịp học

| Nhịp | Cách thực hiện | Khi hoàn thành phải có |
|---|---|---|
| 14 ngày | 1–2 giờ/ngày; mỗi 2 ngày một cụm nội dung | Sổ lỗi sai và toàn bộ lab cơ bản |
| 7 ngày | 3–4 giờ/ngày; chia đọc–làm–chữa | Một miniworld được mapping và bộ SQL tự viết |
| 3 ngày | Đã học trước; ưu tiên lỗ hổng qua đề chẩn đoán | Một tờ công thức có điều kiện áp dụng |

## Lộ trình 14 ngày

| Ngày | Học | Làm và tự kiểm tra |
|---|---|---|
| 1 | DBMS, schema/state, 3 tầng | Giải thích hai loại data independence bằng ví dụ riêng |
| 2 | Entity, attribute, key | Phân tích miniworld anime, chưa viết SQL |
| 3 | Cardinality, participation, weak entity | Vẽ Chen có chú giải đường đôi, partial key |
| 4 | EER, category, shared subclass | Tự tạo ví dụ cho đủ 4 tổ hợp specialization |
| 5 | Mapping, PK/FK, semantic constraints | Lập bảng “DDL enforce được / cần kiểm thêm” |
| 6 | RA, set/bag, difference, division | Tính từng bảng trung gian, dịch ba câu sang SQL |
| 7 | DDL, SELECT, NULL | Q01–Q10 và lab schema |
| 8 | JOIN, grouping, subquery | Q11–Q20, kiểm thử LEFT JOIN và tập rỗng |
| 9 | Set operations, CTE, window, view | Q21–Q40; phân biệt phần mở rộng thực hành |
| 10 | FD, closure, keys, cover | Tính tay 3 bài trước khi mở công cụ |
| 11 | 2NF/3NF/BCNF, lossless, preservation | Giải TEACH và phản ví dụ decomposition sai |
| 12 | Storage, index, B+ tree | Tính cùng bộ số bằng tay và công cụ |
| 13 | Security, advanced topics | Lab binding/rollback; đọc nguyên mục ở Final |
| 14 | Luyện 50 câu và tổng sửa lỗi | Ghi vì sao mỗi đáp án sai, không chỉ lưu chữ cái |

## Một buổi học nên đi như thế nào?

1. Đọc mục tiêu và nhìn sơ đồ trước (5 phút).
2. Đọc hướng dẫn bổ sung rồi mở phần tương ứng trong tài liệu đầy đủ (25–45 phút).
3. Đóng đáp án và tự viết code/vẽ/tính (20–40 phút).
4. Chạy hoặc kiểm bằng dữ liệu nhỏ, tìm một phản ví dụ (10–20 phút).
5. Ghi lỗi bằng câu hoàn chỉnh: “Mình đặt điều kiện ở WHERE làm mất phòng rỗng”, thay vì chỉ ghi “sai JOIN”.

## Bộ đề tự luận mẫu có lời giải định hướng

**Câu 1 — ER/EER (20 điểm).** Thiết kế anime–genre–studio–episode–account–watch list. Ghi rõ assumptions; total/partial; overlapping/total; belongs-to và Contains.

**Chấm:** 4đ entity/attribute/key; 4đ maximum; 4đ minimum; 4đ weak entity + ISA; 4đ ngữ nghĩa thuộc tính quan hệ. Đáp án đối chiếu nằm ở hướng dẫn chương 2–4 và capstone. Các giả thiết khác vẫn có thể hợp lệ nếu nêu rõ và nhất quán.

**Câu 2 — Mapping (15 điểm).** Viết schema, PK/FK, xác định 3 constraint chưa tự bảo đảm.

**Chấm:** 6đ bảng liên kết/weak entity; 4đ PK/FK; 5đ ít nhất một genre, total specialization, điều kiện nghiệp vụ liên bảng. Đối chiếu `sql/anime-schema.sql` và `tools/capstone.py`.

**Câu 3 — SQL (25 điểm).** Giải Q07, Q16, Q18, Q19 và Q25; mỗi câu 5đ gồm query, giải thích NULL/tập rỗng và output đúng.

**Câu 4 — FD (25 điểm).** Cho R(A,B,C), F={AB→C,C→B}. Tìm keys, NF, phân rã BCNF và nhận xét bảo toàn.

**Lời giải:** keys AB và AC; mọi attribute prime; C→B có C không superkey nên 3NF nhưng không BCNF. Tách CB và AC: giao C, C→CB nên lossless. AB→C không kiểm riêng được từ projected FDs; không bảo toàn. Xem thêm hướng dẫn chương 7.

**Câu 5 — Storage (15 điểm).** Với r=30.000, R=100, B=4096, key=8, pointer=8, unspanned, không header: tính bfr, b, sparse index, số mức và chi phí.

**Lời giải:** 40; 750; 750 entry/3 index block ở mức đầu; 1 block mức trên; 2 mức index; 3 accesses gồm data. Không nhầm 750 entry với 750 index block.

## Checklist cần mang theo khi tự kiểm tra

- SQL: query đã xử lý hàng không match, NULL, trùng và tập rỗng chưa?
- ER: maximum và minimum đã xét độc lập từng phía chưa?
- FD: key có đủ và tối thiểu không? Prime xét mọi candidate key chưa?
- NF: đang xét FD nontrivial và đúng projected FDs ở từng quan hệ con chưa?
- Storage: đơn vị byte/record/block/access có được ghi ở từng dòng chưa?
- Đề thi thực tế: đã xác nhận quy định và phạm vi từ giảng viên chưa?
