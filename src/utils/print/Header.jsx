import { Box, Typography } from "@mui/material";

function Print_Header() {
  return (
    <>
      <Box sx={{ mb: 3 }} className="print-text">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#2196f3",
              padding: "8px 16px",
              color: "#fff",
              fontWeight: "bold",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                right: "-16px",
                top: "0",
                borderLeft: "16px solid #2196f3",
                borderTop: "25px solid transparent",
                borderBottom: "25px solid transparent",
              },
            }}
          >
            <Typography variant="h6" component="div" sx={{ mx: 3 }}>
              TÊN CÔNG TY
            </Typography>
          </Box>
          <Typography
            sx={{
              backgroundColor: "#f15a29",
              padding: "8px 16px",
              color: "#fff",
              fontWeight: "bold",
              position: "relative",
              marginLeft: "15px",
              "&::before": {
                content: '""',
                position: "absolute",
                left: "-16px",
                top: "50%",
                transform: "translateY(-50%) rotate(180deg) translateX(-15px)",
                width: "0",
                height: "0",
                borderTop: "25px solid transparent",
                borderBottom: "25px solid transparent",
                borderRight: "16px solid ",
              },
            }}
          >
            <Typography variant="h6" component="div">
              GÌ ĐÓ Ở ĐÂY
            </Typography>
          </Typography>
        </Box>

        <Typography variant="body1">
          Địa chỉ: Đường Lê Bình, Phường Hưng Lợi, Quận Ninh Kiều, TP Cần Thơ
        </Typography>
        <Typography variant="body1">Số điện thoại: 0365850920</Typography>
      </Box>
      
    </>
  );
}

export default Print_Header;