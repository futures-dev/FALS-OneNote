import { Component, OnInit, Input } from "@angular/core";
import { Step } from "Service/Fals/Entities/Step";
import { TestStep } from "Service/Fals/Entities/TestStep";
import { StepStatistics } from "Service/Fals/Statistics/StepStatistics";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Course } from "Service/Fals/Entities/Course";
import { StepAnswer } from "Service/Fals/Statistics/StepAnswer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { SectionStructure } from "Service/Office/SectionStructure";

@Component({
  selector: "testStep",
  templateUrl: "View/Step/TestStep.html",
})
export class TestStepComponent implements OnInit {
  @Input("Step")
  set setStep(step: TestStep) {
    this.Step.next(step);
    console.log("hi");
    console.log(step.answers);
    this.Answers.next(step.answers.map(k => k.value));

    if (step.problem.content.indexOf("\n") > 0) {
      console.log("big problem");
      const state = this.CourseService.CurrentCourseState.getValue();
      this.section
        .getMaterialPage(state.course.id, state.currentModule.id, step.id)
        .then(page => {
          this.section
            .putContent(step.problem.content, page)
            .then(q => this.section.open(page));
        });
    } else {
      this.Problem.next(step.problem.content);
    }
  }

  public Step: BehaviorSubject<TestStep> = new BehaviorSubject<TestStep>(null);
  public showProceed: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public Answers: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(null);
  public Answer: number = 0;
  public Problem: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(
    private CourseService: CourseService,
    private section: SectionStructure
  ) { }

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
    this.showProceed.next(false);
  }

  ngOnInit() { }
}
