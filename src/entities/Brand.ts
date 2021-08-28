import { Entity as TOEntity, Column, OneToMany, ManyToOne } from "typeorm";
import Entity from "./Entity";
import Bike from "./Bike";
import Component from "./Component";
import Account from "./Account";

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

  @ManyToOne(() => Account, (account) => account.brands, { nullable: true })
  account: Account;

  @OneToMany(() => Bike, (bike) => bike.brand, { nullable: true })
  bike: Bike;

  @OneToMany(() => Component, (component) => component.brand, {
    nullable: true,
  })
  component: Component;
}
