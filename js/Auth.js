/** js/Router.js */
class Router {
  go(name) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + name).classList.add('active');
    window.scrollTo(0, 0);
    // lifecycle hooks
    const hooks = {
      profile:  () => App.profile.refresh(),
      tests:    () => App.tests.render(),
      shop:     () => App.shop.render(),
      teacher:  () => App.teacher.render(),
      friends:  () => App.friends.render(),
      chat:     () => App.chat.render(),
      kyrgyz:   () => App.kyrgyz.render(),
      home:     () => App.home.render(),
    };
    if (hooks[name]) hooks[name]();
    App.mascot.reactToPage(name);
  }

  setActive(el) {
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    if (el) el.classList.add('active');
  }
}

/** js/Toast.js */
class Toast {
  show(msg, dur = 3000) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), dur);
  }
}

/** js/Auth.js */
class Auth {
  constructor() {
    this._edu  = '';
    this._role = '';
  }

  switchTab(tab) {
    ['login', 'register'].forEach(t => {
      document.getElementById('tab-' + t).classList.toggle('active', t === tab);
      document.getElementById('form-' + t).style.display = t === tab ? 'block' : 'none';
    });
    if (tab === 'register') this._setStep(0);
  }

  _setStep(n) {
    [0, 1, 2].forEach(i => {
      document.getElementById('sp' + i).classList.toggle('active', i === n);
      const rs = document.getElementById('rs' + i);
      rs.className = 'rs' + (i < n ? ' d' : i === n ? ' a' : '');
    });
  }

  selectEdu(el, val) {
    document.querySelectorAll('.edu-btn').forEach(b => b.classList.remove('sel'));
    el.classList.add('sel');
    this._edu = val;
  }

  nextStep(n) {
    if (n === 1) {
      if (!this._edu) { App.toast.show('⚠️ Выберите тип образования'); return; }
      const roles = this._edu === 'school'
        ? [{ v:'teacher', i:'👨‍🏫', l:'Учитель'     }, { v:'student', i:'🎓', l:'Ученик'  }]
        : this._edu === 'higher'
        ? [{ v:'teacher', i:'👨‍🏫', l:'Преподаватель'}, { v:'student', i:'🎓', l:'Студент' }]
        : [{ v:'teacher', i:'👨‍🏫', l:'Ментор'      }, { v:'student', i:'🎓', l:'Участник'}];
      document.getElementById('roleGrid').innerHTML = roles.map(r =>
        `<div class="role-btn" onclick="App.auth._selectRole(this)" data-role="${r.v}">
           <span class="ri">${r.i}</span>${r.l}
         </div>`).join('');
      this._role = '';
    }
    if (n === 2 && !this._role) { App.toast.show('⚠️ Выберите роль'); return; }
    this._setStep(n);
  }

  _selectRole(el) {
    document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('sel'));
    el.classList.add('sel');
    this._role = el.dataset.role;
  }

  login() {
    const e = document.getElementById('liE').value.trim();
    const p = document.getElementById('liP').value.trim();
    if (!e || !p) { App.toast.show('⚠️ Заполните все поля'); return; }
    state.login('Пользователь', 'user' + Math.floor(Math.random()*9999), 'student', 'Школьное');
    this._afterLogin();
    App.toast.show('✅ Добро пожаловать!');
    setTimeout(() => App.router.go('home'), 700);
  }

  register() {
    const name    = document.getElementById('rN').value.trim();
    const uname   = document.getElementById('rU').value.trim().replace('@', '');
    const contact = document.getElementById('rC').value.trim();
    const pass    = document.getElementById('rP').value.trim();
    if (!name || !contact || !pass) { App.toast.show('⚠️ Заполните все поля'); return; }
    if (pass.length < 6) { App.toast.show('⚠️ Пароль минимум 6 символов'); return; }
    const edu = this._edu === 'school' ? 'Школьное' : this._edu === 'higher' ? 'Высшее' : 'Другое';
    state.login(name, uname || 'user' + Math.floor(Math.random()*9999), this._role || 'student', edu);
    this._afterLogin();
    App.toast.show(`🎉 Добро пожаловать, ${name}! +50 ⚙️`, 4000);
    setTimeout(() => App.router.go(this._role === 'teacher' ? 'teacher' : 'home'), 800);
  }

  logout() {
    state.logout();
    this._updateNav();
    App.toast.show('👋 До свидания!');
    App.router.go('home');
  }

  _afterLogin() { this._updateNav(); App.profile.renderLivesBar(); }

  _updateNav() {
    const li = state.loggedIn;
    document.getElementById('navLoginBtn').style.display = li ? 'none' : '';
    document.getElementById('navAv').className      = 'nav-av'         + (li ? ' show' : '');
    document.getElementById('navXp').className      = 'nav-pill np-xp' + (li ? ' show' : '');
    document.getElementById('navBolt').className    = 'nav-pill np-bolt'+ (li ? ' show' : '');
    document.getElementById('navLives').className   = 'nav-pill np-lives'+(li ? ' show' : '');
    document.getElementById('teacherNav').style.display = (li && state.user.role === 'teacher') ? '' : 'none';
    if (li) {
      document.getElementById('navXpV').textContent    = state.user.xp;
      document.getElementById('navBoltV').textContent  = state.user.bolts;
      document.getElementById('navLivesV').textContent = state.user.lives;
      document.getElementById('navAv').textContent     = state.user.role === 'teacher' ? '👨‍🏫' : '🎓';
    }
  }

  refreshNav() { this._updateNav(); }
}
