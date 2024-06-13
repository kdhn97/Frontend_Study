import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useState } from "react";
import OrderContext from "./context/OrderContext";
import Layout from './layout'

export default function App({ Component, pageProps }: AppProps) {
  const [items, setItems] = useState([]);
  const [customer, setCustomer] = useState<Customer>(null!);
  return (
    <OrderContext.Provider value={{ items, setItems, customer, setCustomer }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </OrderContext.Provider>
  )
}