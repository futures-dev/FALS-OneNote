/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
import { Material } from "./Material";
export class HypertextMaterial extends Material {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!HypertextMaterial.__static_initialized) {
      HypertextMaterial.__static_initialized = true;
      HypertextMaterial.__static_initializer_0();
    }
  }

  public content: string;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        HypertextMaterial
      ),
      HypertextMaterial
    );
  }

  public constructor() {
    super();
    this.content = null;
  }
}
HypertextMaterial["__class"] = "Bank.HypertextMaterial";

HypertextMaterial.__static_initialize();
