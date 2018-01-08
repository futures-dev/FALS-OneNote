import { Listener, ScenarioBase } from "Service/Socket/Scenario";
import { Observable } from "rxjs/Observable";
import { ConnectionService } from "Service/Socket/Connection";
import { Course } from "Service/Fals/Entities/Course";
import { SelectCourse } from "Service/Socket/Events";

export enum ActivateScenarioError{
    sOk
}

export class ActivateScenario extends ScenarioBase<ActivateScenarioError>{
    constructor(private course : Course, connection : ConnectionService)
    {
        super(connection);
    }

    Start(): void {
        this.SelectCourseStage();
    }

    private SelectCourseStage() : void{
        this.connection.AddListener(SelectCourse, s => this.OnSelectCourse(s));
        this.connection.Send(SelectCourse, this.course);
    }

    private OnSelectCourse(message : string) : void{        
        this.Result.next(ActivateScenarioError.sOk);
    }
    
}