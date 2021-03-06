import { Request, Response, Router } from "express";
import Bike from "../entities/Bike";
import account from "../middleware/account";
import Mileage from "../entities/Mileage";
import Brand from "../entities/Brand";

const createBike = async (req: Request, res: Response) => {
  try {
    const account = res.locals.account;
    const { name, bikeTypeId, bikeBrandId, recommendedMiles } = req.body;

    const brand = await Brand.findOneOrFail(bikeBrandId);

    if (brand.isComponentOnly)
      throw new Error("This is a component only brand.");

    const bike = new Bike({ name, bikeTypeId, account, brand });

    const mileage = new Mileage({
      miles: 0,
      recommendedMiles,
      bike,
    });

    await mileage.save();
    bike.mileage = mileage;
    await bike.save();

    return res.status(201).json(bike);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getBikes = async (_: Request, res: Response) => {
  try {
    const { id } = res.locals.account;
    const bikes = await Bike.find({
      where: {
        account: { id },
      },
      relations: [
        "components",
        "components.brand",
        "brand",
        "mileage",
        "rides",
      ],
    });
    return res.status(200).json(bikes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getBike = async (req: Request, res: Response) => {
  try {
    const bikeId = req.params.bikeId;
    const { id } = res.locals.account;
    const bike = await Bike.findOneOrFail(bikeId, {
      where: {
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
router.post("/", account, createBike);
router.get("/:bikeId", account, getBike);
router.delete("/:bikeId", account, deleteBike);

export default router;
