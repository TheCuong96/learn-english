# 🎯 Hướng dẫn chạy ứng dụng Next.js

## ✅ ĐÃ HOÀN THÀNH!

AI đã tích hợp thành công `verbs-audio.html` vào project Next.js trong folder `english/`!

---

## 🚀 Cách chạy (3 bước đơn giản):

### Bước 1: Mở Terminal và vào folder english
```bash
cd english
```

### Bước 2: Cài đặt dependencies (chỉ làm 1 lần đầu)
```bash
npm install
```

### Bước 3: Chạy development server
```bash
npm run dev
```

### Bước 4: Mở trình duyệt
Truy cập: **http://localhost:3000**

---

## 📱 Các trang đã tích hợp:

### 1️⃣ Trang chủ - http://localhost:3000
✅ 4 mode bài tập:
- 📚 Học với thẻ ghi nhớ
- ✅ Bài tập trắc nghiệm  
- ✏️ Điền vào chỗ trống
- 🔄 Chia động từ

### 2️⃣ Verbs Audio - http://localhost:3000/verbs-audio
🎵 Tính năng mới (từ verbs-audio.html):
- 🔊 Phát âm 804 động từ
- 🎨 Màu sắc V1/V2/V3 trực quan
- 🔍 Tìm kiếm nhanh
- ⚙️ Tùy chỉnh giọng nói, tốc độ, âm lượng
- 📊 Thống kê real-time

### 3️⃣ Navigation Bar
- Chuyển đổi dễ dàng giữa các trang
- Highlight trang hiện tại

---

## 🎨 Chức năng Verbs Audio đã tích hợp:

### ✨ Tất cả tính năng từ HTML version:
✅ **Phát âm:** Click vào V1, V2, V3 hoặc ví dụ để nghe  
✅ **Tìm kiếm:** Tìm theo tiếng Anh hoặc tiếng Việt  
✅ **Màu sắc:**
  - 🟢 Xanh: V1=V2=V3 (không đổi)
  - 🟡 Vàng: V2=V3 (quy tắc)
  - 🔵 Xanh dương: V3≠V2 (bất quy tắc)

✅ **Tùy chỉnh:**
  - Chọn giọng tiếng Anh
  - Điều chỉnh tốc độ (0.6x - 1.4x)
  - Điều chỉnh âm lượng (0.2 - 1.0)

✅ **Thống kê:**
  - Số lượng kết quả / Tổng số
  - V2=V3 (động từ quy tắc)
  - V1=V2=V3 (động từ không đổi)

---

## 📊 Dữ liệu:

- **Tổng:** 804 động từ
- **File:** `public/data/verbs-data.json`
- **Format:** JSON chuẩn với TypeScript types

---

## 🛠️ Cấu trúc project:

```
english/
├── public/
│   └── data/
│       └── verbs-data.json          # 804 động từ
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Trang chủ - Bài tập
│   │   ├── verbs-audio/
│   │   │   └── page.tsx             # Trang phát âm động từ ⭐ MỚI
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── Navigation.tsx           # Navigation bar ⭐ MỚI
│   │   ├── Flashcard.tsx
│   │   ├── MultipleChoice.tsx
│   │   ├── FillInBlank.tsx
│   │   ├── VerbForms.tsx
│   │   ├── SessionScreen.tsx
│   │   ├── ResultsScreen.tsx
│   │   └── SpeakButton.tsx
│   ├── types/
│   │   └── verb.ts                  # TypeScript types
│   └── utils/
│       ├── verbs-data.ts            # Utils xử lý data
│       └── speech.ts                # Utils phát âm
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 💡 Ưu điểm của Next.js version:

| Tính năng | HTML (cũ) | Next.js (mới) |
|-----------|-----------|---------------|
| **Chạy ứng dụng** | ⚠️ Cần setup server | ✅ `npm run dev` |
| **CORS issues** | ⚠️ Có | ✅ Không |
| **Routing** | ❌ | ✅ Tích hợp sẵn |
| **TypeScript** | ❌ | ✅ Type-safe |
| **Hot Reload** | ❌ | ✅ Tự động |
| **SEO** | ❌ | ✅ |
| **Performance** | ⚠️ | ✅ Tối ưu |
| **Mobile** | ✅ | ✅ |

---

## 🎮 Demo nhanh:

### Test Verbs Audio:
1. Chạy `npm run dev` trong folder `english`
2. Mở http://localhost:3000/verbs-audio
3. Gõ "play" vào ô tìm kiếm → Thấy động từ "play"
4. Click vào box V1 "play" → Nghe phát âm
5. Click vào ví dụ → Nghe cả câu

### Test Bài tập:
1. Vào http://localhost:3000
2. Chọn "Chia động từ"
3. Làm 10 câu random từ 804 động từ
4. Xem điểm số và tải báo cáo

---

## 🔧 Troubleshooting:

### ❌ Lỗi: Cannot find module
```bash
cd english
npm install
```

### ❌ Lỗi: Port 3000 already in use
```bash
# Dừng server đang chạy (Ctrl+C) hoặc đổi port:
npm run dev -- -p 3001
```

### ❌ Lỗi: verbs-data.json not found
```bash
# Kiểm tra file có tồn tại:
dir public\data\verbs-data.json

# Nếu không có, copy lại:
copy ..\verbs-data.json public\data\verbs-data.json
```

---

## 🎉 Tóm tắt:

**Đã tích hợp:**
- ✅ Verbs Audio (804 động từ với phát âm)
- ✅ Practice English (4 mode bài tập)
- ✅ Navigation giữa các trang
- ✅ verbs-data.json (dữ liệu tập trung)

**Cách chạy:**
```bash
cd english
npm install    # Lần đầu tiên
npm run dev    # Mọi lần sau
```

**Truy cập:**
- 🏠 Trang chủ: http://localhost:3000
- 🔊 Verbs Audio: http://localhost:3000/verbs-audio

---

**🎊 Chúc bạn học tốt!** | **Next.js 14** | **React 18** | **TypeScript** | **Tailwind CSS**

