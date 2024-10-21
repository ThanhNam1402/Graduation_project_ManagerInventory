import { Box, Typography, Paper, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import CsSearch from "@/components/admin/filters/SearchProduct";
import { useTranslation } from "react-i18next";

function ActionTransaction({ selectedCount }) {
  const { t } = useTranslation("order");

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/system/orders/add");
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
            onClick={() => handleButtonClick()}
          >
            {t("orders.action.order")}
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
    </>
  );
}

export default ActionTransaction;
