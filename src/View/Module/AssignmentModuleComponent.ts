import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core/src/metadata/directives';
import { Module } from 'Service/Fals/Entities/Module';

@Component({
    selector: 'assignmentModule',
    templateUrl: 'View/Module/AssignmentModule.html'
})

export class AssignmentModuleComponent implements OnInit {
    @Input()
    Module:AssignmentModule;

    Assignment:string;

    constructor(
        private ModuleService : ModuleService
    ) { 
    }

    tryProceed(){
        this.ModuleService.SendModuleResult(this.Module, this.Assignment);
    }

    ngOnInit() { 

    }
}