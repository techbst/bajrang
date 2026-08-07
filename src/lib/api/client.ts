import type { ApiErrorCode, ApiErrorShape } from "@/types/api";

type ApiClientOptions = {
  baseUrl?: string;
  timeoutMs?: number;
  getAuthToken?: () => string | undefined;
};

type RequestOptions = RequestInit & {
  timeoutMs?: number;
  query?: Record<string, string | number | boolean | undefined>;
};

export class ApiClientError extends Error {
  readonly status?: number;
  readonly code: ApiErrorCode;
  readonly details?: unknown;

  constructor(error: ApiErrorShape) {
    super(error.message);
    this.name = "ApiClientError";
    this.status = error.status;
    this.code = error.code;
    this.details = error.details;
  }
}

export class ApiClient {
  private readonly baseUrl: string;
  private readonly timeoutMs: number;
  private readonly getAuthToken?: () => string | undefined;

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl || "";
    this.timeoutMs = options.timeoutMs ?? 10000;
    this.getAuthToken = options.getAuthToken;
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const controller = new AbortController();
    const timeout = globalThis.setTimeout(
      () => controller.abort(),
      options.timeoutMs ?? this.timeoutMs
    );

    try {
      const response = await fetch(this.toUrl(path, options.query), {
        ...options,
        headers: this.createHeaders(options.headers),
        signal: options.signal ?? controller.signal
      });

      return await this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiClientError) {
        throw error;
      }

      throw new ApiClientError({
        code: "NETWORK_ERROR",
        message: "The network request failed. Please try again."
      });
    } finally {
      globalThis.clearTimeout(timeout);
    }
  }

  get<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, { ...options, method: "GET" });
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(body)
    });
  }

  patch<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>(path, {
      ...options,
      method: "PATCH",
      body: JSON.stringify(body)
    });
  }

  delete<T>(path: string, options?: RequestOptions) {
    return this.request<T>(path, { ...options, method: "DELETE" });
  }

  private createHeaders(headers?: HeadersInit): Headers {
    const nextHeaders = new Headers(headers);
    nextHeaders.set("Accept", "application/json");

    if (!nextHeaders.has("Content-Type")) {
      nextHeaders.set("Content-Type", "application/json");
    }

    const token = this.getAuthToken?.();
    if (token) {
      nextHeaders.set("Authorization", `Bearer ${token}`);
    }

    return nextHeaders;
  }

  private toUrl(path: string, query?: RequestOptions["query"]) {
    const url = this.baseUrl
      ? new URL(path, this.baseUrl)
      : new URL(path, "http://localhost");

    Object.entries(query ?? {}).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });

    return this.baseUrl ? url.toString() : `${url.pathname}${url.search}`;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get("content-type");
    const hasJson = contentType?.includes("application/json");
    const payload = hasJson ? await response.json() : null;

    if (!response.ok) {
      throw new ApiClientError({
        code: this.toErrorCode(response.status),
        message: this.toErrorMessage(response.status),
        status: response.status,
        details: payload
      });
    }

    return payload as T;
  }

  private toErrorCode(status: number): ApiErrorCode {
    if (status === 401) return "UNAUTHORIZED";
    if (status === 403) return "FORBIDDEN";
    if (status === 404) return "NOT_FOUND";
    if (status === 422) return "VALIDATION_ERROR";
    if (status === 429) return "RATE_LIMITED";
    if (status >= 500) return "SERVER_ERROR";
    return "UNKNOWN_ERROR";
  }

  private toErrorMessage(status: number) {
    if (status === 401) return "Please sign in to continue.";
    if (status === 403) return "You do not have permission to perform this action.";
    if (status === 404) return "The requested resource was not found.";
    if (status === 422) return "Some submitted information is invalid.";
    if (status === 429) return "Too many requests. Please wait and try again.";
    if (status >= 500) return "The server is unavailable. Please try again soon.";
    return "Something went wrong. Please try again.";
  }
}

export const apiClient = new ApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL
});
