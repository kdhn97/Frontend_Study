/**
 * function 함수
 * 
 * 만약 2라는 숫자에 * 10 / 2 % 3 스트링으로 변환해서
 * 반환받고 싶다면 어떻게 해야할까?
 */
console.log((2 * 10 / 2 % 3).toString()); // 1
console.log((3 * 10 / 2 % 3).toString()); // 0

/**
 * DRY
 * D - Don't
 * R - Repeat
 * Y - Yourself
 * 동일한 형식을 중복해서 적지마라
 * 
 * 함수에서 입력받는 값에 대한 정의를 Parameter : n
 * 실제 입력하는 값은 argument : 2
 */

function claculate(n){
  console.log((n * 10 / 2 % 3).toString());
}
claculate(2); // 1
claculate(3); // 0

function multiply(x, y){
  console.log(x * y);
}
multiply(2, 4); // 8

function multiply(x, y=10){
  console.log(x * y);
}
multiply(2, 4); // 8
multiply(2) // 20

/**
 * 반환 받기
 * return 받기
 */
function multiply(x, y){
  return x * y;
}
const result1 = multiply(2, 4);
console.log(result1) // 8

/**
 * Arrow 함수
 */
const multiply2 = (x, y) => {
  return x * y;
}
console.log(multiply2(3, 4)); // 12

const multiply4 = x => x * 2;
console.log(multiply4(2)); // 4

const multiply3 = (x, y) => x * y;
console.log(multiply3(4, 5)); // 20

const multiply5 = x => y => z => `x:${x} y:${y} z:${z}`
console.log(multiply5(2)(5)(7)) // x:2 y:5 z:7

function multiply6(x){
  return function(y){
    return function(z){
      return `x:${x} y:${y} z:${z}`
    }
  }
}
console.log(multiply6(3)(4)(5)); // x:3 y:4 z:5

const multiplyTwo = function(x, y){
  return x * y;
}
console.log(multiplyTwo(4, 5)); // 20

const multiplyThree = function(x, y, z){
  console.log(arguments) // [Arguments] { '0': 4, '1': 5, '2': 6 }
  return x * y * z;
}
console.log(multiplyThree(4, 5, 6)); // 120

const multiplyAll = function(...argument){
  return Object.values(argument).reduce((a, b) => a * b,  1);
}
console.log(multiplyAll(3, 4, 5, 6, 7, 8, 9, 10)); // 1814400

// immediately invoked function
(function(x, y){
  console.log(x * y);
})(4, 5) // 20 

console.log(typeof multiply); // function
console.log(multiply instanceof Object); // ture