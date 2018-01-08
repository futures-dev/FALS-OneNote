import { HttpParams } from "@angular/common/http"

import { Injectable } from '@angular/core';
import { ServerProvider } from "Service/Providers/ServerProvider";
import { Course } from "Service/Fals/Entities/Course";
import { Observable } from "rxjs/Observable";
import { CourseModelWrapper } from "Service/Fals/Entities/Lazy/CourseModelWrapper";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { CourseModel } from "Service/Fals/Entities/CourseModel";

@Injectable()
export class CourseProvider {
    constructor(private http: ServerProvider)
    {
    }

    getCourses() : Observable<Course[]>{
        return this.http.get("/courses").do(x=>console.log(x)).map(x => x as Course[]);
    }

    populateCourse(course : Course) : Observable<Course>
    {
        let courseModelLazy = course.courseModel as CourseModelWrapper;
        if (courseModelLazy){
            return this.http.getLazy(courseModelLazy).do(x=>console.log(x)).map(
                (q : CourseModel) => {
                    course.courseModel = q;
                    return course;
                });
        }

        return new BehaviorSubject<Course>(course);
    }
}