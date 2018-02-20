import { Component, OnInit, Input, Output } from "@angular/core";
import { CourseProvider } from "Service/Providers/CourseProvider";
import { Course } from "Service/Fals/Entities/Course";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Component({
  selector: "courseList",
  templateUrl: "View/CourseList/CourseList.html",
  providers: [CourseProvider],
})
export class CourseListComponent implements OnInit {
  constructor(private courseProvider: CourseProvider) {}

  Courses: BehaviorSubject<BehaviorSubject<Course>[]> = new BehaviorSubject<
    BehaviorSubject<Course>[]
  >([]);

  ngOnInit() {
    this.courseProvider.getCourses().subscribe(courses => {
      this.Courses.next(
        courses.map(course => new BehaviorSubject<Course>(course))
      );
      console.log(courses);
    });
  }
}
