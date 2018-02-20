import { CourseProvider } from "Service/Providers/CourseProvider";
import { Course } from "Service/Fals/Entities/Course";
import { LoadingState } from "Service/Common/Enums";
import { Input, Component } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { OnInit } from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Router } from "@angular/router";
import { UrlTree } from "@angular/router/src/url_tree";
import { ActivateCourseError } from "Service/Fals/Facades/ActivateCourseError";

@Component({
  selector: "course",
  templateUrl: "View/CourseList/Course.html",
  providers: [CourseProvider],
})
export class CourseComponent implements OnInit {
  LoadState: BehaviorSubject<LoadingState> = new BehaviorSubject(
    LoadingState.Unload
  );

  Course: BehaviorSubject<Course> = new BehaviorSubject(null);

  @Input("Course")
  set setCourse(course: BehaviorSubject<Course>) {
    console.log("setCourse(" + course.value.title);
    this.Course.next(course.value);
  }

  IsExpanded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private courseProvider: CourseProvider,
    private courseService: CourseService,
    private router: Router
  ) {}

  load(): void {
    this.LoadState.next(LoadingState.Loading);
    this.courseProvider.populateCourse(this.Course.value).subscribe(q => {
      this.Course.next(q);
      console.log("this.course.next(" + q.title);
      this.LoadState.next(LoadingState.Loaded);
    });
  }

  SelectCourse(): void {
    console.log("SelectCourse()");
    this.courseService.Activate(this.Course.value).subscribe(error => {
      console.log("SelectCourse result " + error);
      if (error == ActivateCourseError.sOk) {
        this.router.navigateByUrl("/courseDashboard");
      }
    });
  }

  ngOnInit() {
    this.load();
  }
}
