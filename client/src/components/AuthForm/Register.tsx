import { Input, Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router";
import { REGISTER_USER } from "../../api/auth/mutation";
import { useNavigate } from "react-router";
import { useMutation } from "@apollo/client";
export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [registerUser, { data }] = useMutation(REGISTER_USER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await registerUser({
        variables: { username, password, email },
      });
      if (result?.data?.createUser?.success) {
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
      {(data?.createUser?.code === 401 || data?.createUser?.code === 400) && (
        <Typography
          variant="body1"
          color="error"
          sx={{
            width: "250px",
            wordBreak: "break-word",
          }}
        >
          Erreur d'authentification, veuillez réssayer.
        </Typography>
      )}
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
          onChange={(e) => setEmail(e.target.value)}
          type="mail"
          value={email}
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
