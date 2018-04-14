import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core/src/metadata/directives";
import { CourseService } from "Service/CourseLogic/CourseService";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { CourseState, Step } from "Service/Fals";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "step",
  templateUrl: "View/Step/Step.html",
})
export class StepComponent implements OnInit {
  public Step: BehaviorSubject<Step> = new BehaviorSubject(null);

  private navigationSubscription: Subscription;

  constructor(private CourseService: CourseService, private Router: Router) {
    this.navigationSubscription = this.Router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        console.log("StepComponent.NavigationEnd()");
        this.init();
      }
    });
  }

  ngOnInit() {}

  init() {
    this.Step.next(
      this.CourseService.CurrentCourseState.getValue().currentStep
    );

    console.log("StepComponent.init, currentStep = " + this.Step.getValue());
  }
}
