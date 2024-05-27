/**
 * copy by value 값에 의한 전달
 * copy by reference 참조에 의한 전달
 * 
 * 1) 기본적으로 모든 primitive 값은 copy by value이다
 * 2) 객체는 copy by reference이다
 */
let original = '안녕하세요';
let clone = original;
console.log(original); // 안녕하세요
console.log(clone); // 안녕하세요

clone += ' 안유진 입니다';
console.log(original); // 안녕하세요
console.log(clone); // 안녕하세요 안유진 입니다

let originalObj = {
  name: '안유진',
  group: '아이브',
};
let cloneObj = originalObj;
console.log(originalObj); // { name: '안유진', group: '아이브' }
console.log(cloneObj); // { name: '안유진', group: '아이브' }

originalObj['group'] = '코드팩토리';
console.log(originalObj); // { name: '안유진', group: '코드팩토리' }
console.log(cloneObj); // { name: '안유진', group: '코드팩토리' }

console.log(original === clone); // false
console.log(originalObj === cloneObj); // true

originalObj = {
  name: '최지호',
  group: '코드팩토리',
};
console.log(originalObj === cloneObj); // false

/**
 * [ Copy by Value ]
 * 
 * original 0X000001 -> 안녕하세요
 * clone    0X000003 -> 안녕하세요 + 안유진 입니다
 */

/**
 * [ Copy by Reference ]
 * 
 * originalObj 0X000001 -> 0X000003
 * cloneObj    0X000002 -> 0X000003
 * 
 * 0X000003 ->
 * let originalObj = {
    name: '안유진',  -> 값을 변경 시
    group: '아이브', -> originalObj과 cloneObj 모두 변경
  };
 */

  const yuJin1 = {
    name: '안유진',
    group: '아이브',
  }
  const yuJin2 = yuJin1;
  const yuJin3 = {
    name: '안유진',
    group: '아이브',
  }
  console.log(yuJin1 === yuJin2); // true
  console.log(yuJin1 === yuJin3); // false
  console.log(yuJin2 === yuJin3); // false

  /**
   * Spread Operator
   */
  const yuJin4 = {
    ...yuJin3,
  };
  console.log(yuJin4); // { name: '안유진', group: '아이브' }
  console.log(yuJin4 === yuJin3); // false

  const yuJin5 = {
    year: 2023,
    ...yuJin3,
  }
  console.log(yuJin5); // { year: 2023, name: '안유진', group: '아이브' }

  const yuJin6 = {
    name: '코드팩토리',
    ...yuJin3,
  }
  console.log(yuJin6); // { name: '안유진', group: '아이브' }

  const yuJin7 = {
    ...yuJin3,
    name: '코드팩토리',
  }
  console.log(yuJin7); // { name: '코드팩토리', group: '아이브' }

  const numbers = [1, 3, 5];
  const numbers2 = [
    ...numbers,
    10
  ];
  console.log(numbers2); // [ 1, 3, 5, 10 ]