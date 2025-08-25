#!/usr/bin/env python3
"""
English Teacher Application - Ứng dụng Giáo viên dạy Tiếng Anh
Dựa trên khóa học DK English for Everyone Level 1-2 Beginner
"""

import os
import sys
import random
import json
import time
from datetime import datetime
from pathlib import Path
import subprocess
import threading

class EnglishTeacher:
    def __init__(self):
        self.current_level = 1
        self.current_lesson = 1
        self.user_progress = self.load_progress()
        self.audio_base_path = "/workspace/dk_english_for_everyone_course_book_level_2_beginner-20250810T010254Z-1-001/dk_english_for_everyone_course_book_level_2_beginner"
        
        # Lesson content database
        self.lessons = {
            1: {
                "title": "Introductions and Greetings",
                "vocabulary": ["hello", "goodbye", "please", "thank you", "excuse me", "sorry", "my name is", "nice to meet you"],
                "grammar": "Present Simple: I am, You are, He/She is",
                "phrases": [
                    "Hello, my name is...",
                    "Nice to meet you",
                    "How are you?",
                    "I'm fine, thank you",
                    "Goodbye, see you later"
                ]
            },
            2: {
                "title": "Personal Information",
                "vocabulary": ["age", "address", "phone number", "email", "job", "family", "country", "city"],
                "grammar": "Question words: What, Where, How, Who",
                "phrases": [
                    "What's your name?",
                    "Where are you from?",
                    "How old are you?",
                    "What do you do?",
                    "I work as a..."
                ]
            },
            3: {
                "title": "Family and Relationships",
                "vocabulary": ["mother", "father", "sister", "brother", "wife", "husband", "children", "parents"],
                "grammar": "Possessive adjectives: my, your, his, her",
                "phrases": [
                    "This is my family",
                    "I have two brothers",
                    "My sister is a teacher",
                    "How many children do you have?"
                ]
            }
        }
        
        # Common English conversation starters
        self.conversation_starters = [
            "How was your day?",
            "What did you do yesterday?",
            "What are your hobbies?",
            "Tell me about your family",
            "Where would you like to travel?",
            "What's your favorite food?",
            "What do you do for work?",
            "How do you spend your weekends?"
        ]
        
        # Grammar exercises
        self.grammar_exercises = {
            "present_simple": [
                {"question": "I ___ a student.", "options": ["am", "is", "are"], "answer": 0},
                {"question": "She ___ from Vietnam.", "options": ["am", "is", "are"], "answer": 1},
                {"question": "They ___ very friendly.", "options": ["am", "is", "are"], "answer": 2},
            ],
            "question_words": [
                {"question": "___ is your name?", "options": ["What", "Where", "How"], "answer": 0},
                {"question": "___ are you from?", "options": ["What", "Where", "How"], "answer": 1},
                {"question": "___ old are you?", "options": ["What", "Where", "How"], "answer": 2},
            ]
        }

    def load_progress(self):
        """Load user progress from file"""
        try:
            if os.path.exists("/workspace/user_progress.json"):
                with open("/workspace/user_progress.json", "r", encoding="utf-8") as f:
                    return json.load(f)
        except:
            pass
        return {"level": 1, "lesson": 1, "completed_lessons": [], "vocabulary_learned": [], "total_study_time": 0}

    def save_progress(self):
        """Save user progress to file"""
        try:
            with open("/workspace/user_progress.json", "w", encoding="utf-8") as f:
                json.dump(self.user_progress, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"Lỗi khi lưu tiến độ: {e}")

    def play_audio(self, audio_file):
        """Play audio file using system audio player"""
        try:
            audio_path = os.path.join(self.audio_base_path, str(self.current_lesson), audio_file)
            if os.path.exists(audio_path):
                print(f"🔊 Đang phát âm thanh: {audio_file}")
                # Try different audio players
                for player in ['mpg123', 'ffplay', 'aplay', 'paplay']:
                    try:
                        subprocess.run([player, audio_path], check=True, capture_output=True)
                        break
                    except:
                        continue
                else:
                    print("⚠️  Không thể phát âm thanh. Vui lòng cài đặt mpg123 hoặc ffplay")
            else:
                print(f"⚠️  Không tìm thấy file âm thanh: {audio_path}")
        except Exception as e:
            print(f"⚠️  Lỗi khi phát âm thanh: {e}")

    def display_welcome(self):
        """Display welcome message"""
        print("=" * 60)
        print("🎓 CHÀO MỪNG ĐẾN VỚI GIÁO VIÊN TIẾNG ANH AI 🎓")
        print("=" * 60)
        print("📚 Khóa học: DK English for Everyone - Level 1-2 Beginner")
        print("🌟 Học tiếng Anh tương tác với AI Teacher")
        print("🎵 Có âm thanh và bài tập thực hành")
        print("=" * 60)
        print(f"📊 Tiến độ hiện tại: Level {self.user_progress['level']}, Bài {self.user_progress['lesson']}")
        print(f"🏆 Đã hoàn thành: {len(self.user_progress['completed_lessons'])} bài học")
        print(f"📝 Từ vựng đã học: {len(self.user_progress['vocabulary_learned'])} từ")
        print("=" * 60)

    def show_menu(self):
        """Display main menu"""
        print("\n🎯 MENU CHÍNH:")
        print("1. 📖 Học bài mới")
        print("2. 🔄 Ôn tập bài cũ") 
        print("3. 📝 Luyện tập từ vựng")
        print("4. 📚 Luyện tập ngữ pháp")
        print("5. 💬 Thực hành hội thoại")
        print("6. 🎧 Nghe và lặp lại")
        print("7. 📊 Xem tiến độ học tập")
        print("8. ⚙️  Cài đặt")
        print("9. ❌ Thoát")

    def teach_lesson(self, lesson_num=None):
        """Teach a specific lesson"""
        if lesson_num is None:
            lesson_num = self.user_progress['lesson']
        
        if lesson_num not in self.lessons:
            print("❌ Bài học không tồn tại!")
            return
        
        lesson = self.lessons[lesson_num]
        print(f"\n📖 BÀI HỌC {lesson_num}: {lesson['title']}")
        print("=" * 50)
        
        # Introduction
        print("🎯 Hôm nay chúng ta sẽ học:")
        print(f"📝 Từ vựng: {', '.join(lesson['vocabulary'][:5])}...")
        print(f"📚 Ngữ pháp: {lesson['grammar']}")
        print(f"💬 Cụm từ: {len(lesson['phrases'])} cụm từ thông dụng")
        
        input("\n👨‍🏫 Nhấn Enter để bắt đầu học...")
        
        # Teach vocabulary
        self.teach_vocabulary(lesson['vocabulary'])
        
        # Teach grammar
        self.teach_grammar(lesson['grammar'])
        
        # Teach phrases
        self.teach_phrases(lesson['phrases'])
        
        # Practice session
        self.practice_session(lesson_num)
        
        # Mark lesson as completed
        if lesson_num not in self.user_progress['completed_lessons']:
            self.user_progress['completed_lessons'].append(lesson_num)
            self.user_progress['lesson'] = min(lesson_num + 1, max(self.lessons.keys()))
            self.save_progress()
            print(f"🎉 Chúc mừng! Bạn đã hoàn thành bài {lesson_num}!")

    def teach_vocabulary(self, vocabulary):
        """Teach vocabulary with pronunciation"""
        print("\n📝 HỌC TỪ VỰNG:")
        print("-" * 30)
        
        for i, word in enumerate(vocabulary, 1):
            print(f"{i}. {word}")
            
            # Try to play audio for this word
            audio_files = [f"1_{i}.mp3", f"1_4_{i}.mp3", f"1_5_{i}.mp3"]
            for audio_file in audio_files:
                if os.path.exists(os.path.join(self.audio_base_path, "1", audio_file)):
                    response = input(f"   🔊 Nghe phát âm '{word}'? (y/n): ").lower()
                    if response == 'y':
                        self.play_audio(audio_file)
                    break
            
            # Add to learned vocabulary
            if word not in self.user_progress['vocabulary_learned']:
                self.user_progress['vocabulary_learned'].append(word)
            
            time.sleep(0.5)

    def teach_grammar(self, grammar_point):
        """Teach grammar point"""
        print(f"\n📚 NGỮ PHÁP: {grammar_point}")
        print("-" * 30)
        
        if "Present Simple" in grammar_point:
            print("✅ Cách sử dụng:")
            print("   • I am (tôi là)")
            print("   • You are (bạn là)")  
            print("   • He/She is (anh ấy/cô ấy là)")
            print("\n📝 Ví dụ:")
            print("   • I am a student. (Tôi là học sinh)")
            print("   • You are my friend. (Bạn là bạn của tôi)")
            print("   • She is a teacher. (Cô ấy là giáo viên)")
            
        elif "Question words" in grammar_point:
            print("✅ Các từ để hỏi:")
            print("   • What - Cái gì/Gì")
            print("   • Where - Ở đâu")
            print("   • How - Như thế nào")
            print("   • Who - Ai")
            print("\n📝 Ví dụ:")
            print("   • What is your name? (Tên bạn là gì?)")
            print("   • Where are you from? (Bạn đến từ đâu?)")
            print("   • How are you? (Bạn có khỏe không?)")

    def teach_phrases(self, phrases):
        """Teach common phrases"""
        print("\n💬 CỤM TỪ THÔNG DỤNG:")
        print("-" * 30)
        
        for i, phrase in enumerate(phrases, 1):
            print(f"{i}. {phrase}")
            time.sleep(0.3)

    def practice_session(self, lesson_num):
        """Interactive practice session"""
        print("\n🎯 THỰC HÀNH:")
        print("-" * 20)
        
        lesson = self.lessons[lesson_num]
        
        # Vocabulary quiz
        print("📝 Quiz từ vựng:")
        vocab_sample = random.sample(lesson['vocabulary'], min(3, len(lesson['vocabulary'])))
        
        for word in vocab_sample:
            print(f"\nHãy đọc to từ này: '{word}'")
            input("Nhấn Enter khi đã đọc xong...")
            print("👍 Tốt lắm!")
        
        # Phrase practice
        print("\n💬 Luyện tập cụm từ:")
        phrase = random.choice(lesson['phrases'])
        print(f"Hãy lặp lại: '{phrase}'")
        user_input = input("Nhập lại cụm từ: ")
        
        if user_input.lower().strip() == phrase.lower().strip():
            print("🎉 Perfect! Chính xác 100%!")
        else:
            print(f"🔄 Gần đúng rồi! Đáp án: {phrase}")

    def vocabulary_practice(self):
        """Vocabulary practice mode"""
        print("\n📝 LUYỆN TẬP TỪ VỰNG")
        print("=" * 30)
        
        if not self.user_progress['vocabulary_learned']:
            print("❌ Bạn chưa học từ vựng nào. Hãy học bài mới trước!")
            return
        
        print(f"🎯 Bạn đã học {len(self.user_progress['vocabulary_learned'])} từ")
        mode = input("Chọn chế độ: (1) Quiz từ vựng (2) Ôn tập tất cả: ")
        
        if mode == "1":
            self.vocabulary_quiz()
        else:
            self.vocabulary_review()

    def vocabulary_quiz(self):
        """Vocabulary quiz"""
        learned_words = self.user_progress['vocabulary_learned']
        if len(learned_words) < 3:
            print("❌ Cần ít nhất 3 từ để làm quiz!")
            return
        
        quiz_words = random.sample(learned_words, min(5, len(learned_words)))
        score = 0
        
        print("\n🎯 BẮT ĐẦU QUIZ!")
        print("Hãy nhớ lại nghĩa của những từ sau:")
        
        for i, word in enumerate(quiz_words, 1):
            print(f"\n{i}. '{word}' có nghĩa là gì?")
            answer = input("Trả lời: ")
            print("✅ Tốt! (AI sẽ đánh giá sau)")
            score += 1
        
        print(f"\n🏆 Kết quả: {score}/{len(quiz_words)}")
        print("🎉 Excellent! Tiếp tục phát huy!")

    def vocabulary_review(self):
        """Review all learned vocabulary"""
        print("\n📚 ÔN TẬP TỪ VỰNG:")
        for i, word in enumerate(self.user_progress['vocabulary_learned'], 1):
            print(f"{i:2d}. {word}")
            if i % 10 == 0:
                input("Nhấn Enter để tiếp tục...")

    def grammar_practice(self):
        """Grammar practice exercises"""
        print("\n📚 LUYỆN TẬP NGỮ PHÁP")
        print("=" * 30)
        
        print("Chọn chủ đề ngữ pháp:")
        print("1. Present Simple (am/is/are)")
        print("2. Question Words (What/Where/How)")
        
        choice = input("Lựa chọn (1-2): ")
        
        if choice == "1":
            self.grammar_exercise("present_simple")
        elif choice == "2":
            self.grammar_exercise("question_words")
        else:
            print("❌ Lựa chọn không hợp lệ!")

    def grammar_exercise(self, topic):
        """Run grammar exercise for specific topic"""
        exercises = self.grammar_exercises[topic]
        score = 0
        
        print(f"\n🎯 BÀI TẬP: {topic.replace('_', ' ').title()}")
        print("-" * 30)
        
        for i, exercise in enumerate(exercises, 1):
            print(f"\n{i}. {exercise['question']}")
            for j, option in enumerate(exercise['options']):
                print(f"   {chr(97+j)}) {option}")
            
            answer = input("Chọn đáp án (a/b/c): ").lower()
            answer_index = ord(answer) - ord('a') if answer in 'abc' else -1
            
            if answer_index == exercise['answer']:
                print("✅ Chính xác!")
                score += 1
            else:
                correct = exercise['options'][exercise['answer']]
                print(f"❌ Sai rồi! Đáp án đúng: {correct}")
        
        print(f"\n🏆 Điểm số: {score}/{len(exercises)}")
        if score == len(exercises):
            print("🎉 Perfect! Bạn đã nắm vững ngữ pháp!")
        else:
            print("💪 Hãy ôn tập thêm để cải thiện!")

    def conversation_practice(self):
        """Conversation practice mode"""
        print("\n💬 THỰC HÀNH HỘI THOẠI")
        print("=" * 30)
        
        print("🎭 Giáo viên AI sẽ trò chuyện với bạn bằng tiếng Anh")
        print("💡 Hãy trả lời bằng tiếng Anh, đừng ngại sai!")
        
        starter = random.choice(self.conversation_starters)
        print(f"\n👨‍🏫 Teacher: {starter}")
        
        for turn in range(3):
            user_response = input("🧑‍🎓 You: ")
            if not user_response.strip():
                break
                
            # Simple AI responses
            responses = [
                "That's interesting! Can you tell me more?",
                "I see. What do you think about that?", 
                "Good answer! How do you feel about it?",
                "Nice! What else would you like to share?",
                "Excellent! You're doing great!"
            ]
            
            ai_response = random.choice(responses)
            print(f"👨‍🏫 Teacher: {ai_response}")
            
        print("\n🎉 Great conversation! Your English is improving!")
        print("💪 Keep practicing to get better!")

    def listening_practice(self):
        """Listening and repeat practice"""
        print("\n🎧 LUYỆN NGHE VÀ LẶP LẠI")
        print("=" * 30)
        
        # List available audio files
        lesson_path = os.path.join(self.audio_base_path, str(self.current_lesson))
        if not os.path.exists(lesson_path):
            print("❌ Không tìm thấy file âm thanh cho bài này!")
            return
        
        audio_files = [f for f in os.listdir(lesson_path) if f.endswith('.mp3')]
        if not audio_files:
            print("❌ Không có file âm thanh!")
            return
        
        print(f"🎵 Tìm thấy {len(audio_files)} file âm thanh")
        print("Chọn file để nghe:")
        
        for i, file in enumerate(audio_files[:10], 1):  # Show first 10 files
            print(f"{i:2d}. {file}")
        
        try:
            choice = int(input("\nChọn file (số): ")) - 1
            if 0 <= choice < len(audio_files):
                selected_file = audio_files[choice]
                print(f"\n🎧 Đang phát: {selected_file}")
                self.play_audio(selected_file)
                
                print("\n📝 Hãy lặp lại những gì bạn nghe được:")
                user_repeat = input("Nhập những gì bạn nghe: ")
                print("👍 Excellent! Khả năng nghe của bạn đang cải thiện!")
            else:
                print("❌ Lựa chọn không hợp lệ!")
        except ValueError:
            print("❌ Vui lòng nhập số!")

    def show_progress(self):
        """Show user progress"""
        print("\n📊 TIẾN ĐỘ HỌC TẬP")
        print("=" * 30)
        print(f"🎓 Level hiện tại: {self.user_progress['level']}")
        print(f"📖 Bài học hiện tại: {self.user_progress['lesson']}")
        print(f"✅ Đã hoàn thành: {len(self.user_progress['completed_lessons'])} bài")
        print(f"📝 Từ vựng đã học: {len(self.user_progress['vocabulary_learned'])} từ")
        print(f"⏰ Tổng thời gian học: {self.user_progress['total_study_time']} phút")
        
        if self.user_progress['completed_lessons']:
            print(f"\n📚 Các bài đã hoàn thành: {', '.join(map(str, self.user_progress['completed_lessons']))}")
        
        # Calculate progress percentage
        total_lessons = len(self.lessons)
        completed = len(self.user_progress['completed_lessons'])
        progress_percent = (completed / total_lessons) * 100
        
        print(f"\n📈 Tiến độ tổng thể: {progress_percent:.1f}%")
        print("🎯 " + "█" * int(progress_percent/10) + "░" * (10 - int(progress_percent/10)))

    def settings(self):
        """Application settings"""
        print("\n⚙️  CÀI ĐẶT")
        print("=" * 20)
        print("1. 🔄 Reset tiến độ")
        print("2. 📂 Thay đổi đường dẫn audio")
        print("3. 🎵 Test âm thanh")
        print("4. 🔙 Quay lại")
        
        choice = input("Lựa chọn: ")
        
        if choice == "1":
            confirm = input("⚠️  Bạn có chắc muốn reset tiến độ? (yes/no): ")
            if confirm.lower() == "yes":
                self.user_progress = {"level": 1, "lesson": 1, "completed_lessons": [], "vocabulary_learned": [], "total_study_time": 0}
                self.save_progress()
                print("✅ Đã reset tiến độ!")
        elif choice == "2":
            new_path = input("Nhập đường dẫn mới: ")
            if os.path.exists(new_path):
                self.audio_base_path = new_path
                print("✅ Đã cập nhật đường dẫn!")
            else:
                print("❌ Đường dẫn không tồn tại!")
        elif choice == "3":
            print("🎵 Testing audio...")
            test_files = ["1_1.mp3", "1_2.mp3"]
            for test_file in test_files:
                test_path = os.path.join(self.audio_base_path, "1", test_file)
                if os.path.exists(test_path):
                    print(f"Testing: {test_file}")
                    self.play_audio(test_file)
                    break
            else:
                print("❌ Không tìm thấy file test!")

    def run(self):
        """Main application loop"""
        start_time = time.time()
        self.display_welcome()
        
        while True:
            try:
                self.show_menu()
                choice = input("\n🎯 Lựa chọn của bạn (1-9): ").strip()
                
                if choice == "1":
                    self.teach_lesson()
                elif choice == "2":
                    lesson_num = int(input("Nhập số bài muốn ôn tập: "))
                    self.teach_lesson(lesson_num)
                elif choice == "3":
                    self.vocabulary_practice()
                elif choice == "4":
                    self.grammar_practice()
                elif choice == "5":
                    self.conversation_practice()
                elif choice == "6":
                    self.listening_practice()
                elif choice == "7":
                    self.show_progress()
                elif choice == "8":
                    self.settings()
                elif choice == "9":
                    # Update study time
                    session_time = int((time.time() - start_time) / 60)
                    self.user_progress['total_study_time'] += session_time
                    self.save_progress()
                    
                    print("\n👋 Cảm ơn bạn đã học với English Teacher AI!")
                    print(f"⏰ Thời gian học hôm nay: {session_time} phút")
                    print("📚 Hãy tiếp tục học để cải thiện tiếng Anh!")
                    print("🌟 See you next time! Goodbye!")
                    break
                else:
                    print("❌ Lựa chọn không hợp lệ! Vui lòng chọn 1-9")
                
                input("\nNhấn Enter để tiếp tục...")
                
            except KeyboardInterrupt:
                print("\n\n👋 Đã thoát ứng dụng. Goodbye!")
                break
            except ValueError:
                print("❌ Vui lòng nhập số hợp lệ!")
            except Exception as e:
                print(f"❌ Lỗi: {e}")


if __name__ == "__main__":
    print("🚀 Khởi động English Teacher AI...")
    teacher = EnglishTeacher()
    teacher.run()