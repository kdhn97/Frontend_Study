import express from 'express';
import bodyParser from "body-parser";
import cors from "cors";
import {Customer, Product, Inventory, OrderItem, Order} from './types'
import order_db from "./database";
const app = express();
const router = express.Router();
app.use(bodyParser.json());
const corsOptions = {
  origin: '*', 
  credential: true, 
}
app.use(cors(corsOptions))
app.use((req, res, next) => {
  next();
});
app.use(router);

const genId = () => {
    return Math.floor(Math.random() * 1000);
}
router.post("/api/v1/login", (req, res) => {
    const login = req.body;
    const customer = order_db.customers.find(
        (customer) => customer.email === login.email 
    );
    if(typeof customer === 'undefined') {
        res.sendStatus(404);
    } else {
        res.send(customer);
    }
})
// customer
router.get("/api/v1/customers", (req, res) => {
    res.send(order_db.customers);
});
router.get("/api/v1/customers/:id", (req, res) => {
    const customer = order_db.customers.find(
            (customer) => customer.id == parseInt(req.params.id)
        );
    if(typeof customer === 'undefined') {
        res.sendStatus(404);
    } else {
        res.send(customer);
    } 
});
router.post("/api/v1/customers", (req, res) => {
    const customer: Customer = req.body;
    order_db.customers.push({
        id: genId(), 
        name: customer.name,
        address: customer.address,
        email: customer.email
    } as Customer);
    res.sendStatus(200);
});
router.put("/api/v1/customers/:id", (req, res) => {
    const index = order_db.customers.findIndex(
            (customer) => customer.id == parseInt(req.params.id)
        );
    if(index != -1) {
        const input = req.body as Customer;
        const prev = order_db.customers[index];
        const customer: Customer = {
            id: prev.id,
            name: input.name,
            address: input.address,
            email: input.email
        };
        order_db.customers[index] = customer;
        res.sendStatus(200);
    }
    else {
        res.sendStatus(404);
    }
});
router.delete("/api/v1/customers/:id", (req, res) => {
    order_db.customers = order_db.customers.filter(
            (customer) => customer.id != parseInt(req.params.id)
        );
    res.sendStatus(200);
});
// product
router.get("/api/v1/products", (req, res) => {
    res.send(order_db.products);
});
router.get("/api/v1/products/:id", (req, res) => {
    const product = order_db.products.find(
            (product) => product.id == parseInt(req.params.id)
        );
    if(typeof product === 'undefined') {
      res.sendStatus(404);
    } else {
      res.send(product);
    } 
});
router.post("/api/v1/products", (req, res) => {
    const product: Product = req.body;
    order_db.products.push({
        id: genId(), 
        name: product.name,
        description: product.description,
        price: product.price
    } as Product);
    res.sendStatus(200);
});
router.put("/api/v1/products/:id", (req, res) => {
    const index = order_db.products.findIndex(
            (product) => product.id == parseInt(req.params.id)
        );
    if(index != -1) {
        const input = req.body as Product;
        const prev = order_db.products[index];
        const product: Product = {
            id: prev.id,
            name: input.name,
            description: input.description,
            price: input.price
        };
      order_db.products[index] = product;
      res.sendStatus(200);
    }
    else {
      res.sendStatus(404);
    }
});
router.delete("/api/v1/products/:id", (req, res) => {
    order_db.products = order_db.products.filter(
            (product) => product.id != parseInt(req.params.id)
        );
    res.sendStatus(200);
});
// inventory
router.get("/api/v1/inventories", (req, res) => {
    const inventories = order_db.products.map((product) => {
        const inventory = order_db.inventories.find(inventory => inventory.id == product.id);
        let quantity = 0;
        if(inventory != undefined)
            quantity = inventory.quantity;
        return {id: product.id, name: product.name, quantity};
    });
    res.send(inventories);
});
router.get("/api/v1/inventories/:id", (req, res) => {
    const inventory = order_db.inventories.find(
            (inventory) => inventory.id == parseInt(req.params.id)
        );
    if(typeof inventory !== 'undefined') {
        res.send(inventory);
        return;
    }
    const index = order_db.products.findIndex(
        (product) => product.id == parseInt(req.params.id)
    );
    if(index != -1) {
        const inventory: Inventory = {id: parseInt(req.params.id), quantity: 0};
        order_db.inventories.push(inventory);
        res.send(inventory);
        return;
    }
    res.sendStatus(404);
});
router.put("/api/v1/inventories/:id", (req, res) => {
    let index = order_db.inventories.findIndex(
            (inventory) => inventory.id == parseInt(req.params.id)
        );
    if(index != -1) {
        const input = req.body as Inventory;
        const prev = order_db.inventories[index];
        const inventory: Inventory = {
            id: prev.id,
            quantity: input.quantity
        };
        order_db.inventories[index] = inventory;
        res.sendStatus(200);
        return;
    }
    index = order_db.products.findIndex(
            (product) => product.id == parseInt(req.params.id)
        );
    if(index != -1) {
        const product: Product = order_db.products[index];
        const input = req.body as Inventory;
        const inventory: Inventory = {id: product.id, quantity: input.quantity};
        order_db.inventories.push(inventory);
        res.sendStatus(200);
        return;
    }
    res.sendStatus(404);
});
// order
router.get("/api/v1/orders/:id", (req, res) => {
    const order = order_db.orders.find(
            (order) => order.id == parseInt(req.params.id)
        );
    if(typeof order === 'undefined') {
      res.sendStatus(404);
    } else {
      res.send(order);
    } 
});
router.get("/api/v1/orders/customer/:id", (req, res) => {
    const orders = order_db.orders.filter(
            (order) => order.customer == parseInt(req.params.id)
        );
    if(typeof orders === 'undefined') {
      res.sendStatus(404);
    } else {
      res.send(orders);
    } 
});
router.post("/api/v1/orders", (req, res) => {
    const input: Order = req.body;
    const items: OrderItem[] = input.items.map<OrderItem>(item => {
        const orderItem: OrderItem = {
            id: genId(),
            product: item.product,
            quantity: item.quantity
        };
        return orderItem;
    });
    const order: Order = {
        id: genId(),
        customer: input.customer,
        date: new Date(),
        items
    };
    order_db.orders.push(order);
    res.sendStatus(200);
});
router.delete("/api/v1/orders/:id", (req, res) => {
    order_db.orders = order_db.orders.filter(
            (order) => order.id != parseInt(req.params.id)
        );
    res.sendStatus(200);
});
  
const PORT = 8080;
app.listen({ port: PORT }, () => {
  console.log(`order_system_server API 서버가 localhost:${PORT} 에서 실행됩니다...`);
});