import { Request, Response, Router } from "express";
import account from "../middleware/account";

const getMaintence = async (_: Request, __: Response) => {};
const addMaintenence = async (_: Request, __: Response) => {};

const router = Router();
router.get(
  "/:bikeId/components/:componentId/maintenence",
  account,
  getMaintence
);
router.post(
  "/:bikeId/components/:componentId/maintenence",
  account,
  addMaintenence
);

export default router;
