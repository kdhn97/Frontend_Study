const Info = (props) => {
    return (
        <header>
          <div>
            <div>이름: {props.customer.name}</div>
            <div>주소: {props.customer.address}</div>
            <div>이메일: {props.customer.email}</div>
          </div>
        </header>    
    );
}

export default Info;