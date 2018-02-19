/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Key } from "../Bank/Key";
import { AssignmentStep } from "./AssignmentStep";
export class TestStep extends AssignmentStep {
  public answers: Key[];

  public correctAnswer: number;

  public constructor() {
    super();
    this.answers = null;
    this.correctAnswer = 0;
    this.resultType = Number.toString();
  }
}
TestStep["__class"] = "Entities.TestStep";
