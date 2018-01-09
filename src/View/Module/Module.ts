import { NgModule } from '@angular/core';

import { ModuleComponent } from 'View/Module/Component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseLogicModule } from 'Service/CourseLogic/Module';
import { CourseService } from 'Service/CourseLogic/CourseService';

@NgModule({
    imports: [RouterModule, FormsModule, CommonModule, CourseLogicModule],
    exports: [],
    declarations: [ModuleComponent],
    providers: [CourseService]
})
export class ModuleModule { }
