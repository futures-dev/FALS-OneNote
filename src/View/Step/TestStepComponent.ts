import { Component, OnInit, Input } from "@angular/core";
import { Step } from "Service/Fals/Entities/Step";
import { TestStep } from "Service/Fals/Entities/TestStep";
import { StepStatistics } from "Service/Fals/Statistics/StepStatistics";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Course } from "Service/Fals/Entities/Course";
import { StepAnswer } from "Service/Fals/Statistics/StepAnswer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
  selector: "testStep",
  templateUrl: "View/Step/TestStep.html",
})
export class TestStepComponent implements OnInit {
  @Input("Step")
  public setStep(step: TestStep) {
    this.Step.next(step);
  }

  public Step: BehaviorSubject<TestStep> = new BehaviorSubject<TestStep>(null);

  public Answers: string[];
  public Answer: number = 0;

  constructor(private CourseService: CourseService) {}

  isSelected(i: number) {
    return i == this.Answer;
  }

  toggle(i: number) {
    this.Answer = i;
  }

  tryProceed() {
    let result = new StepAnswer();
    result.module = this.CourseService.CurrentCourseState.value.currentModule;
    result.step = this.Step.getValue();
    result.course = this.CourseService.CurrentCourseState.value.course;
    result.value = this.Answer.toString();
    this.CourseService.SubmitStepResult(result);
  }

  ngOnInit() {}
}
