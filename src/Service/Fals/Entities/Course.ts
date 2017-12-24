/* Auto-generated file */

import * as typeMap from "Service/Fals/TypeMap"

import { Student } from './Student'; 
import { CourseModel } from './CourseModel'; 
/**
 * @author Computer
 * @version 1.0
 * @created 24-дек-2017 20:28:46
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
}
Course["__class"] = "Entities.Course";



