import {
  Entity as TOEntity,
  OneToMany,
  ManyToOne,
  Index,
  Column,
  BeforeInsert,
} from "typeorm";

import Entity from "./Entity";
import Bike from "./Bike";
import Brand from "./Brand";
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

  @Column({ nullable: true })
  name: string;

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

  @OneToMany(() => Brand, (brand) => brand.account, { nullable: true })
  brands: Brand[];

  @ManyToOne(() => Ride, (ride) => ride.account)
  rides: Ride[];
}
