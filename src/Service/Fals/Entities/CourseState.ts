/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Entity } from "../Bank/Entity";
import { Module } from "./Module";
import { Course } from "./Course";
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

  public currentModule: Module;

  public course: Course;

  public index: number;

  public currentStep: Step;

  public student: Student;

  public unfinishedSteps: Array<Step> = <any>[];

  public isCourseFinished: boolean;

  public isModuleActive: boolean;

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
    this.currentModule = null;
    this.course = null;
    this.index = 0;
    this.currentStep = null;
    this.student = null;
    this.isCourseFinished = false;
    this.isModuleActive = false;
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
