"use strict"

// Задача 1. Печатное издание

// Базовый класс для всех печатных изданий
class PrintEditionItem {
    // Конструктор класса, принимающий общие свойства
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this.state = 100;
        this.type = null;
    }

    // Метод для улучшения состояния печатного издания
    fix() {
        this.state *= 1.5;
    }

    // Сеттер для свойства state с проверками на корректность значения
    set state(newState) {
        if (newState < 0) {
            this._state = 0;
        } else if (newState > 100) {
            this._state = 100;
        } else {
            this._state = newState;
        }
    }

    // Геттер для свойства state
    get state() {
        return this._state;
    }
}

// Класс для журналов, наследующий свойства от PrintEditionItem
class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "magazine";
    }
}

// Класс для книг, наследующий свойства от PrintEditionItem
class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "book";
        this.author = author;
    }
}

// Класс для романов, наследующий свойства от Book
class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "novel";
    }
}

// Класс для фантастических произведений, наследующий свойства от Book
class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "fantastic";
    }
}

// Класс для детективов, наследующий свойства от Book
class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "detective";
    }
}

// Пример использования классов
const sherlock = new PrintEditionItem(
    "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
    2019,
    1008
);

console.log(sherlock.releaseDate); // 2019
console.log(sherlock.state); // 100
sherlock.fix();
console.log(sherlock.state); // 150

const picknick = new FantasticBook(
    "Аркадий и Борис Стругацкие",
    "Пикник на обочине",
    1972,
    168
);

console.log(picknick.author); // "Аркадий и Борис Стругацкие"
picknick.state = 10;
console.log(picknick.state); // 10
picknick.fix();
console.log(picknick.state); // 15

// Задача 2. Библиотека

// Класс для библиотеки
class Library {
    // Конструктор класса, принимающий название библиотеки
    constructor(name) {
        this.name = name;
        this.books = [];
    }

    // Метод для добавления книги в библиотеку
    addBook(book) {
        if (book.state > 30) {
            this.books.push(book);
        }
    }

    // Метод для поиска книги по заданным критериям
    findBookBy(key, value) {
        return this.books.find(book => book[key] === value) || null;
    }

    // Метод для выдачи книги читателю
    giveBookByName(bookName) {
        const index = this.books.findIndex(book => book.name === bookName);
        if (index !== -1) {
            const book = this.books[index];
            this.books.splice(index, 1);
            return book;
        } else {
            return null;
        }
    }
}

// Пример использования
const library = new Library("Библиотека имени Ленина");

library.addBook(
    new DetectiveBook(
        "Артур Конан Дойл",
        "Полное собрание повестей и рассказов о Шерлоке Холмсе в одном томе",
        2019,
        1008
    )
);
library.addBook(
    new FantasticBook(
        "Аркадий и Борис Стругацкие",
        "Пикник на обочине",
        1972,
        168
    )
);
library.addBook(new NovelBook("Герберт Уэллс", "Машина времени", 1895, 138));
library.addBook(new Magazine("Мурзилка", 1924, 60));

console.log(library.findBookBy("name", "Властелин колец")); // null
console.log(library.findBookBy("releaseDate", 1924).name); // "Мурзилка"

console.log("Количество книг до выдачи: " + library.books.length); // Количество книг до выдачи: 4
const borrowedBook = library.giveBookByName("Машина времени");
console.log("Количество книг после выдачи: " + library.books.length); // Количество книг после выдачи: 3

// Повреждение выданной книги
if (borrowedBook) {
    borrowedBook.state = 20;
    console.log("Состояние выданной книги: " + borrowedBook.state); // Состояние выданной книги: 20

    // Восстановление выданной книги
    borrowedBook.fix();
    console.log("Состояние выданной книги после восстановления: " + borrowedBook.state); // Состояние выданной книги после восстановления: 30

    // Попытка добавить восстановленную книгу обратно в библиотеку
    library.addBook(borrowedBook);
    console.log("Количество книг после возвращения: " + library.books.length); // Количество книг после возвращения: 3
}