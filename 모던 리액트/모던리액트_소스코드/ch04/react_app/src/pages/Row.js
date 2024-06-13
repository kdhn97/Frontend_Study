const Row = (props) => {
    const user = props.user;
    return (
        <li>
            <div>이름 : {user.name}</div>
            <div>우편번호 : {user.postNo}</div>
            <div>주소 : {user.address}</div>
            <div>이메일 : {user.email}</div>
        </li>
    );
}
export default Row;