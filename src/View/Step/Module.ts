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
import { GeneratedTestStepComponent } from "View/Step/GeneratedTestStepComponent";
import { HyperlinkMaterialComponent } from "View/Step/HyperlinkMaterialComponent";
import { GradeController } from "Service/CourseLogic/GradeController";
import { ControlStepChanged } from "Service/Socket/Events";
import { ControlStepChangedScenario } from "Service/CourseLogic/Scenarios/ControlStepChangedScenario";
import { GeneratedTestStepChangedScenario } from "Service/CourseLogic/Scenarios/GeneratedTestStepChangedScenario";
import { ConnectionService } from "Service/Socket/Connection";
import { SocketModule } from "Service/Socket/Module";
import { PascaStepComponent } from "View/Step/PascaStepComponent";
import { OneNoteAuth } from "Service/Office/Auth/OneNoteAuth";
import { OfficeModule } from "Service/Office/Module";

@NgModule({
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    CourseLogicModule,
    OfficeModule,
    ProvidersModule,
    MatProgressSpinnerModule,
    SocketModule,
  ],
  exports: [],
  declarations: [
    StepComponent,
    OpenTestStepComponent,
    TestStepComponent,
    StudyStepComponent,
    HypertextMaterialComponent,
    HyperlinkMaterialComponent,
    ControlStepComponent,
    GeneratedTestStepComponent,
    PascaStepComponent,
  ],
  providers: [CourseService, GradeController, ConnectionService, OneNoteAuth],
})
export class StepModule {}
