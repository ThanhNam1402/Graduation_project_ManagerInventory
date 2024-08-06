import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./auth/Login";
import MainRouters from "./routers/MainRouters";
import { path } from "./utils/constain";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setIsAuthenticated(!!storedUser);

    if (!storedUser && location.pathname !== path.LOGIN) {
      navigate(path.LOGIN);
    }
  }, [navigate, location.pathname]);

  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path={path.LOGIN} element={<Login />} />
        {isAuthenticated && (
          <Route path={path.SYSTEM + "/*"} element={<MainRouters />} />
        )}
        {!isAuthenticated && <Route path="*" element={<Login />} />}
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
