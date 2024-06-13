import axios from "axios";

export default class TodoService {
    static url = 'http://localhost:8000/api/v1/todos';
    static getTodos = async () => {
        return axios.get(this.url)
                    .then(todos => todos.data)
                    .catch(err => console.log(err));
    }
    static insertTodo = (todo) => {
        axios.post(this.url, todo)
             .catch(err => console.log(err));
    }
    static updateTodo = (id, todo) => {
        axios.put(`${this.url}/${id}`, todo)
             .catch(err => console.log(err));
    }
    static deleteTodo = (id) => {
        axios.delete(`${this.url}/${id}`)
             .catch(err => console.log(err));
    }
  }

