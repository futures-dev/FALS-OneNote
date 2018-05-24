import { Component, OnInit, Input } from "@angular/core";
import { Step } from "Service/Fals/Entities/Step";
import { StepStatistics } from "Service/Fals/Statistics/StepStatistics";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Course } from "Service/Fals/Entities/Course";
import { StepAnswer } from "Service/Fals/Statistics/StepAnswer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { StudyStep } from "Service/Fals/Entities/StudyStep";
import { SubmitStepResultError } from "Service/Fals/Facades/SubmitStepResultError";

@Component({
  selector: "studyStep",
  templateUrl: "View/Step/StudyStep.html",
})
export class StudyStepComponent implements OnInit {
  @Input("Step")
  set setStep(step: StudyStep) {
    this.Step.next(step);
  }

  public Step: BehaviorSubject<StudyStep> = new BehaviorSubject<StudyStep>(
    null
  );

  public IsLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  continue() {
    this.IsLoading.next(true);
    const result = new StepAnswer();
    result.module = this.CourseService.CurrentCourseState.value.currentModule;
    result.step = this.Step.getValue();
    result.course = this.CourseService.CurrentCourseState.value.course;
    this.CourseService.SubmitStepResult(result).subscribe(r => {
      if (r.response == SubmitStepResultError.sOk) {
        this.IsLoading.next(true);
      }
    });
  }

  constructor(private CourseService: CourseService) {}

  ngOnInit() {
    console.log("StudyStep ngOnInit");
  }
}
