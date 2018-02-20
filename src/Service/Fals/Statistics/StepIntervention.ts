/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { StepInterventionModel } from "../Entities/StepInterventionModel";
import { StepStatistics } from "./StepStatistics";
export class StepIntervention extends StepStatistics {
  public intervention: StepInterventionModel;

  public interventionTime: Date;

  public constructor() {
    super();
    this.intervention = null;
    this.interventionTime = null;
  }
}
StepIntervention["__class"] = "Statistics.StepIntervention";
