/**
 * Object 객체
 */

// Key : Value pair
let yuJin = {
  name: '안유진',
  group: '아이브',
  dance: function(){
    return `${this.name}이 춤을 춥니다`;
  }
};
console.log(yuJin); // { name: '안유진', group: '아이브', dance: [Function: dance] }
console.log(yuJin.name); // 안유진
console.log(yuJin['name']); // 안유진

const key = 'name';
console.log(yuJin[key]); // 안유진

console.log(yuJin.dance()); // 안유진이 춤을 춥니다

const nameKey = 'name';
const nameValue = '안유진';
const groupKey = 'group';
const groupValue = '아이브';

const yuJin2 = {
  [nameKey]: nameValue,
  [groupKey]: groupValue,
  dance: function(){
    return `${this.name}이 춤을 춥니다`
  }
}
console.log(yuJin2); // { name: '안유진', group: '아이브', dance: [Function: dance] }
console.log(yuJin.dance()) // 안유진이 춤을 춥니다

yuJin2['group'] = '코드팩토리';
console.log(yuJin2); // { name: '안유진', group: '코드팩토리', dance: [Function: dance] }

yuJin2['englishName'] = 'An Yu Jin';
console.log(yuJin2); // yuJin2 리스트에 [englishName: 'An Yu Jin'] 추가

// ??? const를 사용하면 변경이 안되야 하는데 왜 변경이 되는가? Copy Value & Reference

/**
 * 객체의 특징
 * 
 * 1) const로 선언할 경우 객체 자체를 변경 할 수는 없다 ( [] -> {} 불가 )
 * 2) 객체 안의 프로퍼티나 메서드는 변경 할 수 있다 ( name, group 변경 가능 )
 */

/**
 * 모든 키 값 다 가져오기
 */
console.log(Object.keys(yuJin2)); // [ 'name', 'group', 'dance', 'englishName' ]

/**
 * 모든 벨류 값 다 가져오기
 */
console.log(Object.values(yuJin2)); // [ '안유진', '코드팩토리', [Function: dance], 'An Yu Jin' ]