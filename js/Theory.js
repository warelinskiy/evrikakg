// ════════════════════════════════════════
// THEORY — модуль для изучения теории
// ════════════════════════════════════════

class Theory {
    constructor() {
        this.currentLessonId = null;
        this.synth = window.speechSynthesis;
        this.utterance = null;
        this.isPlaying = false;
        this.progress = {};
        this.currentParagraphs = [];
        this.readParagraphIndex = 0;
        // Загружаем прогресс из localStorage
        this.loadProgress();
    }

    render() {
        const container = document.getElementById('theoryList');
        if (!container) return;

        container.innerHTML = THEORY_LESSONS.map(lesson => `
            <div class="theory-card" onclick="App.theory.openLesson(${lesson.id})">
                <div class="theory-card-header">
                    <span class="theory-lesson-id">Урок ${lesson.id}</span>
                    <span class="theory-progress-badge" id="progressBadge_${lesson.id}">
                        ${this.getProgressText(lesson.id)}
                    </span>
                </div>
                <h3>${lesson.title}</h3>
                <p>${lesson.description}</p>
                <div class="theory-card-footer">
                    <span>📖 Читать</span>
                    <span>▶ Слушать</span>
                </div>
            </div>
        `).join('');
    }

    openLesson(id) {
        this.currentLessonId = id;
        const lesson = THEORY_LESSONS.find(l => l.id === id);
        if (!lesson) return;

        // Переключаемся на страницу урока
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('page-theory-view').classList.add('active');

        document.getElementById('theoryViewTitle').textContent = `Урок ${id}: ${lesson.title}`;
        document.getElementById('theoryViewDesc').textContent = lesson.description;

        // Разбиваем текст на параграфы для удобного отслеживания прогресса
        this.currentParagraphs = lesson.content.split('\n\n').filter(p => p.trim().length > 0);
        this.readParagraphIndex = 0;
        this.isPlaying = false;

        // Рендерим текст
        const contentDiv = document.getElementById('theoryViewContent');
        contentDiv.innerHTML = this.currentParagraphs.map((p, index) => `
            <p class="theory-paragraph" data-index="${index}">${p.replace(/\n/g, '<br>')}</p>
        `).join('');

        // Обновляем прогресс
        this.updateProgressDisplay();

        // Обновляем кнопки аудио
        this.updateAudioButton();

        // Сбрасываем подсветку параграфов
        this.highlightParagraph(0);

        // Добавляем обработчик скролла для отслеживания прочтения
        contentDiv.onscroll = () => this.trackReadingProgress();
        
        // Устанавливаем обработчик для изменения голоса
        this.populateVoiceList();
    }

    // --- Управление аудио ---
    toggleAudio() {
        if (this.isPlaying) {
            this.stopAudio();
        } else {
            this.startAudio();
        }
    }

    startAudio() {
        if (!this.currentLessonId) return;
        if (this.synth.speaking) {
            this.synth.cancel();
        }

        const lesson = THEORY_LESSONS.find(l => l.id === this.currentLessonId);
        if (!lesson) return;

        this.isPlaying = true;
        this.updateAudioButton();

        // Разбиваем текст на предложения для более естественного чтения
        const text = lesson.content;
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
        
        // Создаем utterance для каждого предложения
        let index = 0;
        const speakNext = () => {
            if (index >= sentences.length) {
                this.isPlaying = false;
                this.updateAudioButton();
                return;
            }

            const utterance = new SpeechSynthesisUtterance(sentences[index].trim());
            utterance.lang = 'ru-RU';
            utterance.rate = 0.9;
            utterance.pitch = 1;

            // Выбираем голос
            const voices = this.synth.getVoices();
            const ruVoice = voices.find(v => v.lang.startsWith('ru'));
            if (ruVoice) utterance.voice = ruVoice;

            utterance.onend = () => {
                index++;
                this.readParagraphIndex = Math.floor(index / sentences.length * this.currentParagraphs.length);
                this.highlightParagraph(this.readParagraphIndex);
                this.updateProgressDisplay();
                this.saveProgress();
                speakNext();
            };

            utterance.onerror = () => {
                this.isPlaying = false;
                this.updateAudioButton();
            };

            this.synth.speak(utterance);
        };

        speakNext();
    }

    stopAudio() {
        this.synth.cancel();
        this.isPlaying = false;
        this.updateAudioButton();
    }

    updateAudioButton() {
        const btn = document.getElementById('theoryAudioBtn');
        if (btn) {
            btn.textContent = this.isPlaying ? '⏹ Остановить' : '▶ Слушать';
            btn.classList.toggle('playing', this.isPlaying);
        }
    }

    populateVoiceList() {
        // Загружаем голоса при инициализации
        this.synth.getVoices();
        this.synth.onvoiceschanged = () => {
            this.synth.getVoices();
        };
    }

    // --- Прогресс ---
    getProgressText(lessonId) {
        const progress = this.progress[lessonId] || 0;
        if (progress === 0) return '📘 Не начато';
        if (progress < 100) return `📖 ${progress}%`;
        return '✅ Изучено';
    }

    updateProgressDisplay() {
        if (!this.currentLessonId) return;
        const progress = this.progress[this.currentLessonId] || 0;
        document.getElementById('theoryProgressFill').style.width = `${progress}%`;
        document.getElementById('theoryProgressText').textContent = `${progress}%`;
        
        // Обновляем бейдж в списке
        const badge = document.getElementById(`progressBadge_${this.currentLessonId}`);
        if (badge) {
            badge.textContent = this.getProgressText(this.currentLessonId);
        }
    }

    trackReadingProgress() {
        const container = document.getElementById('theoryViewContent');
        if (!container) return;

        const paragraphs = container.querySelectorAll('.theory-paragraph');
        let lastVisibleIndex = 0;
        const scrollTop = container.scrollTop;
        const containerHeight = container.clientHeight;

        paragraphs.forEach((p, index) => {
            const rect = p.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();
            // Проверяем, виден ли параграф в области просмотра
            if (rect.top < containerRect.bottom && rect.bottom > containerRect.top) {
                lastVisibleIndex = index;
            }
        });

        // Обновляем прогресс на основе видимых параграфов
        if (lastVisibleIndex > this.readParagraphIndex) {
            this.readParagraphIndex = lastVisibleIndex;
            const progress = Math.min(100, Math.round((this.readParagraphIndex + 1) / this.currentParagraphs.length * 100));
            this.progress[this.currentLessonId] = progress;
            this.updateProgressDisplay();
            this.saveProgress();
        }

        // Подсвечиваем текущий параграф
        this.highlightParagraph(this.readParagraphIndex);
    }

    highlightParagraph(index) {
        const container = document.getElementById('theoryViewContent');
        if (!container) return;
        const paragraphs = container.querySelectorAll('.theory-paragraph');
        paragraphs.forEach((p, i) => {
            p.classList.toggle('active-paragraph', i === index);
        });
    }

    // --- Сохранение прогресса ---
    saveProgress() {
        try {
            localStorage.setItem('theoryProgress', JSON.stringify(this.progress));
        } catch (e) {
            console.warn('Could not save theory progress:', e);
        }
    }

    loadProgress() {
        try {
            const data = localStorage.getItem('theoryProgress');
            if (data) {
                this.progress = JSON.parse(data);
            }
        } catch (e) {
            console.warn('Could not load theory progress:', e);
            this.progress = {};
        }
    }

    // --- Навигация ---
    backToList() {
        this.stopAudio();
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.getElementById('page-theory').classList.add('active');
        this.render();
    }
}