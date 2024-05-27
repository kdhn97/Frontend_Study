/**
 * Array Function Methods
 */
let iveMembers = [
  '안유진',
  '장원영',
]
console.log(iveMembers); // [ '안유진', '장원영' ]

// push() - 마지막 인덱스에 추가
console.log(iveMembers.push('코드팩토리')); // 3
console.log(iveMembers); // [ '안유진', '장원영', '코드팩토리' ]

// pop() - 마지막 인덱스 추출
console.log(iveMembers.pop()); // 코드팩토리
console.log(iveMembers); // [ '안유진', '장원영' ]

// shift() - 첫번째 인덱스 추출
console.log(iveMembers.shift()); // 안유진
console.log(iveMembers) // [ '장원영' ]

// unshift() - 첫번째 인덱스 삽입
console.log(iveMembers.unshift('안유진')); // 2
console.log(iveMembers.unshift('레이')); // 3
console.log(iveMembers); // [ '레이', '안유진', '장원영' ]

// splice(x, y) - x부터 y까지 추출
console.log(iveMembers.splice(0, 2)); // [ '레이', '안유진' ]
console.log(iveMembers); // [ '장원영' ]

iveMembers = [
  '레이',
  '안유진',
  '장원영',
]

// concat() - 마지막 인덱스에 임시로 삽입
console.log(iveMembers.concat('코드팩토리')); // [ '레이', '안유진', '장원영', '코드팩토리' ]
console.log(iveMembers) // [ '레이', '안유진', '장원영' ]

// slice(x, y) - x부터 y까지 임시로 자르고 출력
console.log(iveMembers.slice(0, 2)); [ '레이', '안유진' ]
console.log(iveMembers); [ '레이', '안유진', '장원영' ]

// spread operator - 상위 리스트에 펼쳐서 출력
let iveMembers2 = [
  ...iveMembers,
];
console.log(iveMembers2); // [ '레이', '안유진', '장원영' ]

let iveMembers3 = [
  iveMembers,
]
console.log(iveMembers3) // [ [ '레이', '안유진', '장원영' ] ]

let iveMembers4 = iveMembers;
console.log(iveMembers4); // [ '레이', '안유진', '장원영' ]
console.log(iveMembers4 === iveMembers); // true
console.log([...iveMembers, ] === iveMembers); // false

// join() - string 값으로 묶을 때
console.log(iveMembers.join()); // 레이,안유진,장원영
console.log(iveMembers.join('/')); // 레이/안유진/장원영

// sort() - 오름차순 정렬
console.log(iveMembers.sort()); // [ '레이', '안유진', '장원영' ]
console.log(iveMembers.reverse()); // [ '장원영', '안유진', '레이' ]

let numbers = [ 1, 9, 7, 5, 3];
// a, b를 비교했을 때
// 1) a를 b보다 나중에 정렬하려면(뒤에 두려면) 0보다 큰 숫자를 반환
// 2) a를 b보다 먼저 정렬하려면(앞에 두려면) 0보다 작은 숫자를 반환
// 3) 원래 순서를 그대로 두려면 0을 반환
numbers.sort((a, b) => {
  return a > b ? 1 : -1;
});
console.log(numbers); // [ 1, 3, 5, 7, 9 ]

numbers.sort((a, b) => a > b ? -1 : 1);
console.log(numbers); // [ 9, 7, 5, 3, 1 ]

// map()
console.log(iveMembers.map((x) => x)); [ '장원영', '안유진', '레이' ]
console.log(iveMembers.map((x) => `아이브: ${x}`)); [ '아이브: 장원영', '아이브: 안유진', '아이브: 레이' ]
console.log(iveMembers.map((x) => {
  if(x === '안유진'){
    return `아이브: ${x}`;
  }else{
    return x;
  }
})); // [ '장원영', '아이브: 안유진', '레이' ]

// filter() - 조건에 맞는 모든 값 반환
number = [1, 8, 7, 6, 3]

console.log(number.filter((x) => true)); // [ 1, 8, 7, 6, 3 ]
console.log(number.filter((x) => false)); // []
console.log(number.filter((x) => x % 2 === 0)); // [ 8, 6 ]

// find() - 조건에 맞는 첫번째 값 반환
console.log(number.find((x) => x % 2 === 0)); // 8

// findIndex() - 찾은 값의 인덱스 값 반환
console.log(number.findIndex((x) => x % 2 === 0)); // 1

// reduce()
console.log(number.reduce((p, n) => p + n, 0)); // 25
/**
 * (p, n) => p + n : 콜백 함수, 0 : 초기값
 * 1. 초기값인 0이 p에 입력된다
 * 2. number 리스트의 첫번째 값인 1이 n에 입력
 * 3. p + n = 0 + 1 = 1이 반환
 * 4. 3번에서 반환한 값(1)이 p에 입력
 * 5. 리스트의 두번째 값인 8이 n에 입력
 * 6. p + n = 1 + 8 = 9가 반환
 * 7. 6번에서 반환한 값(9)가 p에 입력
 * 8. number 리스트의 모든 값이 순회할 때까지 반복 -> 모든 값을 다 더한 25가 반환
 *  */


