import { Types } from "mongoose";
import { VehicleQuery } from "../types";
import VehicleService from "../services/vehicle.service";
import { Request, Response } from "express";

export default class VehicleController {
  static async create(req: Request, res: Response) {
    try {
      const createdBy = req.user?.email;
      const body = req.body;
      const vehicle = await VehicleService.create({ ...body, createdBy });

      if (!vehicle) {
        res.status(400).json({ message: "Vehicle already exists" });
        return;
      }

      res
        .status(201)
        .json({ message: "Vehicle created successfully", data: vehicle });
    } catch (error: any) {
      const message =
        error.message || "An error occurred while creating the vehicle";

      res.status(500).json({ message });
    }
  }

  static async find(req: Request, res: Response) {
    try {
      const query = req.query as unknown as VehicleQuery;

      const vehicles = await VehicleService.find(query);

      res.status(200).json(vehicles);
    } catch (error: any) {
      const message =
        error.message || "An error occurred while fetching the vehicles";

      res.status(500).json({ message });
    }
  }

  static async findOne(req: Request, res: Response) {
    try {
      const { _id } = req.params;

      const vehicle = await VehicleService.findOne(new Types.ObjectId(_id));

      if (!vehicle) {
        res.status(404).json({ message: `Vehicle with _id ${_id} not found` });
        return;
      }

      res
        .status(200)
        .json({ message: "Vehicle found successfully", data: vehicle });
    } catch (error: any) {
      const message =
        error.message || "An error occurred while fetching the vehicle";

      res.status(500).json({ message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      const body = req.body;
      const updatedBy = req.user?.email;

      const vehicle = await VehicleService.update(new Types.ObjectId(_id), {
        ...body,
        updatedBy,
      });

      if (!vehicle) {
        res.status(404).json({ message: `Vehicle with _id ${_id} not found` });
        return;
      }

      res
        .status(200)
        .json({ message: "Vehicle updated successfully", data: vehicle });
    } catch (error: any) {
      const message =
        error.message || "An error occurred while updating the vehicle";

      res.status(500).json({ message });
    }
  }

  static async patch(req: Request, res: Response) {
    try {
      const { _id } = req.params;
      const body = req.body;
      const updatedBy = req.user?.email;

      const vehicle = await VehicleService.patch(new Types.ObjectId(_id), {
        ...body,
        updatedBy,
      });

      if (!vehicle) {
        res.status(404).json({ message: `Vehicle with _id ${_id} not found` });
        return;
      }

      res
        .status(200)
        .json({ message: "Vehicle updated successfully", data: vehicle });
    } catch (error: any) {
      const message =
        error.message || "An error occurred while updating the vehicle";

      res.status(500).json({ message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { _id } = req.params;

      const vehicle = await VehicleService.delete(new Types.ObjectId(_id));

      if (!vehicle) {
        res.status(404).json({ message: `Vehicle with _id ${_id} not found` });
        return;
      }

      res.status(200).json({ message: "Vehicle deleted successfully" });
    } catch (error: any) {
      const message =
        error.message || "An error occurred while deleting the vehicle";

      res.status(500).json({ message });
    }
  }
}
