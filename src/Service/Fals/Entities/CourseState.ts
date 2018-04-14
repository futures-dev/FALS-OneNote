/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Entity } from "../Bank/Entity";
import { Course } from "./Course";
import { Module } from "./Module";
import { Step } from "./Step";
import { Student } from "./Student";
export class CourseState extends Entity {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!CourseState.__static_initialized) {
      CourseState.__static_initialized = true;
      CourseState.__static_initializer_0();
    }
  }

  public course: Course;

  public currentModule: Module;

  public currentStep: Step;

  public index: number;

  public isCourseFinished: boolean;

  public student: Student;

  public unfinishedSteps: Array<Step>;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        CourseState
      ),
      CourseState
    );
  }

  public constructor() {
    super();
    this.course = null;
    this.currentModule = null;
    this.currentStep = null;
    this.index = 0;
    this.isCourseFinished = false;
    this.student = null;
    this.unfinishedSteps = null;
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

CourseState.__static_initialize();
