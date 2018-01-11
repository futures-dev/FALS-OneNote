/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { Student } from './Student'; 
import { CourseModel } from './CourseModel'; 
/**
 * @author Computer
 * @version 1.0
 * @created 11-џэт-2018 9:14:20
 * @class
 */
export class Course {
    public student : Student;

    public courseModel : CourseModel;

    public constructor() {
        this.student = null;
        this.courseModel = null;
    }

    public isFinished() : boolean {
        return false;
    }

    /**
     * 
     * @param {Course} other
     * @return {boolean}
     */
    public equals(other : Course) : boolean {
        return this === other || (other != null && this.student.equals(other.student) && this.courseModel.equals(other.courseModel));
    }
}
Course["__class"] = "Entities.Course";



