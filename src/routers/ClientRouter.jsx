import { Routes, Route } from "react-router-dom";
import Home from "@/pages/client/home/Home";
import Header from "@/components/client/header/Header";
import Cart from "@/pages/client/cart/Cart";
import Footer from "@/components/client/footer/Footer";
import Products from "@/pages/client/products/Page";
import Account from "@/pages/client/account/page";
import Info from "@/pages/client/account/Info/Info";
import Orders from "@/pages/client/account/Orders/Orders";
import Address from "@/pages/client/account/Address/Address";
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

          <Route path="/account" element={<Account />}>
            <Route index element={<Info />} />
            <Route path="orders" element={<Orders />} />
            <Route path="address" element={<Address />} />

          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default ClientRouter;
