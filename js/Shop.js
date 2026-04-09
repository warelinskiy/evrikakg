class Shop {
  render(){
    if(state.user)document.getElementById('shopBN').textContent=state.user.bolts;
    this._sec('shB',SHOP_ITEMS.boosts);
    this._sec('shA',SHOP_ITEMS.avatars);
    this._sec('shT',SHOP_ITEMS.titles);
    this._sec('shU',SHOP_ITEMS.usernames);
    this._themes();
  }
  _sec(id,items){
    const el=document.getElementById(id); if(!el)return;
    el.innerHTML=items.map(item=>{
      const owned=state.owned.includes(item.id);
      return `<div class="si${owned?' owned':''}">
        <div class="si-ic">${item.icon}</div>
        <div class="si-nm">${item.name}</div>
        <div class="si-ds">${item.desc}</div>
        <div class="bolt-pr">⚙️ ${item.price}</div><br>
        <button class="btn-buy" onclick="App.shop.buy('${item.id}')" ${owned?'disabled':''}>
          ${owned?'✓ Куплено':'Купить'}
        </button></div>`;
    }).join('');
  }
  _themes(){
    const el=document.getElementById('themeGrid'); if(!el)return;
    el.innerHTML=THEMES.map(t=>`<div class="theme-btn ${t.cls}" onclick="App.shop.setTheme('${t.id}',this)">${t.label}</div>`).join('');
  }
  buy(id){
    if(!state.loggedIn){toast('🔐 Войдите');App.router.go('auth');return;}
    if(state.owned.includes(id)){toast('Уже куплено!');return;}
    const item=SHOP_ITEMS.find(id); if(!item)return;
    if(!state.spend(item.price)){toast(`❌ Нужно ${item.price} ⚙️, у вас ${state.user.bolts}`);return;}
    state.owned.push(id);
    if(id==='lx3'){state.addLives(3);App.profile.renderLives();}
    App.auth.refreshNav(); toast(`🎉 Куплено: ${item.name}!`);
    this.render(); App.profile.renderOwned();
  }
  setTheme(id,el){
    const html=document.documentElement;
    html.removeAttribute('data-theme');
    if(id!=='default')html.setAttribute('data-theme',id);
    document.querySelectorAll('.theme-btn').forEach(b=>b.classList.remove('active'));
    el.classList.add('active');
    toast(`🎨 Тема: ${el.textContent.trim()}`);
  }
}

// ════════════════════════════════════════
// PROFILE
// ════════════════════════════════════════
