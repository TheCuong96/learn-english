#!/bin/bash

echo "🚀 Thiết lập English Teacher AI..."

# Install Python dependencies
echo "📦 Cài đặt các thư viện Python..."
pip install -r requirements.txt

# Install audio players for Linux
echo "🎵 Cài đặt audio players..."
sudo apt-get update
sudo apt-get install -y mpg123 ffmpeg

# Make Python files executable
chmod +x english_teacher.py
chmod +x english_teacher_web.py

echo "✅ Thiết lập hoàn tất!"
echo ""
echo "🎯 Cách sử dụng:"
echo "1. Phiên bản Terminal: python3 english_teacher.py"
echo "2. Phiên bản Web: python3 english_teacher_web.py"
echo "   Sau đó mở trình duyệt tại: http://localhost:5000"
echo ""
echo "📚 Tài liệu: Ứng dụng sử dụng các file PDF và audio từ khóa học DK English"
echo "🎉 Chúc bạn học tiếng Anh vui vẻ!"