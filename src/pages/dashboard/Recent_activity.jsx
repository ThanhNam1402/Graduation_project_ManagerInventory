import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Typography } from "@mui/material";

function Recent_activities() {
  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: "90%",
          bgcolor: "background.paper",
         overflowY : 'auto',
          maxHeight: 800,
          pt: 0
        }}
      >
        <ListSubheader component="div" id="nested-list-subheader">
          <Typography variant="h6" component={"h6"}>RECENT ACTIVITIES</Typography>

        </ListSubheader>
        <hr />
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <div>
            <ListItemText
              primary="Nguyễn Thị Thái Hòa"
              secondary="just purchase receipt with a total of 0"
            />
            <div href="#">9 ngày trước</div>
          </div>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <WorkIcon />
            </Avatar>
          </ListItemAvatar>
          <div>
            <ListItemText 
            primary="Nguyễn Trọng Phúc" 
            secondary="just created an invoice with a total of 32,504,600" />
            <div href="#">10 ngày trước</div>
          </div>
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <div>
            <ListItemText 
            primary="Nguyễn Trọng Phúc" 
            secondary="just created an invoice with a total of 32,504,600" />
            <div href="#">10 ngày trước</div>
          </div>
        </ListItem>

        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BeachAccessIcon />
            </Avatar>
          </ListItemAvatar>
          <div>
            <ListItemText 
            primary="Nguyễn Trọng Phúc" 
            secondary="just created an invoice with a total of 32,504,600" />
            <div href="#">10 ngày trước</div>
          </div>
        </ListItem>
      </List>
    </>
  );
}

export default Recent_activities;
