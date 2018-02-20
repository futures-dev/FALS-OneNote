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
      !super.equals(other) &&
      !(
        this.student.equals(other.student) &&
        this.course.equals(other.course) &&
        this.currentModule.equals(other.currentModule) &&
        this.currentStep.equals(other.currentStep)
      )
    );
  }
}
CourseState["__class"] = "Entities.CourseState";
