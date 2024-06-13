import { useState } from 'react';

const MultiState = () => {
    const [user, setUser] = useState({name: '', email: ''});
    const handleChnageName = (e) => {
        // setUser({
        //     name: e.target.value,
        //     email: user.email
        // });
        setUser(prevUser => ({
            name: e.target.value,
            email: prevUser.email
        }));
    }  
    const handleChangeEmail = (e) => {
        // setUser({
        //     name: user.name,
        //     email: e.target.value
        // });
        setUser(prevUser => ({
            name: prevUser.name,
            email: e.target.value
        }));
    }
    const handleReset = () => {
        setUser({name: '', email: ''});
    }

    const lengthOfName = user.name.length;
    const lengthOfEmail = user.email.length;

    return (
        <>
            <div>
                이름 : <input value={user.name} onChange={handleChnageName} />
                이메일 : <input value={user.email} onChange={handleChangeEmail} />
            </div>
            <p/>
            <div>
                <div>이름 : {user.name}, 길이: {lengthOfName}</div>
                <div>이메일 : {user.email}, 길이: {lengthOfEmail}</div>
            </div>
            <div>
                <button onClick={handleReset}>초기화</button>
            </div>
        </>
    )
}
export default MultiState;




