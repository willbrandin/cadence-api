import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { urlencoded } from "express";
import morgan from "morgan";
import trim from "./middleware/trim";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(trim);

// Routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(`Running on http://localhost:${PORT}`);
  try {
    await createConnection();
    console.log("Database Connected 🎉");
  } catch (error) {
    console.log(error);
  }
});
