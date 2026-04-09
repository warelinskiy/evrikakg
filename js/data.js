// ════════════════════════════════════════
// DATA
// ════════════════════════════════════════
const Q = {
  kyA1(){return[
    {text:'"Саламатсызбы" означает?',answers:['Здравствуйте','До свидания','Спасибо','Пожалуйста'],correct:0},
    {text:'"Один" по-кыргызски?',answers:['Бир','Эки','Үч','Төрт'],correct:0},
    {text:'"Кызыл" — это?',answers:['Красный','Зелёный','Жёлтый','Чёрный'],correct:0},
    {text:'"Рахмат" означает?',answers:['Спасибо','Извините','Пожалуйста','Привет'],correct:0},
    {text:'"Жакшы" означает?',answers:['Хорошо','Плохо','Быстро','Медленно'],correct:0},
  ]},
  kyGreet(){return[
    {text:'"Кечирересиз" означает?',answers:['Извините','Спасибо','Привет','Пока'],correct:0},
    {text:'"Мама" по-кыргызски?',answers:['Эне','Ата','Ага','Эже'],correct:0},
    {text:'"Сен кимсиң?"',answers:['Кто ты?','Где ты?','Что это?','Как ты?'],correct:0},
    {text:'Число "беш"?',answers:['5','4','6','3'],correct:0},
    {text:'"Эне" — это?',answers:['Мама','Папа','Брат','Сестра'],correct:0},
  ]},
  python(){return[
    {text:'Тип данных у True?',answers:['bool','int','str','float'],correct:0},
    {text:'Как объявить список?',answers:['x = []','x = {}','x = ()','x = <>'],correct:0},
    {text:'Что делает len()?',answers:['Длина объекта','Тип','Удаляет','Сортирует'],correct:0},
    {text:'Комментарий в Python?',answers:['# текст','// текст','/* */','-- текст'],correct:0},
    {text:'print(2 ** 3) выведет?',answers:['8','6','9','5'],correct:0},
  ]},
  js(){return[
    {text:'Объявить переменную ES6?',answers:['let x = 5','var x = 5','dim x','int x'],correct:0},
    {text:'typeof null вернёт?',answers:['"object"','"null"','"undefined"','"boolean"'],correct:0},
    {text:'Метод в конец массива?',answers:['push()','pop()','shift()','unshift()'],correct:0},
    {text:'Что такое Promise?',answers:['Объект для async','Тип переменной','Колбэк','Ключевое слово'],correct:0},
    {text:'getElementById?',answers:['document.getElementById("x")','window.get("x")','query("x")','find("x")'],correct:0},
  ]},
  html(){return[
    {text:'Тег для ссылки?',answers:['<a>','<link>','<href>','<url>'],correct:0},
    {text:'Заголовок H1?',answers:['<h1>','<head>','<header>','<title>'],correct:0},
    {text:'CSS цвет текста?',answers:['color','text-color','font-color','foreground'],correct:0},
    {text:'display:flex — это?',answers:['Гибкий контейнер','Скрытый блок','Float','Сетка'],correct:0},
    {text:'Жирный текст?',answers:['<b>','<bold>','<thick>','<em>'],correct:0},
  ]},
  algo(){return[
    {text:'Сложность бинарного поиска?',answers:['O(log n)','O(n)','O(n²)','O(1)'],correct:0},
    {text:'LIFO — это?',answers:['Стек','Очередь','Дерево','Граф'],correct:0},
    {text:'Что такое рекурсия?',answers:['Функция вызывает себя','Цикл','Массив','Сортировка'],correct:0},
    {text:'Bubble sort worst case?',answers:['O(n²)','O(n)','O(log n)','O(n log n)'],correct:0},
    {text:'Хеш-таблица?',answers:['Поиск по ключу','Сортировка','Дерево','Список'],correct:0},
  ]},
  en(){return[
    {text:'"apple" — это?',answers:['Яблоко','Апельсин','Банан','Груша'],correct:0},
    {text:'Артикль: ___ book',answers:['a','an','the','—'],correct:0},
    {text:'"Thank you"?',answers:['Спасибо','Привет','Пока','Извини'],correct:0},
    {text:'"beautiful"?',answers:['Красивый','Большой','Быстрый','Умный'],correct:0},
    {text:'"I love coding"?',answers:['Я люблю кодить','Я учусь','Он кодит','Мы учимся'],correct:0},
  ]},
  de(){return[
    {text:'"Hund"?',answers:['Собака','Кошка','Птица','Рыба'],correct:0},
    {text:'Мужской артикль?',answers:['der','die','das','den'],correct:0},
    {text:'"Guten Morgen"?',answers:['Доброе утро','Добрый день','Пока','Спасибо'],correct:0},
    {text:'Число "drei"?',answers:['3','4','5','2'],correct:0},
    {text:'"Ich bin"?',answers:['Я есть','Ты есть','Он есть','Мы'],correct:0},
  ]},
};

const TESTS = [
  {id:1,track:'ky',  emoji:'🇰🇬',tag:'Кыргызский',title:'Кыргызский: A1 — Алфавит',   desc:'Буквы, числа, базовые слова',  time:15,q:5,level:'Лёгкий', bolts:8, questions:Q.kyA1()},
  {id:2,track:'ky',  emoji:'🇰🇬',tag:'Кыргызский',title:'Кыргызский: A1 — Приветствия',desc:'Саламдашуу, числа, цвета',     time:15,q:5,level:'Лёгкий', bolts:8, questions:Q.kyGreet()},
  {id:3,track:'code',emoji:'🐍', tag:'Python',    title:'Python: Основы',             desc:'Переменные, типы, циклы',      time:15,q:5,level:'Лёгкий', bolts:8, questions:Q.python()},
  {id:4,track:'code',emoji:'🌐', tag:'JavaScript',title:'JavaScript Basics',          desc:'Функции, массивы, DOM',         time:20,q:5,level:'Средний',bolts:12,questions:Q.js()},
  {id:5,track:'code',emoji:'🏗️',tag:'HTML/CSS',  title:'HTML & CSS',                 desc:'Разметка, flex, стили',         time:10,q:5,level:'Лёгкий', bolts:8, questions:Q.html()},
  {id:6,track:'code',emoji:'🧮', tag:'Алгоритмы', title:'Алгоритмы',                  desc:'Сортировки, поиск, структуры', time:25,q:5,level:'Сложный',bolts:20,questions:Q.algo()},
  {id:7,track:'lang',emoji:'🇬🇧',tag:'English',   title:'English: Базовая лексика',  desc:'Слова, фразы',                  time:15,q:5,level:'Лёгкий', bolts:8, questions:Q.en()},
  {id:8,track:'lang',emoji:'🇩🇪',tag:'Deutsch',   title:'Deutsch: A1',               desc:'Артикли, числа, глаголы',       time:18,q:5,level:'Лёгкий', bolts:10,questions:Q.de()},
];

const SHOP_ITEMS = {
  boosts:[
    {id:'h1',   icon:'💡',name:'Подсказка ×3',      desc:'Убирает 2 неверных варианта', price:15},
    {id:'t1',   icon:'⏳',name:'Заморозка времени',  desc:'Стоп-таймер на 5 сек',        price:25},
    {id:'s1',   icon:'⏭️',name:'Пропуск вопроса',   desc:'Без штрафа',                  price:20},
    {id:'x2',   icon:'⚡',name:'Двойной XP',         desc:'×2 XP за следующий тест',     price:40},
    {id:'lx3',  icon:'❤️',name:'+3 жизни',           desc:'Мгновенно восстанови',         price:30},
  ],
  avatars:[
    {id:'av1',icon:'🤖',name:'Робот',    desc:'Технарь',          price:30},
    {id:'av2',icon:'🧙',name:'Волшебник',desc:'Мастер кода',      price:30},
    {id:'av3',icon:'🥷',name:'Ниндзя',   desc:'Молчаливый умник', price:30},
    {id:'av4',icon:'🧑‍🚀',name:'Астронавт',desc:'Без границ',     price:50},
    {id:'av5',icon:'🐉',name:'Дракон',   desc:'Легендарный',      price:100},
  ],
  titles:[
    {id:'ti1',       icon:'💻',name:'«Кодер»',      desc:'Звание разработчика',      price:60},
    {id:'ti2',       icon:'🌍',name:'«Полиглот»',   desc:'Мастер языков',            price:60},
    {id:'ti3',       icon:'🧠',name:'«Гений»',      desc:'Лучший из лучших',         price:120},
    {id:'pro_rainbow',icon:'🌈',name:'Радужный ник',desc:'Переливающийся @юзернейм', price:200},
  ],
  usernames:[
    {id:'u_boss',  icon:'@',name:'@boss',  desc:'Редкое имя',          price:500},
    {id:'u_evrika',icon:'@',name:'@evrika',desc:'Название платформы!',  price:2000},
    {id:'u_pro',   icon:'@',name:'@pro',   desc:'Статусное',            price:800},
    {id:'u_gg',    icon:'@',name:'@gg',    desc:'Короткое и стильное',  price:300},
  ],
  all(){return[...this.boosts,...this.avatars,...this.titles,...this.usernames]},
  find(id){return this.all().find(i=>i.id===id)},
};

const THEMES = [
  {id:'default',label:'🌑 Тёмный',cls:'th-dark'},
  {id:'light',  label:'☀️ Светлый',cls:'th-light'},
  {id:'ocean',  label:'🌊 Океан',  cls:'th-ocean'},
  {id:'grape',  label:'🍇 Виноград',cls:'th-grape'},
  {id:'aurora', label:'🌌 Сияние', cls:'th-aurora'},
];

const FRIENDS_DATA = [
  {name:'Алия Бекова',   handle:'@aliya_k', av:'👩',   xp:340,bolts:120,streak:5,level:3,course:'Python'},
  {name:'Дамир Сейтов',  handle:'@damir99', av:'👦',   xp:210,bolts:75, streak:2,level:2,course:'Кыргызский A1'},
  {name:'Зарина Омарова',handle:'@zarina_o',av:'👩‍💻',xp:580,bolts:310,streak:8,level:5,course:'SQL'},
];

const STUDENTS = [
  {name:'Алия Бекова',   handle:'@aliya_k', edu:'Школьное',xp:340,bolts:120,lives:8, tests:7, streak:5,status:'active'},
  {name:'Дамир Сейтов',  handle:'@damir99', edu:'Высшее',  xp:210,bolts:75, lives:10,tests:4, streak:2,status:'active'},
  {name:'Зарина Омарова',handle:'@zarina_o',edu:'Школьное',xp:580,bolts:310,lives:6, tests:12,streak:8,status:'active'},
  {name:'Бекзат Нуров',  handle:'@bekat',   edu:'Другое',  xp:90, bolts:20, lives:10,tests:2, streak:0,status:'inactive'},
  {name:'Аина Жаксыбек', handle:'@aina_j',  edu:'Высшее',  xp:420,bolts:180,lives:9, tests:9, streak:4,status:'active'},
];

const CHATS = [
  {id:1,name:'Алия Бекова',   av:'👩',  last:'Как там Python? 🐍'},
  {id:2,name:'Дамир Сейтов',  av:'👦',  last:'Скинь решение задачи'},
  {id:3,name:'Зарина Омарова',av:'👩‍💻',last:'Прошла SQL на 100%! 🏆'},
];

const KY_LESSONS = [
  {n:1,title:'Алфавит',      desc:'Буквы и звуки кыргызского'},
  {n:2,title:'Числа 1–10',   desc:'Бир, эки, үч...'},
  {n:3,title:'Приветствия',  desc:'Саламдашуу сөздөрү'},
  {n:4,title:'Цвета',        desc:'Кызыл, жашыл, сары...'},
  {n:5,title:'Семья',        desc:'Ата, эне, ага, эже...'},
  {n:6,title:'Дни недели',   desc:'Дүйшөмбү, шейшемби...'},
];

const FEATURES = [
  {ic:'⚙️',title:'Болтики',        desc:'Зарабатывай за тесты, трать на аватары, темы и привилегии.'},
  {ic:'❤️',title:'Система жизней', desc:'10 жизней / 10 часов. Ошибка = -1. Pro = безлимит.'},
  {ic:'🎮',title:'Игровой формат', desc:'Kahoot-стиль: таймер, 4 кнопки, XP за скорость ответа.'},
  {ic:'🏅',title:'Сезонные медали',desc:'Осень, зима, весна, лето — уникальные медали за курсы.'},
  {ic:'👥',title:'Друзья и чат',   desc:'Профили, прогресс друзей, чат для обсуждения курсов.'},
  {ic:'🎨',title:'5 тем',          desc:'Тёмная, светлая, океан, виноград, северное сияние.'},
  {ic:'🪖',title:'Персонаж Болт',  desc:'Чел в жёлтом мотошлеме. Реагирует на твой прогресс.'},
  {ic:'@', title:'Юзернеймы',      desc:'Уникальный @username. Pro = переливающийся ник. Аукцион имён.'},
  {ic:'🤖',title:'ИИ-поддержка',   desc:'Мгновенные ответы на вопросы о платформе и курсах.'},
];

// ════════════════════════════════════════
// STATE
// ════════════════════════════════════════
