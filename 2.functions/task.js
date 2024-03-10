"use strict"

//Задача_1
function getArrayParams(...arr) {
    let min = arr[0];
    let max = arr[0];
    let sum = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
        if (arr[i] < min) {
            min = arr[i];
        }
        sum += arr[i];
    }

    const avg = (sum / arr.length).toFixed(2);

    return {min: min, max: max, avg: parseFloat(avg)};
}

console.log(getArrayParams(-99, 99, 10));  // { min: -99, max: 99, avg: 3.33 }
console.log(getArrayParams(1, 2, 3, -100, 10));  // { min: -100, max: 10, avg: -16.80 }
console.log(getArrayParams(5));  // { min: 5, max: 5, avg: 5 }


//Задача_2
// Функция для суммирования элементов массива
function summElementsWorker(...arr) {
    if (arr.length === 0) {
        return 0;
    }

    return arr.reduce((acc, curr) => acc + curr, 0);
}

// Функция для вычисления разницы между максимальным и минимальным элементами массива
function differenceMaxMinWorker(...arr) {
    if (arr.length === 0) {
        return 0;
    }

    const max = Math.max(...arr);
    const min = Math.min(...arr);

    return max - min;
}

// Функция для вычисления разницы между суммой чётных и нечётных элементов массива
function differenceEvenOddWorker(...arr) {
    if (arr.length === 0) {
        return 0;
    }

    let sumEvenElement = 0;
    let sumOddElement = 0;

    for (const num of arr) {
        if (num % 2 === 0) {
            sumEvenElement += num;
        } else {
            sumOddElement += num;
        }
    }

    return sumEvenElement - sumOddElement;
}

// Функция для вычисления среднего значения чётных элементов массива
function averageEvenElementsWorker(...arr) {
    if (arr.length === 0) {
        return 0;
    }

    let sumEvenElement = 0;
    let countEvenElement = 0;

    for (const num of arr) {
        if (num % 2 === 0) {
            sumEvenElement += num;
            countEvenElement++;
        }
    }

    if (countEvenElement === 0) {
        return 0;
    }

    return sumEvenElement / countEvenElement;
}

// Примеры использования
console.log(summElementsWorker()); // 0
console.log(summElementsWorker(10, 10, 11, 20, 10)); // 61

console.log(differenceMaxMinWorker()); // 0
console.log(differenceMaxMinWorker(10, 10, 11, 20, 10)); // 10

console.log(differenceEvenOddWorker(94, 51, 57, 41, 47, 66, 58, 10, 38, 17)); // 53
console.log(differenceEvenOddWorker(15, 97, 85, 64, 67, 10, 69, 40, 15, 35)); // -269

console.log(averageEvenElementsWorker(1, 2, 3, 4, 5, 6, 7, 8, 9)); // 5
console.log(averageEvenElementsWorker(15, 97, 85, 64, 67, 10, 69, 40, 15, 35)); // 38


//Задача_3
function makeWork(arrOfArr, func) {
    let maxWorkerResult = -Infinity;

    for (const arr of arrOfArr) {
        const result = func(...arr);

        if (result > maxWorkerResult) {
            maxWorkerResult = result;
        }
    }

    return maxWorkerResult;
}

// Пример использования с предоставленными насадками
const arr = [
    [10, 10, 11, 20, 10],
    [67, 10, 2, 39, 88],
    [72, 75, 51, 87, 43],
    [30, 41, 55, 96, 62]
];

console.log(makeWork(arr, summElementsWorker)); // 328
console.log(makeWork(arr, differenceMaxMinWorker)); // 86
console.log(makeWork(arr, differenceEvenOddWorker)); // 92
console.log(makeWork(arr, averageEvenElementsWorker)); // 72
