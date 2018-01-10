/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { Student } from './Student'; 
import { CourseModel } from './CourseModel'; 
/**
 * @author Computer
 * @version 1.0
 * @created 24-���-2017 20:28:46
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

    public equals(other : Course) : boolean {
        return this === other || (
            other != null &&
            this.courseModel.equals(other.courseModel) &&
            this.student.equals(other.student));        
    }
}
Course["__class"] = "Entities.Course";



