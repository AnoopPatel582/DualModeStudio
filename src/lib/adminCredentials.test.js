import { describe, expect, it } from "vitest";
import { parseAdminCredentials } from "./adminCredentials";

describe("parseAdminCredentials", () => {
  it("normalizes a valid administrator email", () => {
    expect(
      parseAdminCredentials({
        email: "  ADMIN@DualModeStudio.com ",
        password: "secure-password",
      }),
    ).toEqual({
      email: "admin@dualmodestudio.com",
      password: "secure-password",
    });
  });

  it("rejects malformed credentials", () => {
    expect(
      parseAdminCredentials({ email: "not-an-email", password: "short" }),
    ).toBeNull();
  });
});
