/**
 * js/data/ShopItems.js
 */
const ShopItems = {
  boosts: [
    { id:'h1',     icon:'💡', name:'Подсказка ×3',      desc:'Убирает 2 неверных варианта',   price:15 },
    { id:'t1',     icon:'⏳', name:'Заморозка времени', desc:'Стоп-таймер на 5 сек',          price:25 },
    { id:'s1',     icon:'⏭️', name:'Пропуск вопроса',  desc:'Пропусти 1 вопрос без штрафа',  price:20 },
    { id:'x2',     icon:'⚡', name:'Двойной XP',        desc:'×2 XP за следующий тест',       price:40 },
    { id:'lifex3', icon:'❤️', name:'3 жизни',           desc:'Мгновенно восстанови 3 жизни',  price:30 },
  ],
  avatars: [
    { id:'av1', icon:'🤖', name:'Робот',     desc:'Технарь',           price:30 },
    { id:'av2', icon:'🧙', name:'Волшебник', desc:'Мастер кода',       price:30 },
    { id:'av3', icon:'🥷', name:'Ниндзя',    desc:'Молчаливый и умный',price:30 },
    { id:'av4', icon:'🧑‍🚀',name:'Астронавт', desc:'Знания без границ', price:50 },
    { id:'av5', icon:'🐉', name:'Дракон',    desc:'Легендарный',       price:100},
  ],
  titles: [
    { id:'ti1',         icon:'💻', name:'«Кодер»',        desc:'Звание разработчика',      price:60  },
    { id:'ti2',         icon:'🌍', name:'«Полиглот»',     desc:'Мастер языков',            price:60  },
    { id:'ti3',         icon:'🧠', name:'«Гений»',        desc:'Лучший из лучших',         price:120 },
    { id:'pro_rainbow', icon:'🌈', name:'Pro: Радужный ник',desc:'Переливающийся @юзернейм',price:200 },
  ],
  usernames: [
    { id:'u_boss',   icon:'@', name:'@boss',   desc:'Очень редкое имя',    price:500  },
    { id:'u_evrika', icon:'@', name:'@evrika', desc:'Название платформы!', price:2000 },
    { id:'u_pro',    icon:'@', name:'@pro',    desc:'Статусное имя',       price:800  },
    { id:'u_gg',     icon:'@', name:'@gg',     desc:'Короткое и стильное', price:300  },
  ],
  all() {
    return [...this.boosts, ...this.avatars, ...this.titles, ...this.usernames];
  },
  find(id) {
    return this.all().find(i => i.id === id);
  },
};

const THEMES = [
  { id:'default', label:'☀️ Жёлтый',          cls:'th-default' },
  { id:'ocean',   label:'🌊 Океан',             cls:'th-ocean'   },
  { id:'field',   label:'🌿 Зелёное поле',      cls:'th-field'   },
  { id:'space',   label:'🌌 Чёрное небо',       cls:'th-space'   },
  { id:'marble',  label:'🪨 Светлый мрамор',    cls:'th-marble'  },
  { id:'aurora',  label:'🌌 Северное сияние',   cls:'th-aurora'  },
  { id:'grape',   label:'🍇 Фиолетовый виноград',cls:'th-grape'  },
];
