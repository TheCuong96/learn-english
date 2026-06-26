Hãy thực hiện Batch 4: Tạo trang chi tiết lesson cho A1 Grammar.

Điều kiện:

- Dựa vào data/schema từ Batch 2.
- Dựa vào listing page từ Batch 3.

Nhiệm vụ:

1. Tạo route lesson detail:
   - /grammar/a1/[slug] nếu là Next.js.
   - /grammar/a1/:slug nếu là React Router.
   - Hoặc route tương đương theo framework hiện tại.

2. Render đầy đủ nội dung lesson:
   - Header bài học
   - Level
   - Module
   - Thời lượng ước tính
   - Mục tiêu bài học
   - Công thức
   - Cách dùng
   - Ví dụ Anh-Việt
   - Lỗi người Việt thường gặp
   - Ghi chú nhanh
   - Summary cuối bài
   - Bài trước / bài tiếp theo

3. Chưa cần interactive exercises ở batch này.
   - Có thể render danh sách bài tập dưới dạng preview/static.
   - Phần check đáp án sẽ làm ở Batch 5.

4. Lesson page phải handle:
   - Lesson tồn tại và có full content.
   - Lesson chỉ có placeholder metadata.
   - Slug không tồn tại.

5. UI detail:
   - Dùng section/card rõ ràng.
   - Công thức nên hiển thị dạng bảng/card.
   - Ví dụ Anh-Việt nên dễ đọc.
   - Common mistakes cần hiển thị rõ:
     - Sai
     - Đúng
     - Giải thích

6. Accessibility:
   - Heading h1/h2/h3 đúng thứ tự.
   - Link bài trước/bài sau rõ label.
   - Không dùng div click thay cho button/link.

7. SEO nếu framework hỗ trợ:
   - Meta title theo lesson.
   - Meta description theo lesson.

Output yêu cầu:

1. File đã thêm/sửa.
2. Route lesson detail hoạt động với 3 bài đầu.
3. Placeholder lesson không làm app crash.
4. Build/lint/typecheck nếu có.
5. Không phá module verbs.
