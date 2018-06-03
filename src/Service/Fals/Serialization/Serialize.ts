/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
export abstract class Serialize {
  public static Types: any;
  public static Types_$LI$(): any {
    if (Serialize.Types == null) Serialize.Types = <any>{};
    return Serialize.Types;
  }

  public constructor() {}

  /**
   *
   * @param {string} className
   * @param {*} classType
   */
  public static declare(className: string, classType: Type) {
    /* put */ Serialize.Types_$LI$()[className] = classType;
  }
}
Serialize["__class"] = "Serialization.Serialize";

Serialize.Types_$LI$();
