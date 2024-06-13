import { createContext } from 'react';
const OrderContext = createContext({
  items: [],
  setItems: (item: OrderItem[]) => {},
  customer: {} as Customer,
  setCustomer: (customer: Customer) => {}
});
export default OrderContext;
