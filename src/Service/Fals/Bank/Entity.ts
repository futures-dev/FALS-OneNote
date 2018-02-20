/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Version } from "./Version";
export class Entity {
  public id: string;

  public type: string = (<any>this.constructor).toString();

  public version: Version;

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
