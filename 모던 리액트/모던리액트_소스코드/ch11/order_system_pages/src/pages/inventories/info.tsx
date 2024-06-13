const Info = (props: {inventory: Inventory}) => {
    return (
        <header>
          <div>
            <div>제품명: {props.inventory.name}</div>
            <div>재고 수량: {props.inventory.quantity}</div>
          </div>
        </header>    
    );
}

export default Info;