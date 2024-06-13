type Customer = {
    id: number,
    name: string,
    address: string,
    email: string
};
type Customers = Customer[];

type Product = {
    id: number,
    name: string,
    description: string,
    price: number
};
type Products = Product[];

type Inventory = {
    id: number,
    name?: string,
    quantity: number
};
type Inventories = Inventory[];

type OrderItem = {
    id: number,
    product: number,
    quantity: number,
}
type Order = {
    id: number,
    customer: number,
    date?: Date,
    items: OrderItem[]
}

type CartItem = {
    product: number,
    quantity: number,
}
type Cart = {
    customer: number,
    items: CartItem[]
}
