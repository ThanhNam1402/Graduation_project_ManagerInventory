import { Dialog, DialogContent, IconButton } from "@mui/material";
import { CsDialogTitle } from "../CustomMui/Dialog";

import ClearIcon from "@mui/icons-material/Clear";

import "./modalContent.scss";

function ModalCmp(props) {
  let { children, isOpen, handleCloseModal, title } = props;

  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={isOpen}
      PaperProps={{
        sx: {
          borderRadius: "16px",
          overflow: "hidden",
          width: "500px",
        },
      }}
    >
      <CsDialogTitle className="modal_title">
        {title}
        <IconButton onClick={handleCloseModal} className="del_icon">
          <ClearIcon
            sx={{
              color: "primary.light",
            }}
          />
        </IconButton>
      </CsDialogTitle>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default ModalCmp;
