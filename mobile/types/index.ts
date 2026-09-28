export type UserRole =
  | "USER"
  | "AGENT"
  | "MERCHANT"
  | "ADMIN";

export type UserStatus =
  | "ACTIVE"
  | "SUSPENDED"
  | "BLOCKED"
  | "PENDING";

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  photoUrl?: string;
  role: UserRole;
  status: UserStatus;
}

export interface AuthResponse {
  user: User;
  token: string;
}
