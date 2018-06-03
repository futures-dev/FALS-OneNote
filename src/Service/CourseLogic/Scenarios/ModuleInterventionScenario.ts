import { ConnectionService } from "Service/Socket/Connection";
import { ModuleIntervention } from "Service/Fals/Statistics";
import { ModuleIntervene } from "Service/Socket/Events";
import { ObserveScenarioBase } from "Service/CourseLogic/Scenarios/Scenario";
import { ModuleInterventionResult } from "Service/Fals/Facades/ModuleInterventionResult";
import { Module } from "Service/Fals/Entities/Module";

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
    this.RemoveListener(ModuleIntervene);
  }

  Observe(): void {
    this.AddListener(ModuleIntervene, this.moduleIntervene);
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

  private readonly moduleIntervene: (s: ModuleIntervention) => void = s =>
    this.OnModuleIntervene(s);
}
