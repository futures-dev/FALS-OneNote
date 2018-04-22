/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Step } from "./Step";
export class GeneratedTestStep extends Step {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!GeneratedTestStep.__static_initialized) {
      GeneratedTestStep.__static_initialized = true;
      GeneratedTestStep.__static_initializer_0();
    }
  }

  public concepts: Array<string>;

  public batchSize: number;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        GeneratedTestStep
      ),
      GeneratedTestStep
    );
  }

  public constructor() {
    super();
    this.concepts = null;
    this.batchSize = 0;
  }
}
GeneratedTestStep["__class"] = "Entities.GeneratedTestStep";

GeneratedTestStep.__static_initialize();
