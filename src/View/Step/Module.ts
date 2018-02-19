import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CourseLogicModule } from "Service/CourseLogic/Module";
import { CourseService } from "Service/CourseLogic/CourseService";
import { StepComponent } from "View/Step/Component";

@NgModule({
  imports: [RouterModule, FormsModule, CommonModule, CourseLogicModule],
  exports: [],
  declarations: [StepComponent],
  providers: [CourseService],
})
export class StepModule {}
