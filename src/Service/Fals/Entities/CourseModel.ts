/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { Tree } from './Tree'; 
import { Module } from './Module'; 
import { Course } from './Course'; 
import { Student } from './Student'; 
/**
 * @author Computer
 * @version 1.0
 * @created 24-���-2017 20:28:47
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

    public equals(other : CourseModel) : boolean {
        return this == other || (
            other != null &&
            this.title == other.title);        
    }
}
CourseModel["__class"] = "Entities.CourseModel";



