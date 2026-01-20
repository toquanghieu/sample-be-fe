import axios from "axios";
import type {
  Shoe,
  CreateShoeDTO,
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

/**
 * Axios instance with default configuration
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Set authorization token for all requests
 */
export const setAuthToken = (token: string | null): void => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

/**
 * Auth API endpoints
 */
export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/register", data);
    return response.data;
  },

  getCurrentUser: async (): Promise<AuthResponse["user"]> => {
    const response = await api.get<AuthResponse["user"]>("/auth/me");
    return response.data;
  },
};

/**
 * Shoes API endpoints
 */
export const shoesApi = {
  getAll: async (): Promise<Shoe[]> => {
    const response = await api.get<Shoe[]>("/shoes");
    return response.data;
  },

  create: async (data: CreateShoeDTO): Promise<Shoe> => {
    const response = await api.post<Shoe>("/shoes", data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/shoes/${id}`);
  },
};

export default api;
