import { Types } from "mongoose";
import { PaginationResponse } from "../../../types/pagination";
import { vehicleModel } from "../models/vehicle.model";
import { Vehicle, VehicleQuery } from "../types";
import { CreatedBy, UpdatedBy } from "../../users/types";

export default class VehicleService {
  static async create(vehicle: Vehicle & CreatedBy) {
    try {
      return await vehicleModel.create(vehicle);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async find(query: VehicleQuery): Promise<PaginationResponse<Vehicle>> {
    const { limit, page, sort = -1, sortBy = "createdAt", ...filters } = query;
    const skip = (page - 1) * limit;
    const vehicles = await vehicleModel
      .find(filters)
      .sort({ [sortBy]: sort })
      .skip(skip)
      .limit(limit);
    const totalCount = await vehicleModel.countDocuments(filters);

    return {
      data: vehicles,
      limit,
      page,
      sort,
      sortBy,
      totalCount,
    };
  }

  static async findOne(_id: Types.ObjectId) {
    try {
      return await vehicleModel.findById(_id);
    } catch (error) {
      return null;
    }
  }

  static async update(_id: Types.ObjectId, vehicle: Vehicle & UpdatedBy) {
    try {
      return await vehicleModel.findByIdAndUpdate(_id, vehicle, { new: true });
    } catch (error) {
      return null;
    }
  }

  static async patch(
    _id: Types.ObjectId,
    vehicle: Partial<Vehicle> & UpdatedBy,
  ) {
    try {
      return await vehicleModel.findByIdAndUpdate(_id, vehicle, { new: true });
    } catch (error) {
      return null;
    }
  }

  static async delete(_id: Types.ObjectId) {
    try {
      const { deletedCount } = await vehicleModel.deleteOne({ _id });

      return deletedCount > 0;
    } catch (error) {
      return null;
    }
  }
}
