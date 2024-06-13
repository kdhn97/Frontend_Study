import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerList from "./components/customer/CustomerList";
import { Provider } from "react-redux";
import store from './store/store';
export default function Home() {
  return (
    <Provider store={store}>
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/customer" element={<CustomerList/>}/>
          </Routes>
          <Footer />
      </BrowserRouter>
    </Provider>
  )
} 