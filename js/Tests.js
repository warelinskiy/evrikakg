/** js/Tests.js (module — не путать с data/Tests.js) */
class Tests {
  render() {
    const all      = [...TESTS, ...state.customTests];
    const filtered = state.activeCat === 'all' ? all : all.filter(t => t.track === state.activeCat);
    document.getElementById('testsGrid').innerHTML = filtered.map(t => {
      const tCls   = t.track === 'code' ? 'tct-code' : t.track === 'lang' ? 'tct-lang' : 'tct-ky';
      const tagCls = t.track === 'code' ? 'tctg-code': t.track === 'lang' ? 'tctg-lang': 'tctg-ky';
      const lbl    = t.track === 'code' ? '💻 CodeLab' : t.track === 'lang' ? '🌍 LinguaLab' : '🇰🇬 Кыргызский';
      return `
        <div class="test-card" onclick="App.quiz.start(${t.id || t.cid})">
          <div class="tc-top ${tCls}">${t.emoji}</div>
          <div class="tc-body">
            <div class="tc-tag ${tagCls}">${lbl}</div>
            <h3>${t.title}</h3>
            <p>${t.desc}</p>
            <div class="tc-meta">
              <span>⏱${t.time}м</span>
              <span>${this._stars(t.level)}</span>
              <div class="bb">⚙️+${t.bolts}</div>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  filter(cat, el) {
    state.activeCat = cat;
    document.querySelectorAll('.fb').forEach(b => b.className = 'fb');
    if (el) el.className = 'fb ' + (cat === 'all' ? 'on' : cat === 'code' ? 'con' : 'lon');
    this.render();
  }

  _stars(l) { return l === 'Лёгкий' ? '⭐' : l === 'Средний' ? '⭐⭐' : '⭐⭐⭐'; }
}
