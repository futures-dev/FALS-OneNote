/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Entity } from "../Bank/Entity";
import { Course } from "./Course";
import { Module } from "./Module";
import { Step } from "./Step";
import { Student } from "./Student";
export class CourseState extends Entity {
  public course: Course;

  public currentModule: Module;

  public currentStep: Step;

  public index: number;

  public student: Student;

  public constructor() {
    super();
    this.course = null;
    this.currentModule = null;
    this.currentStep = null;
    this.index = 0;
    this.student = null;
  }

  /**
   *
   * @param {CourseState} other
   * @return {boolean}
   */
  public hasChanged(other: CourseState): boolean {
    return (
      this !== other ||
      (other != null &&
        /* equals */ <any>((o1: any, o2: any) => {
          if (o1 && o1.equals) {
            return o1.equals(o2);
          } else {
            return o1 === o2;
          }
        })(this.course, other.course) &&
        /* equals */ <any>((o1: any, o2: any) => {
          if (o1 && o1.equals) {
            return o1.equals(o2);
          } else {
            return o1 === o2;
          }
        })(this.currentModule, other.currentModule))
    );
  }
}
CourseState["__class"] = "Entities.CourseState";
