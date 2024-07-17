import React from "react";

import { Button } from "@mui/material";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";

function ImportFile(props) {
  return (
    <div>
      <Button variant="outlined" startIcon={<FileUploadRoundedIcon />}>
        Import
      </Button>
    </div>
  );
}

export default ImportFile;
