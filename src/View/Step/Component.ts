import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { CourseState } from "Service/Fals/Entities/CourseState";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { Step } from "Service/Fals/Entities/Step";
import { StepStatistics } from "Service/Fals/Statistics/StepStatistics";
import { StepTime } from "Service/Fals/Statistics/StepTime";

@Component({
  selector: "step",
  templateUrl: "View/Step/Step.html",
})
export class StepComponent implements OnInit {
  @Input("Step")
  set setStep(step: Step) {
    this.Step.next(step);
  }

  @Input("HideNext")
  set setHideNext(shouldHide: boolean) {
    this.HideNext = shouldHide;
    this.updateShowNext();
  }

  updateShowNext() {
    this.showNext.next(!this.HideNext && this.StepChanged);
  }

  public clickNext() {
    this.Router.navigateByUrl(
      "/step?id=" +
        this.CourseService.CurrentCourseState.getValue().currentStep.id
    );
  }

  public showNext: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public Step: BehaviorSubject<Step> = new BehaviorSubject(null);

  private navigationSubscription: Subscription;

  constructor(private CourseService: CourseService, private Router: Router) {
    this.navigationSubscription = this.Router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        console.log("StepComponent.NavigationEnd()");
        this.init();
      }
    });

    this.CourseService.CurrentCourseState.subscribe(newState => {
      const newStep = newState.currentStep;
      if (!this.Step.getValue() || newStep.equals(this.Step.getValue())) {
        this.StepChanged = false;
      } else {
        this.StepChanged = true;
      }
      this.updateShowNext();
    });
  }

  ngOnInit() {}

  init() {
    const state = this.CourseService.CurrentCourseState.getValue();

    this.Step.next(state.currentStep);

    const stat = new StepTime();
    stat.course = state.course;
    stat.module = state.currentModule;
    stat.step = state.currentStep;
    stat.beginTime = new Date();
    this.CourseService.SubmitStepResult(stat);

    console.log("StepComponent.init, currentStep = " + this.Step.getValue());
  }

  private HideNext: boolean = false;
  private StepChanged: boolean = false;
}
