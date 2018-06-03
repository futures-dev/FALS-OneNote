/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
import { StepInterventionModel } from "./StepInterventionModel";
import { Step } from "./Step";
export class GotoStepIntervention extends StepInterventionModel {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!GotoStepIntervention.__static_initialized) {
      GotoStepIntervention.__static_initialized = true;
      GotoStepIntervention.__static_initializer_0();
    }
  }

  public step: Step;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        GotoStepIntervention
      ),
      GotoStepIntervention
    );
  }

  public constructor() {
    super();
    this.step = null;
  }
}
GotoStepIntervention["__class"] = "Entities.GotoStepIntervention";

GotoStepIntervention.__static_initialize();
