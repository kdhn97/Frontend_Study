import { ApiProvider } from "@reduxjs/toolkit/query/react";
import api from './createApi';
import TodoList from './TodoList';

export default function Home() {
  return (
    <ApiProvider api={api}>
      <TodoList/>
    </ApiProvider>
  );
}
