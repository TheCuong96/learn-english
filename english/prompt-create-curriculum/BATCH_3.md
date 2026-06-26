Hãy thực hiện Batch 3: Tạo UI listing cho Grammar và A1 Grammar.

Điều kiện:
- Dựa vào schema/data đã tạo ở Batch 2.
- Không sửa sâu module verbs hiện tại.
- Chỉ thêm navigation nếu cần để user vào được grammar.

Nhiệm vụ:
1. Tạo route/page Grammar overview:
   - /grammar nếu framework hỗ trợ route kiểu này.
   - Nếu codebase dùng routing khác, tạo route tương đương.

2. Tạo route/page A1 Grammar listing:
   - /grammar/a1 hoặc route tương đương.

3. Trang /grammar:
   - Giới thiệu ngắn: “Học ngữ pháp tiếng Anh theo cấp độ”.
   - Card cho A1 Grammar.
   - Có CTA vào /grammar/a1.
   - Có thể để A2/B1 ở trạng thái “Coming soon”.

4. Trang /grammar/a1:
   - Hiển thị danh sách module A1.
   - Mỗi module có các lesson card.
   - Mỗi lesson card hiển thị:
     - Số thứ tự
     - Tên bài
     - Mô tả ngắn
     - Thời lượng ước tính
     - Số bài tập
     - Trạng thái: chưa học / đang học / hoàn thành nếu đã có progress helper
     - Nút “Học bài”

5. Navigation:
   - Trang chủ
   - Động từ / Verbs
   - Ngữ pháp A1
   - Ôn tập nếu có route, nếu chưa có thì để disabled/coming soon.

6. UI yêu cầu:
   - Mobile-first.
   - Dễ đọc.
   - Không cần design quá phức tạp.
   - Có empty state nếu data không có.
   - Không render crash nếu lesson placeholder chưa có full content.

7. SEO nếu framework hỗ trợ:
   - Title cho /grammar.
   - Title cho /grammar/a1.
   - Meta description tiếng Việt.

Output yêu cầu:
1. File đã thêm/sửa.
2. Route mới đã tạo.
3. Cách vào trang A1 Grammar từ UI.
4. Screenshot mô tả bằng text nếu không thể chụp.
5. Chạy dev/build/lint/typecheck nếu có.
6. Đảm bảo module verbs cũ vẫn hoạt động.