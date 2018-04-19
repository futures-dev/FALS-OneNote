import { Injectable } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import {
  CourseState,
  Module,
  Entity,
  RepeatIntervention,
  GotoModuleIntervention,
  Hint,
} from "Service/Fals";
import { BehaviorSubject } from "rxjs";
import { ModuleIntervention } from "Service/Fals/Statistics";
import { ModuleInterventionScenario } from "Service/CourseLogic/Scenarios/ModuleInterventionScenario";
import { ConnectionService } from "Service/Socket/Connection";
import { Cast } from "Service/Common/Cast";

export class ModuleInterventionController {
  constructor(
    private courseService: CourseService,
    private connection: ConnectionService
  ) {
    courseService.CurrentCourseState.subscribe(this.courseStateChangedAction);
  }

  private onCourseStateChanged(courseState: CourseState) {
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

  private onIntervention(intervention: ModuleIntervention) {
    switch (intervention.type) {
      case "Entities.GotoModuleInterventiton":
        this.onGotoModuleIntervention(
          Cast<GotoModuleIntervention>(intervention)
        );
        return;
      case "Entities.RepeatIntervention":
        this.onHint(Cast<RepeatIntervention>(intervention));
      default:
        console.log("Unknown Module intervention: " + intervention.type);
    }
  }

  private onGotoModuleIntervention(intervention: GotoModuleIntervention) {}

  private onHint(intervention: RepeatIntervention) {}

  private readonly previousModule = new BehaviorSubject<Module>(null);
  private interventionScenario: ModuleInterventionScenario;

  private readonly courseStateChangedAction = s => this.onCourseStateChanged(s);
  private readonly interventionAction = s => this.onIntervention(s);
}
