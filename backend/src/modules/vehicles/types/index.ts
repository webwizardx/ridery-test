import { z } from "zod";
import { vehicleZodSchema } from "../validations/vehicle";
import { PaginationQuery } from "../../../types/pagination";

export enum VehicleStatus {
  AVAILABLE = "Disponible",
  IN_MAINTENANCE = "En mantenimiento",
  IN_SERVICE = "En servicio",
}

export type Vehicle = z.infer<typeof vehicleZodSchema>;

export type VehicleQuery = PaginationQuery & Vehicle;
