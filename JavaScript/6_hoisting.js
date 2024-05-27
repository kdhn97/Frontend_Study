/**
 * Hoisting
 */
console.log('Hello'); // Hello
console.log('World'); // World

// console.log(name);
// var name = '코드팩토리';
// console.log(name);

/**
 * Hoisting은 무엇인가?
 * 
 * 모든 변수 선언문이 코드의 최상단으로 이동되는 것처럼
 * 느껴지는 현상을 이야기한다.
 */
var name;
console.log(name); // undefined
name = '코드팩토리';
console.log(name); // 코드팩토리

// console.log(yujin);
// let yujin = '안유진';
// const yujin = '안유진';