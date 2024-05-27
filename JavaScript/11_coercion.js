/**
 * 타입 변환
 * Type Conversion
 * 
 * 1) 명시적
 * 2) 암묵적
 */
let age = 32;

// 명시적
let stringAge = age.toString();
console.log(typeof stringAge, stringAge); // string 32

// 암묵적
let test = age + '';
console.log(typeof test, test); // string 32

console.log('98' + 2); // 982
console.log('98' * 2); // 196
console.log('98' - 2); // 96

/**
 * 명시적 변환
 */
console.log(typeof (99).toString(), (99).toString()); // string 99
console.log(typeof (true).toString(), (true).toString()); // string true
console.log(typeof (Infinity).toString(), (Infinity).toString()); // string Infinity

// 숫자 타입으로 변환
console.log(typeof parseInt('0'), parseInt('0')) // number 0
console.log(typeof parseFloat('0.99'), parseFloat('0.99')) // number 0.99
console.log(typeof +'1', +'1'); // number 1

/**
 * Boolean 타입으로 변환
 */
console.log(!'x'); // false
console.log(!!'x'); // true
console.log(!!''); // false
console.log(!!0); // false
console.log(!!'0'); // true
console.log(!!'false'); // true
console.log(!!false); // false
console.log(!!undefined); // false
console.log(!!null); // false
console.log(!!{}); // true
console.log(!![]); // true

/**
 * 1) 아무 글자도 없는 String
 * 2) 값이 없는 경우
 * 3) 0
 * -> 모두 false를 반환한다
 */