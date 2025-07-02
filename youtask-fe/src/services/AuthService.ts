import http from "../http-common";
import type { AuthRequest, AuthResponse, UserRequest } from "../types/index";

const login = (data: AuthRequest) => {
  return http.post<AuthResponse>("/auth/login", data);
};

const register = (data: UserRequest) => {
  return http.post<AuthResponse>("/auth/register", data);
};

const logout = () => {
  localStorage.removeItem("accessToken");
  return Promise.resolve();
};

const AuthService = {
  login,
  register,
  logout,
};

export default AuthService;
