import { Component, OnInit } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Course, Tree, Module, Entity } from "Service/Fals";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from "@angular/router";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/merge";
import "rxjs/add/observable/from";
import "rxjs/add/operator/toArray";
import { Observable } from "rxjs/Observable";
import { CourseState } from "Service/Fals/Entities";

@Component({
  selector: "course-dashboard",
  templateUrl: "View/CourseDashboard/CourseDashboard.html",
})
export class CourseDashboardComponent implements OnInit {
  get Course(): BehaviorSubject<CourseState> {
    return this.courseService.CurrentCourseState;
  }

  get Modules() {
    return this.courseService.Modules.takeWhile(z => !this.isCurrentModule(z))
      .merge(
        Observable.from([
          this.courseService.CurrentCourseState.getValue().currentModule,
        ])
      )
      .toArray();
  }

  isCurrentModule(module: Module): boolean {
    if (module) {
      return module.equals(this.Course.getValue().currentModule);
    } else {
      return false;
    }
  }

  constructor(private courseService: CourseService, private router: Router) { }

  SelectModule(module: Module) {
    console.log("SelectModule()");
    if (module.equals(this.Course.getValue().currentModule)) {
      this.router.navigateByUrl("/step");
    } else {
      this.router.navigateByUrl("/moduleResult/" + module.id);
    }
  }

  ngOnInit() {
    console.log(this.Course.value);
  }
}
