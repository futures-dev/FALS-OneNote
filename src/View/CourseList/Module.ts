import { NgModule } from "@angular/core";

import * as socket from "Service/Socket/Module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CourseComponent } from "View/CourseList/CourseComponent";
import { ProvidersModule } from "Service/Providers/Module";
import { CourseListComponent } from "View/CourseList/Component";
import { CourseLogicModule } from "Service/CourseLogic/Module";

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    ProvidersModule,
    CourseLogicModule,
  ],
  exports: [],
  declarations: [CourseListComponent, CourseComponent],
})
export class CourseListModule {}
