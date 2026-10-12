import { env } from "../config/env";
import { getToken } from "../auth/tokenStorage";


export class ApiError extends Error {
  constructor(message, { status = 0, data = null } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

let onUnauthorized = null;
export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler;
}

function buildUrl(path, params) {
  const url = `${env.apiBaseUrl}${path}`;
  if (!params) return url;
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") query.append(key, value);
  });
  const qs = query.toString();
  return qs ? `${url}?${qs}` : url;
}


async function request(method, path, { params, body, signal, public: isPublic = false } = {}) {
  if (!env.apiBaseUrl) {
    throw new ApiError("The API address isn't set. Add VITE_API_BASE_URL to your .env file and restart the dev server.");
  }

  const headers = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const token = isPublic ? null : getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(buildUrl(path, params), {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    console.error(`[DOMEv] The request to ${method} ${buildUrl(path, params)} failed:`, error);
    throw new ApiError(
      `Cannot reach the server at ${env.apiBaseUrl}. Check that the address in .env is correct, the server is running and it allows this site (CORS). Details are in the browser console.`,
    );
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json().catch(() => null) : null;

  if (response.ok && !isJson && response.status !== 204) {
    throw new ApiError("The server returned an unexpected response. Check the API address (VITE_API_BASE_URL).");
  }

  if (!response.ok) {
    if (response.status === 401 && token && onUnauthorized) onUnauthorized();
    const message = Array.isArray(data?.message) ? data.message.join(", ") : data?.message;
    throw new ApiError(message || defaultMessage(response.status), { status: response.status, data });
  }
  return data;
}

function defaultMessage(status) {
  if (status === 401) return "Your session has expired. Sign in again.";
  if (status === 403) return "You don't have permission to do this.";
  if (status === 404) return "This item no longer exists.";
  if (status >= 500) return "The server had a problem. Try again in a moment.";
  return "Something went wrong. Try again.";
}

export function callEndpoint(endpoint, { id, params, body, public: isPublic } = {}) {
  const path = typeof endpoint.path === "function" ? endpoint.path(id) : endpoint.path;
  return request(endpoint.method, path, { params, body, public: isPublic });
}
