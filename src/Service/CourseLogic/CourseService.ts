import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Course } from 'Service/Fals/Entities/Course';
import { ConnectionService } from 'Service/Socket/Connection';
import { ActivateScenario, ActivateScenarioError } from 'Service/CourseLogic/ActivateScenario';
import { SelectedCourseChanged } from 'Service/Socket/Events';
import { Observable } from 'rxjs/Observable';
import { CourseProvider } from 'Service/Providers/CourseProvider';

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

    public Activate(course : Course) : Observable<ActivateScenarioError>{
        this.CurrentCourse.next(null);

        let activate = new ActivateScenario(course, this.socket);
        activate.Result.subscribe(result => {
            if (result != ActivateScenarioError.sOk){
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