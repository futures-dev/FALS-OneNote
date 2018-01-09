import { ScenarioBase } from "Service/Socket/Scenario";
import { ConnectionService } from "Service/Socket/Connection";
import { GetCurrentModule } from "Service/Socket/Events";
import { Module } from "Service/Fals/Entities/Module";
import { Course } from "Service/Fals/Entities/Course";

export class GetCurrentModuleScenario extends ScenarioBase<Module> {
    constructor(private course: Course, connection:ConnectionService){
        // todo: replace course on student
        super(connection);
    }

    Start() : void{
        this.GetCurrentModuleStage();
    }

    GetCurrentModuleStage() : void{
        this.connection.AddListener(GetCurrentModule, s => this.OnGetCurrentModule(s));
        this.connection.Send(GetCurrentModule, this.course);
    }

    OnGetCurrentModule(module : Module) : void{
        this.Result.next(module);
    }
}