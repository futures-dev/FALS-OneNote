/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
import { ModuleInterventionModel } from "../Entities/ModuleInterventionModel";
import { ModuleStatistics } from "./ModuleStatistics";
export class ModuleIntervention extends ModuleStatistics {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!ModuleIntervention.__static_initialized) {
      ModuleIntervention.__static_initialized = true;
      ModuleIntervention.__static_initializer_0();
    }
  }

  public intervention: ModuleInterventionModel;

  public interventionTime: Date;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        ModuleIntervention
      ),
      ModuleIntervention
    );
  }

  public constructor() {
    super();
    this.intervention = null;
    this.interventionTime = null;
  }
}
ModuleIntervention["__class"] = "Statistics.ModuleIntervention";

ModuleIntervention.__static_initialize();
