/** js/Profile.js */
class Profile {
  static LEVEL_NAMES = ['', 'Новичок', 'Любитель', 'Практик', 'Знаток', 'Эксперт', 'Мастер', 'Легенда'];
  static LEVEL_XP    = [0, 200, 500, 1000, 2000, 3500, 5000, 999999];
  static ACHIEVEMENTS = [
    { e:'🌟', l:'Первый тест',    c: u => u.tests >= 1 },
    { e:'🔥', l:'3-дневный стрик',c: u => u.streak >= 3 },
    { e:'⚙️', l:'50 Болтиков',   c: u => u.bolts >= 50 },
    { e:'💰', l:'200 Болтиков',   c: u => u.bolts >= 200 },
    { e:'💻', l:'CodeLab ×3',     c: u => u.history.filter(h => h.track === 'code').length >= 3 },
    { e:'🇰🇬',l:'Кыргызский A1', c: u => u.history.filter(h => h.track === 'ky').length >= 1 },
    { e:'💯', l:'100 XP',         c: u => u.xp >= 100 },
    { e:'🏆', l:'500 XP',         c: u => u.xp >= 500 },
  ];

  refresh() {
    if (!state.user) return;
    const u  = state.user;
    const lv = u.level;
    const LX = Profile.LEVEL_XP;
    const xc = u.xp - LX[lv - 1];
    const xn = LX[lv] - LX[lv - 1];
    const pct = Math.min(100, Math.round(xc / xn * 100));

    document.getElementById('pAv').textContent     = u.role === 'teacher' ? '👨‍🏫' : '🎓';
    document.getElementById('pName').textContent   = u.name;
    document.getElementById('pHandle').textContent = u.handle;
    document.getElementById('pRole').textContent   = u.role === 'teacher' ? 'Учитель' : 'Ученик';
    document.getElementById('pEdu').textContent    = u.edu;
    document.getElementById('pLv').textContent     = `Уровень ${lv} · ${Profile.LEVEL_NAMES[lv] || 'Легенда'}`;
    document.getElementById('pXpLbl').textContent  = `${xc}/${xn} XP до уровня ${lv + 1}`;
    document.getElementById('pXpBar').style.width  = pct + '%';
    document.getElementById('pXpPct').textContent  = pct + '%';
    document.getElementById('pXp').textContent     = u.xp;
    document.getElementById('pT').textContent      = u.tests;
    document.getElementById('pB').textContent      = u.bolts;
    document.getElementById('strN').textContent    = u.streak;

    this.renderLivesBar();
    this._renderStreak();
    this._renderAchievements();
    this._renderHistory();
    this.renderOwnedChips();
  }

  renderLivesBar() {
    const lives = state.user ? state.user.lives : 10;
    const el    = document.getElementById('livesBar');
    if (!el) return;
    el.innerHTML = Array.from({ length: 10 }, (_, i) =>
      `<div class="life${i < lives ? '' : ' empty'}">❤️</div>`
    ).join('');
    const timer = document.getElementById('livesTimer');
    if (timer) timer.classList.toggle('show', lives < 10);
  }

  _renderStreak() {
    const days   = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
    const streak = state.user ? state.user.streak : 0;
    const today  = new Date().getDay() || 7;
    document.getElementById('strDays').innerHTML = days.map((d, i) => {
      const dn   = i + 1;
      const done = dn < today && dn >= today - streak;
      const isT  = dn === today;
      return `<div class="sd ${isT ? 'today' : done ? 'done' : ''}">${isT ? '🔥' : done ? '✓' : d}</div>`;
    }).join('');
  }

  _renderAchievements() {
    document.getElementById('achG').innerHTML = Profile.ACHIEVEMENTS.map(a => {
      const ok = a.c(state.user);
      return `<div class="ach${ok ? '' : ' locked'}" title="${a.l}">${a.e}<span class="ach-tip">${a.l}</span></div>`;
    }).join('');
  }

  _renderHistory() {
    const h  = state.user.history;
    const el = document.getElementById('histList');
    el.innerHTML = h.length
      ? h.slice(0, 5).map(it => `
          <div class="hist-item">
            <div style="font-size:20px">${it.emoji}</div>
            <div class="hi-info">
              <div class="hi-t">${it.title}</div>
              <div class="hi-s">${it.track === 'code' ? '💻' : it.track === 'lang' ? '🌍' : '🇰🇬'} · ${it.date}</div>
            </div>
            <div class="hi-r">
              <div class="hi-xp">+${it.xp} XP</div>
              <div class="hi-b">+${it.bolts} ⚙️</div>
            </div>
          </div>`).join('')
      : '<p style="font-size:12px;color:var(--muted);font-weight:700">Нет истории. Пройди первый тест!</p>';
  }

  renderOwnedChips() {
    const el = document.getElementById('ownedChips');
    if (!el) return;
    const items = state.owned.map(id => ShopItems.find(id)).filter(Boolean);
    el.innerHTML = items.length
      ? items.map(i => `<div class="oc">${i.icon} ${i.name}</div>`).join('')
      : '<p style="font-size:11px;color:var(--muted);font-weight:700">Ничего не куплено.</p>';
  }
}
