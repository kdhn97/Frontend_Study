import order_db from "./database";
import {Customer, Product, Inventory, OrderItem, Order} from './types'

const genId = () => {
  return Math.floor(Math.random() * 1000);
}
// Customer
const customers = (): Customer[] | undefined => {
  return order_db.customers;
};
const customer = (args: {id: number}): 
                      Customer | undefined => {
  return order_db.customers.find(
      (customer) => customer.id == args.id
    );
};
const createCustomer = (args: {
  name: string;
  address: string;
  email: string
}): Customer => {
  const id = genId();
  const customer: Customer = {id, ...args};
  order_db.customers.push(customer);
  return customer;
};
const updateCustomer = (args: {
  id: number;
  name?: string;
  address?: string;
  email?: string
}): Customer => {
  const index = order_db.customers.findIndex(
      (customer) => customer.id == args.id
    );
  const customer: Customer = order_db.customers[index];
  if(args.name) customer.name = args.name;
  if(args.address) customer.address = args.address;
  if(args.email) customer.email = args.email;
  return customer;
};
const deleteCustomer = (args: { id: number }): Customer => {
  const index = order_db.customers.findIndex(
      (customer) => customer.id == args.id
    );
  if(index == -1) {
    return {id: -1, name: "", address: "", email: ""};
  }
  const customer: Customer = order_db.customers[index];
  order_db.customers = order_db.customers.filter(
      (customer) => customer.id != args.id
    );
  return customer;
};

// Product
const products = (): Product[] | undefined => {
  return order_db.products;
};
const product = (args: {id: number}): Product | undefined => {
  return order_db.products.find(
      (product) => product.id == args.id
    );
};
const createProduct = (args: {
  name: string;
  description: string;
  price: number
}): Product => {
  const id = genId() 
  const product: Product = {id, ...args};
  order_db.products.push(product);
  return product;
};
const updateProduct = (args: {
  id: number;
  name?: string;
  description?: string;
  price?: number
}): Product => {
  const index = order_db.products.findIndex(
      (product) => product.id == args.id
    );
  const product: Product = order_db.products[index];
  if(args.name) product.name = args.name;
  if(args.description) product.description = args.description;
  if(args.price) product.price = args.price;
  return product;
};
const deleteProduct = (args: { id: number }): Product => {
  const index = order_db.products.findIndex(
      (product) => product.id == args.id
    );
  if(index == -1) {
    return {id: -1, name: "", description: "", price: 0};
  }
  const product: Product = order_db.products[index];
  order_db.products = order_db.products.filter(
      (product) => product.id != args.id
    );
  return product;
};

// Inventory
const inventory = (args: { id: number }):
                        Inventory | undefined => {
  let inventory = order_db.inventories.find(
      (inventory) => inventory.id == args.id
    );
  if(typeof inventory !== 'undefined') {
    return inventory;
  }
  const index = order_db.products.findIndex(
      (product) => product.id == args.id
    );
  if(index != -1) {
    inventory = {id: args.id, quantity: 0};
    order_db.inventories.push(inventory);
    return inventory;
  }
  return undefined;
}
const storeInventory = (args: { id: number, quantity: number}): 
                          Inventory | undefined => {
  let index = order_db.inventories.findIndex(
      (inventory) => inventory.id == args.id
    );
  if(index != -1) {
    const inventory = {
      id: args.id, 
      quantity: args.quantity
    };
    order_db.inventories[index] = inventory;
    return inventory;
  }
  index = order_db.products.findIndex(
    (product) => product.id == args.id);
  if(index != -1) {
  	const product: Product = order_db.products[index];
    const inventory = {id: product.id, quantity: args.quantity};
    order_db.inventories.push(inventory);
    return inventory;
  }
  return undefined;
}

// Order
const order = (args: {id: number}): Order | undefined => {
  return order_db.orders.find((order) => order.id == args.id);
};
const ordersByCustomer = (args: {id: number}): Order[] | undefined => {
  return order_db.orders.filter((order) => order.customer == args.id);
};
const purchaseOrder = (args: {
  customer: number,
  items: {
    product: number,
    quantity: number
  }[]
}): Order | undefined => {
  const orderItems = args.items.map((item) => { 
    return {
      id: genId(),
      product: item.product,
      quantity: item.quantity  
    } as OrderItem;
  });
  const order = {
    id: genId(),
    customer: args.customer,
    date: new Date(),
    items: orderItems
  };
  order_db.orders.push(order);
  return order;
}
const cancelOrder = (args: { id: number }): Order => {
  const index = order_db.orders.findIndex(
      (order) => order.id == args.id
    );
  if(index == -1) {
    return {id: -1, customer: -1, date: new Date(), items: []};
  }
  const order = order_db.orders[index];
  order_db.orders = order_db.orders.filter(
      (order) => order.id != args.id
    );
  return order;
};

export const root = {
  // customer
  customers,
  customer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  // product
  products,
  product,
  createProduct,
  updateProduct,
  deleteProduct,
  // Inventory
  inventory,
  storeInventory,
  // Order
  order,
  ordersByCustomer,
  purchaseOrder,
  cancelOrder
};
