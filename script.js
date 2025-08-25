// English Learning App - Main JavaScript File
class EnglishLearningApp {
    constructor() {
        this.currentLesson = null;
        this.audioPlayer = null;
        this.lessons = [];
        this.userProgress = this.loadUserProgress();
        this.currentAudioIndex = 0;
        this.audioFiles = [];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadLessons();
        this.updateDashboard();
        this.updateProgress();
        this.loadRecentActivity();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchSection(e.target.dataset.section);
            });
        });

        // Audio player controls
        document.getElementById('play-btn').addEventListener('click', () => this.togglePlay());
        document.getElementById('prev-btn').addEventListener('click', () => this.previousAudio());
        document.getElementById('next-btn').addEventListener('click', () => this.nextAudio());
        document.getElementById('close-btn').addEventListener('click', () => this.hideAudioPlayer());

        // Lesson filter
        document.getElementById('lesson-filter').addEventListener('change', (e) => {
            this.filterLessons(e.target.value);
        });

        // Modal close
        document.getElementById('lesson-modal').addEventListener('click', (e) => {
            if (e.target.id === 'lesson-modal') {
                this.closeLessonModal();
            }
        });
    }

    switchSection(sectionId) {
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');

        // Load section-specific content
        if (sectionId === 'lessons') {
            this.renderLessons();
        } else if (sectionId === 'progress') {
            this.updateProgress();
            this.loadRecentActivity();
        }
    }

    loadLessons() {
        // Simulate loading lessons from the project structure
        this.lessons = [];
        for (let i = 1; i <= 49; i++) {
            const lesson = {
                id: i,
                title: `Bài học ${i}`,
                description: `Nội dung bài học số ${i} - Học từ vựng, ngữ pháp và luyện nghe`,
                status: this.getLessonStatus(i),
                audioFiles: this.getLessonAudioFiles(i),
                completed: this.userProgress.completedLessons.includes(i),
                inProgress: this.userProgress.inProgressLessons.includes(i)
            };
            this.lessons.push(lesson);
        }
    }

    getLessonStatus(lessonId) {
        if (this.userProgress.completedLessons.includes(lessonId)) {
            return 'completed';
        } else if (this.userProgress.inProgressLessons.includes(lessonId)) {
            return 'in-progress';
        }
        return 'not-started';
    }

    getLessonAudioFiles(lessonId) {
        // Simulate audio files based on the project structure
        const files = [];
        const basePath = `dk_english_for_everyone_course_book_level_2_beginner-20250810T010254Z-1-001/dk_english_for_everyone_course_book_level_2_beginner/${lessonId}`;
        
        // Add main lesson audio
        files.push({
            name: `Bài học ${lessonId} - Phần chính`,
            path: `${basePath}/${lessonId}_1.mp3`,
            type: 'main'
        });

        // Add practice audio files
        for (let j = 1; j <= 5; j++) {
            files.push({
                name: `Bài học ${lessonId} - Luyện tập ${j}`,
                path: `${basePath}/${lessonId}_${j + 3}_${j}.mp3`,
                type: 'practice'
            });
        }

        // Add example audio
        files.push({
            name: `Bài học ${lessonId} - Ví dụ`,
            path: `${basePath}/${lessonId}_${lessonId + 3}__eg.mp3`,
            type: 'example'
        });

        return files;
    }

    renderLessons() {
        const lessonsGrid = document.getElementById('lessons-grid');
        lessonsGrid.innerHTML = '';

        this.lessons.forEach(lesson => {
            const lessonCard = this.createLessonCard(lesson);
            lessonsGrid.appendChild(lessonCard);
        });
    }

    createLessonCard(lesson) {
        const card = document.createElement('div');
        card.className = `lesson-card ${lesson.status}`;
        card.onclick = () => this.openLessonModal(lesson);

        card.innerHTML = `
            <div class="lesson-header">
                <div class="lesson-number">${lesson.id}</div>
                <span class="lesson-status ${lesson.status}">
                    ${this.getStatusText(lesson.status)}
                </span>
            </div>
            <h3 class="lesson-title">${lesson.title}</h3>
            <p class="lesson-description">${lesson.description}</p>
            <div class="lesson-actions">
                <button class="btn btn-primary" onclick="event.stopPropagation(); app.startLesson(${lesson.id})">
                    <i class="fas fa-play"></i> Bắt đầu
                </button>
                <button class="btn btn-secondary" onclick="event.stopPropagation(); app.openLessonModal(${lesson})">
                    <i class="fas fa-info-circle"></i> Chi tiết
                </button>
            </div>
        `;

        return card;
    }

    getStatusText(status) {
        const statusMap = {
            'completed': 'Hoàn thành',
            'in-progress': 'Đang học',
            'not-started': 'Chưa bắt đầu'
        };
        return statusMap[status] || 'Chưa bắt đầu';
    }

    filterLessons(filter) {
        const lessonsGrid = document.getElementById('lessons-grid');
        lessonsGrid.innerHTML = '';

        let filteredLessons = this.lessons;
        
        if (filter === 'completed') {
            filteredLessons = this.lessons.filter(lesson => lesson.status === 'completed');
        } else if (filter === 'in-progress') {
            filteredLessons = this.lessons.filter(lesson => lesson.status === 'in-progress');
        } else if (filter === 'not-started') {
            filteredLessons = this.lessons.filter(lesson => lesson.status === 'not-started');
        }

        filteredLessons.forEach(lesson => {
            const lessonCard = this.createLessonCard(lesson);
            lessonsGrid.appendChild(lessonCard);
        });
    }

    openLessonModal(lesson) {
        this.currentLesson = lesson;
        document.getElementById('modal-title').textContent = `Bài học ${lesson.id}: ${lesson.title}`;
        
        const audioFilesContainer = document.getElementById('lesson-audio-files');
        audioFilesContainer.innerHTML = '';

        lesson.audioFiles.forEach((file, index) => {
            const audioItem = document.createElement('div');
            audioItem.className = 'audio-file-item';
            audioItem.onclick = () => this.playAudioFile(file, index);
            
            audioItem.innerHTML = `
                <i class="fas fa-volume-up"></i>
                <div class="audio-file-info">
                    <h4>${file.name}</h4>
                    <p>${this.getAudioTypeText(file.type)}</p>
                </div>
            `;
            
            audioFilesContainer.appendChild(audioItem);
        });

        document.getElementById('lesson-modal').classList.add('show');
    }

    closeLessonModal() {
        document.getElementById('lesson-modal').classList.remove('show');
        this.currentLesson = null;
    }

    getAudioTypeText(type) {
        const typeMap = {
            'main': 'Nội dung chính',
            'practice': 'Luyện tập',
            'example': 'Ví dụ'
        };
        return typeMap[type] || 'Audio';
    }

    startLesson(lessonId) {
        const lesson = this.lessons.find(l => l.id === lessonId);
        if (!lesson) return;

        // Mark lesson as in progress
        if (!this.userProgress.inProgressLessons.includes(lessonId)) {
            this.userProgress.inProgressLessons.push(lessonId);
            this.saveUserProgress();
        }

        // Start with first audio file
        this.playAudioFile(lesson.audioFiles[0], 0);
        this.closeLessonModal();
    }

    playAudioFile(audioFile, index) {
        this.currentAudioIndex = index;
        this.audioFiles = this.currentLesson.audioFiles;
        
        // Update audio player UI
        document.getElementById('current-track').textContent = audioFile.name;
        document.getElementById('current-lesson').textContent = `Bài học ${this.currentLesson.id}`;
        
        // Show audio player
        document.getElementById('audio-player').classList.add('show');
        
        // Simulate audio playback (in real app, this would use HTML5 Audio API)
        this.simulateAudioPlayback(audioFile);
        
        // Update lesson status
        this.updateLessonProgress();
    }

    simulateAudioPlayback(audioFile) {
        // Simulate audio duration (random between 2-5 minutes)
        const duration = Math.floor(Math.random() * 180) + 120;
        let currentTime = 0;
        
        // Update progress bar
        const progressBar = document.getElementById('audio-progress');
        const currentTimeDisplay = document.getElementById('current-time');
        const totalTimeDisplay = document.getElementById('total-time-display');
        
        totalTimeDisplay.textContent = this.formatTime(duration);
        
        const interval = setInterval(() => {
            currentTime += 1;
            const progress = (currentTime / duration) * 100;
            
            progressBar.style.width = `${progress}%`;
            currentTimeDisplay.textContent = this.formatTime(currentTime);
            
            if (currentTime >= duration) {
                clearInterval(interval);
                this.onAudioComplete();
            }
        }, 1000);
        
        // Store interval for cleanup
        this.currentAudioInterval = interval;
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    onAudioComplete() {
        // Mark current audio as completed
        if (this.currentLesson && this.currentLesson.audioFiles[this.currentAudioIndex]) {
            const audioFile = this.currentLesson.audioFiles[this.currentAudioIndex];
            this.userProgress.completedAudioFiles.push({
                lessonId: this.currentLesson.id,
                audioPath: audioFile.path,
                completedAt: new Date().toISOString()
            });
            this.saveUserProgress();
        }
        
        // Auto-play next audio if available
        if (this.currentAudioIndex < this.audioFiles.length - 1) {
            setTimeout(() => {
                this.nextAudio();
            }, 1000);
        }
    }

    togglePlay() {
        const playBtn = document.getElementById('play-btn');
        const icon = playBtn.querySelector('i');
        
        if (icon.classList.contains('fa-play')) {
            icon.classList.remove('fa-play');
            icon.classList.add('fa-pause');
            // Resume audio
        } else {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            // Pause audio
        }
    }

    previousAudio() {
        if (this.currentAudioIndex > 0) {
            this.currentAudioIndex--;
            this.playAudioFile(this.audioFiles[this.currentAudioIndex], this.currentAudioIndex);
        }
    }

    nextAudio() {
        if (this.currentAudioIndex < this.audioFiles.length - 1) {
            this.currentAudioIndex++;
            this.playAudioFile(this.audioFiles[this.currentAudioIndex], this.currentAudioIndex);
        }
    }

    hideAudioPlayer() {
        document.getElementById('audio-player').classList.remove('show');
        
        // Clean up current audio
        if (this.currentAudioInterval) {
            clearInterval(this.currentAudioInterval);
        }
        
        // Reset play button
        const playBtn = document.getElementById('play-btn');
        const icon = playBtn.querySelector('i');
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }

    updateLessonProgress() {
        if (!this.currentLesson) return;
        
        const lesson = this.lessons.find(l => l.id === this.currentLesson.id);
        if (lesson) {
            lesson.inProgress = true;
            lesson.status = 'in-progress';
            this.renderLessons();
        }
    }

    markAsCompleted() {
        if (!this.currentLesson) return;
        
        const lessonId = this.currentLesson.id;
        
        // Mark as completed
        if (!this.userProgress.completedLessons.includes(lessonId)) {
            this.userProgress.completedLessons.push(lessonId);
        }
        
        // Remove from in progress
        this.userProgress.inProgressLessons = this.userProgress.inProgressLessons.filter(id => id !== lessonId);
        
        // Update lesson status
        const lesson = this.lessons.find(l => l.id === lessonId);
        if (lesson) {
            lesson.completed = true;
            lesson.inProgress = false;
            lesson.status = 'completed';
        }
        
        this.saveUserProgress();
        this.updateDashboard();
        this.updateProgress();
        this.renderLessons();
        this.closeLessonModal();
        
        // Show success message
        this.showNotification('Chúc mừng! Bạn đã hoàn thành bài học này.', 'success');
    }

    updateDashboard() {
        document.getElementById('completed-lessons').textContent = this.userProgress.completedLessons.length;
        document.getElementById('total-time').textContent = this.userProgress.totalStudyTime;
    }

    updateProgress() {
        const totalLessons = this.lessons.length;
        const completedLessons = this.userProgress.completedLessons.length;
        const progressPercentage = Math.round((completedLessons / totalLessons) * 100);
        
        document.getElementById('overall-progress').style.width = `${progressPercentage}%`;
        document.getElementById('progress-percentage').textContent = `${progressPercentage}%`;
        
        // Update today's study time
        const today = new Date().toDateString();
        const todayTime = this.userProgress.dailyStudyTime[today] || 0;
        document.getElementById('today-time').textContent = `${todayTime} phút`;
        
        // Update streak
        document.getElementById('streak').textContent = `${this.userProgress.currentStreak} ngày`;
    }

    loadRecentActivity() {
        const activityList = document.getElementById('activity-list');
        activityList.innerHTML = '';
        
        // Get recent activities
        const recentActivities = this.getRecentActivities();
        
        recentActivities.forEach(activity => {
            const activityItem = document.createElement('div');
            activityItem.className = 'activity-item';
            
            activityItem.innerHTML = `
                <div class="activity-icon ${activity.type}">
                    <i class="fas ${this.getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-details">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                </div>
                <div class="activity-time">${this.formatTimeAgo(activity.timestamp)}</div>
            `;
            
            activityList.appendChild(activityItem);
        });
    }

    getRecentActivities() {
        const activities = [];
        
        // Add completed lessons
        this.userProgress.completedLessons.slice(-5).reverse().forEach(lessonId => {
            activities.push({
                type: 'completed',
                title: `Hoàn thành bài học ${lessonId}`,
                description: 'Bạn đã hoàn thành bài học này',
                timestamp: new Date().getTime() - Math.random() * 86400000 // Random time within last 24h
            });
        });
        
        // Add started lessons
        this.userProgress.inProgressLessons.slice(-3).reverse().forEach(lessonId => {
            activities.push({
                type: 'started',
                title: `Bắt đầu bài học ${lessonId}`,
                description: 'Bạn đã bắt đầu học bài này',
                timestamp: new Date().getTime() - Math.random() * 86400000
            });
        });
        
        // Sort by timestamp
        return activities.sort((a, b) => b.timestamp - a.timestamp).slice(0, 10);
    }

    getActivityIcon(type) {
        const iconMap = {
            'completed': 'fa-check',
            'started': 'fa-play',
            'quiz': 'fa-question-circle'
        };
        return iconMap[type] || 'fa-info-circle';
    }

    formatTimeAgo(timestamp) {
        const now = new Date().getTime();
        const diff = now - timestamp;
        
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (days > 0) return `${days} ngày trước`;
        if (hours > 0) return `${hours} giờ trước`;
        if (minutes > 0) return `${minutes} phút trước`;
        return 'Vừa xong';
    }

    // Practice functions
    startVocabularyPractice() {
        this.showNotification('Tính năng luyện từ vựng sẽ sớm có mặt!', 'info');
    }

    startGrammarPractice() {
        this.showNotification('Tính năng luyện ngữ pháp sẽ sớm có mặt!', 'info');
    }

    startListeningPractice() {
        this.showNotification('Tính năng luyện nghe sẽ sớm có mặt!', 'info');
    }

    startSpeakingPractice() {
        this.showNotification('Tính năng luyện phát âm sẽ sớm có mặt!', 'info');
    }

    // Quick action functions
    startNextLesson() {
        const nextLesson = this.lessons.find(lesson => 
            !lesson.completed && !lesson.inProgress
        );
        
        if (nextLesson) {
            this.startLesson(nextLesson.id);
        } else {
            this.showNotification('Tất cả bài học đã hoàn thành!', 'success');
        }
    }

    reviewLastLesson() {
        const lastCompleted = this.userProgress.completedLessons[this.userProgress.completedLessons.length - 1];
        
        if (lastCompleted) {
            const lesson = this.lessons.find(l => l.id === lastCompleted);
            this.openLessonModal(lesson);
        } else {
            this.showNotification('Bạn chưa hoàn thành bài học nào!', 'info');
        }
    }

    takeQuiz() {
        this.showNotification('Tính năng bài kiểm tra sẽ sớm có mặt!', 'info');
    }

    // Utility functions
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 3000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Data persistence
    loadUserProgress() {
        const saved = localStorage.getItem('englishLearningProgress');
        if (saved) {
            return JSON.parse(saved);
        }
        
        return {
            completedLessons: [],
            inProgressLessons: [],
            completedAudioFiles: [],
            totalStudyTime: 0,
            dailyStudyTime: {},
            currentStreak: 0,
            lastStudyDate: null
        };
    }

    saveUserProgress() {
        localStorage.setItem('englishLearningProgress', JSON.stringify(this.userProgress));
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new EnglishLearningApp();
});

// Global functions for HTML onclick handlers
function startNextLesson() {
    if (window.app) window.app.startNextLesson();
}

function reviewLastLesson() {
    if (window.app) window.app.reviewLastLesson();
}

function takeQuiz() {
    if (window.app) window.app.takeQuiz();
}

function startVocabularyPractice() {
    if (window.app) window.app.startVocabularyPractice();
}

function startGrammarPractice() {
    if (window.app) window.app.startGrammarPractice();
}

function startListeningPractice() {
    if (window.app) window.app.startListeningPractice();
}

function startSpeakingPractice() {
    if (window.app) window.app.startSpeakingPractice();
}

function startLesson() {
    if (window.app) window.app.startLesson(window.app.currentLesson.id);
}

function markAsCompleted() {
    if (window.app) window.app.markAsCompleted();
}

function closeLessonModal() {
    if (window.app) window.app.closeLessonModal();
}