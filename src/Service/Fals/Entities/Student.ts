/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
export class Student {
  public displayName: string;

  public email: string;

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
