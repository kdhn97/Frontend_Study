const Posting = (props) => {
    return (
        <>
            <div className="post-preview">
                <a href="#">
                    <h2 className="post-title">{props.title}</h2>
                    <h3 className="post-subtitle">{props.subtitle}</h3>
                </a>
                <p className="post-meta">포스팅 날짜:&nbsp;{props.date}</p>
            </div>
            <hr/>       
        </>
    )
}

export default Posting;