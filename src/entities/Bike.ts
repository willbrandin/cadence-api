import { Entity as TOEntity, Column, ManyToOne } from "typeorm";

import User from "./User";
import Entity from "./Entity";

@TOEntity("bikes")
export default class Bike extends Entity {
  constructor(user: Partial<Bike>) {
    super();
    Object.assign(this, user);
  }

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.bikes)
  user: User;
}
