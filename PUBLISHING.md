# Repository và cách đưa bản cập nhật lên GitHub

## Repo chính

[thinhlc137/Database_learning](https://github.com/thinhlc137/Database_learning) · nhánh `main`.

```bash
git clone https://github.com/thinhlc137/Database_learning.git
cd Database_learning
python tools/check.py
```

Nếu cập nhật repo đã clone: sửa nội dung → `python tools/build.py` → `python tools/check.py` → commit → `git push`.

Phần sau hướng dẫn tạo một bản repo mới từ gói ZIP, khi cần.

## Bước 1 · Tạo repo đích

Đăng nhập GitHub đúng tài khoản. Chọn New repository, tên gợi ý `database-learning-lab`. Nếu muốn mọi người đọc source trực tiếp, chọn Public. Với gói ZIP này, tạo repo **trống**, không thêm README/.gitignore để tránh tạo hai lịch sử ban đầu khác nhau.

Công cụ kết nối hiện nhận diện `thinhlc137`; hãy dùng owner và URL thật của repo bạn vừa tạo. Không push vào repo nhóm/BTL khác chỉ vì đã có quyền trên repo đó.

## Bước 2 · Push từ thư mục gốc

Nếu dùng GitHub Desktop: File → Add local repository; nếu chưa có .git, chọn create repository here; xem Changes rồi Commit và Publish repository. Project đã có README và các file cần thiết.

Hoặc dùng terminal sau khi giải nén và `cd` vào đúng thư mục `database-learning-lab`:

```bash
python tools/check.py

git init -b main
git add .
git commit -m "Build Vietnamese Database Learning Lab"
```

Sau đó thêm URL **repo thật**, chẳng hạn repo tên gợi ý dưới account đã được nhận diện:

```bash
git remote add origin https://github.com/thinhlc137/Database_learning.git
git push -u origin main
```

URL trên là repo chính đã được người dùng chỉ định; nếu tạo bản sao riêng, thay bằng URL repo của bạn. Git có thể yêu cầu bạn đăng nhập. Không đặt token vào source, README hoặc URL remote có nhúng credential. Nếu repo đích đã có nội dung, clone repo đó và đưa project vào một branch mới để review trước khi merge; không dùng force push.

## Bước 3 · GitHub Pages (tùy chọn)

Trong repo: Settings → Pages → Build and deployment → Source: **Deploy from a branch** → branch **main** → folder **/docs** → Save.

`docs/` có toàn bộ file cần phục vụ, kể cả thư viện, font và WASM. Không cần Actions deploy riêng hoặc Node build. Tài nguyên dùng đường dẫn tương đối nên hoạt động cả dưới subpath của project Pages.

## Kiểm tra sau khi publish

Mở URL do GitHub Pages thực sự trả về. Kiểm tra một bài học, một source section, SQL Q07, công cụ FD và quiz. Không suy rằng website đã hoạt động chỉ vì lệnh git push thành công.

Nguồn: [GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
