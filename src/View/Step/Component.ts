import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core/src/metadata/directives";
import { StepService } from "Service/CourseLogic/StepService";

@Component({
  selector: "step",
  templateUrl: "View/Step/Step.html",
})
export class StepComponent implements OnInit {
  get Step() {
    return this.StepService.CurrentStep;
  }

  constructor(private StepService: StepService) {}

  ngOnInit() {}
}
