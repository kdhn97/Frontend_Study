const url = 'http://localhost:8000/api/v1/todos';

const get = async (): Promise<Todos> => {
    const response = await fetch(url);
    if(!response.ok) throw new Error("읽는 중 에러가 발생했습니다.");
    const data = await response.json();
    return data;
}
const insert = async (data: Todo) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
    });
    if(!response.ok) throw new Error("생성 중 에러가 발생했습니다.");    
}
const update = async (id: number, data: Todo) => {
    const response = await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
    });
    if(!response.ok) throw new Error("갱신 중 에러가 발생했습니다.");  
}
const remove = async (id: number) => {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE'
    });
    if(!response.ok) throw new Error("삭제 중 에러가 발생했습니다.");      
}
const services: TodoServices = {
    get,
    insert,
    update,
    remove
}
export default services;