/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Entity } from "../Bank/Entity";
export class Statistics extends Entity {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!Statistics.__static_initialized) {
      Statistics.__static_initialized = true;
      Statistics.__static_initializer_0();
    }
  }

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        Statistics
      ),
      Statistics
    );
  }

  public constructor() {
    super();
  }
}
Statistics["__class"] = "Statistics.Statistics";

Statistics.__static_initialize();
