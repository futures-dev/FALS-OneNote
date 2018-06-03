import { Component, OnInit, Input } from "@angular/core";
import { Step } from "Service/Fals/Entities/Step";
import { TestStep } from "Service/Fals/Entities/TestStep";
import { StepStatistics } from "Service/Fals/Statistics/StepStatistics";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Course } from "Service/Fals/Entities/Course";
import { StepAnswer } from "Service/Fals/Statistics/StepAnswer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { SectionStructure } from "Service/Office/SectionStructure";
import { StepInterventionController } from "Service/CourseLogic/StepInterventionController";
import { StepIntervention } from "Service/Fals/Statistics/StepIntervention";
import { Cast } from "Service/Common/Cast";
import { Hint } from "Service/Fals/Entities/Hint";
import { Distinction } from "Service/Fals/Entities/Distinction";
import { SubmitStepResultError } from "Service/Fals/Facades/SubmitStepResultError";
import { StepAnswerState } from "View/Step/StepAnswerState";
import { IfNull } from "Service/Common/IfNull";

@Component({
  selector: "testStep",
  templateUrl: "View/Step/TestStep.html",
})
export class TestStepComponent implements OnInit {
  @Input("Step")
  set setStep(step: TestStep) {
    this.Step.next(step);
    this.Answers.next(step.answers.map(k => k.value));

    if (step.problem.content.trim().startsWith("<")) {
      console.log("big problem");
      const state = this.CourseService.CurrentCourseState.getValue();
      this.section
        .getMaterialPage(
          state.course.title,
          state.currentModule.title,
          IfNull(step.title, step.id)
        )
        .then(page => {
          this.section.open(page).then(() => {
            this.section.putContent(step.problem.content, page).then(q => {
              this.IsLoading.next(false);
            });
          });
        });
    } else {
      this.Problem.next(step.problem.content);
      this.IsLoading.next(false);
    }
  }

  @Input("SkipCheck")
  set skipCheck(skip: boolean) {
    this.skip = skip;
  }

  @Input("SingleAttempt")
  set setSingleAttempt(singleAttempt: boolean) {
    this.SingleAttempt = singleAttempt;
  }

  skip: boolean = false;

  public Step: BehaviorSubject<TestStep> = new BehaviorSubject<TestStep>(null);

  public Answers: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
    null
  );
  public Answer: number = 0;
  public Problem: BehaviorSubject<string> = new BehaviorSubject("");

  public Hint: BehaviorSubject<string> = new BehaviorSubject(null);

  public Distinction: BehaviorSubject<string> = new BehaviorSubject(null);

  public DisableAnswer: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private CourseService: CourseService,
    private section: SectionStructure
  ) {
    CourseService.stepInterventionController.HintEvent.subscribe(
      (intervention: StepIntervention) => {
        this.Hint.next(Cast<Hint>(intervention.intervention).message);
      }
    );
    CourseService.stepInterventionController.DistinctionEvent.subscribe(
      (intervention: StepIntervention) => {
        this.Hint.next(Cast<Distinction>(intervention.intervention).message);
      }
    );
  }
  clearHint() {
    this.Hint.next(null);
  }

  isSelected(i: number) {
    return i == this.Answer;
  }

  toggle(i: number) {
    this.Answer = i;
  }

  state: BehaviorSubject<StepAnswerState> = new BehaviorSubject<
    StepAnswerState
  >(StepAnswerState.Default);
  StateEnum: typeof StepAnswerState = StepAnswerState;
  public IsLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  tryProceed() {
    this.state.next(StepAnswerState.Loading);
    if (this.SingleAttempt) {
      this.DisableAnswer.next(true);
    }

    let result = new StepAnswer();
    result.module = this.CourseService.CurrentCourseState.value.currentModule;
    result.step = this.Step.getValue();
    result.course = this.CourseService.CurrentCourseState.value.course;
    result.value = this.Answer.toString();

    this.CourseService.SubmitStepResult(result).subscribe(r => {
      if (r.response == SubmitStepResultError.sOk) {
        this.clearHint();
        this.state.next(StepAnswerState.Correct);
      } else if (r.response == SubmitStepResultError.sWrongAnswer) {
        this.state.next(StepAnswerState.Wrong);
      } else {
        this.state.next(StepAnswerState.Default);
        // show error
      }
    });
  }

  ngOnInit() {}

  private SingleAttempt: boolean = false;
}
