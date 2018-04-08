/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
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
  }
}
Distinction["__class"] = "Entities.Distinction";

Distinction.__static_initialize();
