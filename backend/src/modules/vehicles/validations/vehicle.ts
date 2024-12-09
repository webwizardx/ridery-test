import { z } from "zod";
import { VehicleStatus } from "../types";

export const vehicleZodSchema = z.object({
  brand: z.string(),
  model: z.string(),
  status: z.nativeEnum(VehicleStatus),
  year: z.number(),
});

export const partialVehicleZodSchema = vehicleZodSchema.partial();
