import { api } from "./api";
import { AuthResponse } from "../types";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export async function login(data: LoginData): Promise<AuthResponse> {
  return api.post<AuthResponse>("/api/auth/login", data);
}

export async function register(
  data: RegisterData
): Promise<AuthResponse> {
  return api.post<AuthResponse>("/api/auth/register", data);
}
