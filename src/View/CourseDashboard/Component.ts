import { Component, OnInit } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Course } from "Service/Fals/Entities/Course";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
  selector: "course-dashboard",
  templateUrl: "View/CourseDashboard/CourseDashboard.html",
})
export class CourseDashboardComponent implements OnInit {
  get Course() {
    return this.courseService.CurrentCourse;
  }

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    console.log(this.Course.value);
  }
}
