import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { CustomScroll } from "react-custom-scroll";
import Login from "./auth/Login";
import MainRouters from "./routers/MainRouters";

import { path } from "./utils/constain";

function App() {
  return (
    <>
      <CustomScroll heightRelativeToParent="100vh">
        <Routes>
          <Route path={path.LOGIN} Component={Login} />
          <Route path={path.SYSTEM + "/*"} Component={MainRouters} />
        </Routes>
      </CustomScroll>
    </>
  );
}

export default App;
