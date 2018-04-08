/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Entity } from "./Entity";
export class Key extends Entity {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!Key.__static_initialized) {
      Key.__static_initialized = true;
      Key.__static_initializer_0();
    }
  }

  public value: string;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(Key),
      Key
    );
  }

  public constructor() {
    super();
    this.value = null;
  }
}
Key["__class"] = "Bank.Key";

Key.__static_initialize();
