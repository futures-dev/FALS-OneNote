/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Course } from "../Course";
import { ILazyWrapper } from "./ILazyWrapper";
export class CourseWrapper extends Course implements ILazyWrapper {
  public constructor() {
    super();
  }
}
CourseWrapper["__class"] = "Entities.Lazy.CourseWrapper";
CourseWrapper["__interfaces"] = ["Entities.Lazy.ILazyWrapper"];
