class Home {
  render(){
    const el=document.getElementById('homeFeatGrid');
    if(!el)return;
    el.innerHTML=FEATURES.map(f=>`
      <div class="feat-card">
        <div class="feat-dot">${f.ic}</div>
        <h3>${f.title}</h3>
        <p>${f.desc}</p>
      </div>`).join('');
  }
}

// ════════════════════════════════════════
// SHOP
// ════════════════════════════════════════
