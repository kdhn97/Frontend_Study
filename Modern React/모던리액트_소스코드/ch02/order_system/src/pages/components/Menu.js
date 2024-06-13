import MenuItem from "./MenuItem";

const Menu = () => {
  const items = [
    {id: 1, title: '홈으로', href: '#', icon: 'home'},
    {id: 2, title: '고객 관리', href: '#', icon: 'customer'},
    {id: 3, title: '제품 관리', href: '#', icon: 'product'},
    {id: 4, title: '재고 관리', href: '#', icon: 'inventory'},
    {id: 5, title: '제품 주문', href: '#', icon: 'order'},
  ];
  
  return (
    <nav>
      <ul className="menu">
        {/* <MenuItem href="#" icon="home">
          홈으로
        </MenuItem>
        <MenuItem href="#" icon="customer">
          고객 관리
        </MenuItem>
        <MenuItem href="#" icon="product">
          제품 관리
        </MenuItem>
        <MenuItem href="#" icon="inventory">
          재고 관리
        </MenuItem>
        <MenuItem href="#" icon="order">
          제품 주문
        </MenuItem>         */}
         {items.map(({ id, title, ...props }) => (
          <MenuItem key={id} {...props}>
            {title}
          </MenuItem>
        ))}
      </ul>
    </nav>
  );
}

export default Menu;
