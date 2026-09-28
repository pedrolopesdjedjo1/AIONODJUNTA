const API_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string | null;
};

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.message || "Ocorreu um erro ao comunicar com o servidor.";

    throw new Error(message);
  }

  return data as T;
}

export const api = {
  get: <T>(endpoint: string, token?: string | null) =>
    apiRequest<T>(endpoint, {
      method: "GET",
      token,
    }),

  post: <T>(
    endpoint: string,
    body?: unknown,
    token?: string | null
  ) =>
    apiRequest<T>(endpoint, {
      method: "POST",
      body,
      token,
    }),

  put: <T>(
    endpoint: string,
    body?: unknown,
    token?: string | null
  ) =>
    apiRequest<T>(endpoint, {
      method: "PUT",
      body,
      token,
    }),

  patch: <T>(
    endpoint: string,
    body?: unknown,
    token?: string | null
  ) =>
    apiRequest<T>(endpoint, {
      method: "PATCH",
      body,
      token,
    }),

  delete: <T>(endpoint: string, token?: string | null) =>
    apiRequest<T>(endpoint, {
      method: "DELETE",
      token,
    }),
};
