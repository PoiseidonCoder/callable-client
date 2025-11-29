export type ErrorCode =
    | "VALIDATION_ERROR"
    | "AUTH_REQUIRED"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "CONFLICT"
    | "SERVER_ERROR"
    | "NETWORK_ERROR"
    | "UNKNOWN_ERROR";

export interface ApiError {
    code: ErrorCode;
    message: string;
    status: number;
    details?: Record<string, any>;
}

export type ApiResponse<T> = T;
