import { ScenarioBase } from "Service/Socket/Scenario";
import { ConnectionService } from "Service/Socket/Connection";
import { SendModuleResult } from "Service/Socket/Events";
import { ModuleResult } from "Service/Fals/Entities/ModuleResult";
import { SendModuleResultError } from "Service/Fals/Facade/SendModuleResultError";

export class SendModuleResultScenario extends ScenarioBase<SendModuleResultError>{
    constructor(private moduleResult : ModuleResult, connection : ConnectionService){
        super(connection);
    }

    Start() : void{
        this.SendModuleResultStage();
    }

    SendModuleResultStage() : void{
        this.connection.AddListener(SendModuleResult, s => this.OnSendModuleResult(s));
        this.connection.Send(SendModuleResult, this.moduleResult);
    }

    OnSendModuleResult(error : SendModuleResultError){
        this.Result.next(error);
    }
}