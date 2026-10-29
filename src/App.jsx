import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ProductListing from "./components/ProductListing";
import ProductDetails from "./components/ProductDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./Context/CartContext";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import Shipping from "./Pages/Shipping";
import EditProfile from "./Pages/EditProfile";


function AppLayout() {
  const location = useLocation();
  const isShippingPage = location.pathname === "/shipping";

  return (
    <>
    {!isShippingPage && <Header/>}

      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/shipping" element={<Shipping/>}/>
        <Route path="/profile" element={<EditProfile/>}/>
      </Routes>

      {!isShippingPage && <Footer/>}
    </>
  );
}

function App(){
  return(
<CartProvider>
    <BrowserRouter>
    <AppLayout/>
    </BrowserRouter>
    </CartProvider>
  );
}
export default App;