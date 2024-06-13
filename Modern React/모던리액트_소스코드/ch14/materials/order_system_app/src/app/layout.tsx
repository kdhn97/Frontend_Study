'use client';
import Footer from "./footer"
import Header from "./header"
import { useState } from "react";
import OrderContext from "./context/OrderContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState<Customer>(null!);
  return (
    <html>
      <body>
        <OrderContext.Provider value={{ items, setItems, customer, setCustomer }}>
          <Header/>
          {children}
          <Footer/>
        </OrderContext.Provider>
      </body>
    </html>
  )
}