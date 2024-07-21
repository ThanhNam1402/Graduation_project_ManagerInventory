import { useForm } from "react-hook-form";
import { TextField, Button, Grid, Box, Typography, Alert } from "@mui/material";
import { useState, useEffect } from "react";
import {
  IconButton,
  InputAdornment,
  Snackbar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import "./login.css";

function Register() {
  const [user, setUser] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const password = watch("password", "");

  const onSubmit = (data) => {
    setUser(data);
    setBackdropOpen(true);
    setTimeout(() => {
      setBackdropOpen(false);
      setSnackbarOpen(true);
    }, 1000);
    reset();
  };

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  return (
    <>
      <Box
        className="card shadow-lg gradient-background"
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            mt: 4,
            p: 4,
            textAlign: "center",
            borderRadius: "15px",
            boxShadow: "0px 3px 10px rgba(0, 0, 0, 10)",
            maxWidth: 950
          }}
          component={"form"}
          className="box-form"
        >
          <Grid container spacing={3}>
            <Grid item xs={4} md={3} sx={{ textAlign: "center" }}>
              <img
                src="https://i.pinimg.com/564x/44/6d/93/446d93702f14f2c09549fdce5500b8ec.jpg"
                alt="login"
                className="img-fluid"
                style={{ width: 350, height: "auto" }}
              />
            </Grid>
            {/* -------------------------------- */}
            <Grid item xs={12} md={9} sx={{ maxWidth: 600 }}>
              <Typography
                variant="h3"
                component="h3"
                className="mint"
                sx={{
                  fontSize: "3rem",
                  fontWeight: "bold",
                  letterSpacing: "1px",
                  color: "transparent",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  backgroundImage:
                    "linear-gradient(to right,  #00a2ff , #730ffe ,#0fbafe, #0f7ffe, #09f1b8   )",
                  WebkitTextStrokeWidth: "1px",
                  WebkitTextStrokeColor: "transparent",
                  WebkitTextFillColor: "transparent",
                  WebkitTextStroke: "1px transparent",
                  marginBottom: "15px",
                }}
              >
                Register Form
              </Typography>

              <Grid container spacing={0}>
                <TextField
                  sx={{ mb: 3 }}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email không được để trống",
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Email không đúng định dạng",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email && errors.email.message}
                />

                <TextField
                  sx={{ mb: 3 }}
                  label="Name"
                  variant="outlined"
                  fullWidth
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Tên không được để trống",
                    },
                    pattern: {
                      value: /^[A-Za-z]/,
                      message: "Tên không đúng định dạng!",
                    },
                  })}
                  error={!!errors.name}
                  helperText={errors.name && errors.name.message}
                />

                <TextField
                  sx={{ mb: 3 }}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password không được để trống",
                    },
                    minLength: {
                      value: 8,
                      message: "Password không được nhỏ hơn 8 ký tự",
                    },
                  })}
                  error={!!errors.password}
                  helperText={errors.password && errors.password.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  sx={{ mb: 3 }}
                  label="Password Confirm"
                  variant="outlined"
                  fullWidth
                  type={showPasswordConfirm ? "text" : "password"}
                  {...register("passwordConfirm", {
                    required: {
                      value: true,
                      message: "Password không được để trống",
                    },
                    minLength: {
                      value: 8,
                      message: "Password không được nhỏ hơn 8 ký tự",
                    },
                      validate: (value) =>
                        value === password || "Password không khớp",
                  })}
                  error={!!errors.passwordConfirm}
                  helperText={
                    errors.passwordConfirm && errors.passwordConfirm.message
                  }
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPasswordConfirm(!showPasswordConfirm)
                          }
                          edge="end"
                        >
                          {showPasswordConfirm ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Đăng ký
                </Button>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: "100%",
                }}
              >
                <Typography
                  variant="p"
                  component="h3"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    component="a"
                    variant="a"
                    sx={{ mt: 2 }}
                    style={{
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => navigate("/login")}
                  >
                    Đăng nhập
                  </Typography>
                  <Box
                    sx={{
                      mt: 2,
                    }}
                  >
                    <Backdrop
                      sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                      }}
                      open={backdropOpen}
                    >
                      <CircularProgress color="inherit" />
                    </Backdrop>

                    <Snackbar
                      open={snackbarOpen}
                      autoHideDuration={3000}
                      onClose={() => setSnackbarOpen(false)}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                      <Alert
                        onClose={() => setSnackbarOpen(false)}
                        severity="success"
                        sx={{ width: 400, fontSize: 16 }}
                      >
                        Đăng ký thành công
                      </Alert>
                    </Snackbar>
                  </Box>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Register;
