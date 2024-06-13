import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Customer {
        id: ID!
        name: String!
        address: String!
        email: String!
    }
    type Product {
        id: ID!
        name: String!
        description: String!
        price: Int!
    }
    type Inventory {
        id: ID!
        quantity: Int!
    }
    type OrderItem {
        id: ID!
        product: ID!
        quantity: Int!
    }
    type Order {
        id: ID!
        customer: ID!
        date: Date
        items: [OrderItem]
    }
    input ItemInput {
        product: ID!
        quantity: Int!
    }
    scalar Date
    type Query {
        customers: [Customer]
        customer(id: ID!): Customer
        products: [Product]
        product(id: ID!): Product
        inventory(id: ID!): Inventory
        order(id: ID!): Order
        ordersByCustomer(id: ID!): [Order]
    }

    type Mutation {
        createCustomer(name: String!, address: String!, email: String!): Customer
        updateCustomer(id: ID!, name: String, address: String, email: String): Customer
        deleteCustomer(id: ID!): Customer
        createProduct(name: String!, description: String!, price: Int!): Product
        updateProduct(id: ID!, name: String, description: String, price: Int): Product
        deleteProduct(id: ID!): Product
        storeInventory(id: ID!, quantity: Int!): Inventory
        purchaseOrder(customer: ID!, items: [ItemInput!]!): Order
        cancelOrder(id: ID!): Order
    }
    `
);

export default schema;


