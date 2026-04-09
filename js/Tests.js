class Tests {
  render(){
    const all=[...TESTS,...state.customTests];
    const f=state.activeCat==='all'?all:all.filter(t=>t.track===state.activeCat);
    document.getElementById('testsGrid').innerHTML=f.map(t=>{
      const tCls=t.track==='code'?'tc-top-code':t.track==='lang'?'tc-top-lang':'tc-top-ky';
      const tgCls=t.track==='code'?'tt-code':t.track==='lang'?'tt-lang':'tt-ky';
      const lbl=t.track==='code'?'💻 CodeLab':t.track==='lang'?'🌍 LinguaLab':'🇰🇬 Кыргызский';
      return `<div class="test-card" onclick="App.quiz.start(${t.id||t.cid})">
        <div class="tc-top ${tCls}">${t.emoji}</div>
        <div class="tc-body">
          <div class="tc-tag ${tgCls}">${lbl}</div>
          <h3>${t.title}</h3><p>${t.desc}</p>
          <div class="tc-meta"><span>⏱${t.time}м</span><span>${this._stars(t.level)}</span><div class="bb">⚙️+${t.bolts}</div></div>
        </div></div>`;
    }).join('');
  }
  filter(cat,el){
    state.activeCat=cat;
    document.querySelectorAll('.fb').forEach(b=>b.className='fb');
    if(el){const cls=cat==='all'?'on':cat==='code'?'con':cat==='lang'?'lon':'kyon';el.className='fb '+cls;}
    this.render();
  }
  _stars(l){return l==='Лёгкий'?'⭐':l==='Средний'?'⭐⭐':'⭐⭐⭐';}
}

// ════════════════════════════════════════
// HOME
// ════════════════════════════════════════
