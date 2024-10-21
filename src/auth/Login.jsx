import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  AccountCircle,
  Visibility,
  VisibilityOff,
  Lock,
} from "@mui/icons-material";

import { useForm } from "react-hook-form";
import "./login.scss";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/system");
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background: "linear-gradient(to bottom, #ebfaf7 0%, #ffd1ff 100%)",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            background:
              "linear-gradient(to bottom right, #cffffa 50%, #faebf1 50%)",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
            Log In
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            login here using your username and password
          </Typography>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            placeholder="@UserName"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            {...register("email", {
              required: "Email không được để trống!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Địa chỉ email không hợp lệ!",
              },
            })}
            error={!!errors.email}
            helperText={errors.email && errors.email.message}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            fullWidth
            variant="outlined"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...register("password", {
              required: "Password không được để trống!",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự!",
              },
            })}
            error={!!errors.password}
            helperText={errors.password && errors.password.message}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="outlined" color="primary" fullWidth>
            Log In
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Login;
