/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Step } from "../Entities/Step";
import { ModuleStatistics } from "./ModuleStatistics";
export abstract class StepStatistics extends ModuleStatistics {
  public step: Step;

  public constructor() {
    super();
    this.step = null;
  }
}
StepStatistics["__class"] = "Statistics.StepStatistics";
