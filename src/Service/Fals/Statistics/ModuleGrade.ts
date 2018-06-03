/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
import { ModuleStatistics } from "./ModuleStatistics";
export class ModuleGrade extends ModuleStatistics {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!ModuleGrade.__static_initialized) {
      ModuleGrade.__static_initialized = true;
      ModuleGrade.__static_initializer_0();
    }
  }

  public grade: number;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        ModuleGrade
      ),
      ModuleGrade
    );
  }

  public constructor() {
    super();
    this.grade = 0;
  }
}
ModuleGrade["__class"] = "Statistics.ModuleGrade";

ModuleGrade.__static_initialize();
