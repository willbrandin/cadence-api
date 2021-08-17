import { Request, Response, Router } from "express";

const getAccount = (_: Request, __: Response) => {};
const updateAccount = (_: Request, __: Response) => {};

const router = Router();
router.get("/", getAccount);
router.put("/", updateAccount);
export default router;
