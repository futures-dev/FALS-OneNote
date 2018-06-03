import { MatDialog } from "@angular/material";
import { Injectable } from "@angular/core";
import { GotoStepData } from "View/Interaction/GotoStepData";

@Injectable()
export class InteractionRequester {
  constructor(private dialogService: MatDialog) {}

  public Request<T>(dialogType: any, data: any) {
    const ref = this.dialogService.open(dialogType, {
      position: {
        top: "20px",
        left: "20px",
      },
      maxWidth: "100%",
      data: data,
    });
    return ref.afterClosed().map(s => s as T);
  }
}
