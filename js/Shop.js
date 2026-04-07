/** js/Shop.js */
class Shop {
  render() {
    if (state.user) document.getElementById('shopBN').textContent = state.user.bolts;
    this._renderSection('shB', ShopItems.boosts);
    this._renderSection('shA', ShopItems.avatars);
    this._renderSection('shT', ShopItems.titles);
    this._renderSection('shU', ShopItems.usernames);
    this._renderThemes();
  }

  _renderSection(elId, items) {
    const el = document.getElementById(elId);
    if (!el) return;
    el.innerHTML = items.map(item => {
      const owned = state.owned.includes(item.id);
      return `<div class="si${owned ? ' owned' : ''}">
        <div class="si-ic">${item.icon}</div>
        <div class="si-nm">${item.name}</div>
        <div class="si-ds">${item.desc}</div>
        <div class="bolt-pr">⚙️ ${item.price}</div><br>
        <button class="btn-buy" onclick="App.shop.buy('${item.id}')" ${owned ? 'disabled' : ''}>
          ${owned ? '✓ Куплено' : 'Купить'}
        </button>
      </div>`;
    }).join('');
  }

  _renderThemes() {
    const el = document.getElementById('themeGrid');
    if (!el) return;
    el.innerHTML = THEMES.map(t => `
      <div class="theme-btn ${t.cls}" onclick="App.shop.setTheme('${t.id}', this)">
        ${t.label}
      </div>`).join('');
  }

  buy(id) {
    if (!state.loggedIn) { App.toast.show('🔐 Войдите для покупки'); App.router.go('auth'); return; }
    if (state.owned.includes(id)) { App.toast.show('Уже куплено!'); return; }
    const item = ShopItems.find(id);
    if (!item) return;
    if (!state.spendBolts(item.price)) {
      App.toast.show(`❌ Нужно ${item.price} ⚙️, у вас ${state.user.bolts}`);
      return;
    }
    state.owned.push(id);
    if (id === 'lifex3') { state.restoreLives(3); App.profile.renderLivesBar(); }
    App.auth.refreshNav();
    App.toast.show(`🎉 Куплено: ${item.name}!`);
    this.render();
    App.profile.renderOwnedChips();
  }

  setTheme(id, el) {
    document.documentElement.removeAttribute('data-theme');
    if (id !== 'default') document.documentElement.setAttribute('data-theme', id);
    document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    App.toast.show(`🎨 Тема: ${el.textContent.trim()}`);
  }
}
