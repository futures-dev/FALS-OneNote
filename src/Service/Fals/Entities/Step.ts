/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { StepInterventionModel } from "./StepInterventionModel";
export abstract class Step {
  public resultType: string;

  public maxGrade: number;

  public possibleInterventions: StepInterventionModel[];

  public constructor() {
    this.resultType = null;
    this.maxGrade = 0;
    this.possibleInterventions = null;
  }
}
Step["__class"] = "Entities.Step";
