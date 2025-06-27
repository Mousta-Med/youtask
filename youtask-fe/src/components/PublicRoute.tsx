import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isExpired } from "react-jwt";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        if (!isExpired(token)) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  if (isAuthenticated === true) {
    return <Navigate to="/tasks" replace />;
  }

  return <>{children}</>;
};

export default PublicRoute;
