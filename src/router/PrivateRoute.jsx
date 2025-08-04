import { useAuth } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const { name, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return name ? children : <Navigate to="/home" />;
};
