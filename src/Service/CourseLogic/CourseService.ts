import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Course } from 'Service/Fals/Entities/Course';
import { ConnectionService } from 'Service/Socket/Connection';
import { ActivateScenario, ActivateScenarioError } from 'Service/CourseLogic/ActivateScenario';
import { SelectedCourseChanged } from 'Service/Socket/Events';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CourseService {

    public CurrentCourse : BehaviorSubject<Course> = new BehaviorSubject<Course>(null);

    constructor(
        private socket : ConnectionService
    ) { 
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
            
            console.log("ActivateScenario success");
            this.CurrentCourse.next(course);
        });       
        activate.Start();

        return activate.Result;
    }

    private disconnect


}