/**
 * If and Switch
 */
let number = 5;

if(number % 2 === 0){
    console.log('number 변수는 짝수입니다.');
}else {
    console.log('number 변수는 홀수입니다.');
} // number 변수는 홀수입니다.

if(number % 2 === 0){
    console.log('2의 배수입니다.');
}else if(number % 3 === 0){
    console.log('3의 배수입니다.');
}else{
    console.log('다른 배수입니다.');
} // 다른 배수입니다.

const englishDay = 'monday';
let koreanDay;
switch(englishDay){
    case 'monday': // if 의미
        koreanDay = '월요일';
        break;
    case 'tuesday':
        koreanDay = '화요일';
        break;
    default: // else 의미
        koreanDay = '주말';
        break;
}
console.log(koreanDay); // 월요일