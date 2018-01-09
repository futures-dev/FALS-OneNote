import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Module } from 'Service/Fals/Entities/Module';
import { ConnectionService } from 'Service/Socket/Connection';
import { CurrentModuleChanged, SendModuleResult } from 'Service/Socket/Events';
import { ModuleResult } from 'Service/Fals/Entities/ModuleResult';

@Injectable()
export class ModuleService {

    public Module : BehaviorSubject<Module> = new BehaviorSubject<Module>(null);

    constructor(
        private socket : ConnectionService,

    ) {
        this.socket.AddListener(CurrentModuleChanged, (m : Module) => {
            this.Module.next(m);
        })
     }

     SendModuleResult(result : ModuleResult){
         // check this.Module.value.resultType

         this.socket.Send(SendModuleResult, result);
     }
}