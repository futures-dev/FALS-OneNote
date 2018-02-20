/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Entity } from "../Bank/Entity";
import { ModuleInterventionModel } from "./ModuleInterventionModel";
import { Step } from "./Step";
export class Module extends Entity {
  public maxGrade: number;

  public possibleInterventions: ModuleInterventionModel[];

  public steps: Step[];

  public constructor() {
    super();
    this.maxGrade = 0;
    this.possibleInterventions = null;
    this.steps = null;
  }
}
Module["__class"] = "Entities.Module";
