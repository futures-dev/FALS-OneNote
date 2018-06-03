/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Entity } from "../Bank/Entity";
import { Serialize } from "../Serialization/Serialize";
import { Step } from "./Step";
export class ControlStep extends Step {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!ControlStep.__static_initialized) {
      ControlStep.__static_initialized = true;
      ControlStep.__static_initializer_0();
    }
  }

  public exercises: Step[];

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        ControlStep
      ),
      ControlStep
    );
  }

  public constructor() {
    super();
    this.exercises = null;
  }

  public getGrade(): number {
    return 0;
  }

  public equals(other: Entity): boolean {
    if (other == null) {
      return false;
    }
    return (
      /* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        } else {
          return o1 === o2;
        }
      })(this.type, other.type) &&
      /* startsWith */ (((str, searchString, position = 0) =>
        str.substr(position, searchString.length) === searchString)(
        this.id,
        other.id
      ) ||
        /* startsWith */ ((str, searchString, position = 0) =>
          str.substr(position, searchString.length) === searchString)(
          other.id,
          this.id
        ))
    );
  }
}
ControlStep["__class"] = "Entities.ControlStep";

ControlStep.__static_initialize();
