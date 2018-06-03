/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
import { Hint } from "./Hint";
export class Distinction extends Hint {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!Distinction.__static_initialized) {
      Distinction.__static_initialized = true;
      Distinction.__static_initializer_0();
    }
  }

  public entity1: string;

  public entity2: string;

  public distinctor: string;

  public message: string;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        Distinction
      ),
      Distinction
    );
  }

  public constructor() {
    super();
    this.entity1 = null;
    this.entity2 = null;
    this.distinctor = null;
    this.message = null;
  }
}
Distinction["__class"] = "Entities.Distinction";

Distinction.__static_initialize();
