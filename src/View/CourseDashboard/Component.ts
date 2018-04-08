import { Component, OnInit } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Course } from "Service/Fals/Entities/Course";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from "@angular/router";
import { Module } from "Service/Fals/Entities/Module";
import { Entity } from "Service/Fals/Bank/Entity";

@Component({
  selector: "course-dashboard",
  templateUrl: "View/CourseDashboard/CourseDashboard.html",
})
export class CourseDashboardComponent implements OnInit {
  get Course() {
    return this.courseService.CurrentCourseState;
  }

  isCurrentModule(module: Module): boolean {
    if (module) {
      return module.equals(this.Course.value.currentModule);
    } else {
      return false;
    }
  }

  constructor(private courseService: CourseService, private router: Router) {}

  SelectModule() {
    console.log("SelectModule()");
    this.router.navigateByUrl("/step");
  }

  ngOnInit() {
    console.log(this.Course.value);
    console.log("module equals");
    console.log(this.Course.value.currentModule.equals);
  }
}
