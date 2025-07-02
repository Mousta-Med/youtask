import type { User } from "../models/User.model";

export interface AuthRequest {
  emailOrUsername: string;
  password: string;
}

export interface UserRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user: User;
}
