class Teacher {
  constructor(){this._tpl='quiz';}
  render(){this._students();this._myTests();this._templates();document.getElementById('dsN').textContent=state.customTests.length;}
  showPanel(tab){
    const tabs=['dash','students','mytests','templates','create'];
    document.querySelectorAll('.tsb').forEach((b,i)=>b.classList.toggle('active',tabs[i]===tab));
    document.querySelectorAll('.t-panel').forEach(p=>p.classList.remove('active'));
    const el=document.getElementById('tp-'+tab); if(el)el.classList.add('active');
  }
  _students(){
    document.getElementById('stuBody').innerHTML=STUDENTS.map(s=>`
      <tr><td>${s.name}</td><td style="color:var(--muted);font-size:11px">${s.handle}</td>
      <td><span class="badge bg-b">${s.edu}</span></td>
      <td>⚡${s.xp}</td><td>⚙️${s.bolts}</td><td>❤️${s.lives}</td>
      <td>${s.tests}</td><td>${s.streak>0?'🔥'+s.streak:'—'}</td>
      <td><span class="badge ${s.status==='active'?'bg-g':'bg-r'}">${s.status==='active'?'Активен':'Нет'}</span></td></tr>`).join('');
  }
  _myTests(){
    const el=document.getElementById('myTestsList');
    const LPLS={quiz:'Выбор',tf:'Правда/Ложь',vocab:'Словарный',code:'Код',open:'Открытый',mixed:'Смешанный'};
    el.innerHTML=state.customTests.length?state.customTests.map(t=>`
      <div class="mt-row"><div class="mt-ic">${t.emoji}</div>
      <div class="mt-inf"><h3>${t.title}</h3><p>${t.track==='code'?'💻':t.track==='lang'?'🌍':'🇰🇬'} · ${t.tag} · ${t.questions.length}вопр · ⚙️${t.bolts} · ${LPLS[t.tpl]}</p></div>
      <div class="mt-act">
        <button class="btn-sm" onclick="App.quiz.start(${t.cid})">▶</button>
        <button class="btn-danger" onclick="App.teacher._del(${t.cid})">✕</button>
      </div></div>`).join('')
      :'<p style="font-size:13px;color:var(--muted);font-weight:700;padding:14px 0">Нет тестов. <a onclick="App.teacher.showPanel(\'templates\')" style="cursor:pointer;color:var(--y);font-weight:900">Создать →</a></p>';
  }
  _templates(){
    const tpls=[{id:'quiz',ic:'🎯',t:'Тест с выбором',d:'4 варианта, таймер, XP'},{id:'tf',ic:'✅',t:'Правда/Ложь',d:'Верно или нет'},{id:'vocab',ic:'🌍',t:'Словарный',d:'Слово + 4 перевода'},{id:'code',ic:'💻',t:'Код-вопрос',d:'Вопрос + блок кода'},{id:'open',ic:'✏️',t:'Открытый',d:'Ученик вводит ответ'},{id:'mixed',ic:'🎲',t:'Смешанный',d:'Разные типы'}];
    document.getElementById('tplGrid').innerHTML=tpls.map(t=>`<div class="tpl-card" onclick="App.teacher._selTpl('${t.id}',this)"><div class="tpl-ic">${t.ic}</div><h3>${t.t}</h3><p>${t.d}</p></div>`).join('');
  }
  _selTpl(tpl,el){
    this._tpl=tpl;
    const LBLS={quiz:'Тест с выбором',tf:'Правда/Ложь',vocab:'Словарный',code:'Код-вопрос',open:'Открытый',mixed:'Смешанный'};
    document.getElementById('tplLbl').textContent=LBLS[tpl];
    document.querySelectorAll('.tpl-card').forEach(c=>c.classList.remove('sel')); el.classList.add('sel');
    this._initQ(); this.showPanel('create');
  }
  _initQ(){state.qCount=0;document.getElementById('qbList').innerHTML='';this.addQuestion();this.addQuestion();}
  addQuestion(){
    state.qCount++; const n=state.qCount;
    const isTF=this._tpl==='tf',isOpen=this._tpl==='open',hasCode=this._tpl==='code'||this._tpl==='mixed';
    let ans=isTF?`<div class="ag" style="grid-template-columns:1fr 1fr"><div class="ao"><input type="radio" name="c${n}" value="0" checked><input type="text" value="Правда" readonly></div><div class="ao"><input type="radio" name="c${n}" value="1"><input type="text" value="Ложь" readonly></div></div>`
      :isOpen?`<div class="ff" style="margin-top:8px"><label>ПРАВИЛЬНЫЙ ОТВЕТ</label><input class="qi" type="text" placeholder="Правильный ответ..."></div>`
      :`<div class="ag">${[0,1,2,3].map(i=>`<div class="ao"><input type="radio" name="c${n}" value="${i}" ${i===0?'checked':''}><input type="text" placeholder="Вариант ${i+1}..."></div>`).join('')}</div>`;
    const d=document.createElement('div');d.className='q-item';d.id='qi-'+n;
    d.innerHTML=`<div class="q-ih"><div class="q-nb">${n}</div><input class="qi" type="text" placeholder="Текст вопроса..." style="width:auto;flex:1">${n>2?`<button onclick="document.getElementById('qi-${n}').remove()" style="background:none;border:none;cursor:pointer;font-size:15px;color:#F44336;flex-shrink:0">✕</button>`:''}</div>${hasCode?`<div class="ff" style="margin-bottom:8px"><label>КОД (необязательно)</label><textarea class="qi" style="min-height:52px;font-family:'Fira Code',monospace;font-size:11px" placeholder="// код..."></textarea></div>`:''} ${ans}<div class="qhint">● Отметь верный вариант</div>`;
    document.getElementById('qbList').appendChild(d);
  }
  saveTest(){
    const title=document.getElementById('ctT').value.trim(),track=document.getElementById('ctTr').value,topic=document.getElementById('ctTp').value.trim()||'Тест',level=document.getElementById('ctL').value,bolts=+document.getElementById('ctB').value||10;
    if(!title){toast('⚠️ Введите название');return;}
    const qItems=[...document.querySelectorAll('.q-item')],questions=[];let ok=true;
    qItems.forEach(item=>{
      const qt=item.querySelector('.qi').value.trim();if(!qt){ok=false;return;}
      if(this._tpl==='open'){const a=item.querySelectorAll('.qi')[1]?.value.trim()||'';questions.push({text:qt,answers:[a,'—','—','—'],correct:0});}
      else{const opts=[...item.querySelectorAll('.ao input[type=text]')].map(i=>i.value.trim());if(opts.some(o=>!o)&&this._tpl!=='tf'){ok=false;return;}const correct=+([...item.querySelectorAll('input[type=radio]')].find(r=>r.checked)?.value||0);const codeEl=item.querySelector('textarea.qi');questions.push({text:qt,answers:this._tpl==='tf'?['Правда','Ложь','—','—']:opts,correct,code:codeEl?codeEl.value.trim():''});}
    });
    if(!ok||questions.length<2){toast('⚠️ Заполните все вопросы');return;}
    state.customTests.push({cid:Date.now(),tpl:this._tpl,track,emoji:track==='code'?'📝':track==='lang'?'💬':'🇰🇬',tag:topic,title,desc:topic,time:15,q:questions.length,level,bolts,questions});
    document.getElementById('dsN').textContent=state.customTests.length;
    toast('✅ Тест сохранён!'); this.showPanel('mytests'); this._myTests(); App.tests.render(); this._initQ();
  }
  _del(cid){state.customTests=state.customTests.filter(t=>t.cid!==cid);this._myTests();App.tests.render();document.getElementById('dsN').textContent=state.customTests.length;toast('🗑️ Удалено');}
}

// ════════════════════════════════════════
// MASCOT
// ════════════════════════════════════════
