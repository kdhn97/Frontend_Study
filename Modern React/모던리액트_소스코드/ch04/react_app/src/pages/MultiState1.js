import { useState, useCallback, useRef } from 'react';

const MultiState = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const nameRef = useRef();
    const emailRef = useRef();
    // const handleChnageName = (e) => {
    //     setName(e.target.value);
    // }  
    // const handleChangeEmail = (e) => {
    //     setEmail(e.target.value);
    // }
    // const handleChnageName = useCallback(e => {
    //     setName(e.target.value);
    // }, []);
    // const handleChangeEmail = useCallback(e => {
    //     setEmail(e.target.value);
    // }, [email]);   
    const handleChnageName = useCallback(() => {
        setName(nameRef.current.value);
    }, []);
    const handleChangeEmail = useCallback(() => {
        setEmail(emailRef.current.value);
    }, []);  
    const handleReset = () => {
        setName('');
        setEmail('');
        nameRef.current.focus();
    }
    return (
        <>
            <div>
                이름 : <input ref={nameRef} value={name} onChange={handleChnageName} />
                이메일 : <input ref={emailRef} value={email} onChange={handleChangeEmail} />
            </div>
            <p/>
            <div>
                <div>이름 : {name}</div>
                <div>이메일 : {email}</div>
            </div>
            <div>
                <button onClick={handleReset}>초기화</button>
            </div>
        </>
    )
}
export default MultiState;




