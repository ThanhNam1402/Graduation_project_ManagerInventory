import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./i18n";
import { store } from "./store.js";
import { Provider } from "react-redux";
import "remixicon/fonts/remixicon.css";
import "../src/styles/style.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
