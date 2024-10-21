import {
  Box,
  Button,
} from "@mui/material";

import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import RecyclingOutlinedIcon from "@mui/icons-material/RecyclingOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

function Operation({handleOpenDialog}) {
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
          color="success"
          sx={{ mt: 2, mr: 2 }}
          startIcon={<CheckCircleOutlineOutlinedIcon />}
        >
          Kết thúc
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mr: 2 }}
          startIcon={<SaveOutlinedIcon />}
        >
          Lưu
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 2, mr: 2 }}
          startIcon={<RecyclingOutlinedIcon />}
          onClick={() => handleOpenDialog()}
        >
          Xử lý đơn hàng
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            mr: 2,
            backgroundColor: "gray",
          }}
          startIcon={<LocalPrintshopOutlinedIcon />}
        >
          In
        </Button>

        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            mr: 2,
            backgroundColor: "gray",
          }}
          startIcon={<FileDownloadOutlinedIcon />}
        >
          Xuất file
        </Button>

        <Button
          variant="contained"
          color="success"
          sx={{ mt: 2, mr: 2 }}
          startIcon={<ContentCopyOutlinedIcon />}
        >
          Sao chép
        </Button>

        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2, mr: 2 }}
          startIcon={<DeleteForeverOutlinedIcon />}
        >
          Hủy bỏ
        </Button>
      </Box>
    </>
  );
}

export default Operation;
