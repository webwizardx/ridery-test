import { Router } from "express";
import validationMiddleware from "../../../middlewares/validation.middleware";
import {
  partialVehicleZodSchema,
  vehicleZodSchema,
} from "../validations/vehicle";
import VehicleController from "../controllers/vehicle.controller";
import authMiddleware from "../../auth/middlewares/auth.middleware";

const vehicleRouter = Router();

vehicleRouter.post(
  "/vehicles",
  authMiddleware,
  validationMiddleware(vehicleZodSchema),
  VehicleController.create,
);
vehicleRouter.get("/vehicles", authMiddleware, VehicleController.find);
vehicleRouter.get("/vehicles/:_id", authMiddleware, VehicleController.findOne);
vehicleRouter.put(
  "/vehicles/:_id",
  authMiddleware,
  validationMiddleware(vehicleZodSchema),
  VehicleController.update,
);
vehicleRouter.patch(
  "/vehicles/:_id",
  authMiddleware,
  validationMiddleware(partialVehicleZodSchema),
  VehicleController.patch,
);
vehicleRouter.delete(
  "/vehicles/:_id",
  authMiddleware,
  VehicleController.delete,
);

export default vehicleRouter;
