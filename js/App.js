const App = {
  router:  new Router(),
  auth:    new Auth(),
  quiz:    new Quiz(),
  tests:   new Tests(),
  home:    new Home(),
  shop:    new Shop(),
  profile: new Profile(),
  friends: new Friends(),
  chat:    new Chat(),
  kyrgyz:  new Kyrgyz(),
  teacher: new Teacher(),
  mascot:  new Mascot(),
  ai:      new AI(),
};

document.addEventListener('DOMContentLoaded', () => {
  // Set logo
  const LOGO = window.__LOGO__;
  ['navLogo','heroLogo','authLogo'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.src = LOGO;
  });
  // Boot
  App.home.render();
  App.tests.render();
  App.kyrgyz.render();
  App.shop.render();
  App.friends.render();
  App.chat.render();
  setTimeout(() => App.mascot.say('Привет! Я Болт — твой проводник! 🚀'), 1000);
});
