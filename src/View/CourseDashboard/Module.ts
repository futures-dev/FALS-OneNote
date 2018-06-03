import { NgModule } from "@angular/core";

import * as socket from "Service/Socket/Module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CourseDashboardComponent } from "View/CourseDashboard/Component";
import { CourseService } from "Service/CourseLogic/CourseService";
import { CourseLogicModule } from "Service/CourseLogic/Module";
import { GradeController } from "Service/CourseLogic/GradeController";
import { ConnectionService } from "Service/Socket/Connection";
import { OneNoteAuth } from "Service/Office/Auth/OneNoteAuth";

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    CourseLogicModule,
    socket.SocketModule,
  ],
  exports: [],
  declarations: [CourseDashboardComponent],
  providers: [CourseService, ConnectionService, GradeController],
})
export class CourseDashboardModule {}
