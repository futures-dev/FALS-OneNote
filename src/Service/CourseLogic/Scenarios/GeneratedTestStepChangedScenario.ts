import { ConnectionService } from "Service/Socket/Connection";
import { GeneratedTestChanged } from "Service/Socket/Events";
import { ObserveScenarioBase } from "Service/CourseLogic/Scenarios/Scenario";
import { Step } from "Service/Fals/Entities/Step";
import { GeneratedTestStep } from "Service/Fals/Entities/GeneratedTestStep";
import { Results } from "Service/Fals/Facades/Results";

export class GeneratedTestStepChangedScenario extends ObserveScenarioBase<
  Step[],
  Results,
  Results
> {
  constructor(private Step: GeneratedTestStep, connection: ConnectionService) {
    super(connection);
  }

  Start(): void {
    this.Observe();
  }

  Cancel(): void {
    super.Cancel();
    this.RemoveListener(GeneratedTestChanged);
  }

  Observe(): void {
    this.AddListener(GeneratedTestChanged, this.GeneratedTestStepChanged);
  }

  OnGeneratedTestStepChanged(newSteps: Step[]): void {
    this.Respond(GeneratedTestChanged, newSteps, Results.sOk);
  }

  private readonly GeneratedTestStepChanged: (s: Step[]) => void = s =>
    this.OnGeneratedTestStepChanged(s);
}
