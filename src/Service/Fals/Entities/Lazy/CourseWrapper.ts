/* Auto-generated file */

import { Period, Type } from "Service/Fals/TypeMap";
import { Serialize } from "../../Serialization/Serialize";
import { Course } from "../Course";
import { ILazyWrapper } from "./ILazyWrapper";
export class CourseWrapper extends Course implements ILazyWrapper<Course> {
  static __static_initialized: boolean = false;
  static __static_initialize() {
    if (!CourseWrapper.__static_initialized) {
      CourseWrapper.__static_initialized = true;
      CourseWrapper.__static_initializer_0();
    }
  }

  public IUrl: string;

  static __static_initializer_0() {
    Serialize.declare(
      /* getName */ (c => (c["__class"] ? c["__class"] : c["name"]))(
        CourseWrapper
      ),
      CourseWrapper
    );
  }

  public constructor() {
    super();
    this.IUrl = null;
  }
}
CourseWrapper["__class"] = "Entities.Lazy.CourseWrapper";
CourseWrapper["__interfaces"] = ["Entities.Lazy.ILazyWrapper"];

CourseWrapper.__static_initialize();
