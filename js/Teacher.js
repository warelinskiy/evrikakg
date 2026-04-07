/** js/Teacher.js */
class Teacher {
  constructor() {
    this._tpl = 'quiz';
  }

  render() {
    this._renderStudents();
    this._renderMyTests();
    this._renderTemplates();
    document.getElementById('dsN').textContent = state.customTests.length;
  }

  showPanel(tab) {
    const tabs = ['dash', 'students', 'mytests', 'templates', 'create'];
    document.querySelectorAll('.tsb').forEach((b, i) => b.classList.toggle('active', tabs[i] === tab));
    document.querySelectorAll('.t-panel').forEach(p => p.classList.remove('active'));
    const el = document.getElementById('tp-' + tab);
    if (el) el.classList.add('active');
  }

  _renderStudents() {
    const el = document.getElementById('stuBody');
    if (!el) return;
    el.innerHTML = FAKE_STUDENTS.map(s => `
      <tr>
        <td>${s.name}</td>
        <td style="color:var(--muted);font-size:11px">${s.handle}</td>
        <td><span class="badge bg-b">${s.edu}</span></td>
        <td>⚡${s.xp}</td><td>⚙️${s.bolts}</td><td>❤️${s.lives}</td>
        <td>${s.tests}</td>
        <td>${s.streak > 0 ? '🔥' + s.streak : '—'}</td>
        <td><span class="badge ${s.status === 'active' ? 'bg-g' : 'bg-r'}">${s.status === 'active' ? 'Активен' : 'Нет'}</span></td>
      </tr>`).join('');
  }

  _renderMyTests() {
    const el = document.getElementById('myTestsList');
    if (!el) return;
    const TPL_LABELS = { quiz:'Тест с выбором', tf:'Правда/Ложь', vocab:'Словарный', code:'Код-вопрос', open:'Открытый', mixed:'Смешанный' };
    el.innerHTML = state.customTests.length
      ? state.customTests.map(t => `
          <div class="mt-row">
            <div class="mt-ic">${t.emoji}</div>
            <div class="mt-inf">
              <h3>${t.title}</h3>
              <p>${t.track === 'code' ? '💻' : t.track === 'lang' ? '🌍' : '🇰🇬'} · ${t.tag} · ${t.questions.length}вопр · ⚙️${t.bolts} · ${TPL_LABELS[t.tpl] || 'Тест'}</p>
            </div>
            <div class="mt-act">
              <button class="btn-os" onclick="App.quiz.start(${t.cid})">▶</button>
              <button class="btn-rs" onclick="App.teacher.deleteTest(${t.cid})">✕</button>
            </div>
          </div>`)
        .join('')
      : '<p style="font-size:12px;color:var(--muted);font-weight:700;padding:12px 0">Нет тестов. <a onclick="App.teacher.showPanel(\'templates\')" style="cursor:pointer;color:var(--yd);font-weight:900">Создать →</a></p>';
  }

  _renderTemplates() {
    const templates = [
      { id:'quiz',  ic:'🎯', title:'Тест с выбором', desc:'4 варианта, таймер, XP за скорость' },
      { id:'tf',    ic:'✅', title:'Правда/Ложь',    desc:'Быстрые утверждения — верно или нет' },
      { id:'vocab', ic:'🌍', title:'Словарный',      desc:'Слово + 4 перевода — для LinguaLab'  },
      { id:'code',  ic:'💻', title:'Код-вопрос',     desc:'Вопрос + блок кода + 4 варианта'     },
      { id:'open',  ic:'✏️', title:'Открытый',       desc:'Ученик вводит ответ вручную'          },
      { id:'mixed', ic:'🎲', title:'Смешанный',      desc:'Разные типы вопросов в одном тесте'  },
    ];
    const el = document.getElementById('tplGrid');
    if (!el) return;
    el.innerHTML = templates.map(t => `
      <div class="tpl-card" onclick="App.teacher.selectTemplate('${t.id}', this)">
        <div class="tpl-ic">${t.ic}</div>
        <h3>${t.title}</h3>
        <p>${t.desc}</p>
      </div>`).join('');
  }

  selectTemplate(tpl, el) {
    this._tpl = tpl;
    const labels = { quiz:'Тест с выбором', tf:'Правда/Ложь', vocab:'Словарный', code:'Код-вопрос', open:'Открытый', mixed:'Смешанный' };
    document.getElementById('tplLbl').textContent = labels[tpl] || tpl;
    document.querySelectorAll('.tpl-card').forEach(c => c.classList.remove('sel'));
    el.classList.add('sel');
    this._initBuilder();
    this.showPanel('create');
  }

