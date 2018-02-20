/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Course } from "../Entities/Course";
import { Statistics } from "./Statistics";
export abstract class CourseStatistics extends Statistics {
  public course: Course;

  public constructor() {
    super();
    this.course = null;
  }
}
CourseStatistics["__class"] = "Statistics.CourseStatistics";
