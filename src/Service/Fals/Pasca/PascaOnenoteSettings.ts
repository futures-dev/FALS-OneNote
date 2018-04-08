/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
export class PascaOnenoteSettings {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!PascaOnenoteSettings.__static_initialized) {
      PascaOnenoteSettings.__static_initialized = true;
      PascaOnenoteSettings.__static_initializer_0();
    }
  }

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        PascaOnenoteSettings
      ),
      PascaOnenoteSettings
    );
  }

  public constructor() {}
}
PascaOnenoteSettings["__class"] = "Pasca.PascaOnenoteSettings";

PascaOnenoteSettings.__static_initialize();
