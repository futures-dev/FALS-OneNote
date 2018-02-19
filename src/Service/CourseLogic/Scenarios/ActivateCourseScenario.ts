import { Listener, ScenarioBase } from "Service/Socket/Scenario";
import { Observable } from "rxjs/Observable";
import { ConnectionService } from "Service/Socket/Connection";
import { Course } from "Service/Fals/Entities/Course";
import { SelectCourse } from "Service/Socket/Events";
import { ActivateCourseError } from "Service/Fals/Facades/ActivateCourseError";

export class ActivateCourseScenario extends ScenarioBase<ActivateCourseError> {
  constructor(private course: Course, connection: ConnectionService) {
    super(connection);
  }

  Start(): void {
    this.SelectCourseStage();
  }

  private SelectCourseStage(): void {
    this.connection.AddListener(SelectCourse, s => this.OnSelectCourse(s));
    this.connection.Send(SelectCourse, this.course);
  }

  private OnSelectCourse(message: string): void {
    this.Result.next(ActivateCourseError.sOk);
  }
}
