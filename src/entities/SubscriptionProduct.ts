import { IsDate } from "class-validator";
import { Entity as TOEntity, Column, OneToMany } from "typeorm";
import Entity from "./Entity";
import User from "./User";

@TOEntity("subscription-products")
export default class SubscriptionProduct extends Entity {
  @OneToMany(() => User, (user) => user.subscription)
  user: User;

  @Column()
  productId: string;

  @Column()
  description: string;

  @Column()
  startDate: Date;

  @Column()
  @IsDate()
  endDate: Date;
}
