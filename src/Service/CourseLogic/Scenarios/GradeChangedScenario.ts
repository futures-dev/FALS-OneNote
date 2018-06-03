import { ConnectionService } from "Service/Socket/Connection";
import { GradeChanged } from "Service/Socket/Events";
import { ObserveScenarioBase } from "Service/CourseLogic/Scenarios/Scenario";
import { Step } from "Service/Fals/Entities/Step";
import { ModuleStatistics } from "Service/Fals/Statistics/ModuleStatistics";
import { Results } from "Service/Fals/Facades/Results";

export class GradeChangedScenario extends ObserveScenarioBase<
  ModuleStatistics,
  Results,
  Results
> {
  constructor(connection: ConnectionService) {
    super(connection);
  }

  Start(): void {
    this.Observe();
  }

  Cancel(): void {
    super.Cancel();
    this.RemoveListener(GradeChanged);
  }

  Observe(): void {
    this.AddListener(GradeChanged, this.GradeChanged);
  }

  OnGradeChanged(statistics: ModuleStatistics): void {
    this.Respond(GradeChanged, statistics, Results.sOk);
  }

  private readonly GradeChanged: (s: ModuleStatistics) => void = s =>
    this.OnGradeChanged(s);
}
