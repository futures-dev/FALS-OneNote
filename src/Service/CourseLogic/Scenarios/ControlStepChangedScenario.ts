import { ConnectionService } from "Service/Socket/Connection";
import { ControlStepChanged } from "Service/Socket/Events";
import { ObserveScenarioBase } from "Service/CourseLogic/Scenarios/Scenario";
import { Step } from "Service/Fals/Entities/Step";
import { StepInterventionResult } from "Service/Fals/Facades/StepInterventionResult";
import { ControlStep } from "Service/Fals/Entities/ControlStep";
import { Results } from "Service/Fals/Facades/Results";

export class ControlStepChangedScenario extends ObserveScenarioBase<
  Step[],
  Results,
  Results
> {
  constructor(private Step: ControlStep, connection: ConnectionService) {
    super(connection);
  }

  Start(): void {
    this.Observe();
  }

  Cancel(): void {
    super.Cancel();
    this.RemoveListener(ControlStepChanged);
  }

  Observe(): void {
    this.AddListener(ControlStepChanged, this.controlStepChanged);
  }

  OnControlStepChanged(newSteps: Step[]): void {
    this.Respond(ControlStepChanged, newSteps, Results.sOk);
  }

  private readonly controlStepChanged: (s: Step[]) => void = s =>
    this.OnControlStepChanged(s);
}
