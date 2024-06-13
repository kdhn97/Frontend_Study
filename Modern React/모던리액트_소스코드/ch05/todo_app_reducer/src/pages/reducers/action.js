const url = 'http://localhost:8000/api/v1/todos';
const getTodos = async (dispatch) => {
    const response = await fetch(url);
    const todos = await response.json();
    dispatch({
    type: "GET", 
    payload: todos
    });
}
const insertTodo = (todo, dispatch) => {
    fetch(url, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(todo)
    });
    dispatch({
    type: "INSERT",
    payload: {
        todo
    }
    });
}
const updateTodo = (id, todo, dispatch) => {
    fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(todo)
    });
    dispatch({
        type: "UPDATE",
        payload: {
            id,
            todo
        }
    });     
}
const deleteTodo = (id, dispatch) => {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    });
    dispatch({
        type: "DELETE",
        payload: {
            id
        }
    });
}
const TodoActions = {
    getTodos,
    insertTodo,
    updateTodo,
    deleteTodo
}
export default TodoActions;