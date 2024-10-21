import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import { path } from "./utils/constain";
import "react-toastify/dist/ReactToastify.css";
import MainRouters from "./routers/MainRouters";

import { ToastContainer } from "react-toastify";
import ClientRouter from "./routers/ClientRouter";

import { Flip } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route index path={path.CLIENT + "*"} element={<ClientRouter />} />
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
