// Global variables
let currentTopic = 'daily';
let currentWordIndex = 0;
let wordsLearned = 0;
let correctAnswers = 0;
let totalQuizAttempts = 0;
let startTime = Date.now();
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let learnedWords = JSON.parse(localStorage.getItem('learnedWords')) || [];
let streak = parseInt(localStorage.getItem('streak')) || 0;

// Check and update streak
function updateStreak() {
    const lastStudyDate = localStorage.getItem('lastStudyDate');
    const today = new Date().toDateString();
    
    if (lastStudyDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastStudyDate === yesterday.toDateString()) {
            streak++;
        } else if (lastStudyDate !== today) {
            streak = 1;
        }
        
        localStorage.setItem('lastStudyDate', today);
        localStorage.setItem('streak', streak);
    }
    
    document.getElementById('streak-days').textContent = streak;
}

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    updateStreak();
    loadTopic(currentTopic);
    updateStats();
    
    // Topic navigation
    document.querySelectorAll('.topic-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelector('.topic-btn.active').classList.remove('active');
            this.classList.add('active');
            currentTopic = this.dataset.topic;
            currentWordIndex = 0;
            loadTopic(currentTopic);
            hideQuizSection();
        });
    });
    
    // Control buttons
    document.getElementById('prev-btn').addEventListener('click', previousWord);
    document.getElementById('next-btn').addEventListener('click', nextWord);
    document.getElementById('practice-btn').addEventListener('click', showQuizSection);
    
    // Speak buttons
    document.getElementById('speak-btn').addEventListener('click', () => speakWord());
    document.getElementById('speak-example-btn').addEventListener('click', () => speakExample());
    
    // Favorite button
    document.getElementById('favorite-btn').addEventListener('click', toggleFavorite);
    
    // Update time every minute
    setInterval(updateStudyTime, 60000);
});

// Load topic
function loadTopic(topic) {
    const topicData = vocabularyData[topic];
    document.querySelector('.progress-text').innerHTML = `Tiến độ học hôm nay: <span id="progress-count">0/${topicData.words.length}</span>`;
    updateProgress();
    displayWord();
}

// Display current word
function displayWord() {
    const words = vocabularyData[currentTopic].words;
    const word = words[currentWordIndex];
    
    // Update word number
    document.querySelector('.word-number').textContent = `Word ${currentWordIndex + 1}/${words.length}`;
    
    // Update word content
    document.getElementById('current-word').textContent = word.word;
    document.getElementById('phonetic').textContent = word.phonetic;
    document.getElementById('word-type').textContent = word.type;
    document.getElementById('meaning').textContent = word.meaning;
    document.getElementById('example-en').textContent = word.example;
    document.getElementById('example-vi').textContent = word.exampleVi;
    
    // Update favorite status
    updateFavoriteButton();
    
    // Update navigation buttons
    document.getElementById('prev-btn').disabled = currentWordIndex === 0;
    document.getElementById('next-btn').style.display = currentWordIndex === words.length - 1 ? 'none' : 'inline-block';
    document.getElementById('practice-btn').style.display = currentWordIndex === words.length - 1 ? 'inline-block' : 'none';
    
    // Animate card
    const card = document.getElementById('word-card');
    card.style.animation = 'none';
    setTimeout(() => {
        card.style.animation = 'modalFadeIn 0.3s ease';
    }, 10);
}

// Text-to-Speech function
function speak(text, lang = 'en-US') {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9; // Slightly slower for better pronunciation
        utterance.pitch = 1;
        utterance.volume = 1;
        
        // Get available voices
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
        if (englishVoice) {
            utterance.voice = englishVoice;
        }
        
        window.speechSynthesis.speak(utterance);
    } else {
        alert('Trình duyệt của bạn không hỗ trợ tính năng phát âm. Vui lòng sử dụng Chrome, Firefox hoặc Safari mới nhất.');
    }
}

// Speak current word
function speakWord() {
    const word = vocabularyData[currentTopic].words[currentWordIndex].word;
    speak(word);
    
    // Animate button
    const btn = document.getElementById('speak-btn');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);
}

// Speak example
function speakExample() {
    const example = vocabularyData[currentTopic].words[currentWordIndex].example;
    speak(example);
    
    // Animate button
    const btn = document.getElementById('speak-example-btn');
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);
}

// Navigation functions
function previousWord() {
    if (currentWordIndex > 0) {
        currentWordIndex--;
        displayWord();
        hideQuizSection();
    }
}

