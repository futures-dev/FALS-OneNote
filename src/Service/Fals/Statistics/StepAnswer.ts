/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
import { StepStatistics } from "./StepStatistics";
export class StepAnswer extends StepStatistics {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!StepAnswer.__static_initialized) {
      StepAnswer.__static_initialized = true;
      StepAnswer.__static_initializer_0();
    }
  }

  public value: string;

  public isCorrect: boolean;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        StepAnswer
      ),
      StepAnswer
    );
  }

  public constructor() {
    super();
    this.value = null;
    this.isCorrect = false;
  }
}
StepAnswer["__class"] = "Statistics.StepAnswer";

StepAnswer.__static_initialize();
