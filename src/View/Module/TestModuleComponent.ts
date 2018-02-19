import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core/src/metadata/directives";
import { Module } from "Service/Fals/Entities/Module";
import { TestModule } from "Service/Fals/Entities/TestModule";
import { ModuleService } from "Service/CourseLogic/ModuleService";
import { ModuleResult } from "Service/Fals/Entities/ModuleResult";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Course } from "Service/Fals/Entities/Course";

@Component({
  selector: "testModule",
  templateUrl: "View/Module/TestModule.html"
})
export class TestModuleComponent implements OnInit {
  @Input() Module: TestModule;

  Answer: number;

  constructor(
    private ModuleService: ModuleService,
    private CourseService: CourseService
  ) {}

  tryProceed() {
    let result = new ModuleResult();
    result.module = this.Module;
    result.course = this.CourseService.CurrentCourse.value;
    result.result = this.Answer;
    this.ModuleService.SendModuleResult(result);
  }

  ngOnInit() {}
}
