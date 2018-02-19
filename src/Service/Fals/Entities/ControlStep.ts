/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Step } from "./Step";
export class ControlStep extends Step {
  public exercises: Step[];

  public constructor() {
    super();
    this.exercises = null;
  }

  public getGrade(): number {
    return 0;
  }
}
ControlStep["__class"] = "Entities.ControlStep";
