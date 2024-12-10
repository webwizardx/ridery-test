import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { userModel } from "../../users/model/user.model";
import { User } from "../../users/types";

export default class AuthService {
  /**
   * Logs in a user with the provided email and password.
   *
   * @param {Object} params - The login parameters.
   * @param {string} params.email - The email of the user.
   * @param {string} params.password - The password of the user.
   * @returns {Promise<{ token: string; user: User }>} A promise that resolves to an object containing the authentication token and the user details.
   * @throws {Error} If the user is not found or the credentials are invalid.
   *
   * @author Jonathan Alvarado
   */
  static async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<{ token: string; user: User }> {
    const user = await userModel.findOne({ email });

    if (!user) {
      throw new Error(`User not found with email: ${email}.`);
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (!isPasswordMatching) {
      throw new Error("Credentials are not valid.");
    }

    const token = jsonwebtoken.sign(
      {
        sub: user._id,
        user,
      },
      process.env.SECRET_KEY as string,
      { expiresIn: "1d" },
    );

    return {
      token,
      user,
    };
  }
}
