import Bike from './Bike'
import Entity from './Entity'

@TOEntity("components")
export default class Bike extends Entity {
  constructor(user: Partial<Bike>) {
    super();
    Object.assign(this, user);
  }

  @Column()
  description: string;

  @Column()
  type: number;

  @ManyToOne(() => Bike, (bike) => bike.component)
  bike: Bike;
}
