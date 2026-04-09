class AI {
  static A={'пароль':'Перейди в Настройки → Смена пароля.','жизни':'10 жизней на 10 часов. Каждая ошибка = -1 жизнь. При 0 — жди 1 час (+1 жизнь). Pro = безлимит!','болтики':'Болтики зарабатываются за правильные ответы, быстрые ответы, стрики и 100% тесты. Трать в Магазине!','подписка':'Pro: 500–1500 сом/мес. Безлимит жизней, радужный ник, эксклюзивные темы. Скидка 75% для учителей!','юзернейм':'Уникальный @username при регистрации. Pro = переливающийся ник. Редкие имена на аукционе.','кыргызский':'Курс A1–B1 — 120 уроков. 30 мин/день = B1 за 6–8 месяцев. Перейди в раздел 🇰🇬 Кыргызский.'};
  toggle(){document.getElementById('aiBox').classList.toggle('show');}
  send(){
    const inp=document.getElementById('aiInp'),msg=inp.value.trim();if(!msg)return;
    inp.value='';
    const msgs=document.getElementById('aiMsgs');
    msgs.innerHTML+=`<div class="ai-msg ai-msg-user">${msg}</div>`;
    const key=Object.keys(AI.A).find(k=>msg.toLowerCase().includes(k));
    const reply=key?AI.A[key]:'Хм, попробуй спросить: "жизни", "болтики", "подписка", "юзернейм" или "кыргызский"!';
    setTimeout(()=>{msgs.innerHTML+=`<div class="ai-msg ai-msg-bot">${reply}</div>`;msgs.scrollTop=msgs.scrollHeight;},600);
    msgs.scrollTop=msgs.scrollHeight;
  }
}

// ════════════════════════════════════════
// APP — entry point
// ════════════════════════════════════════
