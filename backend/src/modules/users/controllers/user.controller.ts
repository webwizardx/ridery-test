import { Request, Response } from "express";
import UserService from "../services/user.service";

export default class UserController {
  /**
   * Creates a new user.
   *
   * This method handles the creation of a new user by calling the UserService.create method
   * with the request body. If the user already exists, it responds with a 400 status code
   * and a message indicating that the user already exists. If the user is created successfully,
   * it responds with a 201 status code and a message indicating success along with the user data.
   * In case of any errors during the process, it responds with a 500 status code and an error message.
   *
   * @param req - The request object containing the user data in the body.
   * @param res - The response object used to send the response.
   *
   * @returns A promise that resolves to void.
   *
   * @throws Will throw an error if there is an issue with creating the user.
   *
   * @author Jonathan Alvarado
   */
  static async create(req: Request, res: Response) {
    try {
      const user = await UserService.create(req.body);

      if (!user) {
        res.status(400).json({ message: "El usuario existe en el sistema." });
        return;
      }

      res
        .status(201)
        .json({ message: "Usuario creado exitosamente", data: user });
    } catch (error: any) {
      const message =
        error.message || "Ha ocurrido un error al intentar crear el usuario.";

      res.status(500).json({ message });
    }
  }
}
