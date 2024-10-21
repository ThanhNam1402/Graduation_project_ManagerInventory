import { useState } from "react";
import { Stack, Button } from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CsSearch from "@/components/admin/filters/SearchProduct";
import { useTranslation } from "react-i18next";
import AddEmployeeDialog from "./Add/dialog_Add";

function ActionTransaction() {
  const { t } = useTranslation("order");

  // State to handle dialog open/close
  const [open, setOpen] = useState(false);

  const handleButtonClick = () => {
    setOpen(true); // Open the modal when button is clicked
  };

  const handleClose = () => {
    setOpen(false); // Close the modal
  };

  const handleSave = () => {
    // Logic to save employee data
    setOpen(false);
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{ mb: 2 }}
      >
        <CsSearch />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={1}
        >
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            color="success"
            startIcon={<AddOutlinedIcon />}
            onClick={handleButtonClick}
          >
            Thêm nhân viên
          </Button>

          <div>
            <Button
              variant="contained"
              color="success"
              startIcon={<FileDownloadOutlinedIcon />}
            >
              {t("orders.action.export")}
            </Button>
          </div>
        </Stack>
      </Stack>

      {/* Import Dialog component */}
      <AddEmployeeDialog
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
      />
    </>
  );
}

export default ActionTransaction;
