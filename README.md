# 🎓 Giáo Viên Tiếng Anh - English For Everyone

Ứng dụng học tiếng Anh tương tác dựa trên bộ sách "English For Everyone" với giao diện tiếng Việt thân thiện và các tính năng học tập hiện đại.

## ✨ Tính Năng Chính

### 🏠 **Trang Chủ (Dashboard)**
- Tổng quan tiến độ học tập
- Thống kê số bài học đã hoàn thành
- Thời gian học tập tổng cộng
- Các hành động nhanh: tiếp tục bài học, ôn lại bài cũ, làm bài kiểm tra

### 📚 **Bài Học (Lessons)**
- **49 bài học** được sắp xếp theo cấp độ từ cơ bản đến nâng cao
- Mỗi bài học bao gồm:
  - Audio chính (nội dung bài học)
  - 5 file audio luyện tập
  - File audio ví dụ
- Hệ thống theo dõi trạng thái: chưa bắt đầu, đang học, đã hoàn thành
- Bộ lọc bài học theo trạng thái

### 🎯 **Luyện Tập (Practice)**
- **Từ vựng**: Học và ghi nhớ từ mới
- **Ngữ pháp**: Luyện tập cấu trúc câu
- **Nghe hiểu**: Luyện kỹ năng nghe
- **Phát âm**: Luyện phát âm chuẩn

### 📊 **Tiến Độ (Progress)**
- Biểu đồ tiến độ tổng thể
- Thống kê thời gian học hôm nay
- Chuỗi học liên tiếp
- Lịch sử hoạt động gần đây

### 🎵 **Trình Phát Audio**
- Điều khiển phát/dừng, tiến/lùi
- Thanh tiến độ thời gian thực
- Tự động chuyển bài tiếp theo
- Hiển thị thông tin bài học hiện tại

## 🚀 Cách Sử Dụng

### 1. **Khởi Động Ứng Dụng**
```bash
# Mở file index.html trong trình duyệt web
# Hoặc sử dụng local server
python -m http.server 8000
# Sau đó truy cập: http://localhost:8000
```

### 2. **Bắt Đầu Học**
1. Chọn tab **"Bài Học"**
2. Chọn bài học muốn học (ví dụ: Bài học 1)
3. Xem chi tiết bài học và các file audio
4. Nhấn **"Bắt đầu học"** để bắt đầu
5. Sử dụng trình phát audio để nghe và học

### 3. **Theo Dõi Tiến Độ**
- Xem tổng quan ở **"Trang Chủ"**
- Kiểm tra chi tiết ở **"Tiến Độ"**
- Theo dõi hoạt động gần đây

### 4. **Luyện Tập**
- Chọn tab **"Luyện Tập"**
- Chọn loại bài tập muốn thực hành
- Hoàn thành các bài tập để cải thiện kỹ năng

## 🛠️ Cấu Trúc Dự Án

```
├── index.html          # Giao diện chính
├── styles.css          # Thiết kế và giao diện
├── script.js           # Logic ứng dụng
├── README.md           # Hướng dẫn sử dụng
└── dk_english_for_everyone_course_book_level_2_beginner-20250810T010254Z-1-001/
    └── dk_english_for_everyone_course_book_level_2_beginner/
        ├── 1/          # Bài học 1
        │   ├── 1_1.mp3
        │   ├── 1_4_1.mp3
        │   ├── 1_4_2.mp3
        │   └── ...
        ├── 2/          # Bài học 2
        └── ...         # Các bài học khác
```

## 🎨 Thiết Kế Giao Diện

### **Responsive Design**
- Tương thích với mọi thiết bị (desktop, tablet, mobile)
- Giao diện thích ứng tự động
- Thiết kế Material Design hiện đại

### **Màu Sắc & Typography**
- Gradient màu xanh dương hiện đại
- Font chữ dễ đọc (Segoe UI)
- Icon Font Awesome đẹp mắt

### **Animation & Effects**
- Hiệu ứng chuyển đổi mượt mà
- Hover effects tương tác
- Loading animations

## 💾 Lưu Trữ Dữ Liệu

Ứng dụng sử dụng **Local Storage** để lưu trữ:
- Tiến độ học tập
- Bài học đã hoàn thành
- Thời gian học tập
- Hoạt động gần đây

## 🔧 Tùy Chỉnh & Mở Rộng

### **Thêm Bài Học Mới**
1. Tạo thư mục mới trong cấu trúc bài học
2. Thêm file audio tương ứng
3. Cập nhật logic trong `script.js`

### **Tùy Chỉnh Giao Diện**
- Chỉnh sửa `styles.css` để thay đổi màu sắc, layout
- Cập nhật `index.html` để thêm/sửa các thành phần

### **Thêm Tính Năng Mới**
- Mở rộng class `EnglishLearningApp` trong `script.js`
- Thêm các phương thức xử lý logic mới

## 🌟 Tính Năng Nâng Cao (Sẽ Phát Triển)

- [ ] **Hệ thống bài kiểm tra** với câu hỏi đa dạng
- [ ] **Ghi âm phát âm** để so sánh với chuẩn
- [ ] **Gamification** với điểm số và huy hiệu
- [ ] **Đồng bộ đám mây** để lưu trữ tiến độ
- [ ] **Tính năng xã hội** để học nhóm
- [ ] **AI Tutor** hỗ trợ học tập cá nhân hóa

## 📱 Tương Thích Trình Duyệt

- ✅ Chrome (khuyến nghị)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🚨 Lưu Ý Quan Trọng

1. **File Audio**: Cần có quyền truy cập vào các file MP3 trong dự án
2. **Local Storage**: Dữ liệu được lưu trong trình duyệt, xóa cache sẽ mất tiến độ
3. **Tương thích**: Sử dụng trình duyệt hiện đại để có trải nghiệm tốt nhất

## 🤝 Đóng Góp

Nếu bạn muốn đóng góp vào dự án:
1. Fork repository
2. Tạo branch mới cho tính năng
3. Commit thay đổi
4. Tạo Pull Request

## 📞 Hỗ Trợ

Nếu gặp vấn đề hoặc có góp ý:
- Tạo Issue trên repository
- Liên hệ qua email hoặc các kênh hỗ trợ khác

## 📄 Giấy Phép

Dự án này được phát triển để hỗ trợ việc học tiếng Anh. Vui lòng sử dụng có trách nhiệm và tuân thủ các quy định về bản quyền.

---

**🎯 Mục Tiêu**: Giúp người học tiếng Anh có trải nghiệm học tập tốt nhất với công nghệ hiện đại và giao diện thân thiện.

**💡 Slogan**: "Học tiếng Anh một cách thú vị và hiệu quả!"