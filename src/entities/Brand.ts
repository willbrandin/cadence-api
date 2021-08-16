import { Entity as TOEntity, Column, ManyToMany } from "typeorm";
import Entity from "./Entity";
import Bike from "./Bike";
import Component from "./Component";
import User from "./User";

@TOEntity("brands")
export default class Brand extends Entity {
  constructor(brand: Partial<Brand>) {
    super();
    Object.assign(this, brand);
  }

  @Column()
  name: string;

  @Column()
  isComponentOnly: Boolean;

  @ManyToMany(() => User, (user) => user.brands, { nullable: true })
  user: User;

  @ManyToMany(() => Bike, (bike) => bike.brand, { nullable: true })
  bike: Bike;

  @ManyToMany(() => Component, (component) => component.brand, {
    nullable: true,
  })
  component: Component;
}
