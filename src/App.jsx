import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./auth/Login";
import MainRouters from "./routers/MainRouters";
import { path } from "./utils/constain";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import useRoleCheck from "./auth/checkRole";
import { useAppContext } from "./context/AppContent";
import Home from "./pages/home";

import { Flip } from "react-toastify";

function App() {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const appContext = useAppContext();

  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // useRoleCheck();

  // useEffect(() => {
  // const storedUser = localStorage.getItem("user");
  // setIsAuthenticated(!!storedUser);
  //
  // if (!storedUser && location.pathname !== path.LOGIN) {
  //   navigate(path.LOGIN);
  // } else {
  //   appContext.setUserInfo(JSON.parse(storedUser));
  // }
  // }, [navigate, location.pathname]);

  return (
    <>
      <Routes>
        <Route index element={<Home />} />

        <Route path={path.REGISTER} element={<Login />} />
        <Route path={path.LOGIN} element={<Login />} />

        <Route path={path.SYSTEM + "/*"} element={<MainRouters />} />
      </Routes>
      <ToastContainer
        autoClose={1200}
        position="top-right"
        transition={Flip}
        hideProgressBar={true}
      />
    </>
  );
}

export default App;
