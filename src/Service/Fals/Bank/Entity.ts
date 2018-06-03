/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
import { Serialize } from "../Serialization/Serialize";
import { Version } from "./Version";
export class Entity {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!Entity.__static_initialized) {
      Entity.__static_initialized = true;
      Entity.__static_initializer_0();
    }
  }

  public id: string;

  public type: string = /* getName */ (c =>
    c["__class"] ? c["__class"] : c["name"])(<any>this.constructor);

  public version: Version;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(Entity),
      Entity
    );
  }

  public constructor() {
    this.id = null;
    this.version = null;
  }

  /**
   *
   * @param {Entity} other
   * @return {boolean}
   */
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
      /* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        } else {
          return o1 === o2;
        }
      })(this.id, other.id)
    );
  }
}
Entity["__class"] = "Bank.Entity";

Entity.__static_initialize();
