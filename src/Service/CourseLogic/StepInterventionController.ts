import { Injectable } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import {
  CourseState,
  Step,
  Entity,
  RepeatIntervention,
  GotoStepIntervention,
  Hint,
} from "Service/Fals";
import { BehaviorSubject } from "rxjs";
import { StepIntervention } from "Service/Fals/Statistics";
import { StepInterventionScenario } from "Service/CourseLogic/Scenarios/StepInterventionScenario";
import { ConnectionService } from "Service/Socket/Connection";
import { Cast } from "Service/Common/Cast";

@Injectable()
export class StepInterventionController {
  constructor(
    private courseService: CourseService,
    private connection: ConnectionService
  ) {
    console.log("constructor StepInterventionController");
    courseService.CurrentCourseState.subscribe(this.courseStateChangedAction);
  }

  private onCourseStateChanged(courseState: CourseState) {
    if (courseState.currentStep.equals(this.previousStep.getValue())) {
      return;
    }

    const step = courseState.currentStep;
    this.previousStep.next(step);

    if (this.interventionScenario) {
      this.interventionScenario.Cancel();
    }
    this.interventionScenario = new StepInterventionScenario(
      step,
      this.connection
    );

    this.interventionScenario.Result.subscribe(this.interventionAction);
    this.interventionScenario.Start();
  }

  private onIntervention(intervention: StepIntervention) {
    switch (intervention.type) {
      case "Entities.GotoStepInterventiton":
        this.onGotoStepIntervention(Cast<GotoStepIntervention>(intervention));
        return;
      case "Entities.Hint":
        this.onHint(Cast<Hint>(intervention));
      default:
        console.log("Unknown step intervention: " + intervention.type);
    }
  }

  private onGotoStepIntervention(intervention: GotoStepIntervention) {}

  private onHint(intervention: Hint) {}

  private readonly previousStep = new BehaviorSubject<Step>(null);
  private interventionScenario: StepInterventionScenario;

  private readonly courseStateChangedAction = s => this.onCourseStateChanged(s);
  private readonly interventionAction = s => this.onIntervention(s);
}
