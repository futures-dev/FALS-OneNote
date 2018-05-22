import { NgModule } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ServerProvider } from "Service/Providers/ServerProvider";
import { HttpClientModule } from "@angular/common/http";
import { CourseProvider } from "Service/Providers/CourseProvider";
import { GeneratedTestProvider } from "Service/Providers/GeneratedTestProvider";

@NgModule({
  imports: [HttpClientModule],
  exports: [],
  declarations: [],
  providers: [CourseProvider, ServerProvider, GeneratedTestProvider],
})
export class ProvidersModule {}
