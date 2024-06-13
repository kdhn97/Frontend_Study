export type Customer = {
    id: number;
    name: string;
    address: string;
    email: string;
};

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number
};

export type Inventory = {
    id: number;
    quantity: number;
};

export type OrderItem = {
    id: number;
    product: number;
    quantity: number;
};
export type Order = {
    id: number;
    customer: number;
    date: Date;
    items: OrderItem[];
};