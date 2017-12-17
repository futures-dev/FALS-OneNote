import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms"
import { HttpModule } from "@angular/http";
import { RouterModule } from "@angular/router";

import { MainComponent } from "View/Main/Component";
import { RoutingModule } from "View/RoutingModule";
import { OfficeModule } from "Service/Office/Module";
import { SocketModule } from "View/Socket/Module";

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, RouterModule, RoutingModule, OfficeModule, SocketModule],
    exports: [],
    declarations: [MainComponent],
    bootstrap: [MainComponent]
})
export class MainModule {}
