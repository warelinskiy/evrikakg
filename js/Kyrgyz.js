class Kyrgyz {
  render(){
    document.getElementById('kyLevels').innerHTML=[
      {badge:'kb-a1',label:'A1 — Начинающий',title:'Основы языка',desc:'Алфавит, числа, приветствия, цвета, семья.',count:30,bar:'lb-a1'},
      {badge:'kb-a2',label:'A2 — Элементарный',title:'Повседневная речь',desc:'Время, еда, покупки, транспорт, прошедшее время.',count:30,bar:'lb-a2'},
      {badge:'kb-b1',label:'B1 — Средний',title:'Свободное общение',desc:'Работа, новости, мнения. Сложные конструкции.',count:60,bar:'lb-b1'},
    ].map(lv=>`<div class="ky-lv">
      <div class="ky-badge ${lv.badge}">${lv.label}</div>
      <h3>${lv.title}</h3><p>${lv.desc}</p>
      <div style="font-size:11px;font-weight:800;color:var(--muted);margin-bottom:6px">${lv.count} уроков</div>
      <div class="lv-prog"><div class="lv-bar ${lv.bar}" style="width:0%"></div></div>
    </div>`).join('');
    document.getElementById('kyLessons').innerHTML=KY_LESSONS.map(l=>`
      <div class="lesson-card" onclick="App.kyrgyz.startLesson(${l.n})">
        <div class="lesson-num">${l.n}</div>
        <div class="lesson-info"><h4>${l.title}</h4><p>${l.desc}</p></div>
      </div>`).join('');
  }
  start(){if(!state.loggedIn){toast('🔐 Войдите');App.router.go('auth');return;}App.quiz.start(1);}
  startLesson(n){if(!state.loggedIn){toast('🔐 Войдите');App.router.go('auth');return;}toast(`📚 Урок ${n}!`);App.quiz.start(n<=2?n:1);}
}

// ════════════════════════════════════════
// TEACHER
// ════════════════════════════════════════
