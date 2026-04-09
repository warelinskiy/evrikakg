class Auth {
  constructor(){this._edu='';this._role='';}
  switchTab(tab){
    ['login','register'].forEach(t=>{
      document.getElementById('tab-'+t).classList.toggle('active',t===tab);
      document.getElementById('form-'+t).style.display=t===tab?'block':'none';
    });
    if(tab==='register')this._step(0);
  }
  _step(n){
    [0,1,2].forEach(i=>{
      document.getElementById('sp'+i).classList.toggle('active',i===n);
      const r=document.getElementById('rs'+i);
      r.className='rs'+(i<n?' d':i===n?' a':'');
    });
  }
  selectEdu(el,v){
    document.querySelectorAll('.edu-btn').forEach(b=>b.classList.remove('sel'));
    el.classList.add('sel'); this._edu=v;
  }
  nextStep(n){
    if(n===1){
      if(!this._edu){toast('⚠️ Выберите тип образования');return;}
      const roles=this._edu==='school'
        ?[{v:'teacher',i:'👨‍🏫',l:'Учитель'},{v:'student',i:'🎓',l:'Ученик'}]
        :this._edu==='higher'
        ?[{v:'teacher',i:'👨‍🏫',l:'Преподаватель'},{v:'student',i:'🎓',l:'Студент'}]
        :[{v:'teacher',i:'👨‍🏫',l:'Ментор'},{v:'student',i:'🎓',l:'Участник'}];
      document.getElementById('roleGrid').innerHTML=roles.map(r=>
        `<div class="role-btn" onclick="App.auth._selRole(this)" data-role="${r.v}"><span class="ri">${r.i}</span>${r.l}</div>`).join('');
      this._role='';
    }
    if(n===2&&!this._role){toast('⚠️ Выберите роль');return;}
    this._step(n);
  }
  _selRole(el){document.querySelectorAll('.role-btn').forEach(b=>b.classList.remove('sel'));el.classList.add('sel');this._role=el.dataset.role;}
  login(){
    const e=document.getElementById('liE').value.trim();
    const p=document.getElementById('liP').value.trim();
    if(!e||!p){toast('⚠️ Заполните все поля');return;}
    state.login('Пользователь','user'+Math.floor(Math.random()*9999),'student','Школьное');
    this._post(); toast('✅ Добро пожаловать!'); setTimeout(()=>App.router.go('home'),700);
  }
  register(){
    const name=document.getElementById('rN').value.trim();
    const uname=document.getElementById('rU').value.trim().replace('@','');
    const contact=document.getElementById('rC').value.trim();
    const pass=document.getElementById('rP').value.trim();
    if(!name||!contact||!pass){toast('⚠️ Заполните все поля');return;}
    if(pass.length<6){toast('⚠️ Пароль минимум 6 символов');return;}
    const edu=this._edu==='school'?'Школьное':this._edu==='higher'?'Высшее':'Другое';
    state.login(name,uname||'user'+Math.floor(Math.random()*9999),this._role||'student',edu);
    this._post(); toast(`🎉 Добро пожаловать, ${name}! +50 ⚙️`,4000);
    setTimeout(()=>App.router.go(this._role==='teacher'?'teacher':'home'),800);
  }
  logout(){state.logout();this._nav();toast('👋 До свидания!');App.router.go('home');}
  _post(){this._nav();App.profile.renderLives();}
  _nav(){
    const li=state.loggedIn;
    document.getElementById('navLoginBtn').style.display=li?'none':'';
    document.getElementById('navAv').className='nav-av'+(li?' show':'');
    document.getElementById('navXp').className='npill np-x'+(li?' show':'');
    document.getElementById('navBolt').className='npill np-b'+(li?' show':'');
    document.getElementById('navLives').className='npill np-lives'+(li?' show':'');
    document.getElementById('teacherNav').style.display=(li&&state.user.role==='teacher')?'':'none';
    if(li){
      document.getElementById('navXpV').textContent=state.user.xp;
      document.getElementById('navBoltV').textContent=state.user.bolts;
      document.getElementById('navLivesV').textContent=state.user.lives;
      document.getElementById('navAv').textContent=state.user.role==='teacher'?'👨‍🏫':'🎓';
    }
  }
  refreshNav(){this._nav();}
}

// ════════════════════════════════════════
// QUIZ
// ════════════════════════════════════════
