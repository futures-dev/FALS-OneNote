/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
export class ModuleInterventionModel {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!ModuleInterventionModel.__static_initialized) {
      ModuleInterventionModel.__static_initialized = true;
      ModuleInterventionModel.__static_initializer_0();
    }
  }

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        ModuleInterventionModel
      ),
      ModuleInterventionModel
    );
  }

  public constructor() {}
}
ModuleInterventionModel["__class"] = "Entities.ModuleInterventionModel";

ModuleInterventionModel.__static_initialize();
