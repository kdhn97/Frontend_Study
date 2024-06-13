'use client';
import Footer from "./footer"
import Header from "./header"
import { useState } from "react";
import OrderContext from "./context/OrderContext";
import AuthProvider from "./context/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState<Customer>(null!);
  const [products, setProducts] = useState([]);
  return (
    <html>
      <body>
      <AuthProvider>
        <OrderContext.Provider value={{ items, setItems, customer, setCustomer, products, setProducts }}>
          <Header/>
          {children}
          <Footer/>
        </OrderContext.Provider>
        </AuthProvider>
      </body>
    </html>
  )
}

