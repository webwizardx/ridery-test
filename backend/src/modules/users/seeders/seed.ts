import bcrypt from "bcrypt";
import { userModel } from "../model/user.model";

export default async function usersSeed() {
  const users = [
    {
      email: "admin@ridery.app",
      password: "password",
    },
  ];

  for (const user of users) {
    const existingUser = await userModel.findOne({ email: user.email });

    if (existingUser) {
      console.log(`User ${user.email} already exists!`);
      continue;
    }

    user.password = await bcrypt.hash(user.password, 10);
    const newUser = new userModel(user);
    await newUser.save();
    console.log(`User ${user.email} created successfully!`);
  }

  console.log("User seeding completed successfully!");
}
