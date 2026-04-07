/**
 * js/App.js
 * Main entry point — instantiates all modules and wires them together.
 * Loaded last, after all other scripts.
 */

// ── Stub files that are defined inside Teacher.js for simplicity ──
// Profile, Friends, Chat, Tests, Home, Kyrgyz, Mascot, AI are all
// defined in Teacher.js (same bundle for conciseness).
// Router, Toast, Auth are in their own files.

const App = {
  router:  new Router(),
  toast:   new Toast(),
  auth:    new Auth(),
  quiz:    new Quiz(),
  shop:    new Shop(),
  profile: new Profile(),
  friends: new Friends(),
  chat:    new Chat(),
  teacher: new Teacher(),
  kyrgyz:  new Kyrgyz(),
  mascot:  new Mascot(),
  ai:      new AI(),
  home:    new Home(),
  tests:   new Tests(),
};

// Boot sequence
document.addEventListener('DOMContentLoaded', () => {
  App.home.render();
  App.tests.render();
  App.kyrgyz.render();
  App.shop.render();
  App.friends.render();
  App.chat.render();
  App.mascot.say('Привет! Я Болт — твой проводник в мире знаний! 🚀');
});
