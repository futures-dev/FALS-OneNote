/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Assignment } from "../Bank/Assignment";
import { Step } from "./Step";
export abstract class AssignmentStep extends Step {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!AssignmentStep.__static_initialized) {
      AssignmentStep.__static_initialized = true;
      AssignmentStep.__static_initializer_0();
    }
  }

  public problem: Assignment;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        AssignmentStep
      ),
      AssignmentStep
    );
  }

  public constructor() {
    super();
    this.problem = null;
  }
}
AssignmentStep["__class"] = "Entities.AssignmentStep";

AssignmentStep.__static_initialize();
