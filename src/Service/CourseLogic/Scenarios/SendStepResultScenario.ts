import { RequestScenarioBase } from "Service/CourseLogic/Scenarios/Scenario";
import { ConnectionService } from "Service/Socket/Connection";
import { SubmitStepResult } from "Service/Socket/Events";
import { StepStatistics } from "Service/Fals/Statistics/StepStatistics";
import { SubmitStepResultError } from "Service/Fals/Facades/SubmitStepResultError";

export class SubmitStepResultScenario extends RequestScenarioBase<
  StepStatistics,
  SubmitStepResultError,
  SubmitStepResultError
> {
  constructor(private result: StepStatistics, connection: ConnectionService) {
    super(connection);
  }

  Start(): void {
    this.SubmitStepResultStage();
  }

  SubmitStepResultStage(): void {
    this.AddListener(SubmitStepResult, this.onSubmitStepResult);
    this.Send(SubmitStepResult, this.result);
  }

  OnSubmitStepResult(error: SubmitStepResultError) {
    this.EmitResult(this.result, error);
    this.RemoveListener(SubmitStepResult, this.onSubmitStepResult);
  }

  private readonly onSubmitStepResult: (s: SubmitStepResultError) => void = s =>
    this.onSubmitStepResult(s);
}
