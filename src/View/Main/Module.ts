import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { MainComponent } from "View/Main/Component";
import { RoutingModule } from "View/RoutingModule";
import { OfficeModule } from "Service/Office/Module";
import { SocketModule } from "View/Socket/Module";
import { CourseListModule } from "View/CourseList/Module";
import { HttpClientModule } from "@angular/common/http";
import { CourseDashboardModule } from "View/CourseDashboard/Module";
import { ConnectionService } from "Service/Socket/Connection";
import { CourseService } from "Service/CourseLogic/CourseService";
import { StepModule } from "View/Step/Module";
import { CommandBarComponent } from "View/Main/CommandBarComponent";
import { WelcomeComponent } from "View/Main/WelcomeComponent";

@NgModule({
  imports: [
    // Framework
    BrowserModule,
    FormsModule,
    RouterModule,
    RoutingModule,
    HttpClientModule,

    // local modules
    OfficeModule,

    // View modules
    SocketModule,
    CourseListModule,
    CourseDashboardModule,
    StepModule,
  ],
  exports: [],
  declarations: [MainComponent, CommandBarComponent, WelcomeComponent],
  bootstrap: [MainComponent],
  providers: [
    // all container controlled services to be registered here

    ConnectionService,
    CourseService,
  ],
})
export class MainModule {}
