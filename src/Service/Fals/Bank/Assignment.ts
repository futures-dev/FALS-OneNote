/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
import { Entity } from "./Entity";
export class Assignment extends Entity {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!Assignment.__static_initialized) {
      Assignment.__static_initialized = true;
      Assignment.__static_initializer_0();
    }
  }

  public content: string;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        Assignment
      ),
      Assignment
    );
  }

  public constructor() {
    super();
    this.content = null;
  }
}
Assignment["__class"] = "Bank.Assignment";

Assignment.__static_initialize();
