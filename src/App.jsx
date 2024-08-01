import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./auth/Login";
import MainRouters from "./routers/MainRouters";
import { path } from "./utils/constain";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get local storage
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path={path.LOGIN} element={<Login />} />
        {/* {isAuthenticated && ( */}
        <Route path={path.SYSTEM + "/*"} element={<MainRouters />} />
        {/* )} */}
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
