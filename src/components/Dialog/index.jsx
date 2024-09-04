import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";


const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  color: theme.palette.common.white,
  textAlign: "center",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  fontSize: 25
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  textAlign: "center",
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
  justifyContent: "center",
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
}));

const CustomButton = styled(Button)(({ theme }) => ({
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
      color: 'black'
    },
  },
  "&:last-of-type": {
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
      transform: "scale(1.07)",
      color: 'black'
    },
  },
}));

const CustomDialog = ({
  open,
  onClose,
  title,
  content,
  onConfirm,
  onCancel,
  confirmText = "Có",
  cancelText = "Hủy",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
          width: "500px",
        },
      }}
    >
      <StyledDialogTitle>{title}</StyledDialogTitle>
      <StyledDialogContent>
        <Typography variant="body1" sx={{mt: 5}}>{content}</Typography>
      </StyledDialogContent>
      <StyledDialogActions>
        <CustomButton onClick={onConfirm} variant="contained" color="primary">
          {confirmText}
        </CustomButton>
        <CustomButton onClick={onCancel} variant="contained" color="secondary">
          {cancelText}
        </CustomButton>
      </StyledDialogActions>
    </Dialog>
  );
};

export default CustomDialog;