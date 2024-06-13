const Login = ({errorMessage, handleLogin}) => {
    return (
        <>
            <div>
                <h3>로그인</h3>
            </div>
            <div>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">이메일</label>
                    <input type="text" name="email"></input>
                    <label htmlFor="password">비밀번호</label>
                    <input type="password" name="password"></input>
                    <button type="submit">로그인</button>
                </form>
            </div>
            <div>
                {errorMessage && errorMessage}
            </div> 
        </>
    );
}

export default Login;