export interface AuthRequest {
  emailOrusername: string;
  password: string;
}

export interface UserRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}
