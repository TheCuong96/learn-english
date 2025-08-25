#!/usr/bin/env python3
"""
English Teacher Web Application - Ứng dụng Web Giáo viên dạy Tiếng Anh
Phiên bản web với giao diện đẹp và tương tác tốt hơn
"""

from flask import Flask, render_template, request, jsonify, session, send_file
import os
import json
import random
from datetime import datetime
import base64

app = Flask(__name__)
app.secret_key = 'english_teacher_secret_key_2024'

class EnglishTeacherWeb:
    def __init__(self):
        self.audio_base_path = "/workspace/dk_english_for_everyone_course_book_level_2_beginner-20250810T010254Z-1-001/dk_english_for_everyone_course_book_level_2_beginner"
        
        # Comprehensive lesson database
        self.lessons = {
            1: {
                "title": "Introductions and Greetings",
                "description": "Học cách chào hỏi và giới thiệu bản thân",
                "vocabulary": [
                    {"word": "hello", "vietnamese": "xin chào", "pronunciation": "/həˈloʊ/"},
                    {"word": "goodbye", "vietnamese": "tạm biệt", "pronunciation": "/ɡʊdˈbaɪ/"},
                    {"word": "please", "vietnamese": "xin vui lòng", "pronunciation": "/pliːz/"},
                    {"word": "thank you", "vietnamese": "cảm ơn", "pronunciation": "/θæŋk juː/"},
                    {"word": "excuse me", "vietnamese": "xin lỗi", "pronunciation": "/ɪkˈskjuːz miː/"},
                    {"word": "sorry", "vietnamese": "xin lỗi", "pronunciation": "/ˈsɔːri/"},
                    {"word": "my name is", "vietnamese": "tên tôi là", "pronunciation": "/maɪ neɪm ɪz/"},
                    {"word": "nice to meet you", "vietnamese": "rất vui được gặp bạn", "pronunciation": "/naɪs tə miːt juː/"}
                ],
                "grammar": {
                    "title": "Present Simple: To Be (am/is/are)",
                    "rules": [
                        "I am - Tôi là",
                        "You are - Bạn là", 
                        "He/She/It is - Anh ấy/Cô ấy/Nó là",
                        "We are - Chúng ta là",
                        "They are - Họ là"
                    ],
                    "examples": [
                        "I am a student. (Tôi là học sinh)",
                        "You are my friend. (Bạn là bạn của tôi)",
                        "She is a teacher. (Cô ấy là giáo viên)",
                        "We are happy. (Chúng ta vui vẻ)",
                        "They are from Vietnam. (Họ đến từ Việt Nam)"
                    ]
                },
                "phrases": [
                    {"english": "Hello, my name is...", "vietnamese": "Xin chào, tên tôi là..."},
                    {"english": "Nice to meet you", "vietnamese": "Rất vui được gặp bạn"},
                    {"english": "How are you?", "vietnamese": "Bạn có khỏe không?"},
                    {"english": "I'm fine, thank you", "vietnamese": "Tôi khỏe, cảm ơn bạn"},
                    {"english": "Goodbye, see you later", "vietnamese": "Tạm biệt, hẹn gặp lại"}
                ],
                "exercises": [
                    {
                        "type": "fill_blank",
                        "question": "Hello, ___ name is John.",
                        "options": ["my", "your", "his"],
                        "answer": 0,
                        "explanation": "'My' được dùng để chỉ sở hữu của người nói"
                    },
                    {
                        "type": "multiple_choice", 
                        "question": "Cách nào sau đây để chào hỏi?",
                        "options": ["Hello", "Goodbye", "Thank you"],
                        "answer": 0,
                        "explanation": "'Hello' là cách chào hỏi phổ biến"
                    }
                ]
            },
            2: {
                "title": "Personal Information",
                "description": "Học cách cung cấp và hỏi thông tin cá nhân",
                "vocabulary": [
                    {"word": "age", "vietnamese": "tuổi", "pronunciation": "/eɪdʒ/"},
                    {"word": "address", "vietnamese": "địa chỉ", "pronunciation": "/ˈædres/"},
                    {"word": "phone number", "vietnamese": "số điện thoại", "pronunciation": "/foʊn ˈnʌmbər/"},
                    {"word": "email", "vietnamese": "email", "pronunciation": "/ˈiːmeɪl/"},
                    {"word": "job", "vietnamese": "công việc", "pronunciation": "/dʒɑːb/"},
                    {"word": "family", "vietnamese": "gia đình", "pronunciation": "/ˈfæməli/"},
                    {"word": "country", "vietnamese": "quốc gia", "pronunciation": "/ˈkʌntri/"},
                    {"word": "city", "vietnamese": "thành phố", "pronunciation": "/ˈsɪti/"}
                ],
                "grammar": {
                    "title": "Question Words (Từ để hỏi)",
                    "rules": [
                        "What - Cái gì, gì",
                        "Where - Ở đâu",
                        "How - Như thế nào",
                        "Who - Ai",
                        "When - Khi nào",
                        "Why - Tại sao"
                    ],
                    "examples": [
                        "What is your name? (Tên bạn là gì?)",
                        "Where are you from? (Bạn đến từ đâu?)",
                        "How old are you? (Bạn bao nhiêu tuổi?)",
                        "Who is your teacher? (Ai là giáo viên của bạn?)",
                        "When is your birthday? (Khi nào là sinh nhật của bạn?)"
                    ]
                },
                "phrases": [
                    {"english": "What's your name?", "vietnamese": "Tên bạn là gì?"},
                    {"english": "Where are you from?", "vietnamese": "Bạn đến từ đâu?"},
                    {"english": "How old are you?", "vietnamese": "Bạn bao nhiêu tuổi?"},
                    {"english": "What do you do?", "vietnamese": "Bạn làm nghề gì?"},
                    {"english": "I work as a...", "vietnamese": "Tôi làm việc như một..."}
                ],
                "exercises": [
                    {
                        "type": "fill_blank",
                        "question": "___ are you from?",
                        "options": ["What", "Where", "How"],
                        "answer": 1,
                        "explanation": "'Where' được dùng để hỏi về địa điểm"
                    },
                    {
                        "type": "multiple_choice",
                        "question": "Để hỏi tuổi, ta dùng:",
                        "options": ["How old are you?", "What age you?", "How years you?"],
                        "answer": 0,
                        "explanation": "'How old are you?' là cách đúng để hỏi tuổi"
                    }
                ]
            },
            3: {
                "title": "Family and Relationships", 
                "description": "Học về gia đình và các mối quan hệ",
                "vocabulary": [
                    {"word": "mother", "vietnamese": "mẹ", "pronunciation": "/ˈmʌðər/"},
                    {"word": "father", "vietnamese": "bố", "pronunciation": "/ˈfɑːðər/"},
                    {"word": "sister", "vietnamese": "chị/em gái", "pronunciation": "/ˈsɪstər/"},
                    {"word": "brother", "vietnamese": "anh/em trai", "pronunciation": "/ˈbrʌðər/"},
                    {"word": "wife", "vietnamese": "vợ", "pronunciation": "/waɪf/"},
                    {"word": "husband", "vietnamese": "chồng", "pronunciation": "/ˈhʌzbənd/"},
                    {"word": "children", "vietnamese": "con cái", "pronunciation": "/ˈtʃɪldrən/"},
                    {"word": "parents", "vietnamese": "bố mẹ", "pronunciation": "/ˈperənts/"}
                ],
                "grammar": {
                    "title": "Possessive Adjectives (Tính từ sở hữu)",
                    "rules": [
                        "my - của tôi",
                        "your - của bạn",
                        "his - của anh ấy",
                        "her - của cô ấy",
                        "our - của chúng ta",
                        "their - của họ"
                    ],
                    "examples": [
                        "This is my family. (Đây là gia đình tôi)",
                        "Your sister is beautiful. (Chị gái bạn rất xinh)",
                        "His brother is tall. (Anh trai anh ấy cao)",
                        "Her mother is kind. (Mẹ cô ấy tốt bụng)",
                        "Our children are smart. (Con cái chúng ta thông minh)"
                    ]
                },
                "phrases": [
                    {"english": "This is my family", "vietnamese": "Đây là gia đình tôi"},
                    {"english": "I have two brothers", "vietnamese": "Tôi có hai anh trai"},
                    {"english": "My sister is a teacher", "vietnamese": "Chị gái tôi là giáo viên"},
                    {"english": "How many children do you have?", "vietnamese": "Bạn có bao nhiêu con?"},
                    {"english": "I love my family", "vietnamese": "Tôi yêu gia đình mình"}
                ],
                "exercises": [
                    {
                        "type": "fill_blank",
                        "question": "This is ___ mother.",
                        "options": ["my", "me", "I"],
                        "answer": 0,
                        "explanation": "'My' là tính từ sở hữu, đứng trước danh từ"
                    },
                    {
                        "type": "multiple_choice",
                        "question": "Từ nào chỉ 'bố mẹ'?",
                        "options": ["parents", "children", "family"],
                        "answer": 0,
                        "explanation": "'Parents' có nghĩa là bố mẹ"
                    }
                ]
            }
        }
        
        # Conversation topics
        self.conversation_topics = [
            {"topic": "Self Introduction", "questions": [
                "What's your name?",
                "Where are you from?", 
                "What do you do?",
                "Tell me about yourself"
            ]},
            {"topic": "Hobbies", "questions": [
                "What are your hobbies?",
                "What do you like to do in your free time?",
                "Do you play any sports?",
                "What's your favorite activity?"
            ]},
            {"topic": "Family", "questions": [
                "Tell me about your family",
                "How many people are in your family?",
                "What does your father do?",
                "Do you have any siblings?"
            ]}
        ]

    def load_user_progress(self, user_id):
        """Load user progress"""
        try:
            if os.path.exists(f"/workspace/progress_{user_id}.json"):
                with open(f"/workspace/progress_{user_id}.json", "r", encoding="utf-8") as f:
                    return json.load(f)
        except:
            pass
        return {
            "level": 1,
            "current_lesson": 1,
            "completed_lessons": [],
            "vocabulary_learned": [],
            "total_study_time": 0,
            "quiz_scores": [],
            "last_login": datetime.now().isoformat()
        }

    def save_user_progress(self, user_id, progress):
        """Save user progress"""
        try:
            with open(f"/workspace/progress_{user_id}.json", "w", encoding="utf-8") as f:
                json.dump(progress, f, ensure_ascii=False, indent=2)
            return True
        except Exception as e:
            print(f"Error saving progress: {e}")
            return False

    def get_lesson_audio_files(self, lesson_num):
        """Get available audio files for a lesson"""
        lesson_path = os.path.join(self.audio_base_path, str(lesson_num))
        if not os.path.exists(lesson_path):
            return []
        
        audio_files = [f for f in os.listdir(lesson_path) if f.endswith('.mp3')]
        return sorted(audio_files)

    def generate_quiz(self, lesson_num, num_questions=5):
        """Generate quiz for a lesson"""
        if lesson_num not in self.lessons:
            return []
        
        lesson = self.lessons[lesson_num]
        quiz_questions = []
        
        # Add lesson exercises
        quiz_questions.extend(lesson.get('exercises', []))
        
        # Generate vocabulary questions
        for vocab in lesson['vocabulary'][:3]:
            quiz_questions.append({
                "type": "translation",
                "question": f"'{vocab['word]}' có nghĩa là gì?",
                "answer": vocab['vietnamese'],
                "word": vocab['word']
            })
        
        # Generate grammar questions based on lesson content
        if 'grammar' in lesson:
            grammar = lesson['grammar']
            if 'am/is/are' in grammar['title'].lower():
                quiz_questions.append({
                    "type": "fill_blank",
                    "question": "I ___ a student.",
                    "options": ["am", "is", "are"],
                    "answer": 0,
                    "explanation": "Với 'I' ta dùng 'am'"
                })
        
        return random.sample(quiz_questions, min(num_questions, len(quiz_questions)))

