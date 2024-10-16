import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import CsSearch from "../../components/filters/SearchProduct";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Stack } from "@mui/material";

function Action() {
  const { t } = useTranslation("inventorycount");
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/system/inventorycount/add");
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
            {t("inventorycount.action.check")}
          </Button>

          <div>
            <Button
              variant="contained"
              color="success"
              startIcon={<FileDownloadOutlinedIcon />}
            >
              {t("inventorycount.action.export")}
            </Button>
          </div>
        </Stack>
      </Stack>
    </>
  );
}

export default Action;
