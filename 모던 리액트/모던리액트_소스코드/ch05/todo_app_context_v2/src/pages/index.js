import TodoList from "./TodoList";
import { TodoContextProvider} from './contexts/TodoContext';

export default function Home() {
  return (
    <TodoContextProvider>
      <main>
          <h1>할 일 관리</h1>
          <TodoList />
      </main>
    </TodoContextProvider>
  )
}
