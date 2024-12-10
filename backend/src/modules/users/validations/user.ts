import { z } from "zod";

export const userZodSchema = z.object({
  email: z
    .string({ message: "El correo electrónico es requerido" })
    .email({ message: "El correo electrónico no es válido" }),
  password: z
    .string({ message: "La contraseña es requerida" })
    .min(6, "La contraseña debe tener al menos 6 caracteres"),
});
