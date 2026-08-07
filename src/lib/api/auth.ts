import { apiClient } from "./client";

export type LoginInput = {
  email: string;
  password: string;
};

export async function login(input: LoginInput) {
  return apiClient.post<{ userId: string }>("/auth/login", input);
}

export async function logout() {
  return apiClient.post<{ success: boolean }>("/auth/logout");
}