# Initialize the teacher
teacher = EnglishTeacherWeb()

@app.route('/')
def index():
    """Home page"""
    return render_template('index.html')

@app.route('/api/lessons')
def get_lessons():
    """Get all lessons"""
    return jsonify(teacher.lessons)

@app.route('/api/lesson/<int:lesson_id>')
def get_lesson(lesson_id):
    """Get specific lesson"""
    if lesson_id in teacher.lessons:
        return jsonify(teacher.lessons[lesson_id])
    return jsonify({"error": "Lesson not found"}), 404

@app.route('/api/progress/<user_id>')
def get_progress(user_id):
    """Get user progress"""
    progress = teacher.load_user_progress(user_id)
    return jsonify(progress)

@app.route('/api/progress/<user_id>', methods=['POST'])
def update_progress(user_id):
    """Update user progress"""
    data = request.json
    if teacher.save_user_progress(user_id, data):
        return jsonify({"success": True})
    return jsonify({"error": "Failed to save progress"}), 500

@app.route('/api/quiz/<int:lesson_id>')
def get_quiz(lesson_id):
    """Generate quiz for lesson"""
    num_questions = request.args.get('num', 5, type=int)
    quiz = teacher.generate_quiz(lesson_id, num_questions)
    return jsonify(quiz)

@app.route('/api/audio/<int:lesson_id>')
def get_audio_files(lesson_id):
    """Get audio files for lesson"""
    audio_files = teacher.get_lesson_audio_files(lesson_id)
    return jsonify(audio_files)

@app.route('/api/conversation')
def get_conversation_topic():
    """Get random conversation topic"""
    topic = random.choice(teacher.conversation_topics)
    return jsonify(topic)

@app.route('/audio/<int:lesson_id>/<filename>')
def serve_audio(lesson_id, filename):
    """Serve audio files"""
    try:
        audio_path = os.path.join(teacher.audio_base_path, str(lesson_id), filename)
        if os.path.exists(audio_path):
            return send_file(audio_path, mimetype='audio/mpeg')
        return "Audio file not found", 404
    except Exception as e:
        return f"Error serving audio: {e}", 500

if __name__ == '__main__':
    # Create templates directory
    os.makedirs('/workspace/templates', exist_ok=True)
    os.makedirs('/workspace/static', exist_ok=True)
    
    app.run(host='0.0.0.0', port=5000, debug=True)