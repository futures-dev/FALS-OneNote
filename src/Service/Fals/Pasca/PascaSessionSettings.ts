/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
export class PascaSessionSettings {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!PascaSessionSettings.__static_initialized) {
      PascaSessionSettings.__static_initialized = true;
      PascaSessionSettings.__static_initializer_0();
    }
  }

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        PascaSessionSettings
      ),
      PascaSessionSettings
    );
  }

  public constructor() {}
}
PascaSessionSettings["__class"] = "Pasca.PascaSessionSettings";

PascaSessionSettings.__static_initialize();
