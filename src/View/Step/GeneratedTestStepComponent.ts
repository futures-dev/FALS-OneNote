import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { GeneratedTestStep } from "Service/Fals/Entities/GeneratedTestStep";
import { Step } from "Service/Fals/Entities/Step";
import { GeneratedTestProvider } from "Service/Providers/GeneratedTestProvider";
import { ConnectionService } from "Service/Socket/Connection";
import { GeneratedTestStepChangedScenario } from "Service/CourseLogic/Scenarios/GeneratedTestStepChangedScenario";

@Component({
  selector: "generatedTestStep",
  templateUrl: "View/Step/GeneratedTestStep.html",
})
export class GeneratedTestStepComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.Scenario.Cancel();
  }

  @Input("Step")
  set setStep(step: GeneratedTestStep) {
    if (this.Scenario) {
      this.Scenario.Cancel();
    }
    this.Step.next(step);
    this.Exercises.next([]);
    this.Scenario = new GeneratedTestStepChangedScenario(step, this.connection);
    this.Scenario.Result.subscribe(q => {
      q.ResultSubject.next(q.response);
      console.log("gen test new ex");
      this.Exercises.next(this.Exercises.getValue().concat(q.request));
    });
    this.Scenario.Start();
  }

  @Input("SingleAttempt")
  set setSingleAttempt(singleAttempt: boolean) {
    this.SingleAttempt = singleAttempt;
  }

  constructor(
    private connection: ConnectionService,
    private generatedTestProvider: GeneratedTestProvider
  ) { }

  ngOnInit(): void { }

  public Exercises: BehaviorSubject<Step[]> = new BehaviorSubject([]);

  public Step: BehaviorSubject<GeneratedTestStep> = new BehaviorSubject(null);

  public SingleAttempt: boolean = false;

  private Scenario: GeneratedTestStepChangedScenario;
}
