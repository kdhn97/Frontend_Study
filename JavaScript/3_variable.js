/**
 * Variable 선언하기
 * 
 * 1) var - 더이상 쓰지 않음
 * 2) let
 * 3) const
 */

var name = '코드팩토리';
console.log(name); // 코드팩토리

var age = 32;
console.log(age); // 32

let ive = '아이브';
console.log(ive); // 아이브

/**
 * let과 var로 선언하면
 * 값을 추후 변경할 수 있다
 */
ive = '안유진';
console.log(ive); // 안유진

/**
 * const로 선언하면
 * 값을 변경할 수 없다
 */
const newJeans = '뉴진스';
console.log(newJeans); // 뉴진스

/**
 * - 선언 : 변수를 선언하는 것
 * - 할당 
 */

var name = '코드팩토리';
console.log(name); // 코드팩토리

let girlFriend; // 변수 할당을 안함
console.log(girlFriend); // undefined