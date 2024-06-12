const url = 'http://localhost:8080/api/v1/customers';
const getCustomers = async (dispatch) => {
    const response = await fetch(url);
    const customers = await response.json();
    dispatch({
        type: "GET", 
        payload: customers
    });
}
const insertCustomer = (customer, dispatch) => {
    fetch(url, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(customer)
    });
    dispatch({
        type: "INSERT",
        payload: {
            customer
        }
    });
}
const updateCustomer = (id, customer, dispatch) => {
    fetch(`${url}/${id}`, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(customer)
    });
    dispatch({
        type: "UPDATE",
        payload: {
            id,
            customer
        }
    });     
}
const deleteCustomer = (id, dispatch) => {
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
const CustomerActions = {
    getCustomers,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}
export default CustomerActions;