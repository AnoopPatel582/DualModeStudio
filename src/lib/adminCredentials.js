import { z } from "zod";

export const adminCredentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(8).max(128),
});

export function parseAdminCredentials(credentials) {
  const result = adminCredentialsSchema.safeParse(credentials);
  return result.success ? result.data : null;
}
