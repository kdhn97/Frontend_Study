import { useState } from 'react';
import Form from './Form';
import Row from './Row';

const List = () => {       
    const [users, setUsers] = useState([]);
    const insertUser = (user) => {
        setUsers(prevUsers => [...prevUsers, user]);
    }
    // const userElems = [];
    // for(const user of users) {
    //     userElems.push((
    //         <li key={user.name}>
    //             <div>이름 : {user.name}</div>
    //             <div>주소 : {user.address}</div>
    //             <div>이메일 : {user.email}</div>
    //         </li>        
    //     ));
    // }
    return (
        <>
            <Form insertUser={insertUser}/>
            <p></p>
            <ul>
                {users.map(user => {
                    return <Row key={user.name} user={user}/>
                })}
            </ul>
            {/* <ul>
                {userElems}
            </ul>
            <ul>
                {users.map(user => {
                    return <li key={user.name}>
                        <div>이름 : {user.name}</div>
                        <div>주소 : {user.address}</div>
                        <div>이메일 : {user.email}</div>
                    </li>;
                })}
            </ul> */}
        </>
    );
}
export default List;

