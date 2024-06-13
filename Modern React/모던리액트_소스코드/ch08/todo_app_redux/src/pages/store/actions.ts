import services from "../services/service";
const insertTodo = (todo: Todo) => {
    services.insert(todo);
    return {type: 'todos/insert', payload: {data: todo}};
};
const updateTodo = (id: number, todo: Todo) => {
    services.update(id, todo);
    return {type: 'todos/update', payload: {id, data: todo}};
};
const removeTodo = (id: number) => {
    services.remove(id);
    return {type: 'todos/remove', payload: {id}};
};

const actions: TodoActions = {
    insertTodo,
    updateTodo,
    removeTodo
};
export default actions;