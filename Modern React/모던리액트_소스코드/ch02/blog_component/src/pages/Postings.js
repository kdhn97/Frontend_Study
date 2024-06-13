import Posting from "./Posting";
const Postings = () => {
    const postings = [
        {
            id: 1,
            title: '새로운 기술 습득하기',
            subtitle: '신선한 물을 마시려면 먼저 컵에 있는 물을 버려야 한다',
            date: '2023년 11월 20일'
        },
        {
            id: 2,
            title: '마이크로서비스 아키텍처',
            subtitle: '실현 가능한 서비스 지향 아키텍처',
            date: '2023년 12월 1일'
        },
        {
            id: 3,
            title: '프로세스 전쟁은 끝났다!',
            subtitle: 'The winner is ...',
            date: '2023년 12월 10일'
        },
    ];
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-lg-8">
                        {postings.map(p => {
                            return <Posting
                                        key = {p.id} 
                                        title = {p.title}
                                        subtitle = {p.subtitle}
                                        date = {p.date}
                                    />;
                        })}
                        <div className="clearfix">
                            <button className="btn btn-primary float-end" 
                                    type="button">
                                이전 포스팅 ⇒
                            </button>
                        </div>                    
                    </div>
                </div>
            </div>
        </>
    );
}

export default Postings;