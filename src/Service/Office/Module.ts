import { NgModule } from "@angular/core";
import { InitializationPublisher } from "Service/Office/InitializationPublisher";
import { Web } from "Service/Office/Web";
import { Api } from "Service/Office/Api";
import { OneNoteAuth } from "Service/Office/Auth/OneNoteAuth";

@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [InitializationPublisher, Api, Web, OneNoteAuth],
})
export class OfficeModule {}
