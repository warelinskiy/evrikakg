class Chat {
  render(){
    document.getElementById('csList').innerHTML=CHATS.map(c=>`
      <div class="cs-item${state.chatOpen===c.id?' on':''}" onclick="App.chat.open(${c.id})">
        <div class="cs-av">${c.av}</div>
        <div><div class="cs-nm">${c.name}</div><div class="cs-last">${c.last}</div></div>
      </div>`).join('');
  }
  open(id){
    state.chatOpen=id; const c=CHATS.find(x=>x.id===id);
    document.getElementById('cmHdrName').textContent=c.name;
    document.getElementById('cmHdr').querySelector('.cs-av').textContent=c.av;
    this.render();
  }
  send(){
    const inp=document.getElementById('chatInp'),msg=inp.value.trim();
    if(!msg)return;
    if(!state.loggedIn){toast('🔐 Войдите');return;}
    const now=new Date(),time=`${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
    const msgs=document.getElementById('cmMsgs');
    msgs.innerHTML+=`<div class="msg msg-out">${msg}<div class="msg-time">${time}</div></div>`;
    msgs.scrollTop=msgs.scrollHeight; inp.value='';
  }
}

// ════════════════════════════════════════
// KYRGYZ
// ════════════════════════════════════════
