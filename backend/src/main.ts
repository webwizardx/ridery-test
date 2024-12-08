import express from "express";
import cors from "cors";
import { connect } from "mongoose";
import usersRouter from "./modules/users/routes";
process.loadEnvFile();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(usersRouter);

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, TypeScript Express!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

connect(process.env.MONGO_URI as string)
  .then(() => console.log("Connected to MongoDB"))
  .catch(console.error);
