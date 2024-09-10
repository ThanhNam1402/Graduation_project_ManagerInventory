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

import AddPurChaseOrder from "../pages/purchaseOrder/AddPurchaseOrder";
import PurchaseOrder from "../pages/purchaseOrder";

import Customers from "../pages/customers";
import Suppliers from "../pages/suppliers";
import Invoices from "../pages/invoices";

import TestCpm from "../components/testCpm";

function MainRouters(props) {
  return (
    <div>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: "primary.light",
          minHeight: "89vh",
          padding: 3,
        }}
      >
        <Routes>
          <Route index element={<DashBoard />} />

          <Route path="products" element={<Product />} />
          <Route path="products/:id" element={<AddProduct />} />

          <Route path="pricebook" element={<PriceBook />} />

          <Route path="inventorycount" element={<InventoryCount />} />
          <Route path="/inventorycount/add" element={<AddInventoryCount />} />

          <Route path="/orders" element={<Transaction />} />
          <Route path="/orders/add" element={<AddTransaction />} />

          <Route path="customers" element={<Customers />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="purchaseOrder" element={<PurchaseOrder />} />
          <Route path="purchaseOrder/new" element={<AddPurChaseOrder />} />
          <Route path="purchaseOrder/:id" element={<AddPurChaseOrder />} />
          <Route path="testcmp" element={<TestCpm />} />
        </Routes>
      </Container>
    </div>
  );
}

export default MainRouters;
