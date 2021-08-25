import { Request, Response, Router } from "express";
import Bike from "../entities/Bike";
import Component from "../entities/Component";
import account from "../middleware/account";

const getComponents = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;

    const components = await Component.find({
      where: {
        bike: { id: bikeId },
      },
    });

    return res.status(200).json(components);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
const addComponent = async (req: Request, res: Response) => {
  try {
    const { bikeId } = req.params;
    const newComponent = new Component(req.body);

    const bike = await Bike.findOneOrFail(bikeId, {
      relations: ["components"],
    });

    bike.components.push(newComponent);

    await bike.save();

    return res.status(200).json(bike);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
const updateComponent = async (_: Request, __: Response) => {};

const router = Router();
router.get("/:bikeId/components", account, getComponents);
router.post("/:bikeId/components", account, addComponent);
router.put("/:bikeId/components/:componentId", account, updateComponent);

export default router;
