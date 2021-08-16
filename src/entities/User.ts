import { IsEmail, IsNotEmpty, Length } from "class-validator";
import bcrypt from "bcrypt";
import {
  Entity as TOEntity,
  Column,
  Index,
  BeforeInsert,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from "typeorm";

import { Exclude } from "class-transformer";
import Entity from "./Entity";
import Bike from "./Bike";
import Brand from "./Brand";
import SubscriptionProduct from "./SubscriptionProduct";

@TOEntity("users")
export default class User extends Entity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @Index()
  @IsEmail(undefined, { message: "Must be a valid email address" })
  @Length(1, 255, { message: "Email is empty" })
  @Column({ unique: true })
  email: string;

  @Index()
  @Length(1, 255, { message: "Must be at least 3 characters long" })
  @IsNotEmpty()
  @Column()
  name: string;

  @Exclude()
  @Column()
  @Length(6, 255, { message: "Must be at least 6 characters long" })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }

  @OneToMany(() => Bike, (bike) => bike.user)
  bikes: Bike[];

  @ManyToMany(() => Brand, (brand) => brand.user, { nullable: true })
  @JoinTable()
  brands: Brand[];

  @ManyToOne(() => SubscriptionProduct, (subscription) => subscription.user, {
    nullable: true,
  })
  subscription: SubscriptionProduct;
}
