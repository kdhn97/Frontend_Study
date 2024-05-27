/**
 * Operators
 * 연산자
 */

/**
 * 산술 연산자
 * 
 * 1) 덧셈
 * 2) 뺼셈
 * 3) 곱셈
 * 4) 나눗셈
 * 5) 나머지
 */
console.log(10 + 10); // 20
console.log(10 - 10); // 0
console.log(10 * 10); // 100
console.log(10 / 10); // 1
console.log(10 % 10); // 0
console.log(10 * (10+10)); // 200

/**
 * 증가와 감소
 */
let number = 1;
number ++;
console.log(number); // 2

number --;
console.log(number); // 1

/**
 * 연산자의 위치
 */
let result = 1;
console.log(result); // 1

result = number ++;
console.log(result, number); // 1 2
// ++를 뒤에 붙이면 result로 할당이 된 후 number ++로 증가

result = number --;
console.log(result, number); // 2 1

result = ++ number;
console.log(result, number); // 2 2
// ++를 앞에 붙이면 값이 증가된 후에 result에 할당됨

result = -- number;
console.log(result, number) // 1 1

/**
 * 숫자 타입이 아닌 타입에 +, - 사용하면 어떻게 될까?
 * -> 문자에 +, -를 붙이면 숫자 타입으로 변경된다
 */
let sample = '99';
console.log(+sample); // 99
console.log(typeof +sample); // number

console.log(sample); // 99
console.log(typeof sample); // string

console.log(-sample); // -99
console.log(typeof -sample); // number

sample = true;
console.log(+sample); // 1
console.log(typeof +sample); // number

sample = false;
console.log(+sample); // 0
console.log(typeof +sample); // number

sample = '안유진';
console.log(+sample); // NaN -> Not a Number

/**
 * 할당 연산자 (assignment operator)
 */
number = 100;
console.log(number); // 100

number += 10;
console.log(number); // 110

number *= 10;
console.log(number); // 1100

number /= 10;
console.log(number); // 110

number %= 10;
console.log(number) // 0

/**
 * 비교 연산자
 * 
 * 1) 값의 비교 ( == )
 * 2) 값과 타입의 비교 ( === )
 */
console.log(5 == 5); // true
console.log(5 == '5'); // true
console.log(0 == ''); // true
console.log(true == 1); // true
console.log(false == 0); // true

console.log(5 === 5); // true
console.log(5 === '5'); // false
console.log(true === 1); // false
console.log(false === 0); // false

console.log(5 != 5) // false
console.log(true != 1); // false

console.log(5 !== '5') // true
console.log(true !== 1); // ture

/**
 * 대소 관계 비교 연산자
 */
console.log(100 > 1); // true
console.log(100 < 1); // false
console.log(100 >= 1); // true
console.log(100 <= 1); // false

/**
 * 삼항 조건 연산자 (ternary operator)
 * console.log(조건 ? 참 : 거짓)
 */
console.log(10 > 0 ? '10이 0보다 크다': '10이 0보다 작다'); 
// 10이 0보다 크다

/**
 * 논리 연산자
 * 
 * 1) && - && 조건은 모두 true여야 true를 반환한다 
 * 2) || - || 조건은 하나만 true여도 true를 반환한다
 */
console.log(true && true); // true
console.log(true && false); // false

console.log(true || true); // true
console.log(true || false); // true

/**
 * 단축 평가 (short circuit evaluation)
 * 
 * &&를 사용했을 때 좌측이 true면 우측 값 반환
 * &&를 사용했을 때 좌측이 false면 좌측 값 반환
 * 
 * ||를 사용했을 때 좌측이 true면 좌측 값 반환
 * ||를 사용했을 때 좌측이 false면 우측 값 반환
 */
console.log(true || '아이브'); // true
console.log(false || '아이브'); // 아이브
console.log(true && '아이브'); // 아이브
console.log(false && '아이브'); // false

console.log(true && true && '아이브'); // 아이브
console.log(false && false && '아이브'); // false

/**
 * 지수 연산자
 */
console.log(2 ** 2); // 4
console.log(10 ** 3); // 1000

/**
 * null 연산자
 */
let name;
console.log(name); // undefined

name = name ?? '코드팩토리';
console.log(name); // 코드팩토리

name = name ?? '아이브';
console.log(name); // 코드팩토리

let name2;
name2 ??= '코드팩토리';
console.log(name2); // 코드팩토리