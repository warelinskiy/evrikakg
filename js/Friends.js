class Friends {
  render(){
    document.getElementById('friendsGrid').innerHTML=state.friendsList.map(f=>`
      <div class="friend-card">
        <div class="fc-av">${f.av}</div>
        <div class="fc-info">
          <div class="fc-name">${f.name}</div>
          <div class="fc-handle">${f.handle}</div>
          <div style="font-size:10px;font-weight:800;color:var(--muted);margin-bottom:5px">📚 ${f.course} · Ур. ${f.level}</div>
          <div class="fc-prog"><div class="fc-pbar" style="width:${Math.min(100,f.xp/500*100)}%"></div></div>
          <div class="fc-stats"><span>⚡${f.xp} XP</span><span>🔥${f.streak}д</span><span>⚙️${f.bolts}</span></div>
          <div class="fc-btns">
            <button class="btn-fc btn-fc-y" onclick="toast('💬 Чат открыт!')">Написать</button>
            <button class="btn-fc btn-fc-o" onclick="toast('🏆 Вызов отправлен!')">Вызов</button>
          </div>
        </div>
      </div>`).join('');
  }
  add(){
    const inp=document.getElementById('addFriendInp'),val=inp.value.trim();
    if(!val){toast('⚠️ Введи @юзернейм');return;}
    if(!state.loggedIn){toast('🔐 Войдите');App.router.go('auth');return;}
    const emojis=['👦','👩','👨‍💻','👩‍💻','🧑'];
    state.friendsList.push({name:val,handle:val.startsWith('@')?val:'@'+val,
      av:emojis[Math.floor(Math.random()*emojis.length)],xp:Math.floor(Math.random()*400),
      bolts:Math.floor(Math.random()*150),streak:Math.floor(Math.random()*7),level:Math.floor(Math.random()*4)+1,course:'Python'});
    inp.value=''; this.render(); toast(`✅ ${val} добавлен!`);
  }
}

// ════════════════════════════════════════
// CHAT
// ════════════════════════════════════════
