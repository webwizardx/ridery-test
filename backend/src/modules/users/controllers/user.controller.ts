import { Request, Response } from "express";
import UserService from "../services/user.service";

export default class UserController {
  static async create(req: Request, res: Response) {
    try {
      const user = await UserService.create(req.body);

      if (!user) {
        res.status(400).json({ message: "User already exists" });
        return;
      }

      res
        .status(201)
        .json({ message: "User created successfully", data: user });
    } catch (error: any) {
      const message =
        error.message || "An error occurred while creating the user";

      res.status(500).json({ message });
    }
  }
}