function nextWord() {
    const words = vocabularyData[currentTopic].words;
    if (currentWordIndex < words.length - 1) {
        currentWordIndex++;
        
        // Mark word as learned
        const wordId = `${currentTopic}-${currentWordIndex}`;
        if (!learnedWords.includes(wordId)) {
            learnedWords.push(wordId);
            localStorage.setItem('learnedWords', JSON.stringify(learnedWords));
            wordsLearned++;
            updateStats();
        }
        
        displayWord();
        updateProgress();
        hideQuizSection();
    }
}

// Progress bar
function updateProgress() {
    const words = vocabularyData[currentTopic].words;
    const progress = ((currentWordIndex + 1) / words.length) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    document.getElementById('progress-count').textContent = `${currentWordIndex + 1}/${words.length}`;
}

// Favorite functions
function toggleFavorite() {
    const wordData = vocabularyData[currentTopic].words[currentWordIndex];
    const favoriteId = `${currentTopic}-${currentWordIndex}`;
    
    const index = favorites.findIndex(fav => fav.id === favoriteId);
    
    if (index === -1) {
        favorites.push({
            id: favoriteId,
            word: wordData.word,
            meaning: wordData.meaning,
            topic: currentTopic
        });
    } else {
        favorites.splice(index, 1);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoriteButton();
}

function updateFavoriteButton() {
    const favoriteId = `${currentTopic}-${currentWordIndex}`;
    const isFavorite = favorites.some(fav => fav.id === favoriteId);
    const btn = document.getElementById('favorite-btn');
    
    if (isFavorite) {
        btn.classList.add('active');
        btn.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
        btn.classList.remove('active');
        btn.innerHTML = '<i class="far fa-heart"></i>';
    }
}

// Quiz functions
function showQuizSection() {
    document.getElementById('word-card').style.display = 'none';
    document.getElementById('practice-section').style.display = 'block';
    generateQuiz();
}

function hideQuizSection() {
    document.getElementById('word-card').style.display = 'block';
    document.getElementById('practice-section').style.display = 'none';
}

function generateQuiz() {
    const words = vocabularyData[currentTopic].words;
    const randomIndex = Math.floor(Math.random() * words.length);
    const correctWord = words[randomIndex];
    
    // Create question
    document.getElementById('quiz-question').textContent = `Từ nào có nghĩa là "${correctWord.meaning}"?`;
    
    // Generate options
    const options = [correctWord];
    const usedIndices = [randomIndex];
    
    while (options.length < 4 && options.length < words.length) {
        const randomIdx = Math.floor(Math.random() * words.length);
        if (!usedIndices.includes(randomIdx)) {
            options.push(words[randomIdx]);
            usedIndices.push(randomIdx);
        }
    }
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    
    // Display options
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'quiz-option';
        button.textContent = option.word;
        button.onclick = () => checkAnswer(option.word === correctWord.word, button);
        optionsContainer.appendChild(button);
    });
    
    // Clear feedback
    document.getElementById('quiz-feedback').innerHTML = '';
    document.getElementById('quiz-feedback').className = 'quiz-feedback';
}

function checkAnswer(isCorrect, button) {
    totalQuizAttempts++;
    
    // Disable all buttons
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'default';
    });
    
    // Show result
    if (isCorrect) {
        correctAnswers++;
        button.classList.add('correct');
        showFeedback('Chính xác! Tuyệt vời!', 'correct');
    } else {
        button.classList.add('incorrect');
        showFeedback('Không đúng. Hãy thử lại!', 'incorrect');
    }
    
    updateStats();
    
    // Generate new quiz after delay
    setTimeout(() => {
        generateQuiz();
    }, 2000);
}

function showFeedback(message, type) {
    const feedback = document.getElementById('quiz-feedback');
    feedback.textContent = message;
    feedback.className = `quiz-feedback ${type}`;
}

// Statistics
function updateStats() {
    document.getElementById('words-learned').textContent = learnedWords.length;
    document.getElementById('study-time').textContent = Math.floor((Date.now() - startTime) / 60000);
    
    const accuracy = totalQuizAttempts > 0 ? Math.round((correctAnswers / totalQuizAttempts) * 100) : 0;
    document.getElementById('accuracy').textContent = accuracy + '%';
}

function updateStudyTime() {
    document.getElementById('study-time').textContent = Math.floor((Date.now() - startTime) / 60000);
}

// Modal
function closeModal() {
    document.getElementById('success-modal').style.display = 'none';
}

// Show success modal when completing all words
function showSuccessModal() {
    document.getElementById('success-modal').style.display = 'flex';
}

// Ensure voices are loaded
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = function() {
        // Voices are now loaded
    };
}