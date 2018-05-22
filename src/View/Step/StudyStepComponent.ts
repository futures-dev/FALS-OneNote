import { Component, OnInit, Input } from "@angular/core";
import { Step } from "Service/Fals/Entities/Step";
import { StepStatistics } from "Service/Fals/Statistics/StepStatistics";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Course } from "Service/Fals/Entities/Course";
import { StepAnswer } from "Service/Fals/Statistics/StepAnswer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { StudyStep } from "Service/Fals/Entities/StudyStep";

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

  constructor(private CourseService: CourseService) {}

  ngOnInit() {}
}
