import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { TextField, Button, Grid, Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import { GoogleLogin } from "@react-oauth/google";
import  { jwtDecode} from "jwt-decode";

import { userService } from "../services/user.service";

import "./login.scss";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [intervalId, setIntervalId] = useState(null);
  const navigate = useNavigate();

  const handleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const userEmail = decoded.email;
    const userName = decoded.name;
    setName(userName);
    setEmail(userEmail);
    
  
    try {
      const apiResponse = await userService.handleGetAll(userEmail, userName);
      console.log("API Response:", apiResponse);
  
      if (apiResponse.data) {
        const users = apiResponse.data;
        const currentUser = users.find((user) => user.email === userEmail);
  
        if (currentUser) {
          if (currentUser.role === 1) {
            localStorage.setItem(
              "user",
              JSON.stringify({
                email: userEmail,
                name: userName,
                role: currentUser.role,
                avatar: decoded.picture
              })
            );
  
            const id = setInterval(async () => {
              try {
                const response = await userService.handleGetAll(userEmail, userName);
                const updatedUser = response.data.find((user) => user.email === userEmail);
  
                if (updatedUser && updatedUser.role !== 1) {
                  localStorage.removeItem("user");
                  clearInterval(id);
                  navigate("/login");
                }
              } catch (error) {
                console.error("Error checking user role:", error);
                clearInterval(id);
                localStorage.removeItem("user");
                navigate("/login");
              }
            }, 5000); 
  
            setIntervalId(id);
            navigate("/system");
          } else {
            localStorage.removeItem("user");
            navigate("/login");
            console.log("Error: Insufficient permissions");
          }
        } else {
          localStorage.removeItem("user");
          navigate("/login");
          console.log("Error: User not found");
        }
      } else {
        console.log("Error: No data returned from API");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      localStorage.removeItem("user");
      navigate("/login");
    }
  };
  
  
  const handleLoginError = () => {
    console.log("Login Failed");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/system");
  };

  useEffect(() => {
    return () => {
      // Clean up interval on component unmount
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

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
      </Box>
    </>
  );
}

export default Login;