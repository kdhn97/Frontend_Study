import TodoRow from './TodoRow';
const TodoList = () => {
    const laneStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        minWidth: '320px',
        maxWidth: '400px',
        listStyle: 'none',
        margin: 0,
        padding: 0
    };
      
    return (
      <ol style={laneStyle}>
        <TodoRow important>
            리액트 마스터 하기
        </TodoRow>
      </ol>
    );
}
  
export default TodoList;