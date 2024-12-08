import { z } from "zod";
import { userZodSchema } from "../validations/user";

export type User = z.infer<typeof userZodSchema>;
