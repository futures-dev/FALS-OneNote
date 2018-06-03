/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
import { Step } from "../Entities/Step";
import { ModuleStatistics } from "./ModuleStatistics";
export abstract class StepStatistics extends ModuleStatistics {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!StepStatistics.__static_initialized) {
      StepStatistics.__static_initialized = true;
      StepStatistics.__static_initializer_0();
    }
  }

  public step: Step;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        StepStatistics
      ),
      StepStatistics
    );
  }

  public constructor() {
    super();
    this.step = null;
  }
}
StepStatistics["__class"] = "Statistics.StepStatistics";

StepStatistics.__static_initialize();
