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
    newComponent.addedToBikeDate = new Date();
    await newComponent.save();

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

const removeComponent = async (req: Request, res: Response) => {
  try {
    const { bikeId, componentId } = req.params;

    const bike = await Bike.findOneOrFail(bikeId, {
      relations: ["components"],
    });

    bike.components = bike.components.filter(
      (component) => componentId !== component.id.toString()
    );

    await bike.save();

    await Component.delete(componentId);

    return res.status(200).json(bike);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const router = Router();
router.get("/:bikeId/components", account, getComponents);
router.post("/:bikeId/components", account, addComponent);
router.put("/:bikeId/components/:componentId", account, updateComponent);
router.delete("/:bikeId/components/:componentId", account, removeComponent);

export default router;
