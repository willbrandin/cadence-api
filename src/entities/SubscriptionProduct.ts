import { IsDate } from "class-validator";
import { Entity as TOEntity, Column, OneToMany } from "typeorm";
import Entity from "./Entity";
import Account from "./Account";

@TOEntity("subscription-products")
export default class SubscriptionProduct extends Entity {
  @OneToMany(() => Account, (Account) => Account.subscription)
  account: Account;

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
