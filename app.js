// Khởi tạo ứng dụng
let currentTopic = 'daily';
let learnedWords = JSON.parse(localStorage.getItem('learnedWords')) || [];
let todayLearnedWords = JSON.parse(localStorage.getItem('todayLearnedWords')) || [];
let lastLearningDate = localStorage.getItem('lastLearningDate') || '';
let learningStreak = parseInt(localStorage.getItem('learningStreak')) || 0;

// Kiểm tra và cập nhật ngày học
function checkDailyReset() {
    const today = new Date().toDateString();
    if (lastLearningDate !== today) {
        // Nếu là ngày mới
        if (lastLearningDate && new Date(lastLearningDate).toDateString() === 
            new Date(Date.now() - 86400000).toDateString()) {
            // Nếu học ngày hôm qua, tăng streak
            learningStreak++;
        } else if (lastLearningDate) {
            // Nếu bỏ qua ngày, reset streak
            learningStreak = 0;
        }
        todayLearnedWords = [];
        lastLearningDate = today;
        saveLearningData();
    }
}

// Lưu dữ liệu học tập
function saveLearningData() {
    localStorage.setItem('learnedWords', JSON.stringify(learnedWords));
    localStorage.setItem('todayLearnedWords', JSON.stringify(todayLearnedWords));
    localStorage.setItem('lastLearningDate', lastLearningDate);
    localStorage.setItem('learningStreak', learningStreak);
}

// Cập nhật thống kê
function updateStats() {
    document.getElementById('wordsLearned').textContent = todayLearnedWords.length;
    document.getElementById('totalWords').textContent = learnedWords.length;
    document.getElementById('streak').textContent = learningStreak;
}

// Tạo card từ vựng
function createWordCard(word, index) {
    const isLearned = learnedWords.includes(word.word);
    const cardHtml = `
        <div class="word-card ${isLearned ? 'learned' : ''}" data-word="${word.word}">
            <div class="word-header">
                <h3 class="word">${word.word}</h3>
                <button class="pronunciation-btn" onclick="speakWord('${word.word}')" title="Nghe phát âm">
                    🔊
                </button>
            </div>
            <p class="ipa">${word.ipa}</p>
            <p class="meaning">Nghĩa: ${word.meaning}</p>
            <div class="example">
                <p class="example-en">${word.example.en}</p>
                <p class="example-vi">${word.example.vi}</p>
            </div>
            <span class="word-type">${word.type}</span>
            <button class="mark-learned-btn ${isLearned ? 'learned' : ''}" 
                    onclick="toggleLearnedStatus('${word.word}')"
                    ${isLearned ? 'disabled' : ''}>
                ${isLearned ? '✓ Đã học' : 'Đánh dấu đã học'}
            </button>
        </div>
    `;
    return cardHtml;
}

// Hiển thị từ vựng theo chủ đề
function displayVocabulary(topic) {
    const content = document.getElementById('content');
    const topicData = vocabularyData[topic];
    
    if (!topicData) {
        content.innerHTML = '<p class="loading">Không tìm thấy chủ đề này.</p>';
        return;
    }
    
    let html = '';
    
    if (topic === 'daily') {
        html += `
            <div class="daily-summary">
                <h2>${topicData.title}</h2>
                <p>${topicData.description}</p>
                <p>Ngày ${new Date().toLocaleDateString('vi-VN')}</p>
            </div>
        `;
    } else {
        html += `
            <h2 style="text-align: center; color: #667eea; margin-bottom: 20px;">
                ${topicData.title}
            </h2>
            <p style="text-align: center; color: #666; margin-bottom: 30px;">
                ${topicData.description}
            </p>
        `;
    }
    
    html += '<div class="vocabulary-grid">';
    topicData.words.forEach((word, index) => {
        html += createWordCard(word, index);
    });
    html += '</div>';
    
    content.innerHTML = html;
}

// Phát âm từ sử dụng Web Speech API
function speakWord(word) {
    if ('speechSynthesis' in window) {
        // Hủy bất kỳ phát âm nào đang chạy
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'en-US';
        utterance.rate = 0.8; // Tốc độ nói chậm hơn một chút
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Thêm hiệu ứng visual khi đang phát âm
        const button = event.target;
        button.style.transform = 'scale(0.95)';
        
        utterance.onend = () => {
            button.style.transform = 'scale(1)';
        };
        
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Trình duyệt của bạn không hỗ trợ phát âm. Vui lòng sử dụng Chrome, Firefox hoặc Safari.');
    }
}

// Đánh dấu từ đã học
function toggleLearnedStatus(word) {
    if (!learnedWords.includes(word)) {
        learnedWords.push(word);
        if (!todayLearnedWords.includes(word)) {
            todayLearnedWords.push(word);
        }
        saveLearningData();
        
        // Cập nhật UI
        const wordCard = document.querySelector(`[data-word="${word}"]`);
        if (wordCard) {
            wordCard.classList.add('learned');
            const button = wordCard.querySelector('.mark-learned-btn');
            button.textContent = '✓ Đã học';
            button.classList.add('learned');
            button.disabled = true;
        }
        
        updateStats();
        
        // Hiển thị thông báo
        showNotification(`Tuyệt vời! Bạn đã học từ "${word}"`);
    }
}

// Hiển thị thông báo
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Xử lý sự kiện click chủ đề
document.addEventListener('DOMContentLoaded', () => {
    checkDailyReset();
    updateStats();
    displayVocabulary(currentTopic);
    
    // Thêm sự kiện cho các nút chủ đề
    const topicButtons = document.querySelectorAll('.topic-btn');
    topicButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Xóa active từ tất cả các nút
            topicButtons.forEach(btn => btn.classList.remove('active'));
            // Thêm active cho nút được click
            button.classList.add('active');
            // Hiển thị từ vựng của chủ đề
            currentTopic = button.dataset.topic;
            displayVocabulary(currentTopic);
        });
    });
    
    // Tự động phát âm khi hover (optional)
    document.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('word') && e.shiftKey) {
            const word = e.target.textContent;
            speakWord(word);
        }
    });
});

// Thêm CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);