import { ScenarioBase } from "Service/Socket/Scenario";
import { ConnectionService } from "Service/Socket/Connection";
import { SubmitStepResult } from "Service/Socket/Events";
import { StepStatistics } from "Service/Fals/Entities/StepStatistics";
import { SubmitStepResultError } from "Service/Fals/Facades/SubmitStepResultError";

export class SubmitStepResultScenario extends ScenarioBase<
  SubmitStepResultError
> {
  constructor(private result: StepStatistics, connection: ConnectionService) {
    super(connection);
  }

  Start(): void {
    this.SubmitStepResultStage();
  }

  SubmitStepResultStage(): void {
    this.connection.AddListener(SubmitStepResult, s =>
      this.OnSubmitStepResult(s)
    );
    this.connection.Send(SubmitStepResult, this.result);
  }

  OnSubmitStepResult(error: SubmitStepResultError) {
    this.Result.next(error);
  }
}
