let baseUrl;
let baseDispatch;
const get = async (url, dispatch) => {
    baseUrl = url;
    baseDispatch = dispatch;
    const response = await fetch(url);
    const data = await response.json();
    dispatch({
        type: "GET", 
        payload: data
    });
}
const insert = (data) => {
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
const update = (id, data) => {
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
const remove = (id) => {
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
const actions = {
    get,
    insert,
    update,
    remove
}
export default actions;