/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { Tree } from './Tree'; 
import { Module } from './Module'; 
import { Course } from './Course'; 
import { Student } from './Student'; 
/**
 * @author Computer
 * @version 1.0
 * @created 11-���-2018 9:14:20
 * @class
 */
export class CourseModel {
    public modules : Tree<Module>;

    public title : string;

    public constructor() {
        this.modules = null;
        this.title = null;
    }

    /**
     * 
     * @param {CourseModel} other
     * @return {boolean}
     */
    public equals(other : CourseModel) : boolean {
        return this === other || (other != null && /* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(this.title,other.title)));
    }

    public getActiveCourses() : Course[] {
        return null;
    }

    public getActiveStudents() : Student[] {
        return null;
    }
}
CourseModel["__class"] = "Entities.CourseModel";



