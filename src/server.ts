import "reflect-metadata";
import { createConnection } from "typeorm";
import express, { urlencoded } from "express";
import morgan from "morgan";
import trim from "./middleware/trim";
import dotenv from "dotenv";
// Routes
import authRoutes from "./routes/auth";
import bikeRoutes from "./routes/bikes";
import accountRoutes from "./routes/account";
import componentRoutes from "./routes/components";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(trim);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/bikes", componentRoutes);

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
