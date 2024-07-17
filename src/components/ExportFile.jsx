import React from "react";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";

import { Button } from "@mui/material";

function ExportFile(props) {
  return (
    <div>
      <Button variant="outlined" startIcon={<FileDownloadRoundedIcon />}>
        Xuất File
      </Button>
    </div>
  );
}

export default ExportFile;
