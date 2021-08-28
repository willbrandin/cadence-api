import { Entity as TOEntity, Column, OneToOne, JoinColumn } from "typeorm";
import Entity from "./Entity";
import Bike from "./Bike";
import Component from "./Component";
import { IsInt } from "class-validator";
import MileageStatus from "../enums/MileageStatus";
import { Expose } from "class-transformer";

@TOEntity("mileage")
export default class Mileage extends Entity {
  constructor(mileage: Partial<Mileage>) {
    super();
    Object.assign(this, mileage);
  }

  @Column()
  @IsInt()
  miles: number;

  @Column()
  @IsInt()
  recommendedMiles: number;

  @OneToOne(() => Bike, (bike) => bike.mileage)
  @JoinColumn()
  bike: Bike;

  @OneToOne(() => Component, (component) => component.mileage)
  @JoinColumn()
  component: Component;

  @Expose()
  get mileageStatusTypeId(): MileageStatus {
    // Divide miles from recommended.
    // This describes what percentage the component is in
    let milesPercent = (this.miles / this.recommendedMiles) * 100;
    // Floor this to avoid Floating point number
    let mileageStatusPercent = Math.floor(milesPercent);

    if (mileageStatusPercent > 90) {
      return MileageStatus.MaintenceNeeded;
    } else if (mileageStatusPercent > 70) {
      return MileageStatus.MaintenanceRecommended;
    } else if (mileageStatusPercent > 50) {
      return MileageStatus.Okay;
    } else if (mileageStatusPercent > 30) {
      return MileageStatus.Good;
    } else {
      return MileageStatus.Great;
    }
  }
}
