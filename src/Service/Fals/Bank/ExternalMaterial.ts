/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Material } from "./Material";
export class ExternalMaterial extends Material {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!ExternalMaterial.__static_initialized) {
      ExternalMaterial.__static_initialized = true;
      ExternalMaterial.__static_initializer_0();
    }
  }

  public href: string;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        ExternalMaterial
      ),
      ExternalMaterial
    );
  }

  public constructor() {
    super();
    this.href = null;
  }
}
ExternalMaterial["__class"] = "Bank.ExternalMaterial";

ExternalMaterial.__static_initialize();
