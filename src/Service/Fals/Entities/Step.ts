/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Entity } from "../Bank/Entity";
import { StepInterventionModel } from "./StepInterventionModel";
export abstract class Step extends Entity {
  public maxGrade: number;

  public possibleInterventions: StepInterventionModel[];

  public resultType: string;

  public constructor() {
    super();
    this.maxGrade = 0;
    this.possibleInterventions = null;
    this.resultType = null;
  }
}
Step["__class"] = "Entities.Step";
