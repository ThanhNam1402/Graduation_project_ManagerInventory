import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App.jsx";
import "./i18n";
import theme from "./theme";
import AppProvider from "./context/AppContent";

import "./style.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <AppProvider>
      <GoogleOAuthProvider clientId="1049094468272-ti8fua7qe65e0sauu3t3nas96n9s7tqu.apps.googleusercontent.com">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </AppProvider>
  </CssVarsProvider>
);
