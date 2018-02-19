/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Module } from "./Module";
import { Course } from "./Course";
import { Step } from "./Step";
import { Student } from "./Student";
export class CourseState {
  public currentModule: Module;

  public course: Course;

  public index: number;

  public currentStep: Step;

  public student: Student;

  public constructor() {
    this.currentModule = null;
    this.course = null;
    this.index = 0;
    this.currentStep = null;
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
        this.course.equals(other.course) &&
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
