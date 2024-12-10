import { z } from "zod";
import { VehicleStatus } from "../types";

export const vehicleZodSchema = z.object({
  brand: z.string({ message: "La marca es obligatoria" }),
  model: z.string({ message: "El modelo es obligatorio" }),
  status: z.nativeEnum(VehicleStatus, {
    message: "El estado es obligatorio y debe ser válido",
  }),
  year: z
    .number()
    .int("El año debe ser un número entero")
    .min(1990, "El año debe ser mayor o igual a 1990")
    .max(
      new Date().getFullYear(),
      "El año debe ser menor o igual al año actual",
    ),
});

export const partialVehicleZodSchema = vehicleZodSchema.partial();
