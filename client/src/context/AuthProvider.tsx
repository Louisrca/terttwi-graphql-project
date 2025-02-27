import {
  ReactNode,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  ApolloLink,
} from "@apollo/client";
import { jwtDecode, JwtPayload } from "jwt-decode";

// Définir le type de l'utilisateur extrait du token
interface User {
  id: string;
  username: string;
}

// Définir le type du contexte d'authentification
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const isTokenValid = (token: string): boolean => {
  try {
    const decodedToken = jwtDecode<JwtPayload>(token);
    if (!decodedToken.exp) return false;
    return decodedToken.exp * 1000 > Date.now();
  } catch (error) {
    console.error("Erreur lors de la vérification du token:", error);
    return false;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken && isTokenValid(storedToken)) {
        try {
          const decodedToken = jwtDecode<User>(storedToken);
          setToken(storedToken);
          setUser({
            id: decodedToken.id,
            username: decodedToken.username,
          });
          setIsAuthenticated(true);

          if (["/login", "/register", "/signin"].includes(location.pathname)) {
            navigate("/");
          }
        } catch (error) {
          console.log("🚀 ~ initAuth ~ error:", error);
          logout();
        }
      } else if (storedToken) {
        logout();
      } else {
        const publicRoutes = ["/login", "/register"];
        if (!publicRoutes.includes(location.pathname)) {
          navigate("/signin");
        }
      }

      setLoading(false);
    };

    initAuth();
  }, [navigate, location.pathname]);

  const login = (newToken: string) => {
    try {
      const decodedToken = jwtDecode<User>(newToken);
      setToken(newToken);
      setUser({
        id: decodedToken.id,
        username: decodedToken.username,
      });
      setIsAuthenticated(true);
      localStorage.setItem("token", newToken);
      navigate("/");
    } catch (error) {
      console.error("Erreur lors du décodage du token:", error);
      logout();
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const httpLink = new HttpLink({
    uri: "http://localhost:4000",
  });

  const authLink = new ApolloLink((operation, forward) => {
    if (token) {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    }
    return forward(operation);
  });

  const apolloClient = new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
  });

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isAuthenticated }}
    >
      <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
    </AuthContext.Provider>
  );
};
