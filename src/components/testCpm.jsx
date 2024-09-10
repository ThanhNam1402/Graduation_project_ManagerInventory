import React from "react";

import { Button, Stack, Paper } from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

function TestCpm() {
  return (
    <div>
      <Paper>
        <Stack
          spacing={2}
          direction={"row"}
          sx={{ width: "100%", mb: 2, p: 2 }}
        >
          {/* BUTTON SAVE 
        |
        |
        */}

          <Button variant="contained" startIcon={<CheckIcon />} color="success">
            Lưu
          </Button>

          {/* BUTTON CANCEL 
        |
        |
        */}

          <Button variant="outlined" startIcon={<CloseIcon />} color="success">
            Hủy
          </Button>

          {/* BUTTON DELETE
        |
        |
        */}

          <Button
            variant="contained"
            startIcon={<DeleteOutlineIcon />}
            color="error"
            sx={{ boxShadow: 0 }}
          >
            Xóa
          </Button>

          {/* BUTTON COPPY
        |
        |
        */}

          <Button
            variant="contained"
            startIcon={<ContentCopyIcon />}
            color="primary"
            sx={{ boxShadow: 0 }}
          >
            Sao Chép
          </Button>

          {/* BUTTON UPDATE
        |
        |
        */}

          <Button
            variant="contained"
            startIcon={<ChangeCircleIcon />}
            color="primary"
            sx={{ boxShadow: 0 }}
          >
            Cập nhật
          </Button>

          {/* BUTTON ADD NEW
        |
        |
        */}

          <Button
            variant="contained"
            color="success"
            startIcon={<AddRoundedIcon />}
          >
            new
          </Button>

          {/* BUTTON ACTION 
        |
        |
        */}

          <Button
            color="success"
            variant="contained"
            startIcon={<MoreVertIcon />}
          >
            action
          </Button>

          {/* BUTTON PRINT 
        |
        |
        */}

          <Button
            color="warning"
            variant="contained"
            startIcon={<PrintIcon />}
            sx={{
              boxShadow: 0,
            }}
          >
            Print
          </Button>
        </Stack>
      </Paper>
    </div>
  );
}

export default TestCpm;
