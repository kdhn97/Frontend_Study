export default class TodoService {
  static url = 'http://localhost:8000/api/v1/todos';
  static getTodos = async () => {
      const response = await fetch(this.url);
      const todos = await response.json();
      return todos;
  }
  static insertTodo = (todo) => {
      fetch(this.url, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(todo)
      });
  }
  static updateTodo = (id, todo) => {
      fetch(`${this.url}/${id}`, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(todo)
      });
  }
  static deleteTodo = (id) => {
      fetch(`${this.url}/${id}`, {
        method: 'DELETE'
      });
  }
}