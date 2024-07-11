import React from "react";

import {
  Box,
  Container,
  Link as LinkMui,
  MenuList,
  MenuItem,
  IconButton,
} from "@mui/material";

import { ListMenu } from "./NavbarItem";

import { NavLink } from "react-router-dom";
import NavbarSubMenu from "./NavBarSubMenu";
import { useTranslation } from "react-i18next";

function NavBarMenu(props) {
  const { t } = useTranslation("navbar");

  return (
    <>
      <Box sx={{ bgcolor: "primary.main" }}>
        <Container maxWidth="xl" sx={{ display: "flex" }}>
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
        </Container>
      </Box>
    </>
  );
}

export default NavBarMenu;
