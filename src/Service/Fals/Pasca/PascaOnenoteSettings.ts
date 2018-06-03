/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
export class PascaOnenoteSettings {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!PascaOnenoteSettings.__static_initialized) {
      PascaOnenoteSettings.__static_initialized = true;
      PascaOnenoteSettings.__static_initializer_0();
    }
  }

  public pascaSectionGroupName: string;

  public assignmentSectionName: string;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        PascaOnenoteSettings
      ),
      PascaOnenoteSettings
    );
  }

  public constructor() {
    this.pascaSectionGroupName = null;
    this.assignmentSectionName = null;
  }
}
PascaOnenoteSettings["__class"] = "Pasca.PascaOnenoteSettings";

PascaOnenoteSettings.__static_initialize();
