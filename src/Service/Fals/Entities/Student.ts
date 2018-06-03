/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
export class Student {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!Student.__static_initialized) {
      Student.__static_initialized = true;
      Student.__static_initializer_0();
    }
  }

  public displayName: string;

  public email: string;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(Student),
      Student
    );
  }

  public constructor() {
    this.displayName = null;
    this.email = null;
  }

  /**
   *
   * @param {Student} other
   * @return {boolean}
   */
  public equals(other: Student): boolean {
    return (
      this === other ||
      (other != null &&
        /* equals */ <any>((o1: any, o2: any) => {
          if (o1 && o1.equals) {
            return o1.equals(o2);
          } else {
            return o1 === o2;
          }
        })(this.email, other.email))
    );
  }
}
Student["__class"] = "Entities.Student";

Student.__static_initialize();
