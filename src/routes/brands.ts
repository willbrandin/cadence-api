import { Request, Response, Router } from "express";
import Account from "../entities/Account";
import Brand from "../entities/Brand";
import account from "../middleware/account";

const getBrands = async (_: Request, res: Response) => {
  const { id } = res.locals.account;
  try {
    const userBrands = await Brand.find({
      // Returns brands where the account is null aka public brands
      // OR returns brands created by this account
      where: [{ account: null }, { account: { id } }],
    });
    return res.status(200).json(userBrands);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const postUserBrand = async (req: Request, res: Response) => {
  try {
    const account: Account = res.locals.account;
    const { name, isComponentOnly } = req.body;

    const existingBrands = await Brand.find({
      where: [
        { account: null, name },
        { account, name },
      ],
    });

    if (existingBrands.length !== 0) throw new Error("Brand already exists");

    const brand = new Brand({
      name,
      isComponentOnly,
      account,
    });

    await brand.save();
    return res.status(201).json(brand);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const router = Router();
router.get("/", account, getBrands);
router.post("/", account, postUserBrand);
export default router;
