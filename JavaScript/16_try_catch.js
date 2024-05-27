/**
 * try...catch
 * 
 * 1) 발생시킬 때 -> 던진다고 한다 (throw)
 * 2) 명시적으로 인지할 때 -> 잡는다고 한다 (catch)
 */
function runner(){
    console.log('Hello'); // Hello
    throw new Error('문제 발생'); // 새로운 에러 객체를 생성
    console.log('Code Factory'); // 에러 발생 이후 출력 안됨
}
runner();

function runner(){
    try{
    console.log('Hello'); // Hello
    throw new Error('문제 발생'); // 새로운 에러 객체를 생성
    console.log('Code Factory'); // 에러 발생 이후 출력 안됨
    } catch(e){
        console.log('---catch---'); // ---catch---
        console.log(e) // Error: 문제 발생
    } finally{
        // 에러가 발생해도 무조건 실행되는 finally
        console.log('---finally---'); // ---finally---
    }
}
runner();