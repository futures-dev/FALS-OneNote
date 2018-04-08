/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../Serialization/Serialize";
import { Course } from "../Entities/Course";
import { Statistics } from "./Statistics";
export abstract class CourseStatistics extends Statistics {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!CourseStatistics.__static_initialized) {
      CourseStatistics.__static_initialized = true;
      CourseStatistics.__static_initializer_0();
    }
  }

  public course: Course;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        CourseStatistics
      ),
      CourseStatistics
    );
  }

  public constructor() {
    super();
    this.course = null;
  }
}
CourseStatistics["__class"] = "Statistics.CourseStatistics";

CourseStatistics.__static_initialize();
