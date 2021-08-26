import {
  Entity as TOEntity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
} from "typeorm";

import Account from "./Account";
import Entity from "./Entity";
import Component from "./Component";
import BikeType from "../enums/BikeType";
import { IsEnum } from "class-validator";
import Mileage from "./Mileage";
import Maintenance from "./Maintenance";
import Brand from "./Brand";
import Ride from "./Ride";

@TOEntity("bikes")
export default class Bike extends Entity {
  constructor(user: Partial<Bike>) {
    super();
    Object.assign(this, user);
  }

  @Column()
  name: string;

  @ManyToOne(() => Account, (account) => account.bikes)
  account: Account;

  @OneToMany(() => Component, (component) => component.bike, {
    onDelete: "CASCADE",
  })
  components: Component[];

  @Column("int")
  @IsEnum(BikeType)
  bikeTypeId: BikeType;

  @OneToOne(() => Mileage, (mileage) => mileage.bike, { onDelete: "CASCADE" })
  mileage: Mileage;

  @OneToMany(() => Maintenance, (maintenance) => maintenance.bike, {
    onDelete: "CASCADE",
  })
  maintenances: Maintenance[];

  @ManyToMany(() => Brand, (brand) => brand.bike)
  @JoinTable()
  brand: Brand;

  @OneToMany(() => Ride, (ride) => ride.bike)
  rides: Ride[];
}
