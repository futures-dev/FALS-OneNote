import { ScenarioBase } from "Service/Socket/Scenario";
import { ConnectionService } from "Service/Socket/Connection";
import { GetCurrentState } from "Service/Socket/Events";
import { Module } from "Service/Fals/Entities/Module";
import { Course } from "Service/Fals/Entities/Course";
import { CourseState } from "Service/Fals/Entities/CourseState";
import { Student } from "Service/Fals/Entities/Student";

export class GetCurrentStateScenario extends ScenarioBase<CourseState> {
    constructor(private student : Student, connection:ConnectionService){
        super(connection);
    }

    Start() : void{
        this.GetCurrentModuleStage();
    }

    GetCurrentModuleStage() : void{
        this.connection.AddListener(GetCurrentState, s => this.OnGetCurrentState(s));
        this.connection.Send(GetCurrentState, this.student);
    }

    OnGetCurrentState(cs : CourseState) : void{
        this.Result.next(cs);
    }
}