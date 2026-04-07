/**
 * js/data/Questions.js
 * Question banks for all test tracks
 */
const Questions = {
  kyA1() {
    return [
      { text: '"Саламатсызбы" означает?', answers: ['Здравствуйте','До свидания','Спасибо','Пожалуйста'], correct: 0 },
      { text: '"Один" по-кыргызски?', answers: ['Бир','Эки','Үч','Төрт'], correct: 0 },
      { text: '"Кайда барасыз?" означает?', answers: ['Куда идёте?','Как вас зовут?','Сколько стоит?','Где живёте?'], correct: 0 },
      { text: '"Кызыл" — это?', answers: ['Красный','Зелёный','Жёлтый','Чёрный'], correct: 0 },
      { text: '"Рахмат" означает?', answers: ['Спасибо','Извините','Пожалуйста','Привет'], correct: 0 },
    ];
  },
  kyGreet() {
    return [
      { text: '"Кечирересиз" означает?', answers: ['Извините','Спасибо','Привет','Пока'], correct: 0 },
      { text: '"Мама" по-кыргызски?', answers: ['Эне','Ата','Ага','Эже'], correct: 0 },
      { text: '"Сен кимсиң?" — это?', answers: ['Кто ты?','Где ты?','Что это?','Как ты?'], correct: 0 },
      { text: 'Число "беш"?', answers: ['5','4','6','3'], correct: 0 },
      { text: '"Жакшы" означает?', answers: ['Хорошо','Плохо','Быстро','Медленно'], correct: 0 },
    ];
  },
  python() {
    return [
      { text: 'Тип данных у True?', answers: ['bool','int','str','float'], correct: 0 },
      { text: 'Как объявить список?', answers: ['x = []','x = {}','x = ()','x = <>'], correct: 0 },
      { text: 'Что делает len()?', answers: ['Длина объекта','Тип','Удаляет элемент','Сортирует'], correct: 0 },
      { text: 'Комментарий в Python?', answers: ['# текст','// текст','/* */','-- текст'], correct: 0 },
      { text: 'print(2 ** 3) выведет?', answers: ['8','6','9','5'], correct: 0 },
    ];
  },
  js() {
    return [
      { text: 'Объявить переменную ES6?', answers: ['let x = 5','var x = 5','dim x','int x'], correct: 0 },
      { text: 'typeof null вернёт?', answers: ['"object"','"null"','"undefined"','"boolean"'], correct: 0 },
      { text: 'Метод в конец массива?', answers: ['push()','pop()','shift()','unshift()'], correct: 0 },
      { text: 'Что такое Promise?', answers: ['Объект для async','Тип переменной','Колбэк','Ключевое слово'], correct: 0 },
      { text: 'getElementById?', answers: ['document.getElementById("id")','window.get("id")','query("id")','find("id")'], correct: 0 },
    ];
  },
  html() {
    return [
      { text: 'Тег для ссылки?', answers: ['<a>','<link>','<href>','<url>'], correct: 0 },
      { text: 'Заголовок H1?', answers: ['<h1>','<head>','<header>','<title>'], correct: 0 },
      { text: 'CSS цвет текста?', answers: ['color','text-color','font-color','foreground'], correct: 0 },
      { text: 'display:flex — это?', answers: ['Гибкий контейнер','Скрытый блок','Float','Сетка'], correct: 0 },
      { text: 'Жирный текст?', answers: ['<b>','<bold>','<thick>','<em>'], correct: 0 },
    ];
  },
  algo() {
    return [
      { text: 'Сложность бинарного поиска?', answers: ['O(log n)','O(n)','O(n²)','O(1)'], correct: 0 },
      { text: 'LIFO — это?', answers: ['Стек','Очередь','Дерево','Граф'], correct: 0 },
      { text: 'Что такое рекурсия?', answers: ['Функция вызывает себя','Цикл','Массив','Сортировка'], correct: 0 },
      { text: 'Bubble sort worst case?', answers: ['O(n²)','O(n)','O(log n)','O(n log n)'], correct: 0 },
      { text: 'Хеш-таблица?', answers: ['Поиск по ключу','Сортировка','Дерево','Список'], correct: 0 },
    ];
  },
  english() {
    return [
      { text: '"apple" — это?', answers: ['Яблоко','Апельсин','Банан','Груша'], correct: 0 },
      { text: 'Артикль: ___ book', answers: ['a','an','the','—'], correct: 0 },
      { text: '"Thank you"?', answers: ['Спасибо','Привет','Пока','Извини'], correct: 0 },
      { text: '"beautiful" значит?', answers: ['Красивый','Большой','Быстрый','Умный'], correct: 0 },
      { text: '"I love coding"?', answers: ['Я люблю кодить','Я учусь','Он кодит','Мы учимся'], correct: 0 },
    ];
  },
  german() {
    return [
      { text: '"Hund"?', answers: ['Собака','Кошка','Птица','Рыба'], correct: 0 },
      { text: 'Мужской артикль?', answers: ['der','die','das','den'], correct: 0 },
      { text: '"Guten Morgen"?', answers: ['Доброе утро','Добрый день','Пока','Спасибо'], correct: 0 },
      { text: 'Число "drei"?', answers: ['3','4','5','2'], correct: 0 },
      { text: '"Ich bin"?', answers: ['Я есть','Ты есть','Он есть','Мы'], correct: 0 },
    ];
  },
};
