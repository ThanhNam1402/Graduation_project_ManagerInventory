import { IconButton, Badge } from "@mui/material";
import { Mail } from "@mui/icons-material";

function HelpUser() {
  return (
    <div>
      <IconButton>
        <Badge color="success" variant="dot">
          <Mail color="action" />
        </Badge>
      </IconButton>
    </div>
  );
}

export default HelpUser;
