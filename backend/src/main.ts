import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import usersRouter from "./modules/users/routes";
import authRouter from "./modules/auth/routes";
import vehicleRouter from "./modules/vehicles/routes";
process.loadEnvFile();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRouter);
app.use("/api", usersRouter);
app.use("/api", vehicleRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);
