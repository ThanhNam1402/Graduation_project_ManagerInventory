import { styled } from "@mui/material/styles";
import { Box, Button } from "@mui/material";

const CsDialogTitle = styled(Box)(({ theme }) => ({
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  fontSize: 18,
  fontWeight: "bold",
  textAlign: "center",
  borderBottom: "1px solid",
  padding: theme.spacing(2),
}));

const CsButtonDialog = styled(Button)(({ theme }) => ({
  minWidth: 100,
  margin: theme.spacing(0, 2),
  padding: theme.spacing(1, 3),
  fontSize: "1rem",
  transition: "all 0.3s ease",
  "&:first-of-type": {
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.white,
      transform: "scale(1.07)",
      color: "black",
    },
  },
  "&:last-of-type": {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
      transform: "scale(1.07)",
    },
  },
}));

export { CsDialogTitle, CsButtonDialog };
