// Code Block 1
const cars = ['Tesla', 'Mercedes', 'Honda'];
const [randomCar] = cars;
const [,otherRandomCar] = cars;
console.log(randomCar);
console.log(otherRandomCar);

// Predicted Output:
// Tesla
// Mercedes

// Code Block 2
const employee = {
    name: 'Elon',
    age: 47,
    company: 'Tesla'
};
const { name: otherName } = employee;
console.log(name);
console.log(otherName);

// Predicted Output:
// ReferenceError: name is not defined
// Elon

// Code Block 3
const numbers = [8, 2, 3, 5, 6, 1, 67, 12, 2];
const [,first] = numbers;
const [,,,second] = numbers;
const [,,,,,,,,third] = numbers;
console.log(first == second);
console.log(first == third);

// Predicted Output:
// false
// true

// Code Block 4
const lastTest = {
    key: 'value',
    secondKey: [1, 5, 1, 8, 3, 3]
};
const { key } = lastTest;
const { secondKey } = lastTest;
const [ ,willThisWork] = secondKey;
console.log(key);
console.log(secondKey);
console.log(secondKey[0]);
console.log(willThisWork);

// Predicted Output:
// value
// [1, 5, 1, 8, 3, 3]
// 1
// 5
