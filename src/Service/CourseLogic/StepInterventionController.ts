import { Injectable } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import {
  CourseState,
  Step,
  Entity,
  RepeatIntervention,
  GotoStepIntervention,
  Hint,
  Result,
  StepInterventionResult,
} from "Service/Fals";
import { BehaviorSubject } from "rxjs";
import { StepIntervention } from "Service/Fals/Statistics";
import { StepInterventionScenario } from "Service/CourseLogic/Scenarios/StepInterventionScenario";
import { ConnectionService } from "Service/Socket/Connection";
import { Cast } from "Service/Common/Cast";
import { InteractionRequester } from "Service/Interaction/InteractionRequester";
import { AsyncResult } from "Service/CourseLogic/AsyncResult";
import { GotoStepInteractionComponent } from "View/Interaction/GotoStepInteractionComponent";

export class StepInterventionController {
  constructor(
    private courseService: CourseService,
    private connection: ConnectionService,
    private interaction: InteractionRequester
  ) {
    courseService.CurrentCourseState.subscribe(this.courseStateChangedAction);
  }

  private onCourseStateChanged(courseState: CourseState) {
    if (!courseState) {
      return;
    }

    if (courseState.currentStep.equals(this.previousStep.getValue())) {
      return;
    }

    const Step = courseState.currentStep;
    this.previousStep.next(Step);

    if (this.interventionScenario) {
      this.interventionScenario.Cancel();
    }
    this.interventionScenario = new StepInterventionScenario(
      Step,
      this.connection
    );

    this.interventionScenario.Result.subscribe(this.interventionAction);
    this.interventionScenario.Start();
  }

  private onIntervention(
    interventionResult: AsyncResult<
      any,
      StepIntervention,
      StepInterventionResult
    >
  ) {
    const intervention = interventionResult.request;

    switch (intervention.type) {
      case "Entities.GotoStepInterventiton":
        this.onGotoStepIntervention(interventionResult);
        return;
      case "Entities.RepeatIntervention":
        this.onHint(Cast<RepeatIntervention>(intervention));
      default:
        console.log("Unknown Step intervention: " + intervention.type);
    }
  }

  private onGotoStepIntervention(
    interventionResult: AsyncResult<
      any,
      GotoStepIntervention,
      StepInterventionResult
    >
  ) {
    const intervention = interventionResult.request;

    this.interaction
      .Request<StepInterventionResult>(typeof GotoStepInteractionComponent)
      .subscribe(r => {
        console.log(
          `Goto Step Intervention ${intervention.id} approval result: ${r}`
        );
        interventionResult.ResultSubject.next(r);
      });
  }

  private onHint(intervention: RepeatIntervention) {}

  private readonly previousStep = new BehaviorSubject<Step>(null);
  private interventionScenario: StepInterventionScenario;

  private readonly courseStateChangedAction = s => this.onCourseStateChanged(s);
  private readonly interventionAction: (
    s: AsyncResult<any, StepIntervention, StepInterventionResult>
  ) => void = s => this.onIntervention(s);
}
