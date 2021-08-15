import { Entity as TOEntity, Column, ManyToOne } from "typeorm";
import Bike from "./Bike";
import Entity from "./Entity";
import { IsEnum } from "class-validator";

import ComponentFamily from "../enums/ComponentFamily";
import ComponentType from "../enums/ComponentType";

@TOEntity("components")
export default class Component extends Entity {
  constructor(user: Partial<Component>) {
    super();
    Object.assign(this, user);
  }

  @Column()
  description: string;

  @Column("int")
  @IsEnum(ComponentFamily)
  componentFamilyId: number;

  @Column("int")
  @IsEnum(ComponentType)
  componentTypeId: ComponentType;

  @ManyToOne(() => Bike, (bike) => bike.components)
  bike: Bike;
}
