import React from "react";

import ChangeMode from "./ChangeMode";
import ChangeLanguage from "./ChangeLanguage";
import Profile from "./Profile";
import HelpUser from "./HelpUser";

import { Box, Stack, Container } from "@mui/material";

function TopBar(props) {
  return (
    <Box>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box>Logo</Box>
          <Stack direction="row" alignItems="center" spacing={1}>
            <ChangeLanguage />
            <ChangeMode />

            <HelpUser />

            <Profile />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

export default TopBar;
