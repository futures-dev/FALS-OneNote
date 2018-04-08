/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Entity } from "../Bank/Entity";
import { ModuleInterventionModel } from "./ModuleInterventionModel";
import { Step } from "./Step";
export class Module extends Entity {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!Module.__static_initialized) {
      Module.__static_initialized = true;
      Module.__static_initializer_0();
    }
  }

  public maxGrade: number;

  public possibleInterventions: ModuleInterventionModel[];

  public steps: Step[];

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(Module),
      Module
    );
  }

  public constructor() {
    super();
    this.maxGrade = 0;
    this.possibleInterventions = null;
    this.steps = null;
  }
}
Module["__class"] = "Entities.Module";

Module.__static_initialize();
