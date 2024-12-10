import { Router } from "express";
import validationMiddleware from "../../../middlewares/validation.middleware";
import AuthController from "../controllers/auth.controller";
import { authZodSchema } from "../validations/auth";

const authRouter = Router();

authRouter.post(
  "/login",
  validationMiddleware(authZodSchema),
  AuthController.login,
);

export default authRouter;
