import { Request, Response, Router } from "express";
import account from "../middleware/account";

const getBikeMileage = async (_: Request, __: Response) => {};
const getComponentMiles = async (_: Request, __: Response) => {};
const addMileage = async (_: Request, __: Response) => {
  // 1. Add Miles to Bike
  // 2. For Each component on the bike, add these miles.
  // 3. Update mileage status based on miles?
};

// const addComponentMileage = async (_: Request, __: Response) => {
//   // 1. Add mileage to the component
//   // 2. Change status on the component
//   // 3. Should component use miles? Are Hours an option?
// };

const router = Router();
router.get("/:bikeId/miles", account, getBikeMileage);
router.get(
  "/:bikeId/components/:componentId/miles",
  account,
  getComponentMiles
);
router.post("/:bikeId/miles", account, addMileage);

export default router;
