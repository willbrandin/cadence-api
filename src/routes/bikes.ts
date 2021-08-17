import { Request, Response, Router } from "express";
import account from "../middleware/account";

const createBike = async (_: Request, __: Response) => {};
const getBikes = async (_: Request, __: Response) => {};
const getBike = async (_: Request, __: Response) => {};
const deleteBike = async (_: Request, __: Response) => {};

const router = Router();
router.get("/", account, getBikes);
router.get("/:bikeId", account, getBike);
router.post("/", account, createBike);
router.delete("/:bikeId", account, deleteBike);

export default router;
