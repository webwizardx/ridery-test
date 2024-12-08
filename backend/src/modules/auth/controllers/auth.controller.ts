import { Request, Response } from "express";
import AuthService from "../services/auth.service";

export default class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const data = await AuthService.login(req.body);

      res.status(201).json({ message: "Login successful", data });
    } catch (error: any) {
      const message =
        error.message || "An error occurred while creating the user";

      res.status(500).json({ message });
    }
  }
}
