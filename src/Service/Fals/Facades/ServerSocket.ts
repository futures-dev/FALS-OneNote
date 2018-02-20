/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Course } from "../Entities/Course";
import { StepStatistics } from "../Statistics/StepStatistics";
import { Student } from "../Entities/Student";
import { ModuleResult } from "../Statistics/ModuleResult";
import { StepGrade } from "../Statistics/StepGrade";
import { StepAnswer } from "../Statistics/StepAnswer";
export interface ServerSocket {
  /**
   *
   * @param {Course} course
   */
  ActivateCourse(course: Course);

  /**
   *
   * @param {Student} student
   */
  GetCurrentState(student: Student);

  /**
   *
   * @param {StepGrade} stepGrade
   */
  SubmitStepGrade(stepGrade: StepGrade);

  /**
   *
   * @param {StepStatistics} stepResult
   */
  SubmitStepResult(stepResult: StepStatistics);
}
