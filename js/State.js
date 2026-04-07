/**
 * js/State.js
 * Global application state (singleton)
 */
class State {
  constructor() {
    this.loggedIn    = false;
    this.user        = null;      // { name, handle, role, edu, xp, level, bolts, lives, streak, tests, history[] }
    this.customTests = [];
    this.owned       = [];        // shop item ids
    this.chatOpen    = null;
    this.activeCat   = 'all';
    this.currentTpl  = 'quiz';
    this.qCount      = 0;         // question builder counter
  }

  login(name, handle, role, edu) {
    this.loggedIn = true;
    this.user = {
      name, handle: '@' + handle, role, edu,
      xp: 0, level: 1, bolts: 50, lives: 10,
      streak: 3, tests: 0, history: []
    };
  }

  logout() {
    this.loggedIn    = false;
    this.user        = null;
    this.owned       = [];
    this.customTests = [];
  }

  addXp(amount) {
    if (!this.user) return;
    this.user.xp += amount;
    // level up
    const thresholds = [0, 200, 500, 1000, 2000, 3500, 5000, 999999];
    let lv = 1;
    thresholds.forEach((v, i) => { if (this.user.xp >= v) lv = i + 1; });
    this.user.level = lv;
  }

  addBolts(amount) { if (this.user) this.user.bolts += amount; }

  loseLife() {
    if (this.user) this.user.lives = Math.max(0, this.user.lives - 1);
  }

  restoreLives(n) {
    if (this.user) this.user.lives = Math.min(10, this.user.lives + n);
  }

  spendBolts(amount) {
    if (!this.user || this.user.bolts < amount) return false;
    this.user.bolts -= amount;
    return true;
  }

  addHistory(entry) {
    if (this.user) this.user.history.unshift(entry);
  }
}

// Expose as a single global instance
const state = new State();
