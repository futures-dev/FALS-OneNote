import { Component, OnInit, Input } from "@angular/core";
import { Step } from "Service/Fals/Entities/Step";
import { StepStatistics } from "Service/Fals/Statistics/StepStatistics";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Course } from "Service/Fals/Entities/Course";
import { StepAnswer } from "Service/Fals/Statistics/StepAnswer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { SectionStructure } from "Service/Office/SectionStructure";
import { HypertextMaterial } from "Service/Fals/Bank/HypertextMaterial";
import { Subject } from "rxjs/Subject";
import { IfNull } from "Service/Common/IfNull";
import { OneNoteAuth } from "Service/Office/Auth/OneNoteAuth";
import { PascaStep } from "Service/Fals/Entities/PascaStep";
import { PascaStepResult } from "Service/Fals/Pasca/PascaStepResult";
import { SubmitStepResultError } from "Service/Fals/Facades/SubmitStepResultError";
import { StepAnswerState } from "View/Step/StepAnswerState";

@Component({
  selector: "pascaStep",
  templateUrl: "View/Step/PascaStep.html",
  providers: [SectionStructure, OneNoteAuth],
})
export class PascaStepComponent implements OnInit {
  @Input("IsLoading")
  set setIsLoading(parentIsLoading: Subject<boolean>) {
    this.IsLoading.subscribe(q => parentIsLoading.next(q));
  }

  @Input("SingleAttempt")
  set setSingleAttempt(singleAttempt: boolean) {
    this.SingleAttempt = singleAttempt;
  }

  @Input("Step")
  set setStep(step: PascaStep) {
    this.Step.next(step);
    let state = this.CourseService.CurrentCourseState.getValue();

    this.OnenoteLinkText.next(
      `${state.course.title}->${state.currentModule.title}->${
        state.currentStep.id
      }`
    );
  }

  gotoMaterials(step: PascaStep = this.Step.getValue()) {
    return this.SectionStructure.navigateOnPascaPage(
      this.OneNote.displayName.getValue(),
      step.pascaOnenoteSettings.pascaSectionGroupName,
      step.pascaSessionSettings.sessionName,
      step.pascaOnenoteSettings.assignmentSectionName
    );
  }

  tryProceed() {
    this.state.next(StepAnswerState.Loading);
    if (this.SingleAttempt) {
      this.DisableAnswer.next(true);
    }

    let result = new StepAnswer();
    result.module = this.CourseService.CurrentCourseState.value.currentModule;
    result.step = this.Step.getValue();
    result.course = this.CourseService.CurrentCourseState.value.course;
    result.value = JSON.stringify(new PascaStepResult());
    this.CourseService.SubmitStepResult(result).subscribe(r => {
      if (r.response == SubmitStepResultError.sOk) {
        this.state.next(StepAnswerState.Correct);
      } else if (r.response == SubmitStepResultError.sWrongAnswer) {
        this.state.next(StepAnswerState.Wrong);
      } else {
        this.state.next(StepAnswerState.Default);
        // show error
      }
    });
  }

  public OnenoteLinkText: BehaviorSubject<string> = new BehaviorSubject<string>(
    ""
  );

  public Step: BehaviorSubject<PascaStep> = new BehaviorSubject<PascaStep>(
    null
  );

  public IsLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  public DisableAnswer: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private CourseService: CourseService,
    private SectionStructure: SectionStructure,
    private OneNote: OneNoteAuth
  ) {}

  ngOnInit() {}

  state: BehaviorSubject<StepAnswerState> = new BehaviorSubject<
    StepAnswerState
  >(StepAnswerState.Default);
  StateEnum: typeof StepAnswerState = StepAnswerState;

  private SingleAttempt: boolean = false;
}
