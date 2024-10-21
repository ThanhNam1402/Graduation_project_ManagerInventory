import ChangeMode from "./ChangeMode";
import ChangeLanguage from "./ChangeLanguage";
import Profile from "./Profile";
import HelpUser from "./HelpUser";

import { Box, Stack, Container } from "@mui/material";

function TopBar() {
  return (
    <Box>
      <Container maxWidth="xl">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Box>
            <img
              width="30"
              src="https://i.pinimg.com/564x/9f/93/ae/9f93ae8f39417cd575e735bf5f1b1505.jpg"
              alt=""
            />
          </Box>
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
