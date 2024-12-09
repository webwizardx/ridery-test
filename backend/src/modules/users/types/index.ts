import { z } from "zod";
import { userZodSchema } from "../validations/user";

export type User = z.infer<typeof userZodSchema>;

export type CreatedBy = {
  createdBy?: string;
};

export type UpdatedBy = {
  updatedBy?: string;
};
