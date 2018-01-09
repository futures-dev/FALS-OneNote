import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Course } from 'Service/Fals/Entities/Course';
import { ConnectionService } from 'Service/Socket/Connection';
import { SelectedCourseChanged } from 'Service/Socket/Events';
import { Observable } from 'rxjs/Observable';
import { CourseProvider } from 'Service/Providers/CourseProvider';
import { ActivateCourseError } from 'Service/Fals/Facade/ActivateCourseError';
import { ActivateCourseScenario } from 'Service/CourseLogic/Scenarios/ActivateCourseScenario';

@Injectable()
export class CourseService {

    public CurrentCourse : BehaviorSubject<Course> = new BehaviorSubject<Course>(null);

    constructor(
        private socket : ConnectionService,
        private courseProvider : CourseProvider
    ) { 
        console.log("ctor");
        socket.AddListener(SelectedCourseChanged, course => 
            this.CurrentCourse.next(course));        
    }

    public Activate(course : Course) : Observable<ActivateCourseError>{
        this.CurrentCourse.next(null);

        let activate = new ActivateCourseScenario(course, this.socket);
        activate.Result.subscribe(result => {
            if (result != ActivateCourseError.sOk){
                console.log("ActivateScenarioError: " + result);
                return;
            }
            
            // todo: populate on explicit request only
            this.courseProvider.populateCourse(course).subscribe(
                filledCourse => this.CurrentCourse.next(course)
            );

            console.log("ActivateScenario success ="+course);
            this.CurrentCourse.next(course);
        });       
        activate.Start();

        return activate.Result;
    }

    private disconnect


}