import { Box, Button } from "@mui/material";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";


function Operation_completed() {
  return (
    <>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 1 }}
          startIcon={<SaveOutlinedIcon />}
        >
          Lưu
        </Button>
        <Button
          variant="contained"
          sx={{
            mr: 1,
            backgroundColor: "gray",
          }}
          startIcon={<LocalPrintshopOutlinedIcon />}
        >
          In
        </Button>
        <Button
          variant="contained"
          color="warning"
          sx={{
            mr: 1,
            backgroundColor: "gray",
          }}
          startIcon={<FileDownloadOutlinedIcon />}
        >
          Xuất file
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ mr: 1 }}
          startIcon={<ContentCopyOutlinedIcon />}
        >
          Sao chép
        </Button>
        <Button
          variant="contained"
          color="error"
          sx={{ mr: 1 }}
          startIcon={<DeleteForeverOutlinedIcon />}
        >
          Hủy bỏ
        </Button>
      </Box>
    </>
  );
}

export default Operation_completed;
