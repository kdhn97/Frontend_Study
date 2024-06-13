import MenuItem from "./MenuItem";
import styles from "./Menu.module.css";
import { signIn, signOut, useSession } from "next-auth/react";

const Menu = () => {
  const { data: session } = useSession();
  const items = [
    {id: 1, title: '홈으로', href: '/', icon: 'home'},
    {id: 2, title: '고객 관리', href: '/customers', icon: 'customer'},
    {id: 3, title: '제품 관리', href: '/products', icon: 'product'},
    {id: 4, title: '재고 관리', href: '/inventories', icon: 'inventory'},
    {id: 5, title: '제품 주문', href: '/orders', icon: 'order'},
  ];
  
  return (
    <nav>

      <ul className={styles.menu}>
        {items.map(({ id, title, ...props }) => (
          <MenuItem key={id} {...props}>
            {title}
          </MenuItem>
        ))}
      <div className="ml-auto flex gap-2">
        {session?.user ? (
          <>
            <p className="text-lg text-gray-600"> {session.user.name}</p>
            <button className="button" onClick={() => signOut()}>
              로그아웃
            </button>
          </>
        ) : (
          <button className="button" onClick={() => signIn()}>
            로그인
          </button>
        )}
      </div>
      </ul>     
    </nav>
  );
}

export default Menu;
