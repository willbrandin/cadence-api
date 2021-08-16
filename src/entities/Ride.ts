import { Entity as TOEntity, Column, ManyToOne } from "typeorm";
import Entity from "./Entity";
import Bike from "./Bike";
import { IsDate, IsInt } from "class-validator";

@TOEntity("rides")
export default class Ride extends Entity {
  @ManyToOne(() => Bike, (bike) => bike.rides)
  bike: Bike;

  @Column()
  @IsDate()
  startDate: Date;

  @Column()
  @IsDate()
  endDate: Date;

  @Column()
  @IsInt()
  distance: number;
}
