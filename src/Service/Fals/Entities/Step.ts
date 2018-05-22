/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Entity } from "../Bank/Entity";
import { StepInterventionModel } from "./StepInterventionModel";
export abstract class Step extends Entity {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!Step.__static_initialized) {
      Step.__static_initialized = true;
      Step.__static_initializer_0();
    }
  }

  public resultType: string;

  public maxGrade: number;

  public possibleInterventions: Array<StepInterventionModel> = <any>[];

  public title: string;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(Step),
      Step
    );
  }

  public constructor() {
    super();
    this.resultType = null;
    this.maxGrade = 0;
    this.title = null;
  }
}
Step["__class"] = "Entities.Step";

Step.__static_initialize();
