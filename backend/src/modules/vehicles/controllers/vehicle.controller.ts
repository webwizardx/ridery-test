import { Types } from "mongoose";
import { VehicleQuery } from "../types";
import VehicleService from "../services/vehicle.service";
import { Request, Response } from "express";

export default class VehicleController {
  /**
   * Creates a new vehicle.
   *
   * This method handles the creation of a new vehicle by accepting a request with vehicle details,
   * and responding with the created vehicle data or an error message if the creation fails.
   *
   * @param req - The request object containing vehicle details and user information.
   * @param res - The response object used to send back the appropriate HTTP response.
   *
   * @returns A JSON response with the created vehicle data or an error message.
   *
   * @throws Will throw an error if there is an issue during the vehicle creation process.
   *
   * @author Jonathan Alvarado
   */
  static async create(req: Request, res: Response) {
    try {
      const createdBy = req.user?.email;
      const body = req.body;
      const vehicle = await VehicleService.create({ ...body, createdBy });

      if (!vehicle) {
        res
          .status(400)
          .json({ message: "El vehículo existe en nuestro sistema." });
        return;
      }

      res
        .status(201)
        .json({ message: "Vehículo creado exitosamente", data: vehicle });
    } catch (error: any) {
      const message =
        error.message || "Ha ocurrido un error al intentar crear el vehículo.";

      res.status(500).json({ message });
    }
  }

  /**
   * Handles the request to find vehicles based on the provided query parameters.
   *
   * @param req - The request object containing query parameters for vehicle search.
   * @param res - The response object used to send back the found vehicles or an error message.
   *
   * @returns A JSON response with the found vehicles or an error message.
   *
   * @throws Will return a 500 status code with an error message if an error occurs during the vehicle search.
   *
   * @author Jonathan Alvarado
   */
  static async find(req: Request, res: Response) {
    try {
      const query = req.query as unknown as VehicleQuery;

      const vehicles = await VehicleService.find(query);

      res.status(200).json(vehicles);
    } catch (error: any) {
      const message =
        error.message ||
        "Ha ocurrido un error al intentar buscar los vehículos.";

      res.status(500).json({ message });
    }
  }

  /**
   * Finds a single vehicle by its ID.
   *
   * @param req - The request object containing the vehicle ID in the params.
   * @param res - The response object used to send back the appropriate response.
   *
   * @returns A JSON response with the vehicle data if found, or an error message if not found or if an error occurs.
   *
   * @throws Will return a 404 status if the vehicle is not found.
   * @throws Will return a 500 status if an error occurs during the process.
   *
   * @author Jonathan Alvarado
   */
  static async findOne(req: Request, res: Response) {
    try {
      const { _id } = req.params;

      const vehicle = await VehicleService.findOne(new Types.ObjectId(_id));

      if (!vehicle) {
        res
          .status(404)
          .json({ message: `Vehículo con _id ${_id} no encontrado` });
        return;
      }

      res
        .status(200)
        .json({ message: "Vehículo encontrado exitosamente", data: vehicle });
    } catch (error: any) {
      const message =
        error.message || "Ha ocurrido un error al intentar buscar el vehículo";

      res.status(500).json({ message });
    }
  }

  /**
   * Updates a vehicle with the given ID and request body.
   *
   * @param req - The request object containing the vehicle ID in params and update data in the body.
   * @param res - The response object used to send back the appropriate HTTP response.
   *
   * @returns A JSON response with a success message and the updated vehicle data, or an error message if the vehicle is not found or an error occurs.
   *
   * @throws Will return a 404 status if the vehicle with the given ID is not found.
   * @throws Will return a 500 status if an error occurs during the update process.
   *
   * @author Jonathan Alvarado
   */
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
        res
          .status(404)
          .json({ message: `Vehículo con _id ${_id} no encontrado` });
        return;
      }

      res
        .status(200)
        .json({ message: "Vehículo actualizado exitosamente", data: vehicle });
    } catch (error: any) {
      const message =
        error.message ||
        "Ha ocurrido un error al intentar actualizar el vehículo";

      res.status(500).json({ message });
    }
  }

  /**
   * Updates a vehicle with the provided data.
   *
   * @param req - The request object containing the vehicle ID in the params and the update data in the body.
   * @param res - The response object used to send back the appropriate response.
   *
   * @returns A JSON response with a success message and the updated vehicle data, or an error message if the update fails.
   *
   * @throws Will return a 404 status if the vehicle is not found.
   * @throws Will return a 500 status if an error occurs during the update process.
   *
   * @author Jonathan Alvarado
   */
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
        res
          .status(404)
          .json({ message: `Vehículo con _id ${_id} no encontrado` });
        return;
      }

      res
        .status(200)
        .json({ message: "Vehículo actualizado exitosamente", data: vehicle });
    } catch (error: any) {
      const message =
        error.message ||
        "Ha ocurrido un error al intentar actualizar el vehículo";

      res.status(500).json({ message });
    }
  }

  /**
   * Deletes a vehicle based on the provided ID in the request parameters.
   *
   * @param req - The request object containing the vehicle ID in the parameters.
   * @param res - The response object used to send the status and message back to the client.
   *
   * @returns A JSON response indicating the success or failure of the delete operation.
   *
   * @throws Will return a 404 status if the vehicle is not found.
   * @throws Will return a 500 status if an error occurs during the deletion process.
   *
   * @author Jonathan Alvarado
   */
  static async delete(req: Request, res: Response) {
    try {
      const { _id } = req.params;

      const vehicle = await VehicleService.delete(new Types.ObjectId(_id));

      if (!vehicle) {
        res
          .status(404)
          .json({ message: `Vehículo con _id ${_id} no encontrado` });
        return;
      }

      res.status(200).json({ message: "Vehículo eliminado exitosamente" });
    } catch (error: any) {
      const message =
        error.message ||
        "Ha ocurrido un error al intentar eliminar el vehículo";

      res.status(500).json({ message });
    }
  }
}
