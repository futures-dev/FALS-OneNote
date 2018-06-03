import { NgModule } from "@angular/core";
import { InitializationPublisher } from "Service/Office/InitializationPublisher";
import { Web } from "Service/Office/Web";
import { Api } from "Service/Office/Api";
import { OneNoteAuth } from "Service/Office/Auth/OneNoteAuth";
import { SectionStructure } from "Service/Office/SectionStructure";

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [InitializationPublisher, Api, Web, SectionStructure],
})
export class OfficeModule {}
