"use strict"

// Создаем функцию-конструктор Student
function Student(name, gender, age) {
    this.name = name;
    this.gender = gender;
    this.age = age;
    this.marks = [];
}

//  Добавляем метод setSubject к прототипу Student
Student.prototype.setSubject = function (subjectName) {
    this.subject = subjectName;
};

//  Добавляем метод addMarks к прототипу Student
Student.prototype.addMarks = function (...marksToAdd) {
    if (!this.hasOwnProperty('marks')) {
        console.log(`${this.name} отчислен(а) и не может получать оценки.`);
        return;
    }
    this.marks.push(...marksToAdd);
};

//  Добавляем метод getAverage к прототипу Student
Student.prototype.getAverage = function () {
    if (!this.marks || this.marks.length === 0) {
        return 0;
    }
    const sum = this.marks.reduce((acc, mark) => acc + mark, 0);
    return sum / this.marks.length;
};

//  Добавляем метод exclude к прототипу Student
Student.prototype.exclude = function (reason) {
    delete this.subject;
    delete this.marks;
    this.excluded = reason;
};

// Пример использования
let student1 = new Student("Василиса", "женский", 19);
student1.setSubject("Algebra");
console.log(student1.getAverage()); // 0
student1.addMarks(4, 5, 4, 5);
console.log(student1.getAverage()); // 4.5
console.log(student1);

let student2 = new Student("Артём", "мужской", 25);
student2.setSubject("Geometry");
student2.exclude('плохая учёба');
console.log(student2);
