import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  TextField,
  IconButton,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Dialog_Add_Paysheet from "./dialog_Add_Paysheet";

function AddEmployeeDialog({ open, handleClose, handleSave }) {
  const [employees, setEmployees] = useState([{ id: 1, name: "", phone: "" }]);
  const [loading, setLoading] = useState(false); // State cho loading
  const [confirmationOpen, setConfirmationOpen] = useState(false); // State cho dialog xác nhận

  const handleAddEmployee = () => {
    setEmployees([...employees, { id: employees.length + 1, name: "", phone: "" }]);
  };

  const handleRemoveEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const handleInputChange = (id, field, value) => {
    setEmployees(
      employees.map((employee) =>
        employee.id === id ? { ...employee, [field]: value } : employee
      )
    );
  };

  const handleContinue = () => {
    setLoading(true); // Bắt đầu loading
    setTimeout(() => {
      setLoading(false); // Kết thúc loading
      handleClose(); // Đóng dialog chính trước khi mở dialog xác nhận
      setConfirmationOpen(true); // Mở dialog xác nhận
      console.log(employees); // Log data của tất cả nhân viên
    }, 2000); // Thời gian loading là 2 giây
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Thêm mới nhân viên</DialogTitle>
        <DialogContent>
          <Box>
            {employees.map((employee, index) => (
              <Grid
                container
                spacing={2}
                key={employee.id}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Grid item xs={6}>
                  <Typography variant="h6">Nhân viên {index + 1}</Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <IconButton
                    onClick={() => handleRemoveEmployee(employee.id)}
                    color="inherit"
                    disabled={employees.length === 1}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Grid>

                <Grid
                  xs={12}
                  sx={{
                    border: "1px solid #ccc",
                    padding: 2,
                    borderRadius: 2,
                    marginBottom: 2,
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={3}>
                          <Typography variant="p" gutterBottom>
                            Tên nhân viên
                          </Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            fullWidth
                            size="small"
                            value={employee.name}
                            onChange={(e) =>
                              handleInputChange(
                                employee.id,
                                "name",
                                e.target.value
                              )
                            }
                            variant="standard"
                            InputProps={{
                              sx: {
                                "& .MuiInput-underline:before": {
                                  borderBottom: "1px solid #ccc",
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={6}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={3}>
                          <Typography variant="p" gutterBottom>
                            Số điện thoại
                          </Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <TextField
                            fullWidth
                            size="small"
                            value={employee.phone}
                            onChange={(e) =>
                              handleInputChange(
                                employee.id,
                                "phone",
                                e.target.value
                              )
                            }
                            variant="standard"
                            InputProps={{
                              sx: {
                                "& .MuiInput-underline:before": {
                                  borderBottom: "1px solid #ccc",
                                },
                              },
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}

            <Button
              startIcon={<AddOutlinedIcon />}
              variant="outlined"
              onClick={handleAddEmployee}
              sx={{ mb: 2 }}
            >
              Thêm nhân viên
            </Button>
          </Box>
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
              p: 3,
            }}
          >
            <LinearProgress variant="determinate" value={50} sx={{ width: "200px" }} />
            <Typography
              variant="body2"
              align="center"
              sx={{ marginTop: 1, width: "200px" }}
            >
              1/2
            </Typography>
          </Box>
          <Button onClick={handleClose} variant="contained" color="inherit">
            Bỏ qua
          </Button>
          <Button onClick={handleContinue} variant="contained" color="success">
            Tiếp tục
          </Button>
        </DialogActions>
      </Dialog>

      {loading && (
        <Dialog open={loading} onClose={() => {}} maxWidth="xs">
          <DialogContent style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
            <CircularProgress />
          </DialogContent>
        </Dialog>
      )}

      <Dialog_Add_Paysheet
        open={confirmationOpen}
        handleClose={() => {
          setConfirmationOpen(false);
          handleClose(); // Đóng dialog chính khi xác nhận
        }}
      />
    </>
  );
}

export default AddEmployeeDialog;