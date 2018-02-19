/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { ModuleStatistics } from "./ModuleStatistics";
import { Step } from "./Step";
export abstract class StepStatistics extends ModuleStatistics {
  public step: Step;

  public constructor() {
    super();
    this.step = null;
  }
}
StepStatistics["__class"] = "Entities.StepStatistics";
