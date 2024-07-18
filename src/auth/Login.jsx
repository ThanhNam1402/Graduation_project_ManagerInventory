import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import "./login.css";

function Login() {
  const [users, SetUsers] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      SetUsers(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    console.log(decoded);
    SetUsers(decoded);
    localStorage.setItem("user", JSON.stringify(decoded));
  };

  const handleLoginError = () => {
    console.log("Login Failed");
  };

  // const handleLogout = () => {
  //   googleLogout();
  //   SetUsers(null);
  //   localStorage.removeItem("user");
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      SetUsers(data);
    } catch (error) {
      console.log(error);
    }
  };
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
          sx={{ mt: 4, p: 4, textAlign: "center" }}
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
                Login Form
              </Typography>

              <Grid container spacing={0}>
                <TextField
                  sx={{ mb: 3 }}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  {...register("email", {
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  error={!!errors.email}
                  helperText={errors.email && "Email không được để trống!"}
                />

                <TextField
                  sx={{ mb: 3 }}
                  label="Password"
                  variant="outlined"
                  fullWidth
                  {...register("password", {
                    required: true,
                    pattern: /^(?=.*[A-Za-z\d])[A-Za-z\d]{6,}$/,
                  })}
                  error={!!errors.password}
                  helperText={
                    errors.password && "Password không được để trống!"
                  }
                />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                >
                  Đăng nhập
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
                  <Box component="div" sx={{ mt: 2 }}>
                    Hoặc
                  </Box>
                  <Box
                    sx={{
                      mt: 2,
                    }}
                  >
                    <GoogleLogin
                      onSuccess={handleLoginSuccess}
                      onError={handleLoginError}
                      className="Login row"
                    />
                  </Box>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* <div className="container">
          {users && (
            <div>
              <h3>
                Welcome, {users.name} && {users.email}
              </h3>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div> */}
      </Box>
    </>
  );
}

export default Login;
