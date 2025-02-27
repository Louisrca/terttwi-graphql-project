import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.tsx";

const client = new ApolloClient({
  uri: "http://localhost:4000/", // URL to the GraphQL server
  cache: new InMemoryCache(),
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <ApolloProvider client={client}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ApolloProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
