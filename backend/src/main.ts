import express from "express";
process.loadEnvFile();

const app = express();
const port = process.env.PORT || 5000;

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello, TypeScript Express! test");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
