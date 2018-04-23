import { Injectable } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import { BehaviorSubject, Subscription } from "rxjs";
import { StepIntervention } from "Service/Fals/Statistics";
import { StepInterventionScenario } from "Service/CourseLogic/Scenarios/StepInterventionScenario";
import { ConnectionService } from "Service/Socket/Connection";
import { Cast } from "Service/Common/Cast";
import { InteractionRequester } from "Service/Interaction/InteractionRequester";
import { AsyncResult } from "Service/CourseLogic/AsyncResult";
import { GotoStepInteractionComponent } from "View/Interaction/GotoStepInteractionComponent";
import { CourseState } from "Service/Fals/Entities/CourseState";
import { StepInterventionResult } from "Service/Fals/Facades/StepInterventionResult";
import { RepeatIntervention } from "Service/Fals/Entities/RepeatIntervention";
import { GotoStepIntervention } from "Service/Fals/Entities/GotoStepIntervention";
import { Step } from "Service/Fals/Entities/Step";
import { Router } from "@angular/router";

export class StepInterventionController {
  constructor(
    private courseService: CourseService,
    private connection: ConnectionService,
    private interaction: InteractionRequester,
    private router: Router
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
      StepIntervention,
      StepIntervention,
      StepInterventionResult
    >
  ) {
    const intervention = interventionResult.request.intervention;

    switch (intervention.type) {
      case "Entities.GotoStepIntervention":
        this.onGotoStepIntervention(interventionResult);
        return;
      case "Entities.RepeatIntervention":
        this.onHint(Cast<RepeatIntervention>(intervention));
      default:
        console.log("Unknown Step intervention: " + intervention.type);
        interventionResult.result = StepInterventionResult.eNotSupported;
    }
  }

  private onGotoStepIntervention(
    interventionResult: AsyncResult<
      StepIntervention,
      StepIntervention,
      StepInterventionResult
    >
  ) {
    const intervention = interventionResult.request;

    this.interaction
      .Request<StepInterventionResult>(GotoStepInteractionComponent)
      .subscribe(r => {
        console.log(
          `Goto Step Intervention ${intervention.id} approval result: ${r}`
        );
        if (r) {
          this.courseService.CurrentCourseState.skip(1)
            .take(1)
            .subscribe(ns => {
              console.log("navigating " + ns.currentStep.id);
              this.router.navigateByUrl("/step?id=" + ns.currentStep.id);
            });
        }
        interventionResult.ResultSubject.next(
          r ? StepInterventionResult.sOk : StepInterventionResult.eDeclined
        );
      });
  }

  private onHint(intervention: RepeatIntervention) {}

  private readonly previousStep = new BehaviorSubject<Step>(null);
  private interventionScenario: StepInterventionScenario;

  private readonly courseStateChangedAction = s => this.onCourseStateChanged(s);
  private readonly interventionAction: (
    s: AsyncResult<StepIntervention, StepIntervention, StepInterventionResult>
  ) => void = s => this.onIntervention(s);
}
