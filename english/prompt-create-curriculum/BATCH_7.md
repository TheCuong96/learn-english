Hãy thực hiện Batch 7: Polish module A1 Grammar.

Nhiệm vụ:
1. Review UI trên mobile.
2. Review UI trên desktop.
3. Kiểm tra navigation.
4. Kiểm tra lesson listing.
5. Kiểm tra lesson detail.
6. Kiểm tra exercises.
7. Kiểm tra progress localStorage.

SEO:
- Mỗi page chính có title hợp lý.
- /grammar có meta description.
- /grammar/a1 có meta description.
- Lesson detail có title theo lesson.
- Lesson detail có description theo lesson.
- Heading h1/h2/h3 đúng thứ tự.

Accessibility:
- Button thật, không dùng div onClick.
- Input có label.
- Feedback đúng/sai có text, không chỉ có màu.
- Có focus visible.
- Accordion nếu có thì có aria-expanded.
- Link có text rõ ràng.
- Có semantic HTML: main, section, article, nav nếu phù hợp.

Performance:
- Không import toàn bộ content nặng vào home nếu không cần.
- Nếu framework hỗ trợ code splitting, tận dụng route-based splitting.
- Nếu có client component, chỉ client hóa phần interactive exercises.
- Không dùng thư viện nặng không cần thiết.
- Tránh re-render toàn bộ lesson khi chọn đáp án nếu có thể.
- Build output không có warning nghiêm trọng.

Content quality:
- Kiểm tra 3 lesson đầu:
  - Tiếng Việt dễ hiểu.
  - Ví dụ đúng A1.
  - Không copy câu từ Test-English.
  - Có đủ objectives, formulas, usages, examples, common mistakes, exercises, mini test.
- Kiểm tra placeholder 33 bài còn lại:
  - Không crash.
  - Có trạng thái “Nội dung đang được phát triển” hoặc tương đương.

Final check:
- Chạy lint nếu có.
- Chạy typecheck nếu có.
- Chạy build nếu có.
- Ghi lại lỗi nếu không pass.

Output yêu cầu:
1. Tổng kết các cải thiện.
2. File đã thêm/sửa.
3. Kết quả lint/typecheck/build.
4. Những lỗi còn lại nếu có.
5. TODO tiếp theo để hoàn thiện toàn bộ 36 bài A1.
6. Đề xuất bước phát triển sau:
   - thêm toàn bộ content 36 bài
   - thêm review theo lỗi sai
   - thêm spaced repetition
   - thêm level test A1