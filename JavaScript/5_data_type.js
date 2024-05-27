/**
 * - Data Types
 * 
 * 여섯 개의 Primitive Type과
 * 한 개의 오브젝트 타입이 있다
 * 
 * 1) Number
 * 2) String
 * 3) Boolean
 * 4) undefines
 * 5) null
 * 6) Symbol
 * 7) Object
 */
const age = 32;
const tempature = -10;
const pi = 3.14;

console.log(typeof age); // number

const infinity = Infinity;
console.log(typeof infinity) // number

/**
 * String 타입
 */
const codeFactory = '코드팩토리';
console.log(typeof codeFactory);

const ive = "'아이브' 안유진";
console.log(ive); // string

/**
 * Template Listeral
 * 
 * Escaping Character
 * 1) new_line -> \n
 * 2) tab -> \t
 * 3) 백슬래시를 스트링으로 표현하고 싶다면 두번 입력하면 된다
 */
const iveYuJin = '아이브\n안유진';
console.log(iveYuJin);

const iveWonYoung = '아이브\t장원영';
console.log(iveWonYoung); // 아이브	장원영

const backSlash = '아이브\\코드팩토리';
console.log(backSlash); // 아이브\코드팩토리

const smallQutoation = '아이브\'코드팩토리';
console.log(smallQutoation); // 아이브'코드팩토리

const iveWonYoung2 = `아이브
장원영`;
console.log(iveWonYoung2);
console.log(typeof iveWonYoung2); // string

const groupName = '아이브';
console.log(groupName + '안유진'); // 아이브안유진
console.log(`${groupName} 안유진`) // 아이브 안유진

/**
 * Boolean 타입
 */
const isTrue = true;
const isFalse = false;
console.log(typeof isTrue); // boolean
console.log(typeof isFalse); // boolean

/**
 * undefined
 * 
 * 값을 배정하지 않았다는 의미
 * 사용자가 직접 값을 초기화하지 않았을 때 지정되는 값이다
 * 직접 undefined로 값을 초기화하는건 지양해야한다
 */
let noInit;
console.log(noInit); // undefined
console.log(typeof noInit); // undefined

/**
 * null 타입
 * 
 * 값이 없다는 의미로 배정할 때 사용
 * undefined와 마찬가지로 값이 없다는 뜻이나
 * JS에서는 개발자가 명시적으로 없는 값으로 초기화할 떄 사용
 */
let init = null;
console.log(init); // null
console.log(typeof init); // object

/**
 * Symbol 타입
 * 
 * 유일무이한 값을 생성할 떄 사용한다
 * 다른 프리미티브 값들과 다르게 Symbol 함수를 호출
 */
const test1 = '1';
const test2 = '2';
console.log(test1 == test2); // false
const symbol1 = Symbol('1');
const symbol2 = Symbol('1');
console.log(symbol1 == symbol2); // false

/**
 * Object 타입
 * 
 * Map
 * Key:Value 쌍으로 이루어져 있다
 */
const dictionary = {
    red: '빨간색',
};
console.log(dictionary); // { red: '빨간색' }
console.log(dictionary['red']); // 빨간색
console.log(typeof dictionary); // object

/**
 * Array 타입
 * 
 * 값을 리스트로 나열 할 수 있는 타입이다
 */
const iveMembersArray = [
    '안유진',
    '장원영',
];
console.log(iveMembersArray); // [ '안유진', '장원영' ]

/**
 * index
 * 
 * 0부터 시작한다
 */
console.log(iveMembersArray[0]) // 안유진
iveMembersArray[0] = '코드팩토리';
console.log(iveMembersArray); // [ '코드팩토리', '장원영' ]

/**
 * static typing ( C언어 )
 * -> 변수를 선언할 때 어떤 타입의 변수를 선언할 지 명시
 * dynamic typing ( JS )
 * -> 변수의 타입을 명시적으로 선언하지 않고 값에 의해 타입을 추록
 * JS -> dynamic typing
 */