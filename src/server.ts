import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
// import trim from "./middleware/trim";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();


const app = express();

app.use(express.json());
app.use(morgan("dev"));
// app.use(trim);
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);

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