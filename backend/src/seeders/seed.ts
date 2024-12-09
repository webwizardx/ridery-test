import { connect } from "mongoose";
import usersSeed from "../modules/users/seeders/seed";
import vehiclesSeed from "../modules/vehicles/seeders/seed";

process.loadEnvFile();

connect(process.env.MONGO_URI as string)
  .then(async () => {
    console.log("Connected to MongoDB");
    // Seed the database
    await usersSeed();
    await vehiclesSeed();
    process.exit(0);
  })
  .catch(console.error);
