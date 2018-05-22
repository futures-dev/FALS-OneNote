/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Material } from "./Material";
export class HyperlinkMaterial extends Material {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!HyperlinkMaterial.__static_initialized) {
      HyperlinkMaterial.__static_initialized = true;
      HyperlinkMaterial.__static_initializer_0();
    }
  }

  public link: string;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        HyperlinkMaterial
      ),
      HyperlinkMaterial
    );
  }

  public constructor() {
    super();
    this.link = null;
  }
}
HyperlinkMaterial["__class"] = "Bank.HyperlinkMaterial";

HyperlinkMaterial.__static_initialize();
