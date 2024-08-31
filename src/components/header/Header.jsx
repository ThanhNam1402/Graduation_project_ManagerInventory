import React from "react";

import TopBar from "./Topbar";
import Navbar from "./NavBar";
import { Box } from "@mui/material";
function Header() {
  return (
    <Box>
      <TopBar />
      <Navbar />
    </Box>
  );
}

export default Header;
