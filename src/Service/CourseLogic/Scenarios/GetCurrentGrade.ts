import { RequestScenarioBase } from "Service/CourseLogic/Scenarios/Scenario";
import { ConnectionService } from "Service/Socket/Connection";
import { GetCurrentGrade } from "Service/Socket/Events";
import { Module } from "Service/Fals/Entities/Module";
import { Course } from "Service/Fals/Entities/Course";
import { Student } from "Service/Fals/Entities/Student";
import { Results } from "Service/Socket/Results";
import { Step } from "Service/Fals/Entities/Step";
import { ModuleStatistics } from "Service/Fals/Statistics/ModuleStatistics";
import { ModuleGrade } from "Service/Fals/Statistics/ModuleGrade";
import { Cast } from "Service/Common/Cast";
import { StepGrade } from "Service/Fals/Statistics/StepGrade";

export class GetCurrentGradeScenario extends RequestScenarioBase<
  Step | Module,
  ModuleStatistics,
  Results
  > {
  constructor(private entity: Step | Module, connection: ConnectionService) {
    super(connection);
  }

  Start(): void {
    this.GetCurrentModuleStage();
  }

  GetCurrentModuleStage(): void {
    this.AddListener(GetCurrentGrade, this.getCurrentGrade);
    this.Send(GetCurrentGrade, this.entity);
  }

  OnGetCurrentGrade(cs: ModuleStatistics): void {
    if (cs.type == ModuleGrade["__class"]) {
      if (!this.entity.equals(Cast<ModuleGrade>(cs).module)) {
        return;
      }
    }
    if (cs.type == StepGrade["__class"]) {
      if (!this.entity.equals(Cast<StepGrade>(cs).step)) {
        return;
      }
    }
    this.EmitResult(this.entity, cs);
    this.RemoveListener(GetCurrentGrade);
  }

  private readonly getCurrentGrade: (s: ModuleStatistics) => void = s =>
    this.OnGetCurrentGrade(s);
}
