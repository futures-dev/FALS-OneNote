import { Injectable } from "@angular/core";
import { Step } from "Service/Fals/Entities/Step";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ConnectionService } from "Service/Socket/Connection";
import { ModuleService } from "Service/CourseLogic/ModuleService";
import { CourseService } from "Service/CourseLogic/CourseService";
import { StepAnswer } from "Service/Fals/Entities/StepAnswer";
import { StepStatistics } from "Service/Fals/Entities/StepStatistics";
import { SubmitStepResultScenario } from "Service/CourseLogic/Scenarios/SendStepResultScenario";

@Injectable()
export class StepService {
  public CurrentStep: BehaviorSubject<Step> = new BehaviorSubject<Step>(null);

  constructor(
    private socket: ConnectionService,
    private courseService: CourseService,
    private moduleService: ModuleService
  ) {
    console.log("ctor");
    this.moduleService.Module.subscribe(module => {
      this.CurrentStep.next(
        this.courseService.CurrentCourseState.value.currentStep
      );
    });
  }

  SubmitStepResult(result: StepStatistics) {
    let SubmitStepResult = new SubmitStepResultScenario(result, this.socket);
    SubmitStepResult.Start();
    return SubmitStepResult.Result;
  }
}
