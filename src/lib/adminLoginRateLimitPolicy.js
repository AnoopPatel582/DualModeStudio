import { createHmac } from "node:crypto";

export const ADMIN_LOGIN_ATTEMPT_LIMIT = 5;
export const ADMIN_LOGIN_BLOCK_MINUTES = 15;
export const ADMIN_LOGIN_BLOCK_MS = ADMIN_LOGIN_BLOCK_MINUTES * 60 * 1000;

export function normalizeLoginEmail(credentials) {
  const email = credentials?.email;
  return typeof email === "string" && email.trim()
    ? email.trim().toLowerCase().slice(0, 254)
    : "invalid-email";
}

export function getLoginClientIp(request) {
  const forwardedFor = request?.headers?.get("x-forwarded-for");
  const clientIp = forwardedFor?.split(",")[0]?.trim();

  return (
    clientIp ||
    request?.headers?.get("x-real-ip")?.trim() ||
    "unknown-ip"
  );
}

export function createAdminLoginRateLimitKey(credentials, request, secret) {
  if (!secret) {
    throw new Error("AUTH_SECRET is required for login rate limiting.");
  }

  const identity = `${normalizeLoginEmail(credentials)}\0${getLoginClientIp(request)}`;
  return createHmac("sha256", secret).update(identity).digest("hex");
}

export function getRetryAfterSeconds(blockedUntil, now = new Date()) {
  if (!(blockedUntil instanceof Date) || blockedUntil <= now) return 0;
  return Math.ceil((blockedUntil.getTime() - now.getTime()) / 1000);
}
