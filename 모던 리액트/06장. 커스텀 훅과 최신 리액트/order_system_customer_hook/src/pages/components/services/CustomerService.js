import axios from "axios";
const url = 'http://localhost:8080/api/v1/customers';
const getCustomers = async () => {
    return axios.get(url)
                .then(customers => customers.data)
                .catch(err => console.log(err));
}
const insertCustomer = (todo) => {
    axios.post(url, todo)
            .catch(err => console.log(err));
}
const updateCustomer = (id, todo) => {
    axios.put(`${url}/${id}`, todo)
            .catch(err => console.log(err));
}
const deleteCustomer = (id) => {
    axios.delete(`${url}/${id}`)
            .catch(err => console.log(err));
}

const CustomerService = {
    getCustomers,
    insertCustomer,
    updateCustomer,
    deleteCustomer
};
export default CustomerService;
