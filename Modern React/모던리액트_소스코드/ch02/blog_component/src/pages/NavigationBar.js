const NavigationBar = () => {
    return (
        <>
            <nav className="navbar navbar-light navbar-expand-lg fixed-top" id="mainNav">
                <div className="container">
                    <a className="navbar-brand" href="index.html">리얼데브러닝</a>
                    <button data-bs-toggle="collapse" data-bs-target="#navbarResponsive" 
                            className="navbar-toggler" aria-controls="navbarResponsive" 
                            aria-expanded="false" aria-label="Toggle navigation">
                            <i className="fa fa-bars"></i>
                    </button>
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
        </>
    );
}
export default NavigationBar;