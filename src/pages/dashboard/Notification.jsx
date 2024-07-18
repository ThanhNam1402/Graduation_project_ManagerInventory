import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";

import Recent_activities from "./Recent_activity";

function Notification() {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: "90%", bgcolor: "background.paper", mt: 3 }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <h3>NOTIFICATION</h3>
          </ListSubheader>
        }
      >
        <hr />
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="There are 3unusual login activities to be reviewed." />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={!open} timeout="auto" unmountOnExit sx={{ overflowY : 'auto' , maxHeight: 150}}>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon></ListItemIcon>
              <div>
                <ListItemText primary="0786452425 logged in on Máy tính Windows at 15/07/2024 13:22" />
                <a href="#">Review</a>
              </div>
            </ListItemButton>
          </List>

          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon></ListItemIcon>
              <div>
                <ListItemText primary="0786452425 logged in on Máy tính Windows at 11/07/2024 07:41" />
                <a href="#">Review</a>
              </div>
            </ListItemButton>
          </List>

          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon></ListItemIcon>
              <div>
                <ListItemText primary="0786452425 logged in on Máy tính Windows at 11/07/2024 07:41" />
                <a href="#">Review</a>
              </div>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Recent_activities/>
    </>
  );
}

export default Notification;
