/** js/Quiz.js */
class Quiz {
  constructor() {
    this._test      = null;
    this._questions = [];
    this._cur       = 0;
    this._xp        = 0;
    this._bolts     = 0;
    this._answered  = false;
    this._timeLeft  = 20;
    this._timer     = null;
  }

  start(id) {
    if (!state.loggedIn) {
      App.toast.show('🔐 Войдите для прохождения тестов');
      App.router.go('auth');
      return;
    }
    if (state.user.lives <= 0) {
      App.toast.show('❤️ Нет жизней! Подожди 1 час или купи Pro в магазине');
      return;
    }
    const all  = [...TESTS, ...state.customTests];
    const test = all.find(t => (t.id || t.cid) == id);
    if (!test) return;

    this._test      = test;
    this._questions = test.questions.slice(0, Math.min(test.questions.length, 5));
    this._cur       = 0;
    this._xp        = 0;
    this._bolts     = 0;
    this._answered  = false;

    App.router.go('quiz');
    this._renderQuestion();
  }

  _renderQuestion() {
    clearInterval(this._timer);
    const { _questions: qs, _cur: cur } = this;
    if (cur >= qs.length) { this._end(); return; }

    const q = qs[cur];
    this._answered = false;
    this._timeLeft = 20;

    document.getElementById('qTitle').textContent    = this._test.title;
    document.getElementById('qProg').textContent     = `${cur + 1}/${qs.length}`;
    document.getElementById('qXt').textContent       = this._xp;
    document.getElementById('qBt').textContent       = this._bolts;
    document.getElementById('qLt').textContent       = state.user.lives;

    const cols   = ['qr', 'qb', 'qy', 'qg'];
    const shapes = ['▲', '◆', '●', '■'];

    document.getElementById('quizBody').innerHTML = `
      <div class="qwrap">
        <div class="q-num">Вопрос ${cur + 1} из ${qs.length}</div>
        <div class="q-text">${q.text}</div>
        ${q.code ? `<div class="q-code">${q.code}</div>` : ''}
      </div>
      <div class="q-ans">
        ${q.answers.map((a, i) => `
          <button class="q-btn ${cols[i]}" id="qa${i}" onclick="App.quiz.answer(${i})">
            <div class="ash">${shapes[i]}</div><span>${a}</span>
          </button>`).join('')}
      </div>
      <div class="q-fb" id="qfb"></div>`;

    this._startTimer();
  }

  _startTimer() {
    this._updateTimerUI(20, 20);
    this._timer = setInterval(() => {
      this._timeLeft--;
      this._updateTimerUI(this._timeLeft, 20);
      if (this._timeLeft <= 0) {
        clearInterval(this._timer);
        if (!this._answered) this._timeout();
      }
    }, 1000);
  }

  _updateTimerUI(t, max) {
    const el   = document.getElementById('qTimer');
    const fill = document.getElementById('qTFill');
    if (!el) return;
    el.textContent = t;
    el.className   = 'q-timer' + (t <= 5 ? ' urg' : '');
    if (fill) fill.style.width = (t / max * 100) + '%';
  }

  answer(idx) {
    if (this._answered) return;
    clearInterval(this._timer);
    this._answered = true;

    const q  = this._questions[this._cur];
    const ok = idx === q.correct;

    if (!ok) {
      state.loseLife();
      document.getElementById('navLivesV').textContent = state.user.lives;
      document.getElementById('qLt').textContent       = state.user.lives;
    }

    const xpGain   = ok ? Math.max(10, this._timeLeft * 5) : 0;
    const boltGain = ok ? Math.max(2, Math.floor(this._timeLeft / 4)) : 0;

    document.querySelectorAll('.q-btn').forEach((b, i) => {
      b.disabled = true;
      if (i === q.correct) b.classList.add('correct');
      else if (i === idx && !ok) b.classList.add('wrong');
    });

    const fb = document.getElementById('qfb');
    if (ok) {
      fb.innerHTML   = `✅ Правильно! +${xpGain} XP · +${boltGain} ⚙️`;
      fb.style.color = '#4CAF50';
      this._xp    += xpGain;
      this._bolts += boltGain;
    } else {
      fb.innerHTML   = `❌ Неверно! Ответ: <b>${q.answers[q.correct]}</b>`;
      fb.style.color = '#FF5252';
    }
    fb.classList.add('show');

    document.getElementById('qXt').textContent = this._xp;
    document.getElementById('qBt').textContent = this._bolts;

    setTimeout(() => { this._cur++; this._renderQuestion(); }, 1700);
  }

  _timeout() {
    this._answered = true;
    state.loseLife();
    document.querySelectorAll('.q-btn').forEach((b, i) => {
      b.disabled = true;
      if (i === this._questions[this._cur].correct) b.classList.add('correct');
    });
    const fb = document.getElementById('qfb');
    fb.textContent = '⏰ Время вышло! -1 ❤️';
    fb.style.color = '#FF9800';
    fb.classList.add('show');
    setTimeout(() => { this._cur++; this._renderQuestion(); }, 1700);
  }

  _end() {
    clearInterval(this._timer);
    const wasLv = state.user.level;
    state.addXp(this._xp);
    state.addBolts(this._bolts);
    state.user.tests++;
    state.addHistory({
      title: this._test.title,
      emoji: this._test.emoji,
      xp:    this._xp,
      bolts: this._bolts,
      date:  'Только что',
      track: this._test.track,
    });
    App.auth.refreshNav();
    App.profile.renderLivesBar();

    const msg = this._xp >= 200 ? '🏆 Отлично!' : this._xp >= 100 ? '👍 Хорошо!' : '💪 Продолжай!';
    const lv  = state.user.level;

    document.getElementById('quizBody').innerHTML = `
      <div class="q-end">
        <div class="qe-sc">+${this._xp} XP</div>
        <h2>${msg}</h2>
        <div class="qe-bolt">⚙️ +${this._bolts} Болтиков!</div>
        <div class="qe-info">
          Всего XP: ${state.user.xp} · Уровень ${lv}
          ${lv > wasLv ? `<div style="color:var(--y);font-size:16px;margin-top:4px">🎉 Уровень ${lv}!</div>` : ''}
          <div style="color:var(--bolt);margin-top:3px">⚙️ Итого: ${state.user.bolts} · ❤️ ${state.user.lives}/10</div>
        </div>
        <div class="qe-btns">
          <button class="btn-hw" onclick="App.quiz.start(${this._test.id || this._test.cid})">🔄 Ещё раз</button>
          <button class="btn-ho" onclick="App.router.go('shop')">⚙️ Магазин</button>
          <button class="btn-ho" onclick="App.router.go('profile')">👤 Профиль</button>
        </div>
      </div>`;

    App.mascot.say(msg + ' Ты молодец! 🪖');
  }
}
