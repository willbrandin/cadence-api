import { Request, Response, Router } from "express";

const getAccount = (req: Request, res: Response) => {};
const updateAccount = (req: Request, res: Response) => {};

const router = Router();
router.get("/", getAccount);
router.put("/", updateAccount);
export default router;
