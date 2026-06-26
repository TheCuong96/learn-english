Hãy thực hiện Batch 5: Tạo hệ thống bài tập interactive cho Grammar lesson.

Điều kiện:
- Dựa vào lesson detail ở Batch 4.
- Dựa vào Exercise schema ở Batch 2.

Mục tiêu:
Tạo reusable exercise components để dùng cho nhiều lesson.

Exercise types cần hỗ trợ trước:
1. multiple-choice
2. fill-blank
3. translation

Nếu có thời gian, hỗ trợ thêm:
4. reorder
5. error-correction

Nhiệm vụ:
1. Tạo component ExerciseRenderer nhận vào Exercise.
2. Tạo MultipleChoiceExercise.
3. Tạo FillBlankExercise.
4. Tạo TranslationExercise.
5. Tạo MixedTest hoặc MiniTest component.
6. Tạo logic check answer:
   - So sánh answer chính xác.
   - Với fill blank / translation, normalize cơ bản:
     - trim
     - lowercase nếu phù hợp
     - bỏ khoảng trắng thừa
   - Cho phép correctAnswer là string hoặc string[].
7. Khi user trả lời:
   - Hiển thị “Đúng” hoặc “Sai”.
   - Hiển thị đáp án đúng.
   - Hiển thị giải thích.
   - Không chỉ dùng màu sắc; phải có text.
8. Mini test:
   - Hiển thị 10 câu.
   - Tính điểm.
   - Hiển thị kết quả.
   - Có nút làm lại.
9. Lesson detail page:
   - Thêm section “Bài tập luyện tập”.
   - Thêm section “Mini test cuối bài”.
10. Không cần lưu progress ở batch này, chỉ cần interactive hoạt động. Progress sẽ làm ở Batch 6.

Yêu cầu UX:
- Không reload page khi check đáp án.
- Button có disabled state hợp lý.
- Có reset/làm lại.
- Mobile-friendly.
- Không crash nếu exercise thiếu options.

Yêu cầu Accessibility:
- Input có label.
- Button là button thật.
- Feedback có thể dùng aria-live nếu hợp lý.
- Đúng/sai có chữ rõ ràng.

Output yêu cầu:
1. File đã thêm/sửa.
2. Exercise components đã tạo.
3. Các dạng bài đã hỗ trợ.
4. Cách test bài tập trong 3 lesson đầu.
5. Build/lint/typecheck nếu có.
6. Ghi rõ TODO nếu reorder/error-correction chưa làm.