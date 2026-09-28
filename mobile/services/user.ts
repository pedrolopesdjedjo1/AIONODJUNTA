import { api } from "./api";
import { User } from "../types";

export async function getMyProfile(
  token: string
): Promise<User> {
  return api.get<User>("/api/users/me", token);
}

export async function updateMyProfile(
  token: string,
  data: Partial<User>
): Promise<User> {
  return api.patch<User>(
    "/api/users/me",
    data,
    token
  );
}
