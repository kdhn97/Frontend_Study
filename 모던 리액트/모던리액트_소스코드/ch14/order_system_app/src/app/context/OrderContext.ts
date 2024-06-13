import { createContext } from 'react';
const OrderContext = createContext({
  items: [],
  setItems: (item: OrderItem[]) => {},
  customer: {} as Customer,
  setCustomer: (customer:Customer) => {},
  products: {} as Product[],
  setProducts: (products:Product[]) => {}
});
export default OrderContext;
