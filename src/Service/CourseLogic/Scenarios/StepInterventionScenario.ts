import { ScenarioBase } from "Service/Socket/Scenario";
import { CourseState, Student, Step } from "Service/Fals";
import { ConnectionService } from "Service/Socket/Connection";
import { StepIntervention } from "Service/Fals/Statistics";
import { StepIntervene } from "Service/Socket/Events";

export class StepInterventionScenario extends ScenarioBase<StepIntervention> {
  constructor(private Step: Step, connection: ConnectionService) {
    super(connection);
  }

  Start(): void {
    this.Observe();
  }

  Cancel(): void {
    this.connection.RemoveListener(StepIntervene, this.StepInterveneAction);
  }

  Observe(): void {
    this.connection.AddListener(StepIntervene, this.StepInterveneAction);
  }

  OnStepIntervene(intervention: StepIntervention): void {
    if (intervention.step.equals(this.Step)) {
      this.connection.Send(StepIntervene, true);
      this.Result.next(intervention);
    } else {
      console.log(
        `OnStepIntervene: Step ${intervention.step.id} is not expected ${
          this.Step.id
        }`
      );
    }
  }

  private readonly StepInterveneAction = s => this.OnStepIntervene(s);
}
