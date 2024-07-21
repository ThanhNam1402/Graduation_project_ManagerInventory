import { Box, Typography, Paper } from "@mui/material";
import Search from "./Search";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

function ActionTransaction({ selectedCount }) {
  const handleSearch = (query) => {
    console.log("Tìm kiếm:", query);
    // Nghiệp vụ Search ở đây!
  };

  return (
    <>
      <Box sx={{display: "flex", alignItems: "center"}} component={Paper} >
        <Box
          sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 1 }}
        >
          <Search onSearch={handleSearch} />
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
          >
            Kiểm kho
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<FileDownloadOutlinedIcon />}
          >
            Xuất file
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ActionTransaction;
