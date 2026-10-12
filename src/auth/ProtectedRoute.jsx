import { Navigate, Outlet, useLocation } from "react-router-dom";
import LoadingState from "../components/ui/LoadingState";
import { useAuth } from "./AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, checking } = useAuth();
  const location = useLocation();

  if (checking) return <LoadingState label="Checking your session…" />;
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location }} />;
  return <Outlet />;
}
