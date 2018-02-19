/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { Course } from '../Entities/Course'; 
import { Student } from '../Entities/Student'; 
import { ModuleResult } from '../Entities/ModuleResult'; 
import { StepGrade } from '../Entities/StepGrade'; 
import { StepAnswer } from '../Entities/StepAnswer'; 
import { SubmitStepResultError } from './SubmitStepResultError'; 
export interface ServerSocket {
    /**
     * 
     * @param {Course} course
     */
    ActivateCourse(course : Course);

    /**
     * 
     * @param {Student} student
     */
    GetCurrentState(student : Student);

    /**
     * 
     * @param {SubmitStepResultError} stepResult
     */
    SubmitStepResult(stepResult : SubmitStepResultError);

    /**
     * 
     * @param {StepAnswer} stepAnswer
     */
    SubmitStepAnswer(stepAnswer : StepAnswer);

    /**
     * 
     * @param {StepGrade} stepGrade
     */
    SubmitStepGrade(stepGrade : StepGrade);
}


