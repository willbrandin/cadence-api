import { Seeder } from "typeorm-seeding";
import { Connection } from "typeorm";
import bcrypt from "bcrypt";

import Bike from "../entities/Bike";
import Account from "../entities/Account";
import Brand from "../entities/Brand";
import Component from "../entities/Component";
import ComponentType from "../enums/ComponentType";
import Mileage from "../entities/Mileage";

function timePlus(duration = 0) {
  const time = new Date("2020-11-07 07:01:43.18").getTime();

  return new Date(time + duration).toISOString();
}

export default class CreateData implements Seeder {
  public async run(_: any, connection: Connection): Promise<any> {
    const password = await bcrypt.hash("123456", 6);

    const minute = 1000 * 60;
    // const hour = minute * 60;
    // const day = hour * 24;

    // Create accounts
    await connection
      .createQueryBuilder()
      .insert()
      .into(Account)
      .values([
        {
          name: "john",
          email: "john@email.com",
          password,
          createdAt: timePlus(),
          updatedAt: timePlus(),
        },
        {
          name: "jane",
          email: "jane@email.com",
          password,
          createdAt: timePlus(minute * 5),
          updatedAt: timePlus(minute * 5),
        },
      ])
      .execute();

    const john = await Account.findOne({ name: "john" });
    const jane = await Account.findOne({ name: "jane" });

    // Create Brands
    await connection
      .createQueryBuilder()
      .insert()
      .into(Brand)
      .values([
        {
          name: "Yeti",
          isComponentOnly: false,
          createdAt: timePlus(minute * 20),
          updatedAt: timePlus(minute * 20),
        },
        {
          name: "Salsa",
          isComponentOnly: false,
          createdAt: timePlus(minute * 20),
          updatedAt: timePlus(minute * 20),
        },
        {
          name: "Giant",
          isComponentOnly: false,
          createdAt: timePlus(minute * 20),
          updatedAt: timePlus(minute * 20),
        },
        {
          name: "Canyon",
          isComponentOnly: false,
          createdAt: timePlus(minute * 20),
          updatedAt: timePlus(minute * 20),
        },
        {
          name: "Specialized",
          isComponentOnly: false,
          createdAt: timePlus(minute * 20),
          updatedAt: timePlus(minute * 20),
        },
        {
          name: "Shimano",
          isComponentOnly: true,
          createdAt: timePlus(minute * 20),
          updatedAt: timePlus(minute * 20),
        },
        {
          name: "SRAM",
          isComponentOnly: true,
          createdAt: timePlus(minute * 20),
          updatedAt: timePlus(minute * 20),
        },
      ])
      .execute();

    const yetiBrand = await Brand.findOne({ name: "Yeti" });
    const salsaBrand = await Brand.findOne({ name: "Salsa" });
    const giantBrand = await Brand.findOne({ name: "Giant" });
    const canyonBrand = await Brand.findOne({ name: "Canyon" });
    const specializedBrand = await Brand.findOne({ name: "Specialized" });
    const shimanoBrand = await Brand.findOne({ name: "Shimano" });
    const sramBrand = await Brand.findOne({ name: "SRAM" });

    // Create bikes
    await connection
      .createQueryBuilder()
      .insert()
      .into(Bike)
      .values([
        {
          name: "Salsa Timberjack",
          brand: salsaBrand,
          account: john,
          bikeTypeId: 2,
          createdAt: timePlus(minute * 20),
          updatedAt: timePlus(minute * 20),
        },
        {
          name: "Yeti 165",
          brand: yetiBrand,
          account: john,
          bikeTypeId: 2,
          createdAt: timePlus(minute * 20),
          updatedAt: timePlus(minute * 20),
        },
        {
          name: "Specialized Rockhopper",
          brand: specializedBrand,
          account: jane,
          bikeTypeId: 2,
          createdAt: timePlus(minute * 20),
          updatedAt: timePlus(minute * 20),
        },
        {
          name: "Giant Gravelbeast",
          brand: giantBrand,
          account: jane,
          bikeTypeId: 3,
          createdAt: timePlus(minute * 20),
          updatedAt: timePlus(minute * 20),
        },
        {
          name: "Canyon 144",
          brand: canyonBrand,
          account: jane,
          bikeTypeId: 1,
          createdAt: timePlus(minute * 20),
          updatedAt: timePlus(minute * 20),
        },
      ])
      .execute();

    const salsa = await Bike.findOne({ name: "Salsa Timberjack" });
    const yeti = await Bike.findOne({ name: "Yeti 165" });
    const specialized = await Bike.findOne({ name: "Specialized Rockhopper" });
    const giant = await Bike.findOne({ name: "Giant Gravelbeast" });
    const canyon = await Bike.findOne({ name: "Canyon 144" });

    // Create components
    await connection
      .createQueryBuilder()
      .insert()
      .into(Component)
      .values([
        {
          description: "Shimano Breaks",
          componentTypeId: ComponentType.Brake,
          bike: salsa,
          brand: shimanoBrand,
          addedToBikeDate: timePlus(minute * 10),
          createdAt: timePlus(minute * 10),
          updatedAt: timePlus(minute * 10),
        },
        {
          description: "Shimano Breaks",
          componentTypeId: ComponentType.Brake,
          bike: yeti,
          brand: shimanoBrand,
          addedToBikeDate: timePlus(minute * 10),
          createdAt: timePlus(minute * 10),
          updatedAt: timePlus(minute * 10),
        },
        {
          description: "Shimano Breaks",
          componentTypeId: ComponentType.Brake,
          bike: specialized,
          brand: shimanoBrand,
          addedToBikeDate: timePlus(minute * 10),
          createdAt: timePlus(minute * 10),
          updatedAt: timePlus(minute * 10),
        },
        {
          description: "Shimano Breaks",
          componentTypeId: ComponentType.Brake,
          bike: giant,
          brand: shimanoBrand,
          addedToBikeDate: timePlus(minute * 10),
          createdAt: timePlus(minute * 10),
          updatedAt: timePlus(minute * 10),
        },
        {
          description: "Shimano Breaks",
          componentTypeId: ComponentType.Brake,
          bike: canyon,
          brand: shimanoBrand,
          addedToBikeDate: timePlus(minute * 10),
          createdAt: timePlus(minute * 10),
          updatedAt: timePlus(minute * 10),
        },
        {
          description: "Sram Cassette",
          componentTypeId: ComponentType.Cassette,
          bike: salsa,
          brand: sramBrand,
          addedToBikeDate: timePlus(minute * 10),
          createdAt: timePlus(minute * 10),
          updatedAt: timePlus(minute * 10),
        },
        {
          description: "Sram Cassette",
          componentTypeId: ComponentType.Cassette,
          bike: yeti,
          brand: sramBrand,
          addedToBikeDate: timePlus(minute * 10),
          createdAt: timePlus(minute * 10),
          updatedAt: timePlus(minute * 10),
        },
        {
          description: "Sram Cassette",
          componentTypeId: ComponentType.Cassette,
          bike: specialized,
          brand: sramBrand,
          addedToBikeDate: timePlus(minute * 10),
          createdAt: timePlus(minute * 10),
          updatedAt: timePlus(minute * 10),
        },
        {
          description: "Sram Cassette",
          componentTypeId: ComponentType.Cassette,
          bike: giant,
          brand: sramBrand,
          addedToBikeDate: timePlus(minute * 10),
          createdAt: timePlus(minute * 10),
          updatedAt: timePlus(minute * 10),
        },
        {
          description: "Sram Cassette",
          componentTypeId: ComponentType.Cassette,
          bike: canyon,
          brand: sramBrand,
          addedToBikeDate: timePlus(minute * 10),
          createdAt: timePlus(minute * 10),
          updatedAt: timePlus(minute * 10),
        },
      ])
      .execute();

    const components = await Component.find();

    let bikes = [salsa, yeti, giant, canyon, specialized];

    let mileagePromises: Promise<Mileage>[] = [];
    let bikePromises: Promise<Bike>[] = [];

    bikes.forEach((bike) => {
      const mileage = new Mileage({ miles: 35, recommendedMiles: 500, bike });
      mileagePromises.push(mileage.save());
      bike!.mileage = mileage;
      bikePromises.push(bike!.save());
    });

    await Promise.all(mileagePromises);
    await Promise.all(bikePromises);

    let componentMileagePromises: Promise<Mileage>[] = [];
    let componentPromises: Promise<Component>[] = [];

    components.forEach((component) => {
      const mileage = new Mileage({
        miles: 40,
        recommendedMiles: 250,
        component,
      });
      componentMileagePromises.push(mileage.save());
      component!.mileage = mileage;
      componentPromises.push(component!.save());
    });

    await Promise.all(componentMileagePromises);
    await Promise.all(componentPromises);
  }
}
