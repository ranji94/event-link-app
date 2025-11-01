// /lib/http.ts
import axios, { AxiosError, AxiosInstance } from "axios";
import { env } from "./env";
import { useAuthStore } from "./auth-store";

export type ApiErrorPayload = {
  errorCode?: string;
  message?: string | string[];
  error?: string;
  statusCode?: number;
};

export async function apiFetch<T>(
  path: string,
  init?: {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: any;
    headers?: Record<string, string>;
  }
): Promise<T> {
  const method = init?.method ?? "GET";
  const body = init?.body;
  const headers = init?.headers;

  const res = await http.request<T>({
    url: path,
    method,
    data: body,
    headers,
  });

  return res.data; // dzięki interceptorowi res to zawsze success albo ApiError
}

export class ApiError extends Error {
  status: number;
  data?: ApiErrorPayload;
  constructor(status: number, data?: ApiErrorPayload) {
    super(
      (Array.isArray(data?.message) ? data?.message[0] : data?.message) ||
        data?.error ||
        "Request failed"
    );
    this.status = status;
    this.data = data;
  }
}

let refreshingPromise: Promise<void> | null = null;

async function refreshTokens() {
  // jeden refresh naraz (single-flight)
  if (!refreshingPromise) {
    refreshingPromise = axios
      .post(`${env.apiUrl}/auth/refresh`, {}, { withCredentials: true })
      .then(() => {})
      .finally(() => (refreshingPromise = null));
  }
  return refreshingPromise;
}

export const http: AxiosInstance = axios.create({
  baseURL: env.apiUrl,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// odpowiedzi: success → zwracaj tylko data
http.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<ApiErrorPayload>) => {
    const original = error.config as any;

    // Jeśli 401 i jeszcze nie próbowaliśmy refreshu dla tego requestu
    if (error.response?.status === 401 && !original?._retry) {
      try {
        original._retry = true;
        await refreshTokens();
        // ponów oryginalny request
        return http(original);
      } catch {
        // refresh nieudany → wyloguj
        useAuthStore.getState().clear?.();
        throw new ApiError(401, { errorCode: "TOKEN_EXPIRED" });
      }
    }

    // Inne błędy → normalizacja i rzut ApiError
    const status = error.response?.status ?? 0;
    const data = error.response?.data;
    throw new ApiError(status, data);
  }
);

export function getMe() {
  return apiFetch<{ userId: string; email: string }>("/users/me");
}
