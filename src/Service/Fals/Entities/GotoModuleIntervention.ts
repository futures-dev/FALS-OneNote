/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
import { ModuleInterventionModel } from "./ModuleInterventionModel";
import { Module } from "./Module";
export class GotoModuleIntervention extends ModuleInterventionModel {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!GotoModuleIntervention.__static_initialized) {
      GotoModuleIntervention.__static_initialized = true;
      GotoModuleIntervention.__static_initializer_0();
    }
  }

  public module: Module;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        GotoModuleIntervention
      ),
      GotoModuleIntervention
    );
  }

  public constructor() {
    super();
    this.module = null;
  }
}
GotoModuleIntervention["__class"] = "Entities.GotoModuleIntervention";

GotoModuleIntervention.__static_initialize();
