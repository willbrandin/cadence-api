import { Request, Response, Router } from "express";
import Account from "../entities/Account";
import account from "../middleware/account";

const getAccount = async (_: Request, res: Response) => {
  try {
    return res.status(200).json(res.locals.account);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const updateAccount = async (req: Request, res: Response) => {
  try {
    const { id } = res.locals.account;
    const { name } = req.body;

    if (!name || name === "") throw new Error("Name cannot be nil.");

    const account = await Account.findOneOrFail(id);
    account.name = name;
    await account.save();
    return res.status(200).json(account);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const router = Router();
router.get("/", account, getAccount);
router.put("/", account, updateAccount);
export default router;
