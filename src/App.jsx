import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductListing from "./components/ProductListing";
import ProductDetails from "./components/ProductDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./Context/CartContext";
function App() {
  return (
    <CartProvider>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
    </CartProvider>
  );
}

export default App