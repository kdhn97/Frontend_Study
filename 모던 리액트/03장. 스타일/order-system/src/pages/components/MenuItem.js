import styles from './MenuItem.module.css'

const MenuItem = (props) => {
  const icon = `icons/${props.icon}.png`;
  return (
    <li>
      <a href={props.href} className={styles.menuLink}>
        <img src={icon} width="16" alt="" />
        {props.children}
      </a>
    </li>
  )
}
export default MenuItem;