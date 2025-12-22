export enum StatusCode {
  "BAD_REQUEST" = 400,
  "UNAUTHORIZED" = 401,
  "FORBIDDEN" = 403,
  "NOT_FOUND" = 404,
  "CONFLICT" = 409,
  "UNPROCESSABLE_ENTITY" = 422,
  "TOO_MANY_REQUESTS" = 429,
  "INTERNAL_SERVER_ERROR" = 500,
  "BAD_GATEWAY" = 502,
  "SERVICE_UNAVAILABLE" = 503,
  "OK" = 200,
  "CREATED" = 201,
  "ACCEPTED" = 202,
  "NO_CONTENT" = 204,
}

export enum StatusText {
  "BAD_REQUEST" = "Bad Request",
  "UNAUTHORIZED" = "Unauthorized",
  "FORBIDDEN" = "Forbidden",
  "NOT_FOUND" = "Not Found",
  "CONFLICT" = "Conflict",
  "UNPROCESSABLE_ENTITY" = "Unprocessable Entity",
  "TOO_MANY_REQUESTS" = "Too Many Requests",
  "INTERNAL_SERVER_ERROR" = "Internal Server Error",
  "BAD_GATEWAY" = "Bad Gateway",
  "SERVICE_UNAVAILABLE" = "Service Unavailable",
  "OK" = "OK",
  "CREATED" = "Created",
  "ACCEPTED" = "Accepted",
  "NO_CONTENT" = "No Content",
}

export interface StanderedResponse {
  success: boolean;
  error?: string;
  message?: string;
  status: number;
}

