import express from "express";
import { connectDB } from "./lib/connect.js";
import routes from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api", routes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at http://localhost:${PORT}`);
});
