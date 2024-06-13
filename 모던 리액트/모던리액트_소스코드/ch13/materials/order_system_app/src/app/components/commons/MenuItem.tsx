import styles from "./MenuItem.module.css";
import Link from 'next/link';
const MenuItem = (props) => {
  const icon = `icons/${props.icon}.png`;
  return (
    <li>
      <Link href={props.href} className={styles.menuLink}>
        <img src={icon} width="16" alt="" />
        {props.children}
      </Link>
    </li>
  );
}

export default MenuItem;
