/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
export class PascaSessionSettings {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!PascaSessionSettings.__static_initialized) {
      PascaSessionSettings.__static_initialized = true;
      PascaSessionSettings.__static_initializer_0();
    }
  }

  public sessionName: string;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        PascaSessionSettings
      ),
      PascaSessionSettings
    );
  }

  public constructor() {
    this.sessionName = null;
  }
}
PascaSessionSettings["__class"] = "Pasca.PascaSessionSettings";

PascaSessionSettings.__static_initialize();
