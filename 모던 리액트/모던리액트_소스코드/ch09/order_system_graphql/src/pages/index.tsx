import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import CustomerList from "./components/customer/CustomerList";
const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
});
export default function Home() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/customer" element={<CustomerList/>}/>
          </Routes>
          <Footer />
      </BrowserRouter>
    </ApolloProvider>
  )
}