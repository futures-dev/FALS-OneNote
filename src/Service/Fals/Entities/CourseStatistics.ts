/* Auto-generated file */

import {Period, Type} from "Service/Fals/TypeMap"

import { Statistics } from './Statistics'; 
import { Course } from './Course'; 
/**
 * @author Computer
 * @version 1.0
 * @created 11-џэт-2018 9:14:20
 * @class
 * @extends Statistics
 */
export abstract class CourseStatistics extends Statistics {
    public course : Course;

    public constructor() {
        super();
        this.course = null;
    }
}
CourseStatistics["__class"] = "Entities.CourseStatistics";



