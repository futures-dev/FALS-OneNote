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
import { StepAnswer, StepStatistics } from "Service/Fals/Statistics";
import { Assert } from "Service/Common/Assert";
import { SubmitStepResultScenario } from "Service/CourseLogic/Scenarios/SendStepResultScenario";
import "rxjs/add/operator/mergeMap";
import { Router } from "@angular/router";
import { StepInterventionController } from "Service/CourseLogic/StepInterventionController";
import { ModuleInterventionController } from "Service/CourseLogic/ModuleInterventionController";
import { InteractionRequester } from "Service/Interaction/InteractionRequester";
import { Module } from "Service/Fals/Entities/Module";
import { SubmitStepResultError } from "Service/Fals/Facades/SubmitStepResultError";
import { Tree } from "Service/Fals/Entities/Tree";

@Injectable()
export class CourseService {
  public readonly CurrentCourseState: BehaviorSubject<
    CourseState
    > = new BehaviorSubject<CourseState>(null);
  public get Modules(): Observable<Module> {
    return Observable.from(
      this.CurrentCourseState.getValue().course.modules.Children
    )
      .flatMap(this.selectSubmodules)
      .map(z => z.Value);
  }

  public readonly stepInterventionController: StepInterventionController;
  public readonly moduleInterventionController: ModuleInterventionController;

  constructor(
    private socket: ConnectionService,
    private courseProvider: CourseProvider,
    private router: Router,
    interaction: InteractionRequester
  ) {
    this.stepInterventionController = new StepInterventionController(
      this,
      socket,
      interaction,
      this.router
    );
    this.moduleInterventionController = new ModuleInterventionController(
      this,
      socket,
      interaction,
      this.router
    );

    socket
      .AddListener(CurrentStateChanged, (cs: CourseState) => {
        this.CurrentCourseState.next(cs);

        if (!cs.currentStep) {
          router.navigateByUrl("courseDashboard");
        }
      })
      .subscribe();
  }

  public Activate(course: Course): Observable<ActivateCourseError> {
    let activate = new ActivateCourseScenario(course, this.socket);
    activate.Result.subscribe(result => {
      if (result.result != ActivateCourseError.sOk) {
        console.log("ActivateScenarioError: " + result);
        return;
      }

      console.log(
        "ActivateScenario success =" + course + ", awaiting CourseStateChanged"
      );
      this.router.navigateByUrl("courseDashboard");
    });
    activate.Start();

    return activate.Result.map(r => r.result);
  }

  public SubmitStepResult(result: StepStatistics) {
    let submit = new SubmitStepResultScenario(result, this.socket);
    submit.Result.subscribe(result => {
      if (result.response != SubmitStepResultError.sOk) {
        console.log("SubmitStepResultError: " + result);
        return;
      }

      console.log("SubmitStepResult success, awaiting CourseStateChanged");
    });
    submit.Start();

    return submit.Result;
  }

  private selectSubmodules(topModule: Tree<Module>): Observable<Tree<Module>> {
    let children = Observable.from(topModule.Children || []).flatMap(
      this.selectSubmodules
    );
    return Observable.from([topModule]).merge(children);
  }

  private disconnect;
}
