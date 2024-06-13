import { useRef, useState } from 'react';
import EmailRef from './EmailRef';
const Form = (props) => {
    const emailRef = useRef({});
    const postNoRef = useRef({});
    const [isShowPost, setIsShowPost] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        props.insertUser({
            name: e.target.name.value,
            postNo: e.target.post.value,
            address: e.target.address.value,
            email: emailRef.current.value
        });
        e.target.reset();
    }
    const searchPostNo = (e) => {
        e.preventDefault();
        setIsShowPost(prev => !prev);
        postNoRef.current.focus();
    }
    let postContent = '';
    if(isShowPost) {
        postContent = <ul>
            <li>100: 서울시</li>
            <li>200: 부산시</li>
            <li>300: 대전시</li>
        </ul>;
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">이름: </label>
                    <input id="name" />
                </div>
                <div>
                    <label htmlFor="post">우편번호: </label>
                    <input id="post" ref={postNoRef}/>
                    <button onClick={searchPostNo}>검색</button>
                </div>
                {isShowPost && <ul>
                        <li>100: 서울시</li>
                        <li>200: 부산시</li>
                        <li>300: 대전시</li>
                    </ul>}              
                {/* {postContent} */}
                <div>
                    <label htmlFor="address">주소: </label>
                    <input id="address" />
                </div>                
                {/* <div>
                    <label htmlFor="email">이메일: </label>
                    <input id="email" type="email" />
                </div> */}
                <EmailRef ref={emailRef}/>
                <button type="submit">저장</button>
            </form>
        </>
    );

}
export default Form;

