/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styles from './Todo.module.css';
import StyledButton from './StyledButton';

const TodoRow = (props) => {
    return (
        <li className={styles.card}>
          <header className={styles.cardHeader}>
            <p css={css`
                flex-grow: 1; 
                margin: 0;
                color: ${props.important ? 'red' : 'black'};
                font-size: 1.2em;
            `}>{props.children}</p>
          </header>
          <ul className={styles.cardControls}>
            <li>
              <StyledButton color='black'>변경</StyledButton>
            </li>
            <li>
              <StyledButton important>삭제</StyledButton>
            </li>
          </ul>
        </li>
    );
}
export default TodoRow;

