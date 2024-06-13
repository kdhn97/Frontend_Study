import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { Provider } from 'react-redux';
import api from './createApi';
import TodoList from './TodoList';
import store from "./store";

export default function Home() {
  return (
    // <ApiProvider api={api}>
    //   <TodoList/>
    // </ApiProvider>
    <Provider store={store}>
      <TodoList/>
    </Provider>
  );
}
