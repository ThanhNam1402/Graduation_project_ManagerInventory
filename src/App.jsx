import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./auth/Login";
import MainRouters from "./routers/MainRouters";
import { path } from "./utils/constain";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import useRoleCheck from "./auth/checkRole";
import { useAppContext } from "./context/AppContent";

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
      <Route path={path.SYSTEM + "/*"} element={<MainRouters />} />

        <Route index element={<Login />} />
        <Route path={path.LOGIN} element={<Login />} />
        {/* {isAuthenticated && (/ */}
        {/* )} */}
        {/* {!isAuthenticated && <Route path="*" element={<Login />} />} */}
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
