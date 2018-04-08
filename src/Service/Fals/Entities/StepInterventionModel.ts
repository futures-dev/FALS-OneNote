/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
export abstract class StepInterventionModel {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!StepInterventionModel.__static_initialized) {
      StepInterventionModel.__static_initialized = true;
      StepInterventionModel.__static_initializer_0();
    }
  }

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        StepInterventionModel
      ),
      StepInterventionModel
    );
  }

  public constructor() {}
}
StepInterventionModel["__class"] = "Entities.StepInterventionModel";

StepInterventionModel.__static_initialize();
