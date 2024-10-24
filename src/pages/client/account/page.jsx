import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./page.scss";

const Account = () => {
  return (
    <div className="account-page">
      <div className="account-content">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Account;
