import styles from '@/styles/Todo.module.css';
const ImageButton = (props) => {
    return (
        <button className={styles.iconButton}>
          <img draggable={false} 
               src={`icons/${props.icon}.png`} 
               alt={props.label} />
        </button>
      );
}

export default ImageButton;