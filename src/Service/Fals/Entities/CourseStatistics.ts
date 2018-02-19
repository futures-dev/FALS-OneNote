/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { Statistics } from './Statistics'; 
import { Course } from './Course'; 
export abstract class CourseStatistics extends Statistics {
    public course : Course;

    public constructor() {
        super();
        this.course = null;
    }
}
CourseStatistics["__class"] = "Entities.CourseStatistics";



