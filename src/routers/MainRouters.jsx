import React from "react";

import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Header from "../components/header/Header";
import DashBoard from "../pages/dashboard/DashBoard";
import Product from "../pages/products/index";
import PriceBook from "../pages/priceBook";
import InventoryCount from "../pages/inventoryCount";
import Transaction from "../pages/transaction";

function MainRouters(props) {
  return (
    <div>
      <Header />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" Component={DashBoard} />
          <Route path="/products" Component={Product} />
          <Route path="/pricebook" Component={PriceBook} />
          <Route path="/inventorycount" Component={InventoryCount} />
          <Route path="/orders" Component={Transaction} />
        </Routes>
      </Container>
    </div>
  );
}

export default MainRouters;
