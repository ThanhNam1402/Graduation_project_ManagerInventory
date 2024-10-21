import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";

import Header from "../components/admin/header/Header";
import DashBoard from "../pages/admin/dashboard/DashBoard";

import Products from "../pages/admin/products";
import AddProduct from "../pages/admin/products/AddProduct";

import PriceBook from "../pages/admin/priceBook";
import InventoryCount from "../pages/admin/inventoryCount";
import AddInventoryCount from "../pages/admin/inventoryCount/addinventoryCount";
import Update_InventoryCount from "../pages/admin/inventoryCount/update";
import Transaction from "../pages/admin/transaction";
import AddTransaction from "../pages/admin/transaction/AddTransaction";

import AddPurChaseOrder from "../pages/admin/purchaseOrder/AddPurchaseOrder";
import PurchaseOrder from "../pages/admin/purchaseOrder";

import Customers from "../pages/admin/customers";
import Suppliers from "../pages/admin/suppliers";
import Invoices from "../pages/admin/invoices";

import Employee from "../pages/admin/employee";
import Paysheet from "../pages/admin/paysheet";

import TestCpm from "../components/admin/testCpm";

import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import theme from "@/theme";

function MainRouters() {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <div>
        <Header />
        <Container
          maxWidth="xl"
          sx={{
            backgroundColor: "layout.main",
            minHeight: "89vh",
            padding: 3,
          }}
        >
          <Routes>
            <Route index element={<DashBoard />} />

            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<AddProduct />} />

            <Route path="pricebook" element={<PriceBook />} />

            <Route path="inventorycount" element={<InventoryCount />} />
            <Route path="/inventorycount/add" element={<AddInventoryCount />} />
            <Route
              path="/inventorycount/update/:id"
              element={<Update_InventoryCount />}
            />

            <Route path="/orders" element={<Transaction />} />
            <Route path="/orders/add" element={<AddTransaction />} />

            <Route path="customers" element={<Customers />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="purchaseOrder" element={<PurchaseOrder />} />
            <Route path="purchaseOrder/new" element={<AddPurChaseOrder />} />
            <Route
              path="purchaseOrder/update/:id"
              element={<AddPurChaseOrder />}
            />

            <Route path="employee" element={<Employee />} />
            <Route path="paysheet" element={<Paysheet />} />

            <Route path="testcmp" element={<TestCpm />} />
          </Routes>
        </Container>
      </div>
    </CssVarsProvider>
  );
}

export default MainRouters;
