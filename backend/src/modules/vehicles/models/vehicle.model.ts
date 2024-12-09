import { model, Schema } from "mongoose";
import { Vehicle, VehicleStatus } from "../types";
import { CreatedBy, UpdatedBy } from "../../users/types";

export const vehicleSchema = new Schema<Vehicle & CreatedBy & UpdatedBy>(
  {
    createdBy: {
      type: String,
    },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: VehicleStatus,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    updatedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const vehicleModel = model<Vehicle>("Vehicle", vehicleSchema);
