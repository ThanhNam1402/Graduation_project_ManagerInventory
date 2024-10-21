import { Routes, Route } from "react-router-dom";
import Home from "@/pages/client/home/Home";
import Header from "@/components/client/header/Header";
import Cart from "@/pages/client/cart/Cart";

import "./client.scss";

function ClientRouter() {
  return (
    <div>
      <Header />
      <div className="container">
        <Routes>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
}

export default ClientRouter;
