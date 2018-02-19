import { NgModule } from "@angular/core";

import { SocketComponent } from "./Component";
import { StatisticsModule } from "Service/Statistics/Module";
import * as socket from "Service/Socket/Module";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    StatisticsModule,
    socket.SocketModule,
  ],
  exports: [],
  declarations: [SocketComponent],
})
export class SocketModule {}
