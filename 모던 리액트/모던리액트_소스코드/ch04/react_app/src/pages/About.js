import { useSearchParams, useLocation } from 'react-router-dom';
const About = () => {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const isDetail = searchParams.get('detail');
    const location = useLocation();
    console.log(location.pathname, location.search);
    return (
        <>
            <h1>소개</h1>
            <p>소개 페이지 입니다.</p>
            {isDetail && <div>상세 정보</div>}
        </>
    );
}
export default About;