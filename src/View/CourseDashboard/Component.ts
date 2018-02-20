import { Component, OnInit } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Course } from "Service/Fals/Entities/Course";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from "@angular/router";

@Component({
  selector: "course-dashboard",
  templateUrl: "View/CourseDashboard/CourseDashboard.html",
})
export class CourseDashboardComponent implements OnInit {
  get Course() {
    return this.courseService.CurrentCourseState;
  }

  get moduleCount() {
    return this.courseService.CurrentCourseState.value.currentModule.steps
      .length;
  }

  constructor(private courseService: CourseService, private router: Router) {}

  SelectModule() {
    console.log("SelectModule()");
    this.router.navigateByUrl("/step");
  }

  ngOnInit() {
    console.log(this.Course.value);
  }
}
