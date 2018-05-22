/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Material } from "../Bank/Material";
import { Step } from "./Step";
export class StudyStep extends Step {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!StudyStep.__static_initialized) {
      StudyStep.__static_initialized = true;
      StudyStep.__static_initializer_0();
    }
  }

  public materials: Material;

  public title: string;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(StudyStep),
      StudyStep
    );
  }

  public constructor() {
    super();
    this.materials = null;
    this.title = null;
  }
}
StudyStep["__class"] = "Entities.StudyStep";

StudyStep.__static_initialize();
