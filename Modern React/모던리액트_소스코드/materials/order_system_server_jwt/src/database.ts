import {Customer, Product, Inventory, OrderItem, Order} from './types'

const customers: Customer[] =  [
    {id: 1, name: "김일", address: "서울시", email: "kim1@gmail.com"},
    {id: 2, name: "김이", address: "부산시", email: "kim2@gmail.com"},
    {id: 3, name: "김삼", address: "대전시", email: "kim3@gmail.com"},
];
const products: Product[] = [
    {id: 1, name: "제품1", description: "제품1설명", price: 10000},
    {id: 2, name: "제품2", description: "제품2설명", price: 20000},
    {id: 3, name: "제품3", description: "제품3설명", price: 30000},
];
const inventories: Inventory[] = [
    {id: 1, quantity: 1000},
    {id: 2, quantity: 2000},
    {id: 3, quantity: 3000},
];
const orders: Order[] = [
    {id: 1, customer: 1, date: new Date(), items: [
        {id: 1, product: 1, quantity: 1},
        {id: 2, product: 2, quantity: 2}
    ]},
    {id: 2, customer: 2, date: new Date(), items: [
        {id: 3, product: 1, quantity: 1},
        {id: 4, product: 3, quantity: 3}
    ]},    
];

const order_db = {
  customers,
  products,
  inventories,
  orders
}
export default order_db;