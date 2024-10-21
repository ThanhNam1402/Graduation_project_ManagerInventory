import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  LinearProgress,
  InputAdornment,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const salaryTypes = [
  { title: "--- Chọn loại lương ---", value: "", placeholder: "" }, // Placeholder mặc định
  { title: "Theo ca làm việc", value: "2", placeholder: "/ca" },
  { title: "Theo giờ làm việc", value: "1", placeholder: "/giờ" },
  { title: "Theo ngày công chuẩn", value: "3", placeholder: "/ngày" },
  { title: "Cố định", value: "4", placeholder: "/kỳ lương" },
];

function Dialog_Add_Paysheet({ open, handleClose }) {
  const [selectedSalaryType, setSelectedSalaryType] = useState(salaryTypes[0]); // Loại lương đã chọn
  const [salaryInput, setSalaryInput] = useState(""); // Giá trị lương nhập

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Thiết lập lương nhân viên</DialogTitle>
      <DialogContent>
        <Box display="flex" justifyContent="space-between">
          {/* Bảng lương */}
          <Box flex={4}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nhân viên</TableCell>
                    <TableCell>Loại lương</TableCell>
                    <TableCell>Mức lương</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>a</TableCell>
                    <TableCell>
                      <Autocomplete
                        options={salaryTypes}
                        getOptionLabel={(option) => option.title}
                        value={selectedSalaryType}
                        onChange={(event, newValue) => {
                          setSelectedSalaryType(newValue); // Cập nhật loại lương đã chọn
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.value === value.value
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Loại lương"
                            variant="outlined"
                            size="small"
                            fullWidth
                          />
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      {selectedSalaryType.value !== "" && (
                        <TextField
                          variant="standard"
                          placeholder="0" // Hiển thị placeholder dựa trên loại lương đã chọn
                          value={salaryInput}
                          onChange={(e) => setSalaryInput(e.target.value)} // Cập nhật giá trị lương nhập
                          size="small"
                          InputProps={{
                            sx: {
                              "& .MuiInput-underline:before": {
                                borderBottom: "1px solid #ccc",
                              },
                            },
                            endAdornment: (
                              <InputAdornment position="end">
                                {selectedSalaryType.placeholder}
                              </InputAdornment>
                            ),
                          }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        {/* Progress bar */}
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          mt={2}
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            p: 3
          }}
        >
          <LinearProgress
            variant="determinate"
            value={100}
            sx={{ width: "200px" }}
          />
          <Typography
            variant="body2"
            align="center"
            sx={{ marginTop: 1, width: "200px" }}
          >
            2/2
          </Typography>
        </Box>
        <Button onClick={handleClose} variant="contained" color="success">
          Áp dụng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Dialog_Add_Paysheet;
