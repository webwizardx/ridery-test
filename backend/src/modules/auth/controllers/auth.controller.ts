import { Request, Response } from "express";
import AuthService from "../services/auth.service";

export default class AuthController {
  /**
   * Handles the login request.
   *
   * @param req - The request object containing the login details.
   * @param res - The response object to send the result of the login attempt.
   * @returns A JSON response with a success message and login data, or an error message.
   *
   * @throws Will throw an error if the login attempt fails.
   *
   * @author Jonathan Alvarado
   */
  static async login(req: Request, res: Response) {
    try {
      const data = await AuthService.login(req.body);

      res.status(201).json({ message: "Inicio de sesión exitoso", data });
    } catch (error: any) {
      const message =
        error.message || "Ha ocurrido un error al intentar iniciar sesión";

      res.status(500).json({ message });
    }
  }
}
