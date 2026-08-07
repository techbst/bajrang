export type Pagination = {
  page: number;
  pageSize: number;
  total: number;
  pageCount: number;
};

export type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
  meta?: Record<string, unknown>;
};

export type PaginatedResponse<T> = ApiResponse<T[]> & {
  pagination: Pagination;
};

export type ApiErrorCode =
  | "UNAUTHORIZED"
  | "FORBIDDEN"
  | "NOT_FOUND"
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "SERVER_ERROR"
  | "NETWORK_ERROR"
  | "UNKNOWN_ERROR";

export type ApiErrorShape = {
  code: ApiErrorCode;
  message: string;
  status?: number;
  details?: unknown;
};
