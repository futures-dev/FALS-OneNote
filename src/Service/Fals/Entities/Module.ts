/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
import { Entity } from "../Bank/Entity";
import { Step } from "./Step";
import { ModuleInterventionModel } from "./ModuleInterventionModel";
export class Module extends Entity {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!Module.__static_initialized) {
      Module.__static_initialized = true;
      Module.__static_initializer_0();
    }
  }

  public steps: Step[];

  public maxGrade: number;

  public minGrade: number;

  public grade: number;

  public possibleInterventions: ModuleInterventionModel[];

  public title: string;

  public description: string;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(Module),
      Module
    );
  }

  public constructor() {
    super();
    this.steps = null;
    this.maxGrade = 0;
    this.minGrade = 0;
    this.grade = 0;
    this.possibleInterventions = null;
    this.title = null;
    this.description = null;
  }
}
Module["__class"] = "Entities.Module";

Module.__static_initialize();
