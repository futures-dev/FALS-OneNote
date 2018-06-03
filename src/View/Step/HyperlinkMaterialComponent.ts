import { Component, OnInit, Input } from "@angular/core";
import { Step } from "Service/Fals/Entities/Step";
import { StepStatistics } from "Service/Fals/Statistics/StepStatistics";
import { CourseService } from "Service/CourseLogic/CourseService";
import { Course } from "Service/Fals/Entities/Course";
import { StepAnswer } from "Service/Fals/Statistics/StepAnswer";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { StudyStep } from "Service/Fals/Entities/StudyStep";
import { SectionStructure } from "Service/Office/SectionStructure";
import { HyperlinkMaterial } from "Service/Fals/Bank/HyperlinkMaterial";
import { Subject } from "rxjs/Subject";

@Component({
  selector: "hyperlinkMaterial",
  templateUrl: "View/Step/HyperlinkMaterial.html",
  providers: [SectionStructure],
})
export class HyperlinkMaterialComponent implements OnInit {
  @Input("IsLoading")
  set setIsLoading(parentIsLoading: Subject<boolean>) {
    this.IsLoading.subscribe(q => parentIsLoading.next(q));
  }

  @Input("Material")
  set setMaterial(material: HyperlinkMaterial) {
    this.Material.next(material);
    setTimeout(() => this.IsLoading.next(false), 1);
  }

  gotoMaterials() {
    const link = this.Material.getValue().link;
    if (link.startsWith("onenote:")) {
      OneNote.run(async context => {
        context.application.navigateToPageWithClientUrl(link);
      });
    } else {
      window.open(link);
    }
  }

  public Material: BehaviorSubject<HyperlinkMaterial> = new BehaviorSubject<
    HyperlinkMaterial
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
