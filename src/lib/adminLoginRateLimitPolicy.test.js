import { describe, expect, it } from "vitest";
import {
  ADMIN_LOGIN_ATTEMPT_LIMIT,
  ADMIN_LOGIN_BLOCK_MINUTES,
  createAdminLoginRateLimitKey,
  getLoginClientIp,
  getRetryAfterSeconds,
  normalizeLoginEmail,
} from "./adminLoginRateLimitPolicy";

describe("admin login rate-limit policy", () => {
  it("uses the confirmed attempt and block limits", () => {
    expect(ADMIN_LOGIN_ATTEMPT_LIMIT).toBe(5);
    expect(ADMIN_LOGIN_BLOCK_MINUTES).toBe(15);
  });

  it("normalizes the email and reads the original forwarded IP", () => {
    const request = new Request("https://example.com/admin", {
      headers: { "x-forwarded-for": "203.0.113.10, 10.0.0.1" },
    });

    expect(normalizeLoginEmail({ email: " Admin@Example.com " })).toBe(
      "admin@example.com",
    );
    expect(getLoginClientIp(request)).toBe("203.0.113.10");
  });

  it("creates stable, non-plaintext identifiers scoped by email and IP", () => {
    const firstRequest = new Request("https://example.com/admin", {
      headers: { "x-real-ip": "203.0.113.10" },
    });
    const secondRequest = new Request("https://example.com/admin", {
      headers: { "x-real-ip": "203.0.113.11" },
    });
    const firstKey = createAdminLoginRateLimitKey(
      { email: "admin@example.com" },
      firstRequest,
      "test-secret",
    );

    expect(firstKey).toHaveLength(64);
    expect(firstKey).not.toContain("admin@example.com");
    expect(
      createAdminLoginRateLimitKey(
        { email: "ADMIN@example.com" },
        firstRequest,
        "test-secret",
      ),
    ).toBe(firstKey);
    expect(
      createAdminLoginRateLimitKey(
        { email: "admin@example.com" },
        secondRequest,
        "test-secret",
      ),
    ).not.toBe(firstKey);
  });

  it("calculates the remaining whole seconds for an active block", () => {
    const now = new Date("2026-09-12T10:00:00.000Z");

    expect(
      getRetryAfterSeconds(new Date("2026-09-12T10:00:30.100Z"), now),
    ).toBe(31);
    expect(
      getRetryAfterSeconds(new Date("2026-09-12T10:00:00.000Z"), now),
    ).toBe(0);
  });
});
