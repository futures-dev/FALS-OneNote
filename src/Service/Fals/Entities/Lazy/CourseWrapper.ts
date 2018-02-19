/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Course } from "../Course";
import { ILazyWrapper } from "./ILazyWrapper";
export class CourseWrapper extends Course implements ILazyWrapper<Course> {
  public IUrl: string;

  public constructor() {
    super();
    this.IUrl = null;
  }
}
CourseWrapper["__class"] = "Entities.Lazy.CourseWrapper";
CourseWrapper["__interfaces"] = ["Entities.Lazy.ILazyWrapper"];
