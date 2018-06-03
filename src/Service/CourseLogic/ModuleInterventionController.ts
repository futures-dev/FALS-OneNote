import { Injectable } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import { BehaviorSubject } from "rxjs";
import { ModuleIntervention } from "Service/Fals/Statistics";
import { ModuleInterventionScenario } from "Service/CourseLogic/Scenarios/ModuleInterventionScenario";
import { ConnectionService } from "Service/Socket/Connection";
import { Cast } from "Service/Common/Cast";
import { InteractionRequester } from "Service/Interaction/InteractionRequester";
import { AsyncResult } from "Service/CourseLogic/AsyncResult";
import { GotoModuleInteractionComponent } from "View/Interaction/GotoModuleInteractionComponent";
import { CourseState } from "Service/Fals/Entities/CourseState";
import { ModuleInterventionResult } from "Service/Fals/Facades/ModuleInterventionResult";
import { RepeatIntervention } from "Service/Fals/Entities/RepeatIntervention";
import { GotoModuleIntervention } from "Service/Fals/Entities/GotoModuleIntervention";
import { Module } from "Service/Fals/Entities/Module";
import { Router } from "@angular/router";

export class ModuleInterventionController {
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
      ModuleIntervention,
      ModuleIntervention,
      ModuleInterventionResult
      >
  ) {
    const intervention = interventionResult.request.intervention;

    switch (intervention.type) {
      case GotoModuleIntervention["__class"]:
        this.onGotoModuleIntervention(interventionResult);
        return;
      case RepeatIntervention["__class"]:
        this.onHint(Cast<RepeatIntervention>(intervention));
      default:
        console.log("Unknown Module intervention: " + intervention.type);
        interventionResult.result = ModuleInterventionResult.eNotSupported;
    }
  }

  private onGotoModuleIntervention(
    interventionResult: AsyncResult<
      ModuleIntervention,
      GotoModuleIntervention,
      ModuleInterventionResult
      >
  ) {
    const intervention = interventionResult.request;

    this.interaction
      .Request<ModuleInterventionResult>(
        GotoModuleInteractionComponent,
        {}
      )
      .subscribe(r => {
        console.log(
          `Goto module Intervention ${intervention.id} approval result: ${r}`
        );
        // if (r) {
        //   this.router.navigateByUrl("courseDashboard?id=1");
        // }
        interventionResult.ResultSubject.next(
          r ? ModuleInterventionResult.sOk : ModuleInterventionResult.eDeclined);
      });
  }

  private onHint(intervention: RepeatIntervention) { }

  private readonly previousModule = new BehaviorSubject<Module>(null);
  private interventionScenario: ModuleInterventionScenario;

  private readonly courseStateChangedAction = s => this.onCourseStateChanged(s);
  private readonly interventionAction: (
    s: AsyncResult<
      ModuleIntervention,
      ModuleIntervention,
      ModuleInterventionResult
      >
  ) => void = s => this.onIntervention(s);
}
