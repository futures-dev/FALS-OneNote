import {
  Component,
  OnInit,
  OnDestroy,
  AfterContentInit,
  AfterViewInit,
} from "@angular/core";
import { Input } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { CourseState } from "Service/Fals/Entities/CourseState";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { Step } from "Service/Fals/Entities/Step";
import { StepStatistics } from "Service/Fals/Statistics/StepStatistics";
import { StepTime } from "Service/Fals/Statistics/StepTime";
import { Module } from "Service/Fals/Entities/Module";
import { Cast } from "Service/Common/Cast";

@Component({
  selector: "step",
  templateUrl: "View/Step/Step.html",
})
export class StepComponent implements AfterViewInit, OnDestroy {
  @Input("Step")
  set setStep(step: Step) {
    this.Step.next(step);
    this.updateShowNext();

    if (this.isViewInit) {
      this.ngAfterViewInit();
    }
  }

  @Input("HideNext")
  set setHideNext(shouldHide: boolean) {
    this.HideNext = shouldHide;
    this.updateShowNext();
  }

  @Input("SingleAttempt")
  set setSingleAttempt(singleAttempt: boolean) {
    this.SingleAttempt = singleAttempt;
  }

  updateShowNext() {
    var stepChanged =
      !!this.Step.getValue() &&
      !!this.CourseService.CurrentCourseState.getValue().currentStep &&
      !this.Step.getValue().equals(
        this.CourseService.CurrentCourseState.getValue().currentStep
      );
    this.moduleChanged =
      this.moduleChanged ||
      (!!this.Module.getValue() &&
        !!this.CourseService.CurrentCourseState.getValue().currentModule &&
        !this.Module.getValue().equals(
          this.CourseService.CurrentCourseState.getValue().currentModule
        ));

    this.Module.next(
      this.CourseService.CurrentCourseState.getValue().currentModule
    );
    console.log("stepChanged = " + stepChanged);
    this.showNext.next(!this.HideNext && stepChanged);
  }

  public clickNext() {
    if (this.moduleChanged) {
      this.Router.navigateByUrl("courseDashboard");
    } else {
      this.Router.navigateByUrl(
        "/step?id=" +
          this.CourseService.CurrentCourseState.getValue().currentStep.id
      );
    }
  }

  public showNext: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public Step: BehaviorSubject<Step> = new BehaviorSubject(null);
  private Module: BehaviorSubject<Module> = new BehaviorSubject(null);
  private moduleChanged: boolean;

  private navigationSubscription: Subscription;

  constructor(private CourseService: CourseService, private Router: Router) {
    this.navigationSubscription = this.Router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        console.log("StepComponent.NavigationEnd()");

        if (this.isViewInit && this.Step.getValue()) {
          this.sendEndStatistics();
        }

        const state = this.CourseService.CurrentCourseState.getValue();
        this.Step.next(state.currentStep);
        this.updateShowNext();

        if (this.isViewInit && !this.HideNext) {
          this.isEndSent = false;
          this.ngAfterViewInit();
        }
      }
    });

    this.CourseService.CurrentCourseState.subscribe(newState => {
      this.updateShowNext();
    });
  }

  private isViewInit: boolean = false;
  private isEndSent = false;

  ngAfterViewInit() {
    this.isViewInit = true;

    const state = this.CourseService.CurrentCourseState.getValue();

    const stat = new StepTime();
    stat.course = state.course;
    stat.module = state.currentModule;
    stat.step = this.Step.getValue();
    stat.beginTime = new Date();
    this.CourseService.SubmitStepResult(stat);

    console.log(
      "StepComponent.init, step = " + stat.step ? stat.step.type : "null"
    );
  }

  sendEndStatistics() {
    if (!this.isEndSent) {
      const stat = new StepTime();
      const state = this.CourseService.CurrentCourseState.getValue();
      stat.course = state.course;
      stat.module = state.currentModule;
      stat.step = this.Step.getValue();
      stat.endTime = new Date();
      this.CourseService.SubmitStepResult(stat);

      this.isEndSent = true;

      console.log(
        "StepComponent.destroy, step = " + stat.step ? stat.step.type : "null"
      );
    }
  }

  ngOnDestroy() {
    this.sendEndStatistics();

    this.navigationSubscription.unsubscribe();
  }

  private HideNext: boolean = false;
  public SingleAttempt: boolean = false;
  private StepChanged: boolean = false;
}
