import { NgModule } from '@angular/core';

import { StatisticsModule } from 'Service/Statistics/Module';
import * as socket from 'Service/Socket/Module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseComponent } from 'View/CourseList/CourseComponent';
import { ProvidersModule } from 'Service/Providers/Module';
import { CourseListComponent } from 'View/CourseList/Component';

@NgModule({
    imports: [RouterModule, FormsModule, CommonModule, ProvidersModule],
    exports: [],
    declarations: [CourseListComponent, CourseComponent],
})
export class CourseListModule { }
