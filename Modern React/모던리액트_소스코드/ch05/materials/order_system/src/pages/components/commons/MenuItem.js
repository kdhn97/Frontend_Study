import styles from "./MenuItem.module.css";
import { Link } from 'react-router-dom';
const MenuItem = (props) => {
  const icon = `icons/${props.icon}.png`;
  return (
    <li>
      <Link to={props.href} className={styles.menuLink}>
        <img src={icon} width="16" alt="" />
        {props.children}
      </Link>
    </li>
  );
}

export default MenuItem;
