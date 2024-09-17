import {
  Dialog,
  DialogContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { CsDialogTitle } from "../CustomMui/Dialog";

import ClearIcon from "@mui/icons-material/Clear";

import "./modalContent.scss";

export default function ModalContent({
  children,
  isOpen,
  onCloseModal,
  title,
  size,
}) {
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
