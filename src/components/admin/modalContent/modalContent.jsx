import { Dialog, DialogContent, IconButton, Stack } from "@mui/material";
import PropTypes from "prop-types";
import ClearIcon from "@mui/icons-material/Clear";

import { CsDialogTitle } from "../CustomMui/Dialog";
import "./modalContent.scss";

ModalContent.propTypes = {
  children: PropTypes.element,
  isOpen: PropTypes.bool,
  onCloseModal: PropTypes.func,
  title: PropTypes.string,
  size: PropTypes.string,
};

function ModalContent({ children, isOpen, onCloseModal, title, size }) {
  return (
    <Dialog
      fullWidth
      maxWidth={size}
      open={isOpen}
      PaperProps={{
        sx: {
          borderRadius: "8px",
        },
      }}
    >
      <CsDialogTitle className="modal_title">
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          {title}
          <IconButton onClick={onCloseModal}>
            <ClearIcon
              sx={{
                color: "primary.light",
              }}
            />
          </IconButton>
        </Stack>
      </CsDialogTitle>

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}

export default ModalContent;
