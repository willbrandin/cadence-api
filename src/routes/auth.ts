import { Request, Response, Router } from "express";
import { isEmpty, validate } from "class-validator";
import Account from "../entities/Account";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import account from "../middleware/account";

const mapErrors = (errors: Object[]) => {
  return errors.reduce((prev: any, error: any) => {
    prev[error.property] = Object.entries(error.constraints)[0][1];
    return prev;
  }, {});
};

const authenticate = async (req: Request, res: Response) => {
  try {
    // 1. If there is an apple token, then authenticate with Apple
    if (req.body.appleToken) {
      return authenticateWithApple(req, res);
    }
    // 2. Else sign in with email and password
    const { email, password } = req.body;

    let errors: any = {};

    if (isEmpty(email)) errors.email = "Email cannot be empty";
    if (isEmpty(password)) errors.password = "Password cannot be empty";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const account = await Account.findOne({ email });
    if (!account) return res.status(404).json({ email: "Account not found" });
    const passwordMatches = await bcrypt.compare(password, account.password);

    if (!passwordMatches) {
      return res.status(404).json({ username: "User not found" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET!);
    return res.json({ account, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const authenticateWithApple = async (_: Request, res: Response) => {
  return res.status(404).json({ error: "This not work yet my dude" });
};

const signUp = async (req: Request, res: Response) => {
  try {
    // 1. If there is an apple token
    if (req.body.appleToken) {
      return signUpWithApple(req, res);
    }

    // 2. Else sign up user with Email and Password
    const { email, password } = req.body;

    let errors: any = {};
    const emailAccount = await Account.findOne({ email });

    if (emailAccount) errors.email = "Email is already taken";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const account = new Account({ email, password });

    errors = await validate(account);

    if (errors.length > 0) {
      return res.status(400).json(mapErrors(errors));
    }

    await account.save();
    return res.json(account).status(201);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const signUpWithApple = async (_: Request, res: Response) => {
  return res.status(404).json({ error: "This not work yet my dude" });
};

const postForgotPassword = async (_: Request, res: Response) => {
  return res.status(404).json({ error: "This not work yet my dude" });
};

const postResetPassword = async (_: Request, res: Response) => {
  try {
    const { email } = res.locals.account;
    if (!email) throw new Error("Email required to reset password.");

    const account = Account.findOneOrFail({
      where: { email },
    });

    if (!account) throw new Error("Account not found");

    // Nodemailer to account email.
    return res.status(200).json({ message: "Okay" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error });
  }
};

const router = Router();
router.post("/sign-in", authenticate);
router.post("/sign-up", signUp);
router.post("/:accountId/reset-password", account, postResetPassword);
router.post("/forgot-password", postForgotPassword);
export default router;
