import { Router } from "express";
import UserController from "../controllers/user.controller";
import validationMiddleware from "../../../middlewares/validation.middleware";
import { userZodSchema } from "../validations/user";

const usersRouter = Router();

usersRouter.post(
  "/users",
  validationMiddleware(userZodSchema),
  UserController.create,
);

export default usersRouter;
