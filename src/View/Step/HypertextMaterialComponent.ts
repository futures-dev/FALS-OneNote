import { Component, OnInit, Input } from "@angular/core";
import { Step } from "Service/Fals/Entities/Step";
import { StepStatistics } from "Service/Fals/Statistics/StepStatistics";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Course } from "Service/Fals/Entities/Course";
import { StepAnswer } from "Service/Fals/Statistics/StepAnswer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { StudyStep, HypertextMaterial } from "Service/Fals/index";
import { SectionStructure } from "Service/Office/SectionStructure";

@Component({
  selector: "hypertextMaterial",
  templateUrl: "View/Step/HypertextMaterial.html",
  providers: [SectionStructure],
})
export class HypertextMaterialComponent implements OnInit {
  @Input("Material")
  set setMaterial(material: HypertextMaterial) {
    this.Material.next(material);
    let state = this.CourseService.CurrentCourseState.getValue();
    this.SectionStructure.getMaterialPage(
      state.course.title,
      state.currentModule.title,
      state.currentStep.id
    ).subscribe(q => this.OnenoteLink.next(q));
  }

  public OnenoteLink: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public Material: BehaviorSubject<HypertextMaterial> = new BehaviorSubject<
    HypertextMaterial
  >(null);

  constructor(
    private CourseService: CourseService,
    private SectionStructure: SectionStructure
  ) {}

  ngOnInit() {}
}
