/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { StepInterventionModel } from "../Entities/StepInterventionModel";
import { StepStatistics } from "./StepStatistics";
export class StepIntervention extends StepStatistics {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!StepIntervention.__static_initialized) {
      StepIntervention.__static_initialized = true;
      StepIntervention.__static_initializer_0();
    }
  }

  public intervention: StepInterventionModel;

  public interventionTime: Date;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        StepIntervention
      ),
      StepIntervention
    );
  }

  public constructor() {
    super();
    this.intervention = null;
    this.interventionTime = null;
  }
}
StepIntervention["__class"] = "Statistics.StepIntervention";

StepIntervention.__static_initialize();
