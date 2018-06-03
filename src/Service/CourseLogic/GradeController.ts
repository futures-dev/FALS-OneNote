import { ConnectionService } from "Service/Socket/Connection";
import { GradeChangedScenario } from "Service/CourseLogic/Scenarios/GradeChangedScenario";
import { Module } from "Service/Fals/Entities/Module";
import { Step } from "Service/Fals/Entities/Step";
import { GetCurrentGradeScenario } from "Service/CourseLogic/Scenarios/GetCurrentGrade";
import { EventEmitter, Injectable } from "@angular/core";
import { ModuleStatistics } from "Service/Fals/Statistics/ModuleStatistics";
import { StepGrade } from "Service/Fals/Statistics/StepGrade";
import { ModuleGrade } from "Service/Fals/Statistics/ModuleGrade";
import { Cast } from "Service/Common/Cast";
import { Observable } from "rxjs/Observable";
@Injectable()
export class GradeController {
  constructor(private connection: ConnectionService) {
    this.GradeChangedScenario = new GradeChangedScenario(connection);
    this.GradeChangedScenario.Result.subscribe(r => {
      r.ResultSubject.next(r.response);

      if (r.request.id == StepGrade["__class"]) {
        this.StepGradeEvent.next(Cast<StepGrade>(r.request));
      } else if (r.request.id == ModuleGrade["__class"]) {
        this.ModuleGradeEvent.next(Cast<ModuleGrade>(r.request));
      } else {
        console.log("GradeController: unexpected request ");
        console.log(JSON.stringify(r.request));
      }
    });
  }

  getStepGrade(step: Step): Observable<StepGrade> {
    const getGradeScenario = new GetCurrentGradeScenario(step, this.connection);
    getGradeScenario.Start();
    return getGradeScenario.Result.map(r => Cast<StepGrade>(r.response));
  }

  getModuleGrade(module: Module): Observable<ModuleGrade> {
    const getGradeScenario = new GetCurrentGradeScenario(
      module,
      this.connection
    );
    getGradeScenario.Start();
    return getGradeScenario.Result.map(r => Cast<ModuleGrade>(r.response));
  }

  private ModuleGradeEvent: EventEmitter<ModuleGrade> = new EventEmitter();
  private StepGradeEvent: EventEmitter<StepGrade> = new EventEmitter();

  private GradeChangedScenario: GradeChangedScenario;
}
