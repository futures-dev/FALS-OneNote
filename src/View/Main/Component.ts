import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { InitializationPublisher } from "Service/Office/InitializationPublisher";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { OneNoteAuth } from "Service/Office/Auth/OneNoteAuth";
import { DOCUMENT } from "@angular/platform-browser";
import * as settings from "config";
import { ActivatedRoute, Router } from "@angular/router";
import * as parse from "url-parse";

@Component({
  selector: "mc",
  templateUrl: "View/Main/Main.html",
  providers: [InitializationPublisher],
})
export class MainComponent implements OnInit {
  title: string = "AppComponent Title";
  hasCode: boolean = false;

  constructor(
    private _initializationPublisher: InitializationPublisher,
    private onenote: OneNoteAuth
  ) {
    console.log("AppComponent ctor");

    _initializationPublisher.executeAfterInit(this.onOfficeInitialized);

    _initializationPublisher.executeAfterInit(() => {
      if (!this.onenote.tryRegister(parse(location.href, true).query["code"])) {
        this.onenote.tryLogin();
      }
    });

    Office.initialize = function () {
      console.log("Office initialized");

      _initializationPublisher.publish();
    };
  }

  ngOnInit() { }

  onOfficeInitialized(): void {
    OneNote.run(async context => {
      const nb = context.application.getActiveNotebook();
      nb.load();

      await context.sync().then(async context => {
        console.log(`${nb.id}`);
      });
    });
  }
}
