import { Input, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router";
import { REGISTER_USER } from "../../api/auth/auth";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const navigate = useNavigate();

  const [registerUser] = useMutation(REGISTER_USER, {
    variables: { username, password, mail },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await registerUser();
      if (result.data.signIn.success) {
        console.log("Register success:", result);
        navigate("/login");
      } else {
        console.log("Register error:", result);
      }
    } catch (err) {
      console.error("Error registering:", err);
    }
  };

  return (
    <div>
      <Typography variant="h4">Register</Typography>

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
        <Input
          onChange={(e) => setMail(e.target.value)}
          type="mail"
          value={mail}
          placeholder="Mail"
        />
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>
        <Link to="/login">Already register?</Link>
      </Box>
    </div>
  );
}
