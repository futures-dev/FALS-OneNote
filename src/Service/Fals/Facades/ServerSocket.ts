/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
// var dictProto: any = <any>{};
// dictProto.__proto__.putIfAbsent = function(child, node) {
//   this[child] = this[child] || node;
// };
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
