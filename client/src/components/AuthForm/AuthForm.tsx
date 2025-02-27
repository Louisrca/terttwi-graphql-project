import { Input, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router";

export default function AuthForm({ type }: { type: string }) {
  function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }

  return (
    <div>
      <Typography variant="h4">{capitalizeFirstLetter(type)}</Typography>
      {type === "Login" ? (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            display: "flex",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <Input placeholder="Username" />
          <Input placeholder="Password" />
          <Button variant="contained" color="primary">
            {type}
          </Button>
          <Link to="/register">Create an account?</Link>
        </Box>
      ) : (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
            display: "flex",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
        >
          <Input placeholder="Username" />
          <Input placeholder="Password" />
          <Input placeholder="Mail" />
          <Button variant="contained" color="primary">
            {type}
          </Button>
          <Link to="/login">Already register?</Link>
        </Box>
      )}
    </div>
  );
}
