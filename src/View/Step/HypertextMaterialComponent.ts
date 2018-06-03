import { Component, OnInit, Input } from "@angular/core";
import { Step } from "Service/Fals/Entities/Step";
import { StepStatistics } from "Service/Fals/Statistics/StepStatistics";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Course } from "Service/Fals/Entities/Course";
import { StepAnswer } from "Service/Fals/Statistics/StepAnswer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { SectionStructure } from "Service/Office/SectionStructure";
import { HypertextMaterial } from "Service/Fals/Bank/HypertextMaterial";
import { Subject } from "rxjs/Subject";
import { IfNull } from "Service/Common/IfNull";

@Component({
  selector: "hypertextMaterial",
  templateUrl: "View/Step/HypertextMaterial.html",
  providers: [SectionStructure],
})
export class HypertextMaterialComponent implements OnInit {
  @Input("IsLoading")
  set setIsLoading(parentIsLoading: Subject<boolean>) {
    this.IsLoading.subscribe(q => parentIsLoading.next(q));
  }

  @Input("Material")
  set setMaterial(material: HypertextMaterial) {
    this.Material.next(material);
    let state = this.CourseService.CurrentCourseState.getValue();
    this.SectionStructure.getMaterialPage(
      state.course.title,
      state.currentModule.title,
      IfNull(state.currentStep.title, state.currentStep.id)
    ).then(q => {
      this.MaterialPage.next(q);
      this.OnenoteLinkText.next(
        `${state.course.title}->${state.currentModule.title}->${
          state.currentStep.id
        }`
      );
      this.SectionStructure.open(q).then(() =>
        this.SectionStructure.putContent(
          this.Material.getValue().content,
          q
        ).then(() => this.IsLoading.next(false))
      );
    });
  }

  putMaterials() {
    this.SectionStructure.putContent(
      this.Material.getValue().content,
      this.MaterialPage.getValue()
    );
  }

  gotoMaterials() {
    this.SectionStructure.open(this.MaterialPage.getValue());
  }

  public OnenoteLinkText: BehaviorSubject<string> = new BehaviorSubject<string>(
    ""
  );
  private MaterialPage: BehaviorSubject<OneNote.Page> = new BehaviorSubject<
    OneNote.Page
  >(null);

  public Material: BehaviorSubject<HypertextMaterial> = new BehaviorSubject<
    HypertextMaterial
  >(null);

  public IsLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  constructor(
    private CourseService: CourseService,
    private SectionStructure: SectionStructure
  ) {}

  ngOnInit() {}
}
