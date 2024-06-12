import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerList from "./components/customer/CustomerList";
export default function Home() {
  return (
    <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" exact element={<Main/>}/>
          <Route path="/customer" element={<CustomerList/>}/>
        </Routes>
        <Footer />
    </BrowserRouter>
  )
} 