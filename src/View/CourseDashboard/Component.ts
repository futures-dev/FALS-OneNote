import {
  Component,
  OnInit,
  EventEmitter,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import { CourseService } from "Service/CourseLogic/CourseService";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Router } from "@angular/router";
import "rxjs/add/operator/takeWhile";
import "rxjs/add/operator/merge";
import "rxjs/add/observable/from";
import "rxjs/add/operator/toArray";
import { Observable } from "rxjs/Observable";
import { CourseState } from "Service/Fals/Entities/CourseState";
import { Module } from "Service/Fals/Entities/Module";
import { SectionStructure } from "Service/Office/SectionStructure";
import { Cast } from "Service/Common/Cast";
import { GradeController } from "Service/CourseLogic/GradeController";
import { IfNull } from "Service/Common/IfNull";
import { PascaStep } from "Service/Fals/Entities/PascaStep";
declare var fabric: any;

@Component({
  selector: "course-dashboard",
  templateUrl: "View/CourseDashboard/CourseDashboard.html",
})
export class CourseDashboardComponent implements AfterViewInit {
  get Course(): BehaviorSubject<CourseState> {
    return this.courseService.CurrentCourseState;
  }

  public isPascaStep(q) {
    return q.type == PascaStep["__class"];
  }

  displayCallout = new EventEmitter<number>();
  toggleMenu: boolean;

  toggle() {
    this.toggleMenu = !this.toggleMenu;
  }

  modules: Module[] = [];

  get Modules() {
    return this.modules;
  }

  isCurrentModule(module: Module): boolean {
    if (module) {
      return module.equals(this.Course.getValue().currentModule);
    } else {
      return false;
    }
  }

  grades: { [moduleId: string]: number } = {};

  getGrade(module: Module): Observable<number> {
    var obs = this.grader.getModuleGrade(module).map(q => IfNull(q.grade, 0));
    obs.subscribe(q => {
      console.log("grade received " + q);
    });
    return obs;
  }

  constructor(
    private courseService: CourseService,
    private router: Router,
    private sectionStructure: SectionStructure,
    private grader: GradeController,
    private ref: ChangeDetectorRef
  ) {
    courseService.CurrentCourseState.subscribe(courseState => {
      courseService.Modules.takeWhile(z => {
        console.log("taking module " + z.id);
        return !this.isCurrentModule(z);
      })
        .merge(Observable.from([this.Course.getValue().currentModule]))
        .map(m => {
          if (!this.grades[m.id])
            this.grader
              .getModuleGrade(m)
              .subscribe(v => {
                this.grades[m.id] = IfNull(v.grade, 0);
                try {
                  this.ref.detectChanges();
                } catch{ }
              });

          return m;
        })
        .toArray()
        .subscribe(m => {
          this.modules = m;
          try {
            this.ref.detectChanges();
          } catch{ }
        });
    });
  }

  SelectModule(module: Module, index: number) {
    console.log("SelectModule()");
    if (this.isCurrentModule(module)) {
      try {
        this.Callouts[index]._closeHandler(null);
      } catch { }
      this.router.navigateByUrl("/step");
    } else {
      this.displayCallout.emit(index);
    }
  }

  OpenModule(module: Module) {
    return this.sectionStructure
      .getMaterialPage(this.Course.getValue().course.title, module.title)
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
    for (var j = 0; i < Callouts.length && j < Modules.length; j++ , i++) {
      this.Callouts.push(
        new fabric["Callout"](Callouts[i], Modules[j], "bottom")
      );
    }
  }
}
