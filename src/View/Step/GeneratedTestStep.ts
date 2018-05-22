import { Component, OnInit, Input } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import { BehaviorSubject } from "rxjs";
import { GeneratedTestStep } from "Service/Fals/Entities/GeneratedTestStep";
import { Step } from "Service/Fals/Entities/Step";
import { GeneratedTestProvider } from "Service/Providers/GeneratedTestProvider";

@Component({
  selector: "GeneratedTestStep",
  templateUrl: "View/Step/GeneratedTestStepComponent.html",
})
export class GeneratedTestStepComponent implements OnInit {
  @Input("Step")
  set setStep(step: GeneratedTestStep) {
    this.Step.next(step);
    this.generatedTestProvider
      .Generate(step)
      .subscribe(q => this.Exercises.next(q));
  }

  constructor(
    private courseService: CourseService,
    private generatedTestProvider: GeneratedTestProvider
  ) {}

  ngOnInit(): void {}

  public Exercises: BehaviorSubject<Step[]> = new BehaviorSubject([]);

  public Step: BehaviorSubject<GeneratedTestStep> = new BehaviorSubject(null);
}
