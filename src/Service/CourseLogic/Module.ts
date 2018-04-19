import { NgModule } from "@angular/core";
import { SocketModule } from "Service/Socket/Module";
import { ConnectionService } from "Service/Socket/Connection";
import { StepInterventionController } from "Service/CourseLogic/StepInterventionController";
import { ModuleInterventionController } from "Service/CourseLogic/ModuleInterventionController";

@NgModule({
  imports: [SocketModule],
  exports: [],
  declarations: [],
  providers: [ConnectionService],
})
export class CourseLogicModule {}
