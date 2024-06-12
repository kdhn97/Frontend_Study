import axios from "axios";
export default class CustomerService {
    static url = 'http://localhost:8080/api/v1/customers';
    static getCustomers = async () => {
        return axios.get(this.url)
                    .then(customers => customers.data)
                    .catch(err => console.log(err));
    }
    static insertCustomer = (todo) => {
        axios.post(this.url, todo)
             .catch(err => console.log(err));
    }
    static updateCustomer = (id, todo) => {
        axios.put(`${this.url}/${id}`, todo)
             .catch(err => console.log(err));
    }
    static deleteCustomer = (id) => {
        axios.delete(`${this.url}/${id}`)
             .catch(err => console.log(err));
    }
}




