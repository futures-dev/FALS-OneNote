import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core/src/metadata/directives";
import { ModuleService } from "Service/CourseLogic/ModuleService";

@Component({
  selector: "module",
  templateUrl: "View/Module/Module.html"
})
export class ModuleComponent implements OnInit {
  get Module() {
    return this.ModuleService.Module;
  }

  constructor(private ModuleService: ModuleService) {}

  ngOnInit() {}
}
