/* Auto-generated file */

import * as typeMap from "Service/Fals/TypeMap"

import { Statistics } from './Statistics'; 
import { Course } from './Course'; 
/**
 * @author Computer
 * @version 1.0
 * @created 24-дек-2017 20:28:47
 * @class
 * @extends Statistics
 */
export class CourseStatistics extends Statistics {
    public course : Course;

    public constructor() {
        super();
        this.course = null;
    }
}
CourseStatistics["__class"] = "Entities.CourseStatistics";



