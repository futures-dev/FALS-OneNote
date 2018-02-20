/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { StepInterventionModel } from "./StepInterventionModel";
export abstract class Step {
  public maxGrade: number;

  public possibleInterventions: StepInterventionModel[];

  public resultType: string;

  public constructor() {
    this.maxGrade = 0;
    this.possibleInterventions = null;
    this.resultType = null;
  }
}
Step["__class"] = "Entities.Step";
