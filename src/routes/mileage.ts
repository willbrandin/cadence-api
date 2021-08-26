import { Request, Response, Router } from "express";
import Bike from "../entities/Bike";
import Component from "../entities/Component";
import account from "../middleware/account";

const getBikeMileage = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;
    const bike = await Bike.findOneOrFail(bikeId, {
      relations: ["components", "components.mileage", "mileage"],
    });
    return res.status(200).json(bike);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getComponentMiles = async (_: Request, __: Response) => {};

const addMileage = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;
    const { miles } = req.body;
    const bike = await Bike.findOneOrFail(bikeId, {
      relations: ["components", "components.mileage", "mileage"],
    });
    if (!bike.mileage.miles) {
      bike.mileage.miles = miles;
    } else {
      bike.mileage.miles += miles;
    }

    return addComponentMileage(bike, req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const addComponentMileage = async (bike: Bike, req: Request, res: Response) => {
  // 1. Add mileage to the component
  // 2. Change status on the component
  // 3. Should component use miles? Are Hours an option?
  try {
    const { bikeId } = req.params;
    const { miles } = req.body;
    const components = await Component.find({
      where: { bike: { id: bikeId } },
    });

    const promises: Promise<Component>[] = [];

    components.forEach((component) => {
      if (!component.mileage.miles) {
        component.mileage.miles = miles;
      } else {
        component.mileage.miles += miles;
      }

      promises.push(component.save());
    });

    await Promise.all(promises);

    bike.components = components;
    await bike.save();
    return res.status(200).json(bike);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const router = Router();
router.get("/:bikeId/miles", account, getBikeMileage);
router.get(
  "/:bikeId/components/:componentId/miles",
  account,
  getComponentMiles
);
router.post("/:bikeId/miles", account, addMileage);

export default router;
