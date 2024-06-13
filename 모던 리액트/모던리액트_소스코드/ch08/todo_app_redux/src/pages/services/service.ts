const url = 'http://localhost:8000/api/v1/todos';

const get = async (): Promise<Todos> => {
    const response = await fetch(url);
    if(!response.ok) throw new Error();
    const data = await response.json();
    return data;
}
const insert = (data: Todo) => {
    return fetch(url, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
    });
}
const update = (id: number, data: Todo) => {
    fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
    });    
}
const remove = (id: number) => {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    });
}
const services: TodoServices = {
    get,
    insert,
    update,
    remove
}
export default services;