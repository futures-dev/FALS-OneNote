import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Module } from 'Service/Fals/Entities/Module';
import { ConnectionService } from 'Service/Socket/Connection';
import { CurrentStateChanged, SendModuleResult } from 'Service/Socket/Events';
import { ModuleResult } from 'Service/Fals/Entities/ModuleResult';
import { CourseService } from 'Service/CourseLogic/CourseService';
import { SendModuleResultScenario } from 'Service/CourseLogic/Scenarios/SendModuleResultScenario';
import { SendModuleResultError } from 'Service/Fals/Facade/SendModuleResultError';
import { Observable } from 'rxjs/Observable';
import { GetCurrentModuleScenario } from 'Service/CourseLogic/Scenarios/GetCurrentModuleScenario';
import { CourseState } from 'Service/Fals/Entities/CourseState';

@Injectable()
export class ModuleService {

    public Module : BehaviorSubject<Module> = new BehaviorSubject<Module>(null);

    constructor(
        private socket : ConnectionService,
        private courseService : CourseService,

    ) {
        this.socket.AddListener(CurrentStateChanged, (cs : CourseState) => {
            this.Module.next(cs.currentModule);
        })
        this.courseService.CurrentCourse.subscribe(c => {
            let getModule = new GetCurrentModuleScenario(c, this.socket);
            getModule.Result.subscribe(m => this.Module.next(m));
            getModule.Start();
        })
     }

     SendModuleResult(moduleResult : ModuleResult) : Observable<SendModuleResultError>{
         let SendModuleResult = new SendModuleResultScenario(moduleResult, this.socket);
         SendModuleResult.Start();
         return SendModuleResult.Result;
     }
}