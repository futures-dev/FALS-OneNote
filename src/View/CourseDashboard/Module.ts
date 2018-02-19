import { NgModule } from "@angular/core";

import * as socket from "Service/Socket/Module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CourseDashboardComponent } from "View/CourseDashboard/Component";
import { CourseService } from "Service/CourseLogic/CourseService";
import { CourseLogicModule } from "Service/CourseLogic/Module";
import { ModuleComponent } from "View/CourseDashboard/ModuleComponent";

@NgModule({
  imports: [RouterModule, FormsModule, CommonModule, CourseLogicModule],
  exports: [],
  declarations: [CourseDashboardComponent, ModuleComponent],
  providers: [CourseService]
})
export class CourseDashboardModule {}
