import { Box, CircularProgress } from "@mui/material";

function CsLoading() {
  return (
    <Box
      sx={{
        p: 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress size="30px" />
    </Box>
  );
}

export default CsLoading;
