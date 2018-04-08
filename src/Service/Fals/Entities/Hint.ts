/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { StepInterventionModel } from "./StepInterventionModel";
export class Hint extends StepInterventionModel {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!Hint.__static_initialized) {
      Hint.__static_initialized = true;
      Hint.__static_initializer_0();
    }
  }

  public message: string;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(Hint),
      Hint
    );
  }

  public constructor() {
    super();
    this.message = null;
  }
}
Hint["__class"] = "Entities.Hint";

Hint.__static_initialize();
