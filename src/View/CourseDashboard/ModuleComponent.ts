import { Component, OnInit, Input } from "@angular/core";
import { Module } from "Service/Fals/Entities/Module";
import { Tree } from "Service/Fals/Entities/Tree";

@Component({
  selector: "course-dashboard-module",
  templateUrl: "View/CourseDashboard/Module.html",
})
export class ModuleComponent implements OnInit {
  @Input() Module: Tree<Module>;

  constructor() {}

  ngOnInit() {}
}
