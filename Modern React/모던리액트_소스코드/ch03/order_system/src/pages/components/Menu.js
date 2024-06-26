import MenuItem from "./MenuItem";
import styles from "./Menu.module.css";

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
      <ul className={styles.menu}>
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
