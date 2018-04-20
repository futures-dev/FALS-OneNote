import { RequestScenarioBase } from "Service/CourseLogic/Scenarios/Scenario";
import { ConnectionService } from "Service/Socket/Connection";
import { GetCurrentState } from "Service/Socket/Events";
import { Module } from "Service/Fals/Entities/Module";
import { Course } from "Service/Fals/Entities/Course";
import { CourseState } from "Service/Fals/Entities/CourseState";
import { Student } from "Service/Fals/Entities/Student";
import { Results } from "Service/Socket/Results";

export class GetCurrentStateScenario extends RequestScenarioBase<
  Student,
  CourseState,
  Results
> {
  constructor(private student: Student, connection: ConnectionService) {
    super(connection);
  }

  Start(): void {
    this.GetCurrentModuleStage();
  }

  GetCurrentModuleStage(): void {
    this.AddListener(GetCurrentState, this.getCurrentState);
    this.Send(GetCurrentState, this.student);
  }

  OnGetCurrentState(cs: CourseState): void {
    this.EmitResult(this.student, cs);
    this.RemoveListener(GetCurrentState, this.getCurrentState);
  }

  private readonly getCurrentState: (s: CourseState) => void = s =>
    this.OnGetCurrentState(s);
}
