import React, { use } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import LoginPage from "../../pages/LoginPage";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  } else if (user && user?.email) {
    return children;
  }
  return <Navigate state={location.pathname} to="/auth/login"></Navigate>;
};

export default PrivateRoute;
