import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { googleLogout } from "@react-oauth/google";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Grid, Typography, TextField } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import SaveIcon from "@mui/icons-material/Save";
import BlockIcon from "@mui/icons-material/Block";
import EditIcon from "@mui/icons-material/Edit";

export default function Profile() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const openMenu = Boolean(anchorEl);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // appContext.setUserInfo({});
    googleLogout();
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleEditPassword = () => {
    setIsEditing(true);
  };

  const handleCloseEditPassword = () => {
    setIsEditing(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const isSaveDisabled = !currentPassword || !newPassword || !confirmPassword;

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={openMenu ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openMenu ? "true" : undefined}
          >
            <Avatar sx={{ width: 28, height: 28 }} alt="User" src={""} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleDialogOpen}>
          <Avatar sx={{ width: 28, height: 28 }} alt="User" src={""} />
          {"user"}
        </MenuItem>

        <Divider />

        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Cài Đặt
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Đăng Xuất
        </MenuItem>
      </Menu>

      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Người dùng</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box mb={2}>
                <Typography variant="subtitle1">Tên người dùng</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={""}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1">Tên đăng nhập</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={""}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1">Vai trò</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={"user"}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1">Điện thoại</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={""}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1">Ngày sinh</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  type="date"
                  value={""}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1">Email</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={""}
                />
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box mb={2}>
                <Typography variant="subtitle1">Địa chỉ</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  value={""}
                />
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1">Khu vực</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Chọn Tỉnh/TP - Quận/Huyện"
                />
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1">Phường xã</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  placeholder="Chọn Phường/Xã"
                />
              </Box>
              <Box mb={2}>
                <Typography variant="subtitle1">Ghi chú</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  size="small"
                  multiline
                  rows={4}
                  value={""}
                />
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box
            p={2}
            border="1px dashed grey"
            borderRadius="8px"
            maxWidth="100%"
          >
            <Typography variant="subtitle1" mb={2}>
              Đăng nhập và bảo mật
            </Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box display="flex" alignItems="center">
                <LockIcon />
                <Box ml={1}>
                  <Typography variant="body1" fontWeight="bold">
                    Đổi mật khẩu
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Chỉnh sửa
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Bạn nên sử dụng mật khẩu mạnh mà mình chưa sử dụng ở đâu
                    khác
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                color="inherit"
                startIcon={<EditIcon />}
                onClick={handleEditPassword}
              >
                Đổi mật khẩu
              </Button>
            </Box>

            {isEditing && (
              <Box mt={2}>
                <TextField
                  label="Mật khẩu hiện tại"
                  type="password"
                  fullWidth
                  size="small"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Mật khẩu mới"
                  type="password"
                  fullWidth
                  size="small"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Xác nhận mật khẩu mới"
                  type="password"
                  fullWidth
                  size="small"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={handleCloseEditPassword}
                    startIcon={<BlockIcon />}
                    sx={{ mr: 2 }}
                  >
                    Đóng
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<SaveIcon />}
                    disabled={isSaveDisabled}
                  >
                    Lưu
                  </Button>
                </Box>
              </Box>
            )}
          </Box>

          {/* <Divider sx={{ my: 3 }} />

          <Box>
            <Typography variant="subtitle1">
              Các thiết bị đã đăng nhập
            </Typography>
            <Box mt={2}>
              <Typography variant="body2">
                Máy tính Windows -{" "}
                <span style={{ color: "red" }}>Chưa kiểm tra</span>
              </Typography>
              <Typography variant="body2">
                Chrome - Đang hoạt động - 04/09/2024 10:16
              </Typography>
            </Box>
          </Box> */}
        </DialogContent>

        <DialogActions>
          <Button variant="contained" color="success" startIcon={<SaveIcon />}>
            Lưu
          </Button>
          <Button onClick={handleDialogClose} variant="outlined">
            Bỏ qua
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
