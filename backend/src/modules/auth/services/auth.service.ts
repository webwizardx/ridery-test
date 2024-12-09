import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { userModel } from "../../users/model/user.model";

export default class AuthService {
  static async login({ email, password }: { email: string; password: string }) {
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
