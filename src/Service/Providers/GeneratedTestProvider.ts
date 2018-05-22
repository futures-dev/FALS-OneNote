import { Injectable } from "@angular/core";
import { ConnectionService } from "Service/Socket/Connection";
import { GeneratedTestStep } from "Service/Fals/Entities/GeneratedTestStep";
import { Observable } from "rxjs/Observable";
import { Step } from "Service/Fals/Entities/Step";
import { ServerProvider } from "Service/Providers/ServerProvider";
import { HttpParams } from "@angular/common/http";

@Injectable()
export class GeneratedTestProvider {
  constructor(private server: ServerProvider) {}

  Generate(step: GeneratedTestStep): Observable<Step[]> {
    return this.server
      .get<Step[]>(
        "/generate",
        new HttpParams()
          .append("batch_size", step.batchSize.toString())
          .append("features", step.features.join(";"))
      )
      .do(x => console.log(x));
  }
}
