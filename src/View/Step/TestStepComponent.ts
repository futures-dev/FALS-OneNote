import { Component, OnInit, Input } from "@angular/core";
import { Step } from "Service/Fals/Entities/Step";
import { TestStep } from "Service/Fals/Entities/TestStep";
import { StepStatistics } from "Service/Fals/Statistics/StepStatistics";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Course } from "Service/Fals/Entities/Course";
import { StepAnswer } from "Service/Fals/Statistics/StepAnswer";

@Component({
  selector: "testStep",
  templateUrl: "View/Step/TestStep.html",
})
export class TestStepComponent implements OnInit {
  @Input("Step")
  public setStep(step: TestStep) {
    this.Step = step;
  }

  public Step: TestStep;

  public Problem: string;
  public Answers: string[];
  public Answer: number;

  constructor(private CourseService: CourseService) {
    this.Problem = this.Step.problem.content;
    this.Answers = this.Step.answers.map(k => k.value);
    this.Answer = 0;
  }

  isSelected(i: number) {
    return i == this.Answer;
  }

  toggle(i: number) {
    this.Answer = i;
  }

  tryProceed() {
    let result = new StepAnswer();
    result.module = this.CourseService.CurrentCourseState.value.currentModule;
    result.step = this.Step;
    result.course = this.CourseService.CurrentCourseState.value.course;
    result.value = this.Answer.toString();
    this.CourseService.SubmitStepResult(this.Step, result);
  }

  ngOnInit() { }
}
