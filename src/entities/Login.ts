import {
  Entity as TOEntity,
  Column,
  Index,
  BeforeInsert,
  OneToOne,
} from "typeorm";
import { IsEmail, Length } from "class-validator";
import bcrypt from "bcrypt";
import { Exclude } from "class-transformer";
import Entity from "./Entity";
import Account from "./Account";

@TOEntity("logins")
export default class Login extends Entity {
  constructor(login: Partial<Login>) {
    super();
    Object.assign(this, login);
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

  @OneToOne(() => Account, (account) => account.login)
  account: Account;
}
