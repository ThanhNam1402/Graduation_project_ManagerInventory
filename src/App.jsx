import { useState, useEffect } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import { CustomScroll } from "react-custom-scroll";
import Login from "./auth/Login";
import MainRouters from "./routers/MainRouters";
import { path } from "./utils/constain";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    // Get locostore
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    }
  }, []);


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
