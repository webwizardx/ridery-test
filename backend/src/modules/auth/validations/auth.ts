import { z } from "zod";

export const authZodSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
