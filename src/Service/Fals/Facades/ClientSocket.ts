/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Course } from "../Entities/Course";
import { ModuleIntervention } from "../Entities/ModuleIntervention";
import { StepIntervention } from "../Entities/StepIntervention";
import { CourseState } from "../Entities/CourseState";
import { StepGrade } from "../Entities/StepGrade";
import { ActivateCourseError } from "./ActivateCourseError";
import { SubmitModuleResultError } from "./SubmitModuleResultError";
import { SubmitStepGradeError } from "./SubmitStepGradeError";
import { SubmitStepResultError } from "./SubmitStepResultError";
export interface ClientSocket {
  /**
   *
   * @param {CourseState} currentState
   */
  CurrentStateChanged(currentState: CourseState);

  /**
   *
   * @param {Course} currentState
   */
  GetCurrentState(currentState: Course);

  /**
   *
   * @param {ModuleIntervention} intervention
   */
  ModuleIntervene(intervention: ModuleIntervention);

  /**
   *
   * @param {ActivateCourseError} result
   */
  SelectCourse(result: ActivateCourseError);

  /**
   *
   * @param {StepGrade} stepGrade
   */
  StepGradeChanged(stepGrade: StepGrade);

  /**
   *
   * @param {StepIntervention} intervention
   */
  StepIntervene(intervention: StepIntervention);

  /**
   *
   * @param {SubmitModuleResultError} result
   */
  SubmitModuleResult(result: SubmitModuleResultError);

  /**
   *
   * @param {SubmitStepGradeError} result
   */
  SubmitStepGrade(result: SubmitStepGradeError);

  /**
   *
   * @param {SubmitStepResultError} result
   */
  SubmitStepResult(result: SubmitStepResultError);
}
