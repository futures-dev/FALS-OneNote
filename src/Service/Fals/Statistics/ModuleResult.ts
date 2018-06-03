/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
import { Module } from "../Entities/Module";
import { ModuleStatistics } from "./ModuleStatistics";
export class ModuleResult extends ModuleStatistics {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!ModuleResult.__static_initialized) {
      ModuleResult.__static_initialized = true;
      ModuleResult.__static_initializer_0();
    }
  }

  public module: Module;

  public resultGrade: number;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        ModuleResult
      ),
      ModuleResult
    );
  }

  public constructor() {
    super();
    this.module = null;
    this.resultGrade = 0;
  }
}
ModuleResult["__class"] = "Statistics.ModuleResult";

ModuleResult.__static_initialize();