  _initBuilder() {
    state.qCount = 0;
    document.getElementById('qbList').innerHTML = '';
    this.addQuestion();
    this.addQuestion();
  }

  addQuestion() {
    state.qCount++;
    const n      = state.qCount;
    const isTF   = this._tpl === 'tf';
    const isOpen = this._tpl === 'open';
    const hasCode= this._tpl === 'code' || this._tpl === 'mixed';

    let ansHtml = '';
    if (isTF) {
      ansHtml = `<div class="ag" style="grid-template-columns:1fr 1fr">
        <div class="ao"><input type="radio" name="c${n}" value="0" checked><input type="text" value="Правда" readonly></div>
        <div class="ao"><input type="radio" name="c${n}" value="1"><input type="text" value="Ложь" readonly></div>
      </div>`;
    } else if (isOpen) {
      ansHtml = `<div class="ff" style="margin-top:8px">
        <label>ПРАВИЛЬНЫЙ ОТВЕТ</label>
        <input class="qi" type="text" placeholder="Правильный ответ...">
      </div>`;
    } else {
      ansHtml = `<div class="ag">
        ${[0,1,2,3].map(i => `
          <div class="ao">
            <input type="radio" name="c${n}" value="${i}" ${i === 0 ? 'checked' : ''}>
            <input type="text" placeholder="Вариант ${i + 1}...">
          </div>`).join('')}
      </div>`;
    }

    const d = document.createElement('div');
    d.className = 'q-item';
    d.id = 'qi-' + n;
    d.innerHTML = `
      <div class="q-ih">
        <div class="q-nb">${n}</div>
        <input class="qi" type="text" placeholder="${hasCode ? 'Текст вопроса (код ниже)...' : 'Текст вопроса...'}">
        ${n > 2 ? `<button onclick="document.getElementById('qi-${n}').remove()" style="background:none;border:none;cursor:pointer;font-size:15px;color:#C62828">✕</button>` : ''}
      </div>
      ${hasCode ? `<div class="ff" style="margin-bottom:8px">
        <label>КОД (необязательно)</label>
        <textarea class="qi" style="min-height:52px;font-family:'Fira Code',monospace;font-size:11px" placeholder="// код..."></textarea>
      </div>` : ''}
      ${ansHtml}
      <div class="qhint">● Отметь верный вариант</div>`;
    document.getElementById('qbList').appendChild(d);
  }

  saveTest() {
    const title = document.getElementById('ctT').value.trim();
    const track = document.getElementById('ctTr').value;
    const topic = document.getElementById('ctTp').value.trim() || 'Тест';
    const level = document.getElementById('ctL').value;
    const bolts = +document.getElementById('ctB').value || 10;
    const desc  = document.getElementById('ctD').value.trim();

    if (!title) { App.toast.show('⚠️ Введите название'); return; }

    const qItems    = [...document.querySelectorAll('.q-item')];
    const questions = [];
    let valid = true;

    qItems.forEach(item => {
      const qt = item.querySelector('.qi').value.trim();
      if (!qt) { valid = false; return; }
      if (this._tpl === 'open') {
        const ans = item.querySelectorAll('.qi')[1]?.value.trim() || '';
        questions.push({ text: qt, answers: [ans, '—', '—', '—'], correct: 0 });
      } else {
        const opts    = [...item.querySelectorAll('.ao input[type=text]')].map(i => i.value.trim());
        if (opts.some(o => !o) && this._tpl !== 'tf') { valid = false; return; }
        const correct = +([...item.querySelectorAll('input[type=radio]')].find(r => r.checked)?.value || 0);
        const codeEl  = item.querySelector('textarea.qi');
        questions.push({
          text:    qt,
          answers: this._tpl === 'tf' ? ['Правда','Ложь','—','—'] : opts,
          correct,
          code:    codeEl ? codeEl.value.trim() : '',
        });
      }
    });

    if (!valid || questions.length < 2) { App.toast.show('⚠️ Заполните все вопросы'); return; }

    state.customTests.push({
      cid: Date.now(), tpl: this._tpl, track,
      emoji:    track === 'code' ? '📝' : track === 'lang' ? '💬' : '🇰🇬',
      tag: topic, title, desc: desc || topic,
      time: 15, q: questions.length, level, bolts, questions,
    });

    document.getElementById('dsN').textContent = state.customTests.length;
    App.toast.show('✅ Тест сохранён!');
    this.showPanel('mytests');
    this._renderMyTests();
    App.tests.render();
    this._initBuilder();
  }

  deleteTest(cid) {
    state.customTests = state.customTests.filter(t => t.cid !== cid);
    this._renderMyTests();
    App.tests.render();
    document.getElementById('dsN').textContent = state.customTests.length;
    App.toast.show('🗑️ Удалено');
  }
}
