import {
  CourseState,
  Student,
  Step,
  StepInterventionResult,
} from "Service/Fals";
import { ConnectionService } from "Service/Socket/Connection";
import { StepIntervention } from "Service/Fals/Statistics";
import { StepIntervene } from "Service/Socket/Events";
import { ObserveScenarioBase } from "Service/CourseLogic/Scenarios/Scenario";

export class StepInterventionScenario extends ObserveScenarioBase<
  StepIntervention,
  StepIntervention,
  StepInterventionResult
> {
  constructor(private Step: Step, connection: ConnectionService) {
    super(connection);
  }

  Start(): void {
    this.Observe();
  }

  Cancel(): void {
    super.Cancel();
    this.RemoveListener(StepIntervene, this.StepInterveneAction);
  }

  Observe(): void {
    this.AddListener(StepIntervene, this.StepInterveneAction);
  }

  OnStepIntervene(intervention: StepIntervention): void {
    if (intervention.step.equals(this.Step)) {
      this.Respond(StepIntervene, intervention, intervention);
    } else {
      console.log(
        `OnStepIntervene: Step ${intervention.step.id} is not expected ${
          this.Step.id
        }`
      );
    }
  }

  private readonly StepInterveneAction: (s: StepIntervention) => void = s =>
    this.OnStepIntervene(s);
}
