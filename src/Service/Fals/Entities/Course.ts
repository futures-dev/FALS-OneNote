/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Tree } from "./Tree";
import { Module } from "./Module";
export class Course {
  public description: string;

  public modules: Tree<Module>;

  public title: string;

  public constructor() {
    this.description = null;
    this.modules = null;
    this.title = null;
  }

  public isFinished(): boolean {
    return false;
  }

  /**
   *
   * @param {Course} other    other
   * @return {boolean}
   */
  public equals(other: Course): boolean {
    return (
      this === other ||
      (other != null &&
        /* equals */ <any>((o1: any, o2: any) => {
          if (o1 && o1.equals) {
            return o1.equals(o2);
          } else {
            return o1 === o2;
          }
        })(this.title, other.title))
    );
  }
}
Course["__class"] = "Entities.Course";
