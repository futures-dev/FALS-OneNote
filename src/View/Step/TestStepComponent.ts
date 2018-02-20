import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core/src/metadata/directives";
import { Step } from "Service/Fals/Entities/Step";
import { TestStep } from "Service/Fals/Entities/TestStep";
import { StepService } from "Service/CourseLogic/StepService";
import { StepStatistics } from "Service/Fals/Statistics/StepStatistics";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Course } from "Service/Fals/Entities/Course";
import { StepAnswer } from "Service/Fals/Statistics/StepAnswer";

@Component({
  selector: "testStep",
  templateUrl: "View/Step/TestStep.html",
})
export class TestStepComponent implements OnInit {
  @Input() Step: TestStep;

  Answer: number;

  constructor(
    private StepService: StepService,
    private CourseService: CourseService
  ) {}

  tryProceed() {
    let result = new StepAnswer();
    result.module = this.CourseService.CurrentCourseState.value.currentModule;
    result.step = this.Step;
    result.course = this.CourseService.CurrentCourseState.value.course;
    result.value = this.Answer.toString();
    this.StepService.SubmitStepResult(result);
  }

  ngOnInit() {}
}
