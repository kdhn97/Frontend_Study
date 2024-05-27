/**
 * Loops
 * 
 * 1) for
 * 2) while
 */
for(let i = 0; i < 10; i++){
    console.log(i);
}

for(let i = 10; i > 0; i--){
    console.log(i);
}

for(let i = 0; i < 3; i++){
    for(let j = 3; j > 0; j--){
        console.log(i, j);
    }
}

// *을 이용해서 6 X 6의 정사각형을 출력하라
let square = ''
for(let i = 0; i < 6; i++){
    for(let j = 0; j < 6; j++){
        square += '*';
    }
    square += '\n'
}
console.log(square);

/**
 * for...in : 인덱스 가져올 때
 */
const yuJin = {
    name: '안유진',
    year: 2023,
}
for(let key in yuJin){
    console.log(key);
}
// name
// year

const iveMembers = ['안유진', '장원영'];
for(let key in iveMembers){
    console.log(key);
    console.log(`${key}:${iveMembers[key]}`);
}
// 0
// 0:안유진
// 1
// 1:장원영

/**
 * for...of : 값을 가져올 때
 */
for(let value of iveMembers){
    console.log(value);
}
// 안유진
// 장원영

/**
 * While문
 */
let number = 0;
while(number < 10){
    number ++;
}
console.log(number); // 10

/**
 * break : end
 */
for(let i = 0; i < 10; i++){
    if (i === 5){
        break;
    }
    console.log(i);
}

number = 0;
while(number < 10){
    if(number === 5){
        break;
    }
    number ++;
    console.log(number);
}

/**
 * continue : Skip
 */
for(let i = 0; i < 10; i++){
    if(i === 5){
        continue;
    }
    console.log(i);
}

number = 0;
while(number < 10){
    number ++;
    if(number === 5){
        continue;
    }
    console.log(number)
}