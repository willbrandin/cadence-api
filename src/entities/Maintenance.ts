import { Entity as TOEntity, Column, ManyToOne } from "typeorm";
import Entity from "./Entity";
import Bike from "./Bike";
import Component from "./Component";
import { IsDate } from "class-validator";

@TOEntity("maintenance")
export default class Maintenance extends Entity {
  constructor(maintenance: Partial<Maintenance>) {
    super();
    Object.assign(this, maintenance);
  }

  @Column()
  @IsDate()
  serviceDate: Date;

  @Column()
  description: string;

  @ManyToOne(() => Bike, (bike) => bike.maintenances)
  bike: Bike;

  @ManyToOne(() => Component, (component) => component.maintenance)
  component: Component;
}
