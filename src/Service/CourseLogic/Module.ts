import { NgModule } from "@angular/core";
import { SocketModule } from "Service/Socket/Module";
import { ConnectionService } from "Service/Socket/Connection";
import { StepInterventionController } from "Service/CourseLogic/StepInterventionController";
import { ModuleInterventionController } from "Service/CourseLogic/ModuleInterventionController";
import { InteractionModule } from "Service/Interaction/Module";

@NgModule({
  imports: [SocketModule, InteractionModule],
  exports: [],
  declarations: [],
  providers: [ConnectionService],
})
export class CourseLogicModule {}
