import http from "../http-common";
import type { AuthRequest, AuthResponse, UserRequest } from "../types/index";

const login = (data: AuthRequest) => {
  return http.post<AuthResponse>("/auth/login", data);
};

const register = (data: UserRequest) => {
  return http.post<AuthResponse>("/auth/register", data);
};

const AuthService = {
  login,
  register,
};

export default AuthService;
