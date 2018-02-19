/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { StepIntervention } from "../Entities/StepIntervention";
import { ModuleIntervention } from "../Entities/ModuleIntervention";
import { Course } from "../Entities/Course";
import { CourseState } from "../Entities/CourseState";
import { StepGrade } from "../Entities/StepGrade";
import { ActivateCourseError } from "./ActivateCourseError";
import { SubmitStepResultError } from "./SubmitStepResultError";
import { SubmitStepAnswerError } from "./SubmitStepAnswerError";
import { SubmitStepGradeError } from "./SubmitStepGradeError";
export interface ClientSocket {
  /**
   *
   * @param {ActivateCourseError} result
   */
  SelectCourse(result: ActivateCourseError);

  /**
   *
   * @param {CourseState} currentState
   */
  CurrentStateChanged(currentState: CourseState);

  /**
   *
   * @param {SubmitStepResultError} result
   */
  SendModuleResult(result: SubmitStepResultError);

  /**
   *
   * @param {SubmitStepAnswerError} result
   */
  SubmitStepAnswer(result: SubmitStepAnswerError);

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
   * @param {ModuleIntervention} intervention
   */
  ModuleIntervene(intervention: ModuleIntervention);

  /**
   *
   * @param {Course} currentState
   */
  GetCurrentState(currentState: Course);

  /**
   *
   * @param {SubmitStepGradeError} result
   */
  SubmitStepGrade(result: SubmitStepGradeError);
}
