import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../../store/auth";
import { useEffect } from "react";
const Logout = () => {
  const { LogoutUser } = useAuth();
  useEffect(() => {
    LogoutUser();
  }, [LogoutUser]);

  return <Navigate to="/login" />;
};

export default Logout;