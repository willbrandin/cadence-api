import { Request, Response, Router } from "express";
import Bike from "../entities/Bike";
import account from "../middleware/account";

const createBike = async (_: Request, __: Response) => {};
const getBikes = async (_: Request, res: Response) => {
  try {
    const { id } = res.locals.account;
    const bikes = await Bike.find({
      where: {
        account: { id },
      },
      relations: ["components", "mileage", "maintenances", "brand", "rides"],
    });
    return res.status(200).json(bikes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
const getBike = async (req: Request, res: Response) => {
  try {
    const bikeId = req.params.bikeId;
    const { id } = res.locals.account;
    const bike = await Bike.findOne({
      where: {
        id: bikeId,
        account: { id },
      },
      relations: [
        "components",
        "components.mileage",
        "components.maintenances",
        "mileage",
        "maintenances",
        "brand",
        "rides",
      ],
    });
    return res.status(200).json(bike);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
const deleteBike = async (_: Request, __: Response) => {};

const router = Router();
router.get("/", account, getBikes);
router.get("/:bikeId", account, getBike);
router.post("/", account, createBike);
router.delete("/:bikeId", account, deleteBike);

export default router;
