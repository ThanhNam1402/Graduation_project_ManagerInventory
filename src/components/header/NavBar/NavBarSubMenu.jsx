import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";

import { NavLink } from "react-router-dom";
import "./NavBar.scss";

import { useTranslation } from "react-i18next";

function NavbarSubMenu(props) {
  const { t } = useTranslation("navbar");

  const { item } = props;
  return (
    <Paper sx={{ width: 220 }} className="sub_menu">
      <MenuList>
        {item.map((item, index) => {
          return (
            <MenuItem
              key={index}
              sx={{ width: "100%", p: 0, color: "primary.dark" }}
            >
              <NavLink className="menu_link" to={item.link}>
                {t(item.title)}
              </NavLink>
            </MenuItem>
          );
        })}
      </MenuList>
    </Paper>
  );
}

export default NavbarSubMenu;
