import axios from "axios";
const url = 'http://localhost:8000/api/v1/todos';
const getTodos = async () => {
    return axios.get(url)
                .then(todos => todos.data)
                .catch(err => console.log(err));
}
const insertTodo = (todo) => {
    axios.post(url, todo)
          .catch(err => console.log(err));
}
const updateTodo = (id, todo) => {
    axios.put(`${url}/${id}`, todo)
          .catch(err => console.log(err));
}
const deleteTodo = (id) => {
    axios.delete(`${url}/${id}`)
          .catch(err => console.log(err));
}
const TodoService = {
  getTodos,
  insertTodo,
  updateTodo,
  deleteTodo
};
export default TodoService;
