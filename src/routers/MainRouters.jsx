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
          <Route index element={<DashBoard />} />

          <Route path="products" element={<Product />} />
          <Route path="products/new" element={<AddProduct />} />

          <Route path="pricebook" element={<PriceBook />} />
          
          <Route path="inventorycount" element={<InventoryCount />} />
          <Route path="/inventorycount/add" element={<AddInventoryCount />} />

          <Route path="/orders" element={<Transaction />} />
          <Route path="/orders/add" element={<AddTransaction />} />

          <Route path="customers" element={<Customers />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="purchaseOrder" element={<PurchaseOrrder />} />
        </Routes>
      </Container>
    </div>
  );
}

export default MainRouters;
