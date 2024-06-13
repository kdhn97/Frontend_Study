query {
  customers {
    id,
    name,
    address,
    email
  }
}

query {
  customers {
    name
  }
}

query {
  customer(id: 1) {
    id,
    name,
    address,
    email
  }
}

mutation {
  createCustomer(
    name:"김사", 
    address:"제주시", 
    email:"kim4@gmail.com") {
      name,
      address,
      email,
      id
  }
}


mutation {
  createCustomer(
    name:"김오", 
    address:"인천시", 
    email:"kim5@gmail.com") {
      id
  }
}


mutation {
  updateCustomer(
    id: 250, 
    address:"광주시") {
      name,
      address,
      email,
      id
  }
}

mutation {
  deleteCustomer(
    id: 135) {
      id
  }
}

query {
  products {
    id,
    name,
    description,
    price
  }
}

query {
  product(id:1) {
    id,
    name,
    description,
    price
  }
}


mutation {
  createProduct(
    name:"제품4", 
    description:"제품4설명", 
    price: 40000) {
      name,
      description,
      price,
      id
  }
}

mutation{
  updateProduct(
    id: 349,
    description:"제품4설명변경") {
      description,
      id
  }
}


mutation{
  deleteProduct(
    id: 349) {
      id
  }
}


query {
  inventory(id:1) {
    id,
    quantity
  }
}


mutation {
  storeInventory(
    id: 1, 
    quantity: 1000) {
      quantity,
      id
  }
}


query {
  order(id:1) {
    id,
    customer,
    date,
  	items {
      id,
      product,
      quantity
    }
  }
}

query {
  ordersByCustomer(id:1) {
    id,
    customer,
    date,
  	items {
      id,
      product,
      quantity
    }
  }
}

mutation {
  purchaseOrder(
    customer: 1, 
    items: [
      {product:1, quantity: 100}, 
      {product:2, quantity:200}
    ]) {
      customer
      items {
        product
        quantity
      }
  }
}

mutation {
  cancelOrder(
    id: 1) {
      id
  }
}

