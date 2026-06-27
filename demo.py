#!/usr/bin/env python3
"""
Demo script để showcase English Teacher AI
"""

import os
import time

def print_banner():
    """Print welcome banner"""
    print("=" * 80)
    print("🎓 ENGLISH TEACHER AI DEMO - DEMO ỨNG DỤNG GIÁO VIÊN TIẾNG ANH AI")
    print("=" * 80)
    print("🌟 Dựa trên khóa học DK English for Everyone Level 1-2 Beginner")
    print("📚 Tích hợp đầy đủ tài liệu PDF và file âm thanh MP3")
    print("🤖 AI Teacher với khả năng tương tác thông minh")
    print("=" * 80)

def show_features():
    """Show main features"""
    print("\n🎯 TÍNH NĂNG CHÍNH:")
    print("-" * 50)
    
    features = [
        "📖 3 bài học có cấu trúc: Chào hỏi, Thông tin cá nhân, Gia đình",
        "🎵 Tích hợp 1000+ file âm thanh MP3 chất lượng cao",
        "💬 Chat với AI Teacher thông minh",
        "📝 Quiz tự động với nhiều dạng bài tập",
        "📊 Theo dõi tiến độ học tập chi tiết",
        "🏆 Hệ thống thành tựu và điểm số",
        "🌐 Giao diện web hiện đại + Terminal version",
        "📱 Responsive design cho mọi thiết bị"
    ]
    
    for i, feature in enumerate(features, 1):
        print(f"{i:2d}. {feature}")
        time.sleep(0.3)

def show_lesson_structure():
    """Show lesson structure"""
    print("\n📚 CẤU TRÚC BÀI HỌC:")
    print("-" * 50)
    
    lessons = {
        1: {
            "title": "Introductions and Greetings",
            "vocab_count": 8,
            "grammar": "Present Simple (am/is/are)",
            "phrases": 5
        },
        2: {
            "title": "Personal Information", 
            "vocab_count": 8,
            "grammar": "Question Words (What/Where/How)",
            "phrases": 5
        },
        3: {
            "title": "Family and Relationships",
            "vocab_count": 8, 
            "grammar": "Possessive Adjectives (my/your/his/her)",
            "phrases": 5
        }
    }
    
    for lesson_id, lesson in lessons.items():
        print(f"\n🎯 Bài {lesson_id}: {lesson['title']}")
        print(f"   📝 Từ vựng: {lesson['vocab_count']} từ")
        print(f"   📚 Ngữ pháp: {lesson['grammar']}")
        print(f"   💬 Cụm từ: {lesson['phrases']} cụm từ thông dụng")

def show_audio_stats():
    """Show audio file statistics"""
    print("\n🎵 THỐNG KÊ TÀI NGUYÊN ÂM THANH:")
    print("-" * 50)
    
    audio_base = "/workspace/dk_english_for_everyone_course_book_level_2_beginner-20250810T010254Z-1-001/dk_english_for_everyone_course_book_level_2_beginner"
    
    total_files = 0
    total_size = 0
    lesson_stats = {}
    
    if os.path.exists(audio_base):
        for lesson_dir in os.listdir(audio_base):
            lesson_path = os.path.join(audio_base, lesson_dir)
            if os.path.isdir(lesson_path):
                mp3_files = [f for f in os.listdir(lesson_path) if f.endswith('.mp3')]
                lesson_files = len(mp3_files)
                lesson_size = sum(os.path.getsize(os.path.join(lesson_path, f)) for f in mp3_files)
                
                lesson_stats[lesson_dir] = {
                    'files': lesson_files,
                    'size': lesson_size / (1024 * 1024)  # MB
                }
                
                total_files += lesson_files
                total_size += lesson_size
        
        print(f"📊 Tổng cộng: {total_files} file MP3")
        print(f"💾 Dung lượng: {total_size / (1024 * 1024):.1f} MB")
        print(f"📁 Số lesson có âm thanh: {len(lesson_stats)}")
        
        # Show top 5 lessons with most audio
        top_lessons = sorted(lesson_stats.items(), key=lambda x: x[1]['files'], reverse=True)[:5]
        print(f"\n🔥 Top 5 lesson có nhiều audio nhất:")
        for i, (lesson, stats) in enumerate(top_lessons, 1):
            print(f"   {i}. Lesson {lesson}: {stats['files']} files ({stats['size']:.1f} MB)")
    else:
        print("⚠️  Không tìm thấy thư mục audio. Đảm bảo đã extract đúng đường dẫn.")

