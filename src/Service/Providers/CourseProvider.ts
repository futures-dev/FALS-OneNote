import { HttpParams } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { ServerProvider } from "Service/Providers/ServerProvider";
import { Course } from "Service/Fals/Entities/Course";
import { Observable } from "rxjs/Observable";
import { CourseWrapper } from "Service/Fals/Entities/Lazy/CourseWrapper";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class CourseProvider {
  constructor(private server: ServerProvider) {}

  getCourses(): Observable<Course[]> {
    return this.server.get<Course[]>("/courses").do(x => console.log(x));
  }

  populateCourse(course: Course): Observable<Course> {
    if (course instanceof CourseWrapper) {
      return this.server.getLazy(course);
    }

    return new BehaviorSubject<Course>(course);
  }
}
