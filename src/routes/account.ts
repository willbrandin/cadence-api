import { Request, Response, Router } from "express";

const updateAccount = (_: Request, __: Response) => {};

const router = Router();
router.put("/", updateAccount);
export default router;
