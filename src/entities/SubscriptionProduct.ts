import { IsDate } from "class-validator";
import { Entity as TOEntity, Column } from "typeorm";
import Entity from "./Entity";

@TOEntity("subscription-products")
export default class SubscriptionProduct extends Entity {
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
