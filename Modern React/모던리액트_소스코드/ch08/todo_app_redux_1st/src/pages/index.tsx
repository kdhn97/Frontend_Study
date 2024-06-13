import { Provider } from 'react-redux';
import store from './store/store';
import TodoList from "./TodoList";

export default function Home() {
  return (
    <Provider store={store}>
        <main>
            <h1>할 일 관리</h1>
            <TodoList />
        </main>
    </Provider>
  )
}
