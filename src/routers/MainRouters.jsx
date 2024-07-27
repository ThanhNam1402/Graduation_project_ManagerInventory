import React from "react";

import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Header from "../components/header/Header";
import DashBoard from "../pages/dashboard/DashBoard";
import Product from "../pages/products/index";
import AddProduct from "../pages/products/AddProduct";
import PriceBook from "../pages/priceBook";
import InventoryCount from "../pages/inventoryCount";
import AddInventoryCount from "../pages/inventoryCount/addinventoryCount";
import Transaction from "../pages/transaction";
import AddTransaction from "../pages/transaction/AddTransaction";
import PurchaseOrrder from "../pages/purchaseOrder";
import Customers from "../pages/customers";
import Suppliers from "../pages/suppliers";
import Invoices from "../pages/invoices";


function MainRouters(props) {
  return (
    <div>
      <Header />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" Component={DashBoard} />
          <Route path="/products" Component={Product} />
          <Route path="/products/new" Component={AddProduct} />
          <Route path="/pricebook" Component={PriceBook} />
          <Route path="/inventorycount" Component={InventoryCount} />
          <Route path="/inventorycount/add" Component={AddInventoryCount} />
          
          <Route path="/orders" Component={Transaction} />
          <Route path="/orders/add" Component={AddTransaction} />

          <Route path="/customers" Component={Customers} />
          <Route path="/suppliers" Component={Suppliers} />
          <Route path="/invoices" Component={Invoices} />
          <Route path="/purchaseOrder" Component={PurchaseOrrder} />
        </Routes>
      </Container>
    </div>
  );
}

export default MainRouters;
