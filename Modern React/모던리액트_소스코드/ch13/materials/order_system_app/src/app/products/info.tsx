const Info = (props:{product: Product}) => {
    return (
        <header>
          <div>
            <div>제품명: {props.product.name}</div>
            <div>제품 설명: {props.product.description}</div>
            <div>가격: {props.product.price}</div>
          </div>
        </header>    
    );
}

export default Info;