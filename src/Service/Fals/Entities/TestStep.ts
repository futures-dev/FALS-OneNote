/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Answer } from "../Bank/Answer";
import { AssignmentStep } from "./AssignmentStep";
export class TestStep extends AssignmentStep {
  public answers: Answer[];

  public correctAnswer: number;

  public constructor() {
    super();
    this.answers = null;
    this.correctAnswer = 0;
  }
}
TestStep["__class"] = "Entities.TestStep";
