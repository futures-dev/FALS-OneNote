import {
  Component,
  OnInit,
  EventEmitter,
  AfterContentInit,
  AfterViewInit,
} from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from "@angular/router";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/merge";
import "rxjs/add/observable/from";
import "rxjs/add/operator/toArray";
import { Observable } from "rxjs/Observable";
import { CourseState } from "Service/Fals/Entities";
import { Module } from "Service/Fals/Entities/Module";
import { SectionStructure } from "Service/Office/SectionStructure";
import { Cast } from "Service/Common/Cast";
declare var fabric: any;

@Component({
  selector: "course-dashboard",
  templateUrl: "View/CourseDashboard/CourseDashboard.html",
})
export class CourseDashboardComponent implements AfterViewInit {
  get Course(): BehaviorSubject<CourseState> {
    return this.courseService.CurrentCourseState;
  }

  displayCallout = new EventEmitter<number>();
  toggleMenu: boolean;

  toggle() {
    this.toggleMenu = !this.toggleMenu;
  }

  get Modules() {
    return this.courseService.Modules.takeWhile(z => !this.isCurrentModule(z))
      .merge(Observable.from([this.Course.getValue().currentModule]))
      .toArray();
  }

  isCurrentModule(module: Module): boolean {
    if (module) {
      return module.equals(this.Course.getValue().currentModule);
    } else {
      return false;
    }
  }

  constructor(
    private courseService: CourseService,
    private router: Router,
    private sectionStructure: SectionStructure
  ) {}

  SelectModule(module: Module, index: number) {
    console.log("SelectModule()");
    if (this.isCurrentModule(module)) {
      try {
        this.Callouts[index]._closeHandler(null);
      } catch {}
      this.router.navigateByUrl("/step");
    } else {
      this.displayCallout.emit(index);
    }
  }

  OpenModule(module: Module) {
    return this.sectionStructure
      .getMaterialPage(this.Course.getValue().course.id, module.id)
      .then(page => this.sectionStructure.open(page));
  }

  Callouts = [];

  ngAfterViewInit() {
    console.log(this.Course.value);
    var BreadcrumbHTML = document.querySelector(".ms-Breadcrumb");
    var Breadcrumb = new fabric["Breadcrumb"](BreadcrumbHTML);

    var calloutHolder = document.querySelector(".courseDashboard-Callouts");
    var Callouts = calloutHolder.querySelectorAll(".ms-Callout");
    var contextHolder = document.querySelector(".ms-Breadcrumb-overflowMenu");
    var preModules = document.querySelectorAll(".ms-ContextualMenu-item");
    for (var i = 0; i < Callouts.length && i < preModules.length; i++) {
      this.Callouts.push(
        new fabric["Callout"](Callouts[i], preModules[i], "top")
      );
    }
    var Modules = document.querySelectorAll(".ms-Breadcrumb-itemLink");
    for (var j = 0; i < Callouts.length && j < Modules.length; j++, i++) {
      this.Callouts.push(
        new fabric["Callout"](Callouts[i], Modules[j], "bottom")
      );
    }
  }
}
