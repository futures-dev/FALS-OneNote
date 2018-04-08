/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Step } from "./Step";
export class ControlStep extends Step {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!ControlStep.__static_initialized) {
      ControlStep.__static_initialized = true;
      ControlStep.__static_initializer_0();
    }
  }

  public exercises: Step[];

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        ControlStep
      ),
      ControlStep
    );
  }

  public constructor() {
    super();
    this.exercises = null;
  }

  public getGrade(): number {
    return 0;
  }
}
ControlStep["__class"] = "Entities.ControlStep";

ControlStep.__static_initialize();
