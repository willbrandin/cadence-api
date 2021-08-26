import {
  Entity as TOEntity,
  Column,
  ManyToOne,
  OneToMany,
  OneToOne,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { IsEnum } from "class-validator";

import Bike from "./Bike";
import Entity from "./Entity";
import Maintenance from "./Maintenance";
import Mileage from "./Mileage";
import ComponentType from "../enums/ComponentType";
import Brand from "./Brand";
import { Expose } from "class-transformer";
import ComponentGroup from "../enums/ComponentGroup";
import componentGroup from "../enums/ComponentTypeGroup";

@TOEntity("components")
export default class Component extends Entity {
  constructor(component: Partial<Component>) {
    super();
    Object.assign(this, component);
  }

  @Column()
  description: string;

  @Column()
  @IsEnum(ComponentType)
  componentTypeId: ComponentType;

  @Column()
  addedToBikeDate: Date;

  @ManyToOne(() => Bike, (bike) => bike.components)
  bike: Bike;

  @OneToOne(() => Mileage, (mileage) => mileage.component)
  mileage: Mileage;

  @OneToMany(() => Maintenance, (maintenance) => maintenance.component)
  maintenances: Maintenance[];

  @ManyToMany(() => Brand, (brand) => brand.component)
  @JoinTable()
  brand: Brand;

  @Expose()
  get componentGroup(): ComponentGroup {
    return componentGroup(this.componentTypeId);
  }
}
