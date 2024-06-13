import { useParams, useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useParams();
    const navigate = useNavigate();
    const goHome = () => {
        navigate('/');
    }
    const goback = () => {
        navigate(-1);
    }
    return (
        <>
            <h1>{user} 프로필</h1>
            <p>{user} 프로필입니다.</p>
            <button onClick={goHome}>홈</button><br/>
            <button onClick={goback}>뒤로 가기</button>
        </>
    );
}
export default Profile;

