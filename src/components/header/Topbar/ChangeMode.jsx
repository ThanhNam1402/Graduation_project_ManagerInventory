import React from "react";
import { Button, IconButton } from "@mui/material";
import { useColorScheme } from "@mui/material/styles";

import { LightMode, DarkMode } from "@mui/icons-material";

function ChangeMode(props) {
  const { mode, setMode } = useColorScheme();

  return (
    <IconButton
      onClick={() => {
        setMode(mode === "light" ? "dark" : "light");
      }}
    >
      {mode === "light" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
}

export default ChangeMode;
