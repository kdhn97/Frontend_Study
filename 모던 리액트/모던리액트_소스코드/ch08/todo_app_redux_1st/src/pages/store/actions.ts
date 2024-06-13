import services from "../services/service";
const insertTodo = (todo: Todo) => {
    try {
        services.insert(todo);
        return {type: 'todos/insert', payload: {data: todo}};
    } catch(error) {
        console.log(error);
    }
};
const updateTodo = (id: number, todo: Todo) => {
    try {
        services.update(id, todo);
        return {type: 'todos/update', payload: {id, data: todo}};
    } catch(error) {
        console.log(error);
    }
};
const removeTodo = (id: number) => {
    try {
        services.remove(id);
        return {type: 'todos/remove', payload: {id}};
    } catch(error) {
        console.log(error);
    }
};

const actions = {
    insertTodo,
    updateTodo,
    removeTodo
};
export default actions;