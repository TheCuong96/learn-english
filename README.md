# 🎓 English Teacher AI - Giáo viên dạy Tiếng Anh AI

Ứng dụng học tiếng Anh thông minh được phát triển dựa trên khóa học **DK English for Everyone Level 1-2 Beginner**.

## ✨ Tính năng chính

### 🎯 Học tập thông minh
- **📖 Bài học có cấu trúc**: 3 bài học cơ bản với từ vựng, ngữ pháp và cụm từ
- **🎵 Tích hợp âm thanh**: Phát âm chuẩn từ các file MP3 gốc
- **📊 Theo dõi tiến độ**: Lưu trữ tiến độ học tập và thống kê chi tiết
- **🏆 Hệ thống thành tựu**: Hoàn thành bài học và thu thập từ vựng

### 🎮 Phương pháp tương tác
- **💬 Chat với AI**: Thực hành hội thoại với giáo viên AI thông minh
- **🎯 Quiz đa dạng**: Trắc nghiệm, điền từ, dịch nghĩa
- **📝 Luyện tập từ vựng**: Flashcard và bài tập ôn tập
- **📚 Ngữ pháp chi tiết**: Giải thích quy tắc và ví dụ cụ thể

### 🎨 Giao diện đẹp
- **🌐 Web hiện đại**: Giao diện web responsive, thân thiện
- **📱 Mobile-friendly**: Tối ưu cho mọi thiết bị
- **🎭 Terminal version**: Phiên bản dòng lệnh cho dev

## 🚀 Cài đặt và sử dụng

### Cài đặt tự động
```bash
chmod +x setup.sh
./setup.sh
```

### Cài đặt thủ công
```bash
# Cài đặt Python dependencies
pip install -r requirements.txt

# Cài đặt audio players (Linux)
sudo apt-get install mpg123 ffmpeg
```

### Chạy ứng dụng

#### 1. Phiên bản Web (Khuyến nghị)
```bash
python3 english_teacher_web.py
```
Mở trình duyệt tại: **http://localhost:5000**

#### 2. Phiên bản Terminal
```bash
python3 english_teacher.py
```

## 📚 Cấu trúc khóa học

### Bài 1: Introductions and Greetings
- **Từ vựng**: hello, goodbye, please, thank you, excuse me, sorry, my name is, nice to meet you
- **Ngữ pháp**: Present Simple (am/is/are)
- **Cụm từ**: Chào hỏi và giới thiệu cơ bản

### Bài 2: Personal Information  
- **Từ vựng**: age, address, phone number, email, job, family, country, city
- **Ngữ pháp**: Question words (What/Where/How/Who)
- **Cụm từ**: Hỏi và cung cấp thông tin cá nhân

### Bài 3: Family and Relationships
- **Từ vựng**: mother, father, sister, brother, wife, husband, children, parents
- **Ngữ pháp**: Possessive adjectives (my/your/his/her)
- **Cụm từ**: Nói về gia đình và mối quan hệ

## 🎵 Tài nguyên âm thanh

Ứng dụng sử dụng các file âm thanh MP3 từ khóa học gốc:
- **📁 Đường dẫn**: `dk_english_for_everyone_course_book_level_2_beginner-20250810T010254Z-1-001/`
- **🎧 Định dạng**: MP3 chất lượng cao
- **📖 Nội dung**: Phát âm từ vựng, cụm từ và bài tập

## 🎯 Cách sử dụng

### 🌐 Phiên bản Web
1. **Dashboard**: Xem tiến độ tổng quan
2. **Bài học**: Chọn và học từng bài
3. **Từ vựng**: Ôn tập và làm quiz từ vựng  
4. **Ngữ pháp**: Học quy tắc và làm bài tập
5. **Hội thoại**: Chat với AI teacher
6. **Quiz**: Kiểm tra kiến thức

### 💻 Phiên bản Terminal
```
🎯 MENU CHÍNH:
1. 📖 Học bài mới
2. 🔄 Ôn tập bài cũ
3. 📝 Luyện tập từ vựng
4. 📚 Luyện tập ngữ pháp
5. 💬 Thực hành hội thoại
6. 🎧 Nghe và lặp lại
7. 📊 Xem tiến độ học tập
8. ⚙️ Cài đặt
9. ❌ Thoát
```

## 💾 Lưu trữ dữ liệu

- **📊 Tiến độ**: `user_progress.json` (terminal) hoặc `progress_user1.json` (web)
- **📈 Thống kê**: Bài học hoàn thành, từ vựng đã học, thời gian học
- **🏆 Thành tích**: Điểm quiz, cấp độ hiện tại

## 🔧 Cấu hình

### Đường dẫn âm thanh
Thay đổi trong file Python:
```python
self.audio_base_path = "/path/to/your/audio/files"
```

### Cài đặt âm thanh
- **Linux**: mpg123, ffplay, aplay, paplay
- **Audio test**: Chức năng test âm thanh trong settings

## 🎨 Giao diện

### Màu sắc chủ đạo
- **Primary**: #007bff (Xanh dương)
- **Success**: #28a745 (Xanh lá)
- **Warning**: #ffc107 (Vàng)
- **Gradient**: #667eea → #764ba2

### Typography
- **Font**: Inter (Google Fonts)
- **Icons**: Font Awesome 6.0

## 🤖 AI Teacher Features

### Conversation AI
- **Smart responses**: Phản hồi thông minh dựa trên ngữ cảnh
- **Topic suggestions**: Gợi ý chủ đề hội thoại
- **Encouragement**: Khuyến khích và động viên học viên

### Quiz AI
- **Dynamic questions**: Tạo câu hỏi dựa trên nội dung bài học
- **Multiple formats**: Trắc nghiệm, điền từ, dịch nghĩa
- **Instant feedback**: Phản hồi và giải thích ngay lập tức

## 📱 Responsive Design

- **Desktop**: Giao diện đầy đủ với sidebar
- **Tablet**: Layout tối ưu cho màn hình trung bình
- **Mobile**: UI touch-friendly, menu responsive

## 🔐 Privacy & Security

- **Local storage**: Dữ liệu lưu trữ cục bộ
- **No tracking**: Không thu thập dữ liệu cá nhân
- **Offline capable**: Hoạt động không cần internet (trừ AI chat)

## 🚀 Performance

- **Fast loading**: Tối ưu tốc độ tải trang
- **Cached assets**: Cache CSS, JS, fonts
- **Efficient audio**: Lazy loading cho file âm thanh

## 🎯 Roadmap

### Phase 1 ✅
- [x] Basic lesson structure
- [x] Web interface
- [x] Audio integration
- [x] Progress tracking

### Phase 2 🚧
- [ ] Advanced AI conversation
- [ ] Speech recognition
- [ ] More lesson content
- [ ] User authentication

### Phase 3 📋
- [ ] Mobile app
- [ ] Multiplayer learning
- [ ] Advanced analytics
- [ ] Teacher dashboard

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo pull request hoặc báo cáo issues.

### Development
```bash
git clone <repo>
cd english-teacher-ai
pip install -r requirements.txt
python3 english_teacher_web.py
```

## 📜 License

MIT License - Xem file LICENSE để biết thêm chi tiết.

## 🙏 Credits

- **DK English for Everyone**: Nội dung khóa học gốc
- **Flask**: Web framework
- **Font Awesome**: Icons
- **Google Fonts**: Typography

---

**🎉 Chúc bạn học tiếng Anh vui vẻ và hiệu quả với English Teacher AI!**

*📧 Liên hệ: Tạo issue trên GitHub để được hỗ trợ*