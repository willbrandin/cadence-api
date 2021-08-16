import { Entity as TOEntity, Column, ManyToOne } from "typeorm";
import Entity from "./Entity";
import Bike from "./Bike";
import Component from "./Component";
import { IsEnum, IsInt } from "class-validator";
import MileageStatus from "../enums/MileageStatus";

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

  @Column()
  @IsEnum(MileageStatus)
  status: MileageStatus;

  @ManyToOne(() => Bike, (bike) => bike.mileage)
  bike: Bike;

  @ManyToOne(() => Component, (component) => component.mileage)
  component: Component;
}
