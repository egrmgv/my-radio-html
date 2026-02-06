//function debugCompare(str1, str2) {
  //  console.log(` Сравниваем ${str1} и ${str2}`);

    //const minLength = Math.min(str1.length, str2.length);

    //for(i = 0; i < minLength; i++) {
      //  const code1 = str1.charCodeAt(i);
        //const code2 = str2.charCodeAt(i)
        //console.log(`Позиция ${i}: '${str1}'${code1} vs '${str2}'${code2}`)
        //if(code1 !== code2) {
        //console.log(`Решениe: ${code1 > code2} на позиции ${i}`)
        //return code1 > code2
   // }
   // }

    //console.log(`Все символы равны, сравниваем длины ${str1.length} > ${str2.length}`)
    //return str1.length > str2.length
//}
//debugCompare('a', 'A')
//debugCompare('abc', 'abcd')



//let num
//do {
//  let num = prompt('Введите число', '') 
//  } while(num <= 100 && num)



//function checkAge(age) {
 //return (age >= 18) ? true : confirm('Родители разрешили?')
//}


//function checkAge(age) {
//  age > 18 ? true : confirm('Родители разрешили?');
//}

// Создайте пустой объект car
// Добавьте свойство brand со значением "Toyota"
// Добавьте свойство model со значением "Camry"
// Измените значение model на "Corolla"
// Удалите свойство brand 

// - name: "Alice"
// - address: {city: "Moscow", street: "Lenina"}
// Измените город на "SPb"
// Добавьте в address свойство zip: "190000"

//function objectsMeans(obj1, obj2) {


const purchases = [
  { user: "Alice", category: "Food", item: "Apple" },
  { user: "Alice", category: "Food", item: "Banana" },
  { user: "Alice", category: "Food", item: "Apple" },
  { user: "Bob", category: "Food", item: "Apple" },
  { user: "Bob", category: "Clothes", item: "Shirt" }
];

// 1. Сначала создаём Map → Set для уникальных товаров
const userPurchasesSet = purchases.reduce((map, { user, category, item }) => {
  if (!map.has(user)) {
    map.set(user, new Map());
  }

  const userMap = map.get(user);

  if (!userMap.has(category)) {
    userMap.set(category, new Set());
  }

  userMap.get(category).add(item);

  return map;
}, new Map());
console.log(userPurchasesSet)

class Library {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('library')) || []
  } // Загружаем книги из localStorage или создаём пустой массив

  // Генерация уникального ID для избежания коллизий
  generateId() {
    return crypto.randomUUID();
  }

  // Проверка с условием добавления книги и автора
  addBook(title, author) {
    if (!title || !author) {
      throw new Error("Нельзя добавить книгу без названия или автора");
    }
    const newTitle = title.trim()
    if (this.findBook(newTitle)) {
      console.warn("Такая книга уже есть");
      return;
    }

    this.books.push({
      id: generateId(),
      title: newTitle,
      author: author.trim(),
      isAvailable: true
    })
    this.save()
  }
  // Поиск книги по названию с нечувствительным к регистру
  findBook(title) {
    const normalized = title.toLowerCase()
    return this.books.find(book => book.title.toLowerCase() === normalized)
  }

  findBookByAuthor(author) {
    const normalizedAt = author.toLowerCase()
    return this.books.find(au => au.author.toLowerCase() === normalizedAt)
  }

  // Взять книгу
  borrowBook(title) {
    const book = this.findBook(title);

      if (!book) {
    console.warn("Книга не найдена");
    return;
  }

    if (!book.isAvailable) {
      console.warn("Книга уже взята");
      return;
    }

    book.isAvailable = false;
    this.save();
  }

  returnBook(title) {
    const book = this.findBook(title)
    if (book) {
      book.isAvailable = true
      this.save()
    }
  }

  // Сохранение в localStorage
  save() {
    localStorage.setItem('library', JSON.stringify(this.books))
  }

  getAvailableBooks() {
    return this.books.filter(book => book.isAvailable)
  }

  // Статистика  возвращает объект: { total: X, available: Y, borrowed: Z }
  getStatistics() {
    const total = this.books.length;
    const available = this.books.filter(b => b.isAvailable).length;
    const borrowed = total - available;

    return { total, available, borrowed };
  }
}

const { LocalStorage } = require('node-localstorage');
const localStorage = new LocalStorage('./storage');
const crypto = require('crypto');

// Пример использования
const library = new Library()
library.addBook("JavaScript для начинающих", "Иван Иванов")
library.addBook("React с нуля", "Петр Петров")
library.borrowBook("React с нуля")
console.log(library.getStatistics())
library.addBook(" JavaScript для начинающих", "Иван Иванов")
console.log(library.addBook(" JavaScript для начинающих", "Иван Иванов"))

// Ответьте на вопросы словами
//1. Какие потенциальные баги и архитектурные проблемы ты видишь в этом коде? 
// Math.random() не гарантирует уникальность. Вероятность коллизии не огромная, но вполне реальная — особенно при большом количестве книг.
//Поиск по названию — findBook(title). Поиск чувствителен к регистру: "React" и "react" будут разными. Полное совпадение строки: 
//нельзя найти книгу по частичному совпадению (возможно, ожидаемое поведение, но стоит учитывать).
//Нет проверки входных данных
//Можно добавить книгу с пустым названием или автором.
//Отсутствие обработки ситуации, если книга уже есть
//Возможны дубликаты книг.
//Нет защиты от отсутствия localStorage
//Например, в Node.js или приватном режиме браузера код упадёт.
//Необработанные случаи
//borrowBook() и returnBook() ничего не делают, если книги нет. Лучше бросить ошибку или вернуть результат.
//Поиск по названию использует O(n) каждый раз
//При небольшом количестве книг норм, при большом — нет. Можно использовать Map или индекс, но для учебного примера достаточно улучшить поиск.
//2. Есть ли проблемы с генерацией идентификатора? Что может пойти не так? Math.random() → число от 0 до 1. 
// Использование его как id: коллизии реальны (два одинаковых числа — и обе книги имеют одинаковый id) 
// нет контроля формата, неудобно передавать или сериализовать
//Лучше использовать: crypto.randomUUID() — уникальный UUID v4 или автоинкрементный id, если нужно предсказуемо
// Насколько эффективен поиск книги по названию? this.books.find(book => book.title === title).
// Поиск линейный — O(n). Для маленькой библиотеки норм, но неэффективно при > 1000 записей. Также чувствителен к регистру.
//