class Mascot {
  static MSGS={home:'Учись каждый день! 🔥',tests:'Выбирай тест! 🎯',kyrgyz:'Кыргызский — наш приоритет! 🇰🇬',shop:'Трать Болтики с умом 😎',friends:'Учись с друзьями быстрее! 👥',profile:'Смотри свой прогресс! 📈',teacher:'Учитель — это круто! 👨‍🏫',chat:'Обсуждай курсы с друзьями! 💬'};
  toggle(){document.getElementById('mascotBubble').classList.toggle('show');}
  say(msg){const b=document.getElementById('mascotBubble');b.textContent=msg;b.classList.add('show');setTimeout(()=>b.classList.remove('show'),3500);}
  react(name){const m=Mascot.MSGS[name];if(m)setTimeout(()=>this.say(m),600);}
}

// ════════════════════════════════════════
// AI SUPPORT
// ════════════════════════════════════════
