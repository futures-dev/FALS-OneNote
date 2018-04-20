import {
  CourseState,
  Student,
  Module,
  ModuleInterventionResult,
  ModuleInterventionModel,
} from "Service/Fals";
import { ConnectionService } from "Service/Socket/Connection";
import { ModuleIntervention } from "Service/Fals/Statistics";
import { ModuleIntervene } from "Service/Socket/Events";
import { ObserveScenarioBase } from "Service/CourseLogic/Scenarios/Scenario";

export class ModuleInterventionScenario extends ObserveScenarioBase<
  ModuleIntervention,
  ModuleIntervention,
  ModuleInterventionResult
> {
  constructor(private Module: Module, connection: ConnectionService) {
    super(connection);
  }

  Start(): void {
    this.Observe();
  }

  Cancel(): void {
    super.Cancel();
    this.RemoveListener(ModuleIntervene, this.moduleInterveneAction);
  }

  Observe(): void {
    this.AddListener(ModuleIntervene, this.moduleInterveneAction);
  }

  OnModuleIntervene(intervention: ModuleIntervention): void {
    if (intervention.module.equals(this.Module)) {
      this.Respond(ModuleIntervene, intervention, intervention);
    } else {
      console.log(
        `OnModuleIntervene: Module ${intervention.module.id} is not expected ${
          this.Module.id
        }`
      );
    }
  }

  private readonly moduleInterveneAction: (s: ModuleIntervention) => void = s =>
    this.OnModuleIntervene(s);
}
