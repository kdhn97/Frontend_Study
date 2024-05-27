/**
 * Naming Conventions
 * 
 * - 변수 이름 지을 때
 * 1) 일반적으로 영어를 사용하며 문자와 숫자를 모두 사용할 수 있다
 * 2) 특수기호는 언더스코어와 달러를 사용할 수 있다
 * 3) 숫자로 이름을 시작할 수 없다 ex) 1Name, 2Hello
 * 4) 키워드는 변수명으로 사용할 수 없다 ex) var const = 'var';
 */
let codefactory = '코드팩토리';
var $ive = '아이브'
const _yujin = '안유진';

console.log(codefactory); // 코드팩토리
console.log($ive); // 아이브
console.log(_yujin); // 안유진

/**
 * Naming Conventions 2
 * 1) camelCase -> 첫 글자는 소문자, 띄어쓰기 한 뒤 첫 글자 대문자
 * 2) snake_case -> 띄어쓰기 할 때 언더스코어
 */
// camelCase 예시
const anYuJin = '안유진';
console.log(anYuJin); // 안유진