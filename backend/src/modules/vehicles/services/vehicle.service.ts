import { Types } from "mongoose";
import { PaginationResponse } from "../../../types/pagination";
import { vehicleModel } from "../models/vehicle.model";
import { Vehicle, VehicleQuery } from "../types";
import { CreatedBy, UpdatedBy } from "../../users/types";

export default class VehicleService {
  /**
   * Creates a new vehicle record in the database.
   *
   * @param vehicle - The vehicle object to be created, which includes vehicle details and the creator's information.
   * @returns The created vehicle object if successful, otherwise null.
   * @throws Logs any errors encountered during the creation process.
   *
   * @author Jonathan Alvarado
   */
  static async create(vehicle: Vehicle & CreatedBy) {
    try {
      return await vehicleModel.create(vehicle);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  /**
   * Finds vehicles based on the provided query parameters.
   *
   * @param {VehicleQuery} query - The query parameters for finding vehicles.
   * @param {number} query.limit - The maximum number of vehicles to return.
   * @param {number} query.page - The page number to retrieve.
   * @param {number} [query.sort=-1] - The sort order (1 for ascending, -1 for descending).
   * @param {string} [query.sortBy="createdAt"] - The field to sort by.
   * @param {object} query.filters - Additional filters to apply to the query.
   * @returns {Promise<PaginationResponse<Vehicle>>} A promise that resolves to a pagination response containing the vehicles.
   *
   * @author Jonathan Alvarado
   */
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

  /**
   * Finds a single vehicle by its ObjectId.
   *
   * @param _id - The ObjectId of the vehicle to find.
   * @returns The vehicle document if found, otherwise null.
   * @throws Will return null if an error occurs during the database query.
   *
   * @author Jonathan Alvarado
   */
  static async findOne(_id: Types.ObjectId) {
    try {
      return await vehicleModel.findById(_id);
    } catch (error) {
      return null;
    }
  }

  /**
   * Updates a vehicle document in the database.
   *
   * @param _id - The ObjectId of the vehicle to update.
   * @param vehicle - The vehicle data to update, including the updated by information.
   * @returns The updated vehicle document, or null if an error occurs.
   *
   * @author Jonathan Alvarado
   */
  static async update(_id: Types.ObjectId, vehicle: Vehicle & UpdatedBy) {
    try {
      return await vehicleModel.findByIdAndUpdate(_id, vehicle, { new: true });
    } catch (error) {
      return null;
    }
  }

  /**
   * Updates a vehicle document in the database with the provided partial vehicle data.
   *
   * @param _id - The ObjectId of the vehicle to update.
   * @param vehicle - An object containing the partial vehicle data and the user who updated it.
   * @returns The updated vehicle document, or null if an error occurs.
   *
   * @author Jonathan Alvarado
   */
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

  /**
   * Deletes a vehicle document from the database by its ObjectId.
   *
   * @param _id - The ObjectId of the vehicle to be deleted.
   * @returns A promise that resolves to a boolean indicating whether the deletion was successful.
   * @throws Will return false if an error occurs during the deletion process.
   *
   * @author Jonathan Alvarado
   */
  static async delete(_id: Types.ObjectId) {
    try {
      const { deletedCount } = await vehicleModel.deleteOne({ _id });

      return deletedCount > 0;
    } catch (error) {
      return false;
    }
  }
}
