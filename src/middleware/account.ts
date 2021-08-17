import { NextFunction, Request, Response } from "express";
import Account from "../entities/Account";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) return next();

    const { email }: any = jwt.verify(token, process.env.JWT_SECRET!);
    const account = await Account.findOne({ email });
    res.locals.account = account;

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "unauthorized" });
  }
};
