import { NextFunction, Request, Response } from "express";
import Account from "../entities/Account";

/*
Rather then handle our own subscribers table:
Rely on Revenue cat to handle purchases. 
When a user subscribes via Revenue Cat:
1. Assign that user an id and email
2. Request from Revenue Cat when handling requesting pro features?
OR
Don't worry about subscriptions server side and only use Revenue Cat?
- Easy
- Use webhooks to store info in DB? 
- App -> RC -> Server
*/
// export default async (_: Request, res: Response, next: NextFunction) => {
//   try {
//     const acc = res.locals.account;
//     if (!acc) throw new Error();

//     const account = await Account.findOneOrFail({
//       where: {
//         id: acc.id,
//       },
//       relations: ["subscription"],
//     });

//     if (!account.subscription) throw new Error();

//     return next();
//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({ error: "Subscription needed" });
//   }
// };
