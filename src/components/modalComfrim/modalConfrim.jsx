import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { CsDialogTitle } from "../CustomMui/Dialog";
import { CsButtonDialog } from "../CustomMui/Dialog";

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  textAlign: "center",
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(1),
  justifyContent: "center",
  borderBottomLeftRadius: "8px",
  borderBottomRightRadius: "8px",
}));

const ModalComfirm = ({
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
      <CsDialogTitle>{title}</CsDialogTitle>
      <StyledDialogContent>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {content}
        </Typography>
      </StyledDialogContent>
      <StyledDialogActions>
        <CsButtonDialog onClick={onConfirm} variant="contained" color="primary">
          {confirmText}
        </CsButtonDialog>
        <CsButtonDialog onClick={onCancel} variant="contained" color="success">
          {cancelText}
        </CsButtonDialog>
      </StyledDialogActions>
    </Dialog>
  );
};

export default ModalComfirm;
