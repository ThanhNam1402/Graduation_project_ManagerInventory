import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import { NavLink } from "react-router-dom";

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
              sx={{ width: "100%", p: 0, color: "primary.contrastText" }}
            >
              <NavLink to={item.link}>
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
