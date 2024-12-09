import { Router } from "express";
import { validationMiddleware } from "../../../middlewares/validation.middleware";
import AuthController from "../controllers/auth.controller";
import { authZodSchema } from "../validations/auth";
import authMiddleware from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post(
  "/login",
  validationMiddleware(authZodSchema),
  AuthController.login,
);

authRouter.post("/test", authMiddleware, AuthController.login);

export default authRouter;
