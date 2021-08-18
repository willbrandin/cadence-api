import ComponentGroup from "./ComponentGroup";

enum ComponentType {
  BrakeCable = 1,
  BrakeLever,
  Brake,
  BrakeRotor,
  Cassette,
  Chain,
  Cogset,
  Crankset,
  Derailleur,
  Dropper,
  Fork,
  Frame,
  Handlebars,
  Hub,
  InnerTube,
  Pedal,
  Saddle,
  Shifter,
  ShiftCable,
  ShockFront,
  ShockRear,
  Sprocket,
  Stem,
  Tire,
  Wheel,
}

function componentGroup(component: ComponentType): ComponentGroup {
  switch (component) {
    case (ComponentType.BrakeCable,
    ComponentType.BrakeLever,
    ComponentType.Brake,
    ComponentType.BrakeRotor): {
      return ComponentGroup.Brakes;
    }

    case (ComponentType.Cogset,
    ComponentType.Crankset,
    ComponentType.Cassette,
    ComponentType.Derailleur,
    ComponentType.Chain,
    ComponentType.Pedal,
    ComponentType.Sprocket,
    ComponentType.Shifter,
    ComponentType.ShiftCable): {
      return ComponentGroup.Drivetrain;
    }

    case (ComponentType.Frame,
    ComponentType.Dropper,
    ComponentType.Fork,
    ComponentType.Saddle): {
      return ComponentGroup.Frame;
    }

    case (ComponentType.Hub,
    ComponentType.Wheel,
    ComponentType.Tire,
    ComponentType.InnerTube): {
      return ComponentGroup.Wheelset;
    }

    case (ComponentType.Handlebars, ComponentType.Stem): {
      return ComponentGroup.Handlebars;
    }

    case (ComponentType.ShockFront, ComponentType.ShockRear): {
      return ComponentGroup.Suspension;
    }

    default: {
      return ComponentGroup.Miscellaneus;
    }
  }
}

export default ComponentType;
