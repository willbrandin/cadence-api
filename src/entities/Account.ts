import {
  Entity as TOEntity,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinTable,
  OneToOne,
} from "typeorm";

import Entity from "./Entity";
import Bike from "./Bike";
import Brand from "./Brand";
import SubscriptionProduct from "./SubscriptionProduct";
import Login from "./Login";
import Ride from "./Ride";

@TOEntity("accounts")
export default class Account extends Entity {
  constructor(account: Partial<Account>) {
    super();
    Object.assign(this, account);
  }

  @OneToOne(() => Login, (login) => login.account)
  login: Login;

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
