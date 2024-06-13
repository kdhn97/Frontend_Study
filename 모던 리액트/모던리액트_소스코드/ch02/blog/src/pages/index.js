export default function Home() {
  return (
    <>
        <nav className="navbar navbar-light navbar-expand-lg fixed-top" id="mainNav">
            <div className="container"><a className="navbar-brand" href="index.html">리얼데브러닝</a><button data-bs-toggle="collapse" data-bs-target="#navbarResponsive" className="navbar-toggler" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><i className="fa fa-bars"></i></button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item"><a className="nav-link" href="#">홈</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">블로그 소개</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">연락처</a></li>
                        <li className="nav-item"><a className="nav-link" href="#">블로그 포스팅</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <header className="masthead" style={{backgroundImage: `url('home-bg.jpg')`}}>
            <div className="overlay"></div>
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-lg-8 mx-auto position-relative">
                        <div className="site-heading">
                            <h1>진짜 개발자</h1><span className="subheading">진짜 개발자가 되기 위한 여정</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <div className="container">
            <div className="row">
                <div className="col-md-10 col-lg-8">
                    <div className="post-preview">
                        <a href="#">
                            <h2 className="post-title">새로운 기술 습득하기</h2>
                            <h3 className="post-subtitle">신선한 물을 마시려면 먼저 컵에 있는 물을 버려야 한다</h3>
                        </a>
                        <p className="post-meta">포스팅 날짜:&nbsp;<a href="#">2023년&nbsp;11월 20일&nbsp;</a></p>
                    </div>
                    <hr/>
                    <div className="post-preview">
                        <a href="#">
                            <h2 className="post-title"> 마이크로서비스 아키텍처</h2>
                            <h3 className="post-subtitle">실현 가능한 서비스 지향 아키텍처</h3>
                        </a>
                        <p className="post-meta">포트팅 날짜:&nbsp;&nbsp;<a href="#">2023년 12월 1일</a></p>
                    </div>
                    <hr/>
                    <div className="post-preview">
                        <a href="#">
                            <h2 className="post-title">프로세스 전쟁은 끝났다!</h2>
                            <h3 className="post-subtitle">The winner is ...</h3>
                        </a>
                        <p className="post-meta">포스팅 날짜:&nbsp;&nbsp;<a href="#">2023년 12월 10일</a></p>
                    </div>
                    <hr/>
                    <div className="clearfix"><button className="btn btn-primary float-end" type="button">이전 포스팅 ⇒</button></div>
                </div>
            </div>
        </div>
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-lg-8 mx-auto">
                        <p className="text-muted copyright">저작권 ©&nbsp;리얼데브러닝 2023</p>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}
