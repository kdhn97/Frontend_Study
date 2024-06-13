import TodoInfo from './TodoInfo';
const TodoList = () => {
  return (
    <ol className="lane">
      <TodoInfo important>
          리액트 마스터 하기
      </TodoInfo>
    </ol>
  );
}
  
export default TodoList;