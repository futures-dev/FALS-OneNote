/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { Module } from './Module'; 
import { Course } from './Course'; 
/**
 * @author Computer
 * @version 1.0
 * @created 24-дек-2017 20:28:47
 * @class
 */
export class CourseState {
    public currentModule : Module;

    public course : Course;

    public constructor() {
        this.currentModule = null;
        this.course = null;
    }
}
CourseState["__class"] = "Entities.CourseState";



