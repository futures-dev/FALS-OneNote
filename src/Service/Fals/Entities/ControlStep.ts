/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Step } from "./Step";
export class ControlStep extends Step {
  public exercises: Step[];

  public m_Step: Step;

  public constructor() {
    super();
    this.exercises = null;
    this.m_Step = null;
  }

  public finalize() {
    super.finalize();
  }

  public getGrade(): number {
    return 0;
  }
}
ControlStep["__class"] = "Entities.ControlStep";
