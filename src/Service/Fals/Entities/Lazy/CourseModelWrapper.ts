import { CourseModel } from "Service/Fals/Entities/CourseModel";
import { ILazyWrapper } from "Service/Fals/Entities/Lazy/ILazyWrapper";

export class CourseModelWrapper extends CourseModel
  implements ILazyWrapper<CourseModel> {
  constructor(public IUrl: string) {
    super();
  }
}
