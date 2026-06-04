import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import API from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", formData);

      alert("Signup Successful");

      navigate("/");
    } catch (error) {
      alert("Signup Failed");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4" align="center">
          TaskPlanet
        </Typography>

        <Typography align="center" sx={{ mb: 3 }}>
          Create Account
        </Typography>

        <TextField
          fullWidth
          label="Username"
          name="username"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          margin="normal"
          onChange={handleChange}
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          margin="normal"
          onChange={handleChange}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleSignup}
        >
          Sign Up
        </Button>

        <Typography align="center" sx={{ mt: 2 }}>
          <Link to="/">
            Already have an account?
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default Signup;