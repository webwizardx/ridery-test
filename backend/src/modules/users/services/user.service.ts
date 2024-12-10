import { userModel } from "../model/user.model";
import bcrypt from "bcrypt";
import { User } from "../types";

export default class UserService {
  /**
   * Creates a new user with a hashed password.
   *
   * @param {User} user - The user object containing user details.
   * @returns {Promise<User | null>} - The created user object or null if an error occurs.
   *
   * @throws {Error} - Throws an error if hashing the password or creating the user fails.
   *
   * @author Jonathan Alvarado
   */
  static async create(user: User): Promise<User | null> {
    try {
      user.password = await bcrypt.hash(user.password, 10);
      return await userModel.create(user);
    } catch (error) {
      return null;
    }
  }
}
