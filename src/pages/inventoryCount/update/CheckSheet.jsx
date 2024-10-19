import { Box, Typography, Button } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import CheckIcon from "@mui/icons-material/Check";

function Check_sheet({ totalActualQuantity, UpdateInventory, setStatus }) {
  return (
    <Box
      sx={{
        p: 3,
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        backgroundColor: "#fafafa",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Người tạo: ThanhNam
      </Typography>
      <Typography sx={{ mb: 1 }}>Mã kiểm kho: Mã phiếu tự động</Typography>
      <Typography sx={{ mb: 1 }}>
        Tổng số lượng thực tế:{" "}
        <span style={{ fontWeight: "bold", color: "#3f51b5" }}>
          {totalActualQuantity}
        </span>
      </Typography>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<PrintIcon />}
          onClick={() => {
            setStatus(1);
            UpdateInventory(1);
          }}
          sx={{ fontSize: "0.9rem", fontWeight: "bold", py: 1.5, px: 3 }}
        >
          Lưu tạm (Chưa cân bằng)
        </Button>
        <Button
          variant="contained"
          color="success"
          startIcon={<CheckIcon />}
          onClick={() => {
            setStatus(2);
            UpdateInventory(2);
          }}
          sx={{ fontSize: "0.9rem", fontWeight: "bold", py: 1.5, px: 3 }}
        >
          Hoàn tất (Cân bằng kho)
        </Button>
      </Box>
    </Box>
  );
}

export default Check_sheet;
