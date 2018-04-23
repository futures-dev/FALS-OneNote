import { Component, OnInit, Input } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import { BehaviorSubject } from "rxjs";
import { ControlStep } from "Service/Fals/Entities/ControlStep";
import { Step } from "Service/Fals/Entities/Step";

@Component({
  selector: "controlStep",
  templateUrl: "View/Step/ControlStepComponent.html",
})
export class ControlStepComponent implements OnInit {
  @Input("Step")
  set setStep(step: ControlStep) {
    this.Step.next(step);
    this.Exercises.next(step.exercises);
  }

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {}

  public Exercises: BehaviorSubject<Step[]> = new BehaviorSubject([]);

  public Step: BehaviorSubject<ControlStep> = new BehaviorSubject(null);
}
