/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { StepStatistics } from "./StepStatistics";
export class StepTime extends StepStatistics {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!StepTime.__static_initialized) {
      StepTime.__static_initialized = true;
      StepTime.__static_initializer_0();
    }
  }

  public beginTime: Date;

  public endTime: Date;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(StepTime),
      StepTime
    );
  }

  public constructor() {
    super();
    this.beginTime = null;
    this.endTime = null;
  }
}
StepTime["__class"] = "Statistics.StepTime";

StepTime.__static_initialize();
