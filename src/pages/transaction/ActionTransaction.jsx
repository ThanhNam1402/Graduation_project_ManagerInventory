import { Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

import CsSearch from "../../components/filters/SearchProduct";
import { useTranslation } from "react-i18next";


function ActionTransaction({ selectedCount }) {
  const { t } = useTranslation("order");

  const handleSearch = (query) => {
    console.log("Tìm kiếm:", query);
    // Nghiệp vụ Search ở đây!
  };

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/system/orders/add');
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }} component={Paper}>
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}
        >
          <CsSearch />
          {selectedCount > 0 && (
            <Typography component="p" variant="p">
              Số sản phẩm đã chọn: {selectedCount}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            color="success"
            startIcon={<AddOutlinedIcon />}
            onClick={()=> handleButtonClick()}
          >
                          {t("orders.action.order")}

          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<FileDownloadOutlinedIcon />}
          >
             {t("orders.action.export")}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ActionTransaction;
