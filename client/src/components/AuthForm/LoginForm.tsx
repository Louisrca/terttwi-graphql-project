import { Input, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router";
import { SIGNIN_USER } from "../../api/auth/auth";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [signInUser] = useMutation(SIGNIN_USER, {
    variables: { username, password },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signInUser();
      if (result?.data?.signIn?.success && result.data.signIn.token) {
        console.log("Login success:", result);
        localStorage.setItem("token", result?.data?.signIn?.token);
        navigate("/");
      }
    } catch (err) {
      console.error("Error signing in:", err);
    }
  };

  return (
    <div>
      <Typography variant="h4">Login</Typography>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Username"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder="Password"
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
        <Link to="/register">Create an account?</Link>
      </Box>
    </div>
  );
}
