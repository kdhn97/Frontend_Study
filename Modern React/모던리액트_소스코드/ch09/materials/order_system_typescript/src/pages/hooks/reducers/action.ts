import { Dispatch } from "react";

let baseUrl: string;
let baseDispatch: Dispatch<Action>;
const get = async (url: string, dispatch: Dispatch<Action>) => {
    baseUrl = url;
    baseDispatch = dispatch;
    const response = await fetch(url);
    const data = await response.json();
    dispatch({
        type: "GET", 
        payload: data
    });
}
const insert = (data: any) => {
    fetch(baseUrl, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(data)
    });
    baseDispatch({
        type: "INSERT",
        payload: {
            data
        }
    });
}
const update = (id: number, data: any) => {
    fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(data)
    });
    baseDispatch({
        type: "UPDATE",
        payload: {
            id,
            data
        }
    });     
}
const remove = (id: number) => {
    fetch(`${baseUrl}/${id}`, {
        method: 'DELETE'
    });
    baseDispatch({
        type: "DELETE",
        payload: {
            id
        }
    });
}
const actions: Actions = {
    get,
    insert,
    update,
    remove
}
export default actions;