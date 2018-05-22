import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CourseLogicModule } from "Service/CourseLogic/Module";
import { CourseService } from "Service/CourseLogic/CourseService";
import { StepComponent } from "View/Step/Component";
import { OpenTestStepComponent } from "View/Step/OpenTestStepComponent";
import { TestStepComponent } from "View/Step/TestStepComponent";
import { StudyStepComponent } from "View/Step/StudyStepComponent";
import { HypertextMaterialComponent } from "View/Step/HypertextMaterialComponent";
import { ControlStepComponent } from "View/Step/ControlStepComponent";
import { ProvidersModule } from "Service/Providers/Module";
import { MatProgressSpinnerModule } from "@angular/material";

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    CourseLogicModule,
    ProvidersModule,
    MatProgressSpinnerModule,
  ],
  exports: [],
  declarations: [
    StepComponent,
    OpenTestStepComponent,
    TestStepComponent,
    StudyStepComponent,
    HypertextMaterialComponent,
    ControlStepComponent,
  ],
  providers: [CourseService],
})
export class StepModule { }
