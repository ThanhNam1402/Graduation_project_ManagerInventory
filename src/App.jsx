import { useState, useEffect } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import { CustomScroll } from "react-custom-scroll";
import Login from "./auth/Login";
import Register from "./auth/Register";
import MainRouters from "./routers/MainRouters";
import { path } from "./utils/constain";

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
      <CustomScroll heightRelativeToParent="100vh">
        <Routes>
          <Route path={path.LOGIN} Component={Login} />
          <Route path={path.REGISTER} Component={Register} />
          {isAuthenticated && (
            <Route path={path.SYSTEM + "/*"} element={<MainRouters />} />
          )}
        </Routes>
      </CustomScroll>
    </>
  );
}

export default App;
