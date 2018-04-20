import { RequestScenarioBase } from "Service/CourseLogic/Scenarios/Scenario";
import { ConnectionService } from "Service/Socket/Connection";
import { SubmitModuleResult } from "Service/Socket/Events";
import { ModuleStatistics } from "Service/Fals/Statistics/ModuleStatistics";
import { SubmitModuleResultError } from "Service/Fals/Facades/SubmitModuleResultError";

export class SubmitModuleResultScenario extends RequestScenarioBase<
  ModuleStatistics,
  SubmitModuleResultError,
  SubmitModuleResultError
> {
  constructor(private result: ModuleStatistics, connection: ConnectionService) {
    super(connection);
  }

  Start(): void {
    this.SubmitModuleResultStage();
  }

  SubmitModuleResultStage(): void {
    this.AddListener(SubmitModuleResult, this.onSubmitModule);
    this.Send(SubmitModuleResult, this.result);
  }

  OnSubmitModuleResult(error: SubmitModuleResultError) {
    this.EmitResult(this.result, error);
    this.RemoveListener(SubmitModuleResult, this.onSubmitModule);
  }

  private readonly onSubmitModule: (s: SubmitModuleResultError) => void = s =>
    this.OnSubmitModuleResult(s);
}
