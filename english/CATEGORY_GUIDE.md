# 🎯 Hướng dẫn Phân loại Động từ theo Chủ đề

## Tổng quan

Hệ thống đã được cập nhật để phân loại 804 động từ thành **15 chủ đề** khác nhau. Người dùng có thể chọn 1 hoặc nhiều chủ đề để luyện tập.

## 📚 Danh sách Chủ đề

### 1. 🏠 **Hoạt động hàng ngày** (Daily Activities)
Các động từ liên quan đến sinh hoạt hàng ngày:
- wake, sleep, eat, drink, brush, wash, clean, cook, get up, go, come, leave, arrive, dress...

### 2. 💼 **Công việc & Học tập** (Work & Study)
Các động từ liên quan đến công việc và học tập:
- work, study, learn, teach, read, write, finish, complete, meet, attend, schedule, plan, manage...

### 3. 💬 **Giao tiếp** (Communication)
Các động từ về giao tiếp:
- call, talk, speak, say, tell, ask, answer, reply, explain, discuss, chat, email, message...

### 4. 🚶 **Di chuyển & Du lịch** (Movement & Travel)
Các động từ về di chuyển:
- go, come, walk, run, move, travel, visit, drive, ride, fly, leave, arrive, return, jump...

### 5. 🎮 **Giải trí & Thư giãn** (Leisure & Entertainment)
Các động từ về giải trí:
- play, watch, listen, enjoy, relax, rest, celebrate, dance, sing, tour, shop...

### 6. 💻 **Công nghệ & IT** (Technology & IT)
Các động từ về lập trình và công nghệ:
- code, debug, test, deploy, build, compile, run, install, update, configure, commit, push...

### 7. 💰 **Kinh doanh & Tài chính** (Business & Finance)
Các động từ về kinh doanh:
- buy, sell, pay, cost, spend, save, invest, trade, purchase, order, deliver, negotiate...

### 8. 😊 **Cảm xúc** (Emotions & Feelings)
Các động từ về cảm xúc:
- love, like, hate, feel, hope, wish, want, need, prefer, enjoy, miss, worry, fear...

### 9. 🧠 **Suy nghĩ & Hiểu biết** (Thinking & Understanding)
Các động từ về tư duy:
- think, know, understand, believe, remember, forget, imagine, guess, wonder, decide...

### 10. 🎨 **Sáng tạo & Chế tạo** (Creating & Making)
Các động từ về sáng tạo:
- make, create, build, design, develop, write, draw, paint, cook, compose, invent...

### 11. 🏥 **Sức khỏe & Cơ thể** (Health & Body)
Các động từ về sức khỏe:
- eat, drink, sleep, exercise, heal, hurt, breathe, cough, diagnose, treat, cure...

### 12. 🌳 **Thiên nhiên & Thời tiết** (Nature & Weather)
Các động từ về thiên nhiên:
- rain, snow, blow, shine, grow, plant, water, harvest, bloom, fall, rise...

### 13. 👥 **Xã hội & Quan hệ** (Social & Relationships)
Các động từ về quan hệ xã hội:
- meet, help, share, give, take, borrow, lend, marry, introduce, invite, visit, welcome...

### 14. ⚡ **Động từ bất quy tắc** (Irregular Verbs)
Các động từ có V2, V3 không theo quy tắc thêm -ed:
- go → went → gone, eat → ate → eaten, do → did → done...

### 15. 📏 **Động từ có quy tắc** (Regular Verbs)
Các động từ thêm -ed để tạo V2, V3:
- work → worked → worked, play → played → played...

## 🚀 Cách sử dụng

### 1. Mở trang chủ
Truy cập ứng dụng tại `http://localhost:3000`

### 2. Chọn chủ đề
- Click vào "🎯 Chọn chủ đề" để mở rộng
- Click vào các chủ đề muốn luyện tập (có thể chọn nhiều)
- Nút "✓ Chọn tất cả" / "✗ Bỏ chọn tất cả" để thao tác nhanh
- Nếu không chọn chủ đề nào → sẽ dùng tất cả 804 động từ

### 3. Chọn số câu hỏi
- Chọn nhanh: 10, 20, 30, 50 câu
- Hoặc tùy chỉnh: nhập số từ 1 đến 804

### 4. Chọn loại bài tập
- 📚 Thẻ ghi nhớ
- ✅ Trắc nghiệm
- ✏️ Điền vào chỗ trống
- 🔄 Chia động từ

### 5. Làm bài
Hệ thống sẽ tự động lọc động từ theo chủ đề đã chọn

## 🔧 Cách phân loại tự động

Hệ thống sử dụng **từ khóa** để tự động phân loại động từ:

```typescript
// Ví dụ:
- "cook" → thuộc Daily Activities (chứa từ khóa "cook")
- "eat" → thuộc Daily Activities, Health & Body
- "build" → thuộc Creating & Making, Technology & IT
```

Một động từ có thể thuộc **nhiều chủ đề** cùng lúc.

## 📊 Thống kê

Sau khi hoàn thành bài tập, hệ thống sẽ hiển thị:
- Điểm số
- Các từ cần ôn lại
- Báo cáo chi tiết (có thể tải về)

## 💡 Mẹo

1. **Học theo chủ đề:** Chọn 1-2 chủ đề để tập trung
2. **Kết hợp chủ đề:** Chọn nhiều chủ đề liên quan để mở rộng vốn từ
3. **Động từ bất quy tắc:** Chọn riêng chủ đề "⚡ Irregular Verbs" để ôn tập
4. **Tùy chỉnh số câu:** Phù hợp với thời gian và mục tiêu học tập

## 🛠️ Kỹ thuật

**File liên quan:**
- `src/utils/verb-categories.ts` - Định nghĩa categories
- `src/components/CategorySelector.tsx` - UI chọn chủ đề
- `src/app/page.tsx` - Logic filter và session

**Cách thêm chủ đề mới:**
1. Mở `verb-categories.ts`
2. Thêm object mới vào `VERB_CATEGORIES` array
3. Định nghĩa `keywords` để tự động phân loại
4. Component sẽ tự động hiển thị chủ đề mới

---

Chúc bạn học tốt! 🎉

