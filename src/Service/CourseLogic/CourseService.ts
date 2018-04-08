import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Course } from "Service/Fals/Entities/Course";
import { ConnectionService } from "Service/Socket/Connection";
import { CurrentStateChanged } from "Service/Socket/Events";
import { Observable } from "rxjs/Observable";
import { CourseProvider } from "Service/Providers/CourseProvider";
import { ActivateCourseError } from "Service/Fals/Facades/ActivateCourseError";
import { ActivateCourseScenario } from "Service/CourseLogic/Scenarios/ActivateCourseScenario";
import { CourseState } from "Service/Fals/Entities/CourseState";

@Injectable()
export class CourseService {
  public CurrentCourseState: BehaviorSubject<CourseState> = new BehaviorSubject<
    CourseState
  >(null);

  constructor(
    private socket: ConnectionService,
    private courseProvider: CourseProvider
  ) {
    console.log("ctor");
    socket.AddListener(CurrentStateChanged, (cs: CourseState) => {
      this.CurrentCourseState.next(cs);
    });
  }

  public Activate(course: Course): Observable<ActivateCourseError> {
    let activate = new ActivateCourseScenario(course, this.socket);
    activate.Result.subscribe(result => {
      if (result != ActivateCourseError.sOk) {
        console.log("ActivateScenarioError: " + result);
        return;
      }

      console.log(
        "ActivateScenario success =" + course + ", avaiting CourseStateChanged"
      );
    });
    activate.Start();

    return activate.Result;
  }

  private disconnect;
}