def show_tech_stack():
    """Show technology stack"""
    print("\n🔧 CÔNG NGHỆ SỬ DỤNG:")
    print("-" * 50)
    
    tech_stack = [
        "🐍 Python 3.x - Core language",
        "🌐 Flask - Web framework",
        "🎨 HTML5/CSS3/JavaScript - Frontend",
        "🎵 MP3 Audio Support - Multimedia",
        "📱 Responsive Design - Mobile-first",
        "🤖 AI Conversation - Smart responses",
        "💾 JSON Storage - Progress tracking",
        "🔤 Font Awesome Icons - UI components"
    ]
    
    for tech in tech_stack:
        print(f"   {tech}")
        time.sleep(0.2)

def show_usage_instructions():
    """Show usage instructions"""
    print("\n🚀 HƯỚNG DẪN SỬ DỤNG:")
    print("-" * 50)
    
    print("1️⃣  CHẠY PHIÊN BẢN WEB (Khuyến nghị):")
    print("   📝 python3 english_teacher_web.py")
    print("   🌐 Mở trình duyệt: http://localhost:5000")
    print("   ✨ Giao diện đẹp, tương tác tốt")
    
    print("\n2️⃣  CHẠY PHIÊN BẢN TERMINAL:")
    print("   📝 python3 english_teacher.py")
    print("   💻 Giao diện dòng lệnh đầy đủ tính năng")
    
    print("\n3️⃣  CÀI ĐẶT TỰ ĐỘNG:")
    print("   📝 chmod +x setup.sh && ./setup.sh")
    print("   ⚡ Tự động cài đặt dependencies và audio players")

def show_demo_features():
    """Show demo of key features"""
    print("\n🎮 DEMO CÁC TÍNH NĂNG:")
    print("-" * 50)
    
    print("✅ Học bài với cấu trúc:")
    print("   • Từ vựng + phát âm + nghĩa tiếng Việt")
    print("   • Ngữ pháp với quy tắc và ví dụ")
    print("   • Cụm từ thông dụng trong giao tiếp")
    
    print("\n✅ AI Conversation:")
    print("   • Chat thông minh với phản hồi đa dạng")
    print("   • Gợi ý chủ đề hội thoại")
    print("   • Khuyến khích và động viên")
    
    print("\n✅ Quiz System:")
    print("   • Trắc nghiệm, điền từ, dịch nghĩa")
    print("   • Feedback ngay lập tức")
    print("   • Thống kê điểm số chi tiết")
    
    print("\n✅ Progress Tracking:")
    print("   • Theo dõi bài học đã hoàn thành")
    print("   • Số từ vựng đã học")
    print("   • Thời gian học tập")
    print("   • Điểm quiz và thành tích")

def main():
    """Main demo function"""
    print_banner()
    
    print("\n🎬 BẮT ĐẦU DEMO...")
    time.sleep(1)
    
    show_features()
    time.sleep(2)
    
    show_lesson_structure()
    time.sleep(2)
    
    show_audio_stats()
    time.sleep(2)
    
    show_tech_stack()
    time.sleep(2)
    
    show_demo_features()
    time.sleep(2)
    
    show_usage_instructions()
    
    print("\n" + "=" * 80)
    print("🎉 DEMO HOÀN THÀNH!")
    print("🚀 Hãy chạy ứng dụng để trải nghiệm đầy đủ:")
    print("   • python3 english_teacher_web.py (Web version)")
    print("   • python3 english_teacher.py (Terminal version)")
    print("📚 Chúc bạn học tiếng Anh vui vẻ và hiệu quả!")
    print("=" * 80)

if __name__ == "__main__":
    main()