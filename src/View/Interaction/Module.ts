import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GotoStepInteractionComponent } from "View/Interaction/GotoStepInteractionComponent";
import { MatDialogModule } from "@angular/material";
import { GotoModuleInteractionComponent } from "View/Interaction/GotoModuleInteractionComponent";

@NgModule({
  declarations: [GotoStepInteractionComponent, GotoModuleInteractionComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [],
  providers: [],
})
export class InteractionModule { }
