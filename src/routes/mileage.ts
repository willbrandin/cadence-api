import { Request, Response, Router } from "express";
import Bike from "../entities/Bike";
import Component from "../entities/Component";
import account from "../middleware/account";

const getBikeMileage = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;
    const bike = await Bike.findOneOrFail(bikeId, {
      where: { account: { id: res.locals.account.id } },
      relations: ["components", "components.mileage", "mileage"],
    });

    return res.status(200).json(bike);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const addMileage = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;
    const { miles } = req.body;
    const bike = await Bike.findOneOrFail(bikeId, {
      relations: ["components", "components.mileage", "mileage"],
    });
    if (!bike.mileage.miles) {
      bike.mileage.miles = Number(miles);
    } else {
      bike.mileage.miles += Number(miles);
    }

    bike.components.forEach((component) => {
      if (!component.mileage.miles) {
        component.mileage.miles = Number(miles);
      } else {
        component.mileage.miles += Number(miles);
      }
    });

    await bike.save();

    return res.status(201).json(bike);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const addMilesToComponent = async (req: Request, res: Response) => {
  try {
    const { componentId } = req.params;
    const { miles } = req.body;
    const component = await Component.findOneOrFail(componentId, {
      relations: ["mileage"],
    });
    component.mileage.miles += Number(miles);
    await component.mileage.save();
    await component.save();
    return res.status(201).json(component);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const router = Router();
router.get("/bikes/:bikeId/miles", account, getBikeMileage);
router.post("/bikes/:bikeId/miles", account, addMileage);
router.post("/components/:componentId/miles", account, addMilesToComponent);

export default router;
