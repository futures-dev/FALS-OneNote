/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Entity } from "./Entity";
export abstract class Material extends Entity {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!Material.__static_initialized) {
      Material.__static_initialized = true;
      Material.__static_initializer_0();
    }
  }

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(Material),
      Material
    );
  }

  public constructor() {
    super();
  }
}
Material["__class"] = "Bank.Material";

Material.__static_initialize();
