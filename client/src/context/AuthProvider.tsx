import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../utils/useAuth";
import { useNavigate, useLocation } from "react-router-dom";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const { user } = useAuth();
  console.log("🚀 ~ AuthProvider ~ user:", user);
  const navigate = useNavigate();
  const location = useLocation(); // Permet de connaître la route actuelle

  useEffect(() => {
    // Si l'utilisateur n'est pas authentifié et essaie d'accéder à une page autre que /login ou /register

    if (
      !user &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
      
    ) {
      navigate("/login");
    }
  }, [user, navigate, location]);

  return <>{children}</>;
};
