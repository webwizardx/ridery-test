import { userModel } from "../model/user.model";
import bcrypt from "bcrypt";
import { User } from "../types";

export default class UserService {
  static async create(user: User) {
    try {
      user.password = await bcrypt.hash(user.password, 10);
      return await userModel.create(user);
    } catch (error) {
      return null;
    }
  }
}
