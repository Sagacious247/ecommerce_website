import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Admin, Cart, Checkout, CheckoutDetials, Contact, Home, Login, Register, Reset } from "./pages";
import { AdminOnlyRoute, Footer, Header, ProductDetails } from "./components";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";


function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/contact" element={<Contact/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/register" element={<Register/>}/>
     <Route path="/reset" element={<Reset/>} />
     <Route path="/product-details/:id" element={<ProductDetails/>} />
     <Route path="/cart" element={<Cart/>} />
     <Route path="/checkout-details" element={<CheckoutDetials/>} />
     <Route path="/checkout" element={<Checkout/>}/>
     <Route path="/checkout-success" element={<CheckoutSuccess/>}/>
     
     <Route path="/admin/*" element={
     <AdminOnlyRoute>
       <Admin/>
    </AdminOnlyRoute>
    }
      />
    </Routes>
      <Footer/>
    </BrowserRouter>
    <ToastContainer/>
    </>
  );
}

export default App;
 