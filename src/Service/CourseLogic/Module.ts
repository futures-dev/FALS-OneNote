import { NgModule } from "@angular/core";
import { SocketModule } from "Service/Socket/Module";
import { ConnectionService } from "Service/Socket/Connection";

@NgModule({
  imports: [SocketModule],
  exports: [],
  declarations: [],
  providers: [ConnectionService],
})
export class CourseLogicModule {}
