import { Request, Response, Router } from "express";
import { isEmpty, validate } from "class-validator";
import Login from "../entities/Login";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

    const login = await Login.findOne({ email });

    if (!login) return res.status(404).json({ email: "User not found" });

    const passwordMatches = await bcrypt.compare(password, login.password);

    if (!passwordMatches) {
      return res.status(404).json({ login: "User not found" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET!);
    return res.json({ login, token });
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

    const emailUser = await Login.findOne({ email });

    if (emailUser) errors.email = "Email is already taken";

    if (Object.keys(errors).length > 0) {
      return res.status(400).json(errors);
    }

    const login = new Login({ email, password });

    errors = await validate(login);

    if (errors.length > 0) {
      return res.status(400).json(mapErrors(errors));
    }

    await login.save();
    return res.json(login).status(201);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

const signUpWithApple = async (_: Request, res: Response) => {
  return res.status(404).json({ error: "This not work yet my dude" });
};

const router = Router();
router.post("/sign-in", authenticate);
router.post("/sign-up", signUp);
export default router;
