import { ApiError } from "@/types/axios";
import axios, { AxiosError, AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { getSession, signIn } from "next-auth/react";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();
    const token = session?.accessToken;

    if (!config.headers) config.headers = new AxiosHeaders();
    const headers = config.headers as AxiosHeaders;

    if (token) headers.set("Authorization", `Bearer ${token}`);

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError<ApiError>): Promise<unknown> => {
    const status = error.response?.status;

    if (status === 401) {
      await signIn(undefined, { callbackUrl: "/login" });
    }

    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    const fallback: ApiError = {
      code: "NETWORK_ERROR",
      message: error.message || "Network error occurred",
      status: status || 0,
    };
    return Promise.reject(fallback);
  },
);

type Method = "GET" | "POST" | "PUT" | "DELETE";

async function request<T>(url: string, method: Method, data?: unknown): Promise<T> {
  try {
    const response = await api.request<T>({
      url,
      method,
      data,
    });
    return response as T;
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    if (error.response?.data) throw error.response.data;
    throw {
      code: "NETWORK_ERROR",
      message: error.message || "Network error occurred",
      status: error.response?.status || 0,
    } as ApiError;
  }
}

export const apiRequest = {
  get: <T>(url: string) => request<T>(url, "GET"),
  post: <T, D = unknown>(url: string, data?: D) => request<T>(url, "POST", data),
  put: <T, D = unknown>(url: string, data?: D) => request<T>(url, "PUT", data),
  delete: <T>(url: string) => request<T>(url, "DELETE"),
};
