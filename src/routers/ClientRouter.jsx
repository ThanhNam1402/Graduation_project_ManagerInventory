import { Routes, Route } from "react-router-dom";
import Home from "@/pages/client/home/Home";
import Header from "@/components/client/header/Header";
import Cart from "@/pages/client/cart/Cart";
import Footer from "@/components/client/footer/Footer";
import Products from "@/pages/client/products/Page";

import "./client.scss";

function ClientRouter() {
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Products />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default ClientRouter;
