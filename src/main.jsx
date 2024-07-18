import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style.scss";
import "./i18n";
import { BrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
// import { ThemeProvider } from "@mui/material/styles"
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";

import theme from "./theme";

import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById("root")).render(
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <GoogleOAuthProvider clientId="429771364082-47srcr2f8clu23acv6dol5ea3etivbpa.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
  </CssVarsProvider>
);
