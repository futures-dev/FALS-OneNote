/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
export class VersionDescription {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!VersionDescription.__static_initialized) {
      VersionDescription.__static_initialized = true;
      VersionDescription.__static_initializer_0();
    }
  }

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        VersionDescription
      ),
      VersionDescription
    );
  }

  public constructor() {}
}
VersionDescription["__class"] = "Bank.VersionDescription";

VersionDescription.__static_initialize();
