import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";

@Injectable()
export class SectionStructure {
  constructor() {}

  getMaterialPage(
    course: string,
    module: string,
    step: string
  ): Observable<string> {
    OneNote.run(async context => {
      let notebook = context.application.getActiveNotebook();
      notebook.load();

      context.sync().then(async context => {
        console.log(JSON.stringify(notebook.sections));
      });
    });
    return new BehaviorSubject("https://google.com");
  }
}
