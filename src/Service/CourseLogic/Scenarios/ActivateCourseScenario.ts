import { RequestScenarioBase } from "Service/CourseLogic/Scenarios/Scenario";
import { Observable } from "rxjs/Observable";
import { ConnectionService } from "Service/Socket/Connection";
import { Course } from "Service/Fals/Entities/Course";
import { SelectCourse } from "Service/Socket/Events";
import { ActivateCourseError } from "Service/Fals/Facades/ActivateCourseError";

export class ActivateCourseScenario extends RequestScenarioBase<
  Course,
  ActivateCourseError,
  ActivateCourseError
> {
  constructor(private course: Course, connection: ConnectionService) {
    super(connection);
  }

  Start(): void {
    this.SelectCourseStage();
  }

  private SelectCourseStage(): void {
    this.AddListener(SelectCourse, this.selectCourse);
    this.Send(SelectCourse, this.course);
  }

  private OnSelectCourse(activateCourseError: ActivateCourseError): void {
    this.EmitResult(this.course, activateCourseError);
    this.RemoveListener(SelectCourse);
  }

  private selectCourse: (s: ActivateCourseError) => void = s =>
    this.OnSelectCourse(s);
}
