import express from "express";
import dotenv from "dotenv";
import { createServer } from "http";
import planetRoutes from "./routes/planetRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api", planetRoutes);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.get("/", (req, res) => res.send("Express on Vercel"));

const server = createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
export default app;
