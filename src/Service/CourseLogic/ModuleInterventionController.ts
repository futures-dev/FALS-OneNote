import { Injectable } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import {
  CourseState,
  Module,
  Entity,
  RepeatIntervention,
  GotoModuleIntervention,
  Hint,
  Result,
  ModuleInterventionResult,
} from "Service/Fals";
import { BehaviorSubject } from "rxjs";
import { ModuleIntervention } from "Service/Fals/Statistics";
import { ModuleInterventionScenario } from "Service/CourseLogic/Scenarios/ModuleInterventionScenario";
import { ConnectionService } from "Service/Socket/Connection";
import { Cast } from "Service/Common/Cast";
import { InteractionRequester } from "Service/Interaction/InteractionRequester";
import { AsyncResult } from "Service/CourseLogic/AsyncResult";
import { GotoModuleInteractionComponent } from "View/Interaction/GotoModuleInteractionComponent";

export class ModuleInterventionController {
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

    if (courseState.currentModule.equals(this.previousModule.getValue())) {
      return;
    }

    const module = courseState.currentModule;
    this.previousModule.next(module);

    if (this.interventionScenario) {
      this.interventionScenario.Cancel();
    }
    this.interventionScenario = new ModuleInterventionScenario(
      module,
      this.connection
    );

    this.interventionScenario.Result.subscribe(this.interventionAction);
    this.interventionScenario.Start();
  }

  private onIntervention(
    interventionResult: AsyncResult<
      any,
      ModuleIntervention,
      ModuleInterventionResult
    >
  ) {
    const intervention = interventionResult.request;

    switch (intervention.type) {
      case "Entities.GotoModuleInterventiton":
        this.onGotoModuleIntervention(interventionResult);
        return;
      case "Entities.RepeatIntervention":
        this.onHint(Cast<RepeatIntervention>(intervention));
      default:
        console.log("Unknown Module intervention: " + intervention.type);
    }
  }

  private onGotoModuleIntervention(
    interventionResult: AsyncResult<
      any,
      GotoModuleIntervention,
      ModuleInterventionResult
    >
  ) {
    const intervention = interventionResult.request;

    this.interaction
      .Request<ModuleInterventionResult>(typeof GotoModuleInteractionComponent)
      .subscribe(r => {
        console.log(
          `Goto module Intervention ${intervention.id} approval result: ${r}`
        );
        interventionResult.ResultSubject.next(r);
      });
  }

  private onHint(intervention: RepeatIntervention) {}

  private readonly previousModule = new BehaviorSubject<Module>(null);
  private interventionScenario: ModuleInterventionScenario;

  private readonly courseStateChangedAction = s => this.onCourseStateChanged(s);
  private readonly interventionAction: (
    s: AsyncResult<any, ModuleIntervention, ModuleInterventionResult>
  ) => void = s => this.onIntervention(s);
}
