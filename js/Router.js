class Router {
  go(name){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById('page-'+name).classList.add('active');
    window.scrollTo(0,0);
    const h={profile:()=>App.profile.refresh(),tests:()=>App.tests.render(),
      shop:()=>App.shop.render(),teacher:()=>App.teacher.render(),
      friends:()=>App.friends.render(),chat:()=>App.chat.render(),
      kyrgyz:()=>App.kyrgyz.render(),home:()=>App.home.render()};
    if(h[name])h[name]();
    if(typeof App!=='undefined')App.mascot.react(name);
const h = {
    profile: () => App.profile.refresh(),
    tests: () => App.tests.render(),
    shop: () => App.shop.render(),
    teacher: () => App.teacher.render(),
    friends: () => App.friends.render(),
    chat: () => App.chat.render(),
    kyrgyz: () => App.kyrgyz.render(),
    home: () => App.home.render(),
    // ДОБАВЬТЕ ЭТУ СТРОКУ:
    theory: () => App.theory.render(),
    'theory-view': () => { /* ничего не делаем, уже отрендерили через openLesson */ }
};
// ...
  }
  sa(el){
    document.querySelectorAll('.nav-links a').forEach(a=>a.classList.remove('active'));
    if(el)el.classList.add('active');
  }
}

// ════════════════════════════════════════
// TOAST
// ════════════════════════════════════════
const toast = (msg,d=3000)=>{
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  clearTimeout(t._t); t._t=setTimeout(()=>t.classList.remove('show'),d);
};

// ════════════════════════════════════════
// AUTH
// ════════════════════════════════════════
