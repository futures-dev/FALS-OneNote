import { ScenarioBase } from "Service/Socket/Scenario";
import { CourseState, Student, Module } from "Service/Fals";
import { ConnectionService } from "Service/Socket/Connection";
import { ModuleIntervention } from "Service/Fals/Statistics";
import { ModuleIntervene } from "Service/Socket/Events";

export class ModuleInterventionScenario extends ScenarioBase<
  ModuleIntervention
> {
  constructor(private Module: Module, connection: ConnectionService) {
    super(connection);
  }

  Start(): void {
    this.Observe();
  }

  Cancel(): void {
    this.connection.RemoveListener(ModuleIntervene, this.moduleInterveneAction);
  }

  Observe(): void {
    this.connection.AddListener(ModuleIntervene, this.moduleInterveneAction);
  }

  OnModuleIntervene(intervention: ModuleIntervention): void {
    if (intervention.module.equals(this.Module)) {
      this.connection.Send(ModuleIntervene, true);
      this.Result.next(intervention);
    } else {
      console.log(
        `OnModuleIntervene: Module ${intervention.module.id} is not expected ${
          this.Module.id
        }`
      );
    }
  }

  private readonly moduleInterveneAction = s => this.OnModuleIntervene(s);
}
