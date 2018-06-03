import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import { BehaviorSubject } from "rxjs";
import { ControlStep } from "Service/Fals/Entities/ControlStep";
import { Step } from "Service/Fals/Entities/Step";
import { ConnectionService } from "Service/Socket/Connection";
import { ControlStepChangedScenario } from "Service/CourseLogic/Scenarios/ControlStepChangedScenario";

@Component({
  selector: "controlStep",
  templateUrl: "View/Step/ControlStepComponent.html",
})
export class ControlStepComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.Scenario.Cancel();
  }
  @Input("Step")
  set setStep(step: ControlStep) {
    if (this.Scenario) {
      this.Scenario.Cancel();
    }
    this.Step.next(step);
    this.Exercises.next(step.exercises);
    this.Scenario = new ControlStepChangedScenario(
      step,
      this.connectionService
    );
    this.Scenario.Result.subscribe(q => {
      this.Exercises.next(this.Exercises.getValue().concat(q.request));
    });
    this.Scenario.Start();
  }

  constructor(
    private courseService: CourseService,
    private connectionService: ConnectionService
  ) {}

  ngOnInit(): void {}

  public Exercises: BehaviorSubject<Step[]> = new BehaviorSubject([]);

  public Step: BehaviorSubject<ControlStep> = new BehaviorSubject(null);

  private Scenario: ControlStepChangedScenario;
}
