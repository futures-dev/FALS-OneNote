/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { StepStatistics } from "./StepStatistics";
export class StepTime extends StepStatistics {
  public beginTime: Date;

  public endTime: Date;

  public constructor() {
    super();
    this.beginTime = null;
    this.endTime = null;
  }

  public finalize() {
    super.finalize();
  }
}
StepTime["__class"] = "Entities.StepTime";
