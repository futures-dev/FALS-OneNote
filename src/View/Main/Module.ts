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

@NgModule({
    imports: [BrowserModule, FormsModule, RouterModule, RoutingModule, HttpClientModule, OfficeModule, SocketModule, CourseListModule],
    exports: [],
    declarations: [MainComponent],
    bootstrap: [MainComponent]
})
export class MainModule {}
