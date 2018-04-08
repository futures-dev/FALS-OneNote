/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { ModuleStatistics } from "./ModuleStatistics";
export class ModuleTime extends ModuleStatistics {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!ModuleTime.__static_initialized) {
      ModuleTime.__static_initialized = true;
      ModuleTime.__static_initializer_0();
    }
  }

  public beginTime: Date;

  public finishTime: Date;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        ModuleTime
      ),
      ModuleTime
    );
  }

  public constructor() {
    super();
    this.beginTime = null;
    this.finishTime = null;
  }
}
ModuleTime["__class"] = "Statistics.ModuleTime";

ModuleTime.__static_initialize();
