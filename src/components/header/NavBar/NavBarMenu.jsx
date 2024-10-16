import { Box, Container, MenuList, MenuItem, Button } from "@mui/material";

import { ListMenu } from "./NavbarItem";

import { NavLink } from "react-router-dom";
import NavbarSubMenu from "./NavBarSubMenu";
import { useTranslation } from "react-i18next";
import StorefrontIcon from "@mui/icons-material/Storefront";

function NavBarMenu() {
  const { t } = useTranslation("navbar");

  return (
    <>
      <Box sx={{ bgcolor: "primary.main" }}>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <MenuList className="menu" sx={{ p: 0 }}>
            {ListMenu.map((item, index) => {
              return (
                <MenuItem
                  key={index}
                  className="menu_item"
                  sx={{ color: "primary.contrastText", p: 0, m: 0 }}
                >
                  <NavLink className="menu_link" to={item.link}>
                    {item.icon}

                    {t(item?.title)}
                  </NavLink>

                  {item?.children ? <NavbarSubMenu item={item.children} /> : ""}
                </MenuItem>
              );
            })}
          </MenuList>
          <Button
            component={NavLink}
            to="Online"
            startIcon={<StorefrontIcon />}
            variant="contained"
            color="warning"
          >
            Bán online
          </Button>
        </Container>
      </Box>
    </>
  );
}

export default NavBarMenu;
