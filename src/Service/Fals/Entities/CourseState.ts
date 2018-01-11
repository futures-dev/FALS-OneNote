/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { Module } from './Module'; 
import { Course } from './Course'; 
/**
 * @author Computer
 * @version 1.0
 * @created 11-���-2018 9:14:20
 * @class
 */
export class CourseState {
    public currentModule : Module;

    public course : Course;

    public index : number;

    public constructor() {
        this.currentModule = null;
        this.course = null;
        this.index = 0;
    }

    /**
     * 
     * @param {CourseState} other
     * @return {boolean}
     */
    public hasChanged(other : CourseState) : boolean {
        return this !== other || (other != null && this.course.equals(other.course) && /* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(this.currentModule,other.currentModule)));
    }
}
CourseState["__class"] = "Entities.CourseState";



