/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { StepStatistics } from "./StepStatistics";
export class StepGrade extends StepStatistics {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!StepGrade.__static_initialized) {
      StepGrade.__static_initialized = true;
      StepGrade.__static_initializer_0();
    }
  }

  public resultGrade: number;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(StepGrade),
      StepGrade
    );
  }

  public constructor() {
    super();
    this.resultGrade = 0;
  }
}
StepGrade["__class"] = "Statistics.StepGrade";

StepGrade.__static_initialize();
