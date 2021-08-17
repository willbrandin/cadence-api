import {
  Entity as TOEntity,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
  Index,
  Column,
  BeforeInsert,
} from "typeorm";

import Entity from "./Entity";
import Bike from "./Bike";
import Brand from "./Brand";
import SubscriptionProduct from "./SubscriptionProduct";
import Ride from "./Ride";
import { IsEmail, Length } from "class-validator";
import { Exclude } from "class-transformer";
import bcrypt from "bcrypt";

@TOEntity("accounts")
export default class Account extends Entity {
  constructor(account: Partial<Account>) {
    super();
    Object.assign(this, account);
  }

  @Index()
  @IsEmail(undefined, { message: "Must be a valid email address" })
  @Length(1, 255, { message: "Email is empty" })
  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  @Length(6, 255, { message: "Must be at least 6 characters long" })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 6);
  }

  @OneToMany(() => Bike, (bike) => bike.account, { nullable: true })
  bikes: Bike[];

  @ManyToMany(() => Brand, (brand) => brand.account, { nullable: true })
  @JoinTable()
  brands: Brand[];

  @ManyToOne(
    () => SubscriptionProduct,
    (subscription) => subscription.account,
    {
      nullable: true,
    }
  )
  subscription: SubscriptionProduct;

  @ManyToOne(() => Ride, (ride) => ride.account)
  rides: Ride[];
}
