import { Box, Button } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { Link } from "react-router-dom";

import PropTypes from "prop-types";

Action.propTypes = {
  handlePrint: PropTypes.func,
  handleDelInvertory: PropTypes.func,
  handleUpdateStatus: PropTypes.func,
  row: PropTypes.object,
};

function Action({ handlePrint, handleDelInvertory, handleUpdateStatus, row }) {
  return (
    <>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "flex-end",
        }}
        className="print-hidden"
      >
        {/* Hiển thị nút "Cập nhật trạng thái" nếu chưa cân bằng */}
        {row.status === 1 && (
          <Button
            component={Link}
            to={`/system/inventorycount/update/${row.id}`}
            variant="contained"
            color="primary"
            sx={{ mr: 1 }}
            onClick={() => handleUpdateStatus(row)}
          >
            Cập nhật
          </Button>
        )}
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
          sx={{ mr: 1, backgroundColor: "gray" }}
          startIcon={<LocalPrintshopOutlinedIcon />}
          onClick={handlePrint}
        >
          In
        </Button>
        <Button
          variant="contained"
          color="warning"
          sx={{ mr: 1, backgroundColor: "gray" }}
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
          onClick={() => handleDelInvertory(row.id)}
        >
          Hủy bỏ
        </Button>
      </Box>
    </>
  );
}

export default Action;
