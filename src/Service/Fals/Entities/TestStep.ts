/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Key } from "../Bank/Key";
import { AssignmentStep } from "./AssignmentStep";
export class TestStep extends AssignmentStep {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!TestStep.__static_initialized) {
      TestStep.__static_initialized = true;
      TestStep.__static_initializer_0();
    }
  }

  public answers: Key[];

  public correctAnswer: number;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(TestStep),
      TestStep
    );
  }

  public constructor() {
    super();
    this.answers = null;
    this.correctAnswer = 0;
    this.resultType = Number.toString();
  }
}
TestStep["__class"] = "Entities.TestStep";

TestStep.__static_initialize();
