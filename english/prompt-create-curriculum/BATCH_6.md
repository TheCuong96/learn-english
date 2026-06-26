Hãy thực hiện Batch 6: Lưu tiến độ học bằng localStorage.

Điều kiện:
- Dựa vào lesson pages và exercises đã có từ Batch 4–5.
- Chưa cần backend/auth.

Nhiệm vụ:
1. Tạo localStorage service/helper riêng.
2. Không gọi localStorage trực tiếp rải rác trong nhiều component.
3. Handle an toàn nếu app có SSR:
   - Kiểm tra typeof window !== "undefined".
4. Lưu lesson progress:
   - not-started
   - in-progress
   - completed
5. Lưu:
   - lessonSlug
   - status
   - bestScore
   - attempts
   - lastStudiedAt
   - completedAt
6. Lưu wrong answers:
   - lessonSlug
   - exerciseId
   - question
   - userAnswer
   - correctAnswer
   - explanation
   - createdAt
7. Khi user mở lesson:
   - Mark lesson là in-progress.
8. Khi user hoàn thành mini test:
   - Lưu attempts.
   - Cập nhật bestScore.
   - Nếu điểm đạt ngưỡng, ví dụ >= 70%, mark completed.
9. Trang /grammar/a1:
   - Hiển thị progress từng lesson.
   - Hiển thị tổng số bài đã hoàn thành.
   - Hiển thị progress bar tổng A1.
10. Tạo trang hoặc section “Câu sai của tôi” nếu đơn giản:
   - Có thể đặt ở /grammar/a1/review.
   - Nếu chưa tạo route, ít nhất tạo helper và TODO rõ.

Type gợi ý:

interface LessonProgress {
  lessonSlug: string;
  status: "not-started" | "in-progress" | "completed";
  bestScore?: number;
  attempts: number;
  lastStudiedAt?: string;
  completedAt?: string;
}

interface WrongAnswerRecord {
  lessonSlug: string;
  exerciseId: string;
  question: string;
  userAnswer: string | string[];
  correctAnswer: string | string[];
  explanation: string;
  createdAt: string;
}

LocalStorage keys gợi ý:
- englishApp.grammar.a1.lessonProgress
- englishApp.grammar.a1.wrongAnswers
- englishApp.grammar.a1.testHistory

Output yêu cầu:
1. File đã thêm/sửa.
2. Helper localStorage nằm ở đâu.
3. Progress được lưu khi nào.
4. Wrong answers được lưu khi nào.
5. UI nào đã hiển thị progress.
6. Hướng dẫn test:
   - Mở lesson
   - Làm mini test
   - Reload page
   - Kiểm tra progress còn giữ không
7. Build/lint/typecheck nếu có.