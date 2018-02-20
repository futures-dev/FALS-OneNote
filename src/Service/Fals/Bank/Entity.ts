/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Version } from "./Version";
export class Entity {
  public id: string;

  public type: string;

  public version: Version;

  public constructor() {
    this.id = null;
    this.type = null;
    this.version = null;
  }

  /**
   *
   * @param {Entity} a
   * @param {Entity} b
   * @return {boolean}
   */
  public static equals(a: Entity, b: Entity): boolean {
    if (a == null && b == null) {
      return true;
    }
    if (a == null || b == null) {
      return false;
    }
    return (
      /* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        } else {
          return o1 === o2;
        }
      })(a.type, b.type) &&
      /* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        } else {
          return o1 === o2;
        }
      })(a.id, b.id) &&
      /* equals */ <any>((o1: any, o2: any) => {
        if (o1 && o1.equals) {
          return o1.equals(o2);
        } else {
          return o1 === o2;
        }
      })(a.version, b.version)
    );
  }
}
Entity["__class"] = "Bank.Entity";
