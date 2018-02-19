import { ScenarioBase } from "Service/Socket/Scenario";
import { ConnectionService } from "Service/Socket/Connection";
import { SubmitModuleResult } from "Service/Socket/Events";
import { ModuleStatistics } from "Service/Fals/Entities/ModuleStatistics";
import { SubmitModuleResultError } from "Service/Fals/Facades/SubmitModuleResultError";

export class SubmitModuleResultScenario extends ScenarioBase<
  SubmitModuleResultError
> {
  constructor(private result: ModuleStatistics, connection: ConnectionService) {
    super(connection);
  }

  Start(): void {
    this.SubmitModuleResultStage();
  }

  SubmitModuleResultStage(): void {
    this.connection.AddListener(SubmitModuleResult, s =>
      this.OnSubmitModuleResult(s)
    );
    this.connection.Send(SubmitModuleResult, this.result);
  }

  OnSubmitModuleResult(error: SubmitModuleResultError) {
    this.Result.next(error);
  }
}
