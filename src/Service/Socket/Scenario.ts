import { Subject } from "rxjs/Subject";
import { ConnectionService } from "Service/Socket/Connection";
import { Cancel } from "Service/Socket/Events";

export interface Listener{
    (message : any) : void;
}

export interface Scenario<TResult>{
    Start() : void;
    Cancel() : void;

    Result : Subject<TResult>;
}

export abstract class ScenarioBase<TResult> implements Scenario<TResult>{    
    static _id : number;
    id : string;

    constructor(protected connection : ConnectionService){
        this.id = this.constructor.name + ScenarioBase._id++;     
    }

    abstract Start() : void;

    Cancel() : void{
        this.connection.Send(Cancel, this.id);
    }

    Result : Subject<TResult> = new Subject<TResult>();
}