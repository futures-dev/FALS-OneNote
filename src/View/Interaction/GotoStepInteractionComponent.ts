import { Component, OnInit, Inject, Optional } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { GotoStepData } from "View/Interaction/GotoStepData";
import { ControlStep } from "Service/Fals/Entities/ControlStep";
import { Cast } from "Service/Common/Cast";

@Component({
  selector: "gotoStepInteractionDialog",
  templateUrl: "View/Interaction/GotoStepInteractionDialog.html",
})
export class GotoStepInteractionComponent implements OnInit {
  constructor(
    @Optional()
    @Inject(MAT_DIALOG_DATA)
    public data: GotoStepData
  ) {
    if (data.FromStep.type == ControlStep["__class"]) {
      this.isControlStep = true;
    }
  }

  public isControlStep: boolean;

  ngOnInit(): void {}
}
