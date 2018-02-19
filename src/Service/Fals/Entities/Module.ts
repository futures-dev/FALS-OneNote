/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Step } from "./Step";
import { ModuleInterventionModel } from "./ModuleInterventionModel";
export class Module {
  public steps: Step[];

  public maxGrade: number;

  public possibleInterventions: ModuleInterventionModel[];

  public constructor() {
    this.steps = null;
    this.maxGrade = 0;
    this.possibleInterventions = null;
  }
}
Module["__class"] = "Entities.Module";
