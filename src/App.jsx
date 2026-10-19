import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductListing from "./components/ProductListing";
import ProductDetails from "./components/ProductDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./Context/CartContext";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";

function App() {
  return (
    <CartProvider>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        {/* <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/> */}
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/cart" element={<Cart/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App