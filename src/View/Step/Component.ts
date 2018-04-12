import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core/src/metadata/directives";
import { CourseService } from "Service/CourseLogic/CourseService";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { CourseState, Step } from "Service/Fals";
import { Router } from "@angular/router";

@Component({
  selector: "step",
  templateUrl: "View/Step/Step.html",
})
export class StepComponent implements OnInit {
  public Step: Step;

  constructor(private CourseService: CourseService, private Router: Router) {
    CourseService.CurrentCourseState.subscribe(cs => {
      if (!cs.currentStep.equals(this.Step)) {
        this.onStepChanged(cs.currentStep);
      }
    });

    this.Step = this.CourseService.CurrentCourseState.getValue().currentStep;
  }

  onStepChanged(newStep: Step) {
    // todo: warn user
    this.Router.navigateByUrl("/step");
  }

  ngOnInit() { }
}
