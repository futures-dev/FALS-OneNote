/* Auto-generated file */

import * as typeMap from "Service/Fals/TypeMap"

import { Tree } from './Tree'; 
import { Module } from './Module'; 
import { Course } from './Course'; 
import { Student } from './Student'; 
/**
 * @author Computer
 * @version 1.0
 * @created 24-дек-2017 20:28:47
 * @class
 */
export class CourseModel {
    public modules : Tree<Module>;

    public title : string;

    public constructor() {
        this.modules = null;
        this.title = null;
    }

    public getActiveCourses() : Course[] {
        return null;
    }

    public getActiveStudents() : Student[] {
        return null;
    }
}
CourseModel["__class"] = "Entities.CourseModel";



