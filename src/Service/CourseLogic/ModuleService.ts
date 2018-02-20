import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Module } from "Service/Fals/Entities/Module";
import { ConnectionService } from "Service/Socket/Connection";
import { CurrentStateChanged, SubmitModuleResult } from "Service/Socket/Events";
import { ModuleResult } from "Service/Fals/Statistics/ModuleResult";
import { CourseService } from "Service/CourseLogic/CourseService";
import { SubmitModuleResultScenario } from "Service/CourseLogic/Scenarios/SendModuleResultScenario";
import { SubmitModuleResultError } from "Service/Fals/Facades/SubmitModuleResultError";
import { Observable } from "rxjs/Observable";
import { GetCurrentStateScenario } from "Service/CourseLogic/Scenarios/GetCurrentStateScenario";
import { CourseState } from "Service/Fals/Entities/CourseState";
import { ModuleStatistics } from "Service/Fals/Statistics/ModuleStatistics";

@Injectable()
export class ModuleService {
  public Module: BehaviorSubject<Module> = new BehaviorSubject<Module>(null);

  constructor(
    private socket: ConnectionService,
    private courseService: CourseService
  ) {
    this.courseService.CurrentCourseState.subscribe(c => {
      this.Module.next(c.currentModule);
    });
  }

  SendModuleResult(
    result: ModuleStatistics
  ): Observable<SubmitModuleResultError> {
    let SendModuleResult = new SubmitModuleResultScenario(result, this.socket);
    SendModuleResult.Start();
    return SendModuleResult.Result;
  }
}
