import { Request, Response, Router } from "express";
import account from "../middleware/account";

const getComponents = async (_: Request, __: Response) => {};
const addComponent = async (_: Request, __: Response) => {};
const updateComponent = async (_: Request, __: Response) => {};

const router = Router();
router.get("/:bikeId/components", account, getComponents);
router.post("/:bikeId/components", account, addComponent);
router.put("/:bikeId/components/:componentId", account, updateComponent);

export default router;
