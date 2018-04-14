import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { InitializationPublisher } from "Service/Office/InitializationPublisher";
declare var fabric: any;

@Component({
  selector: "mc",
  templateUrl: "View/Main/Main.html",
  providers: [InitializationPublisher],
})
export class MainComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    this.initFabric();
  }
  title: string = "AppComponent Title";

  constructor(private _initializationPublisher: InitializationPublisher) {
    console.log("AppComponent ctor");

    _initializationPublisher.subscribe(this.onOfficeInitialized);

    Office.initialize = function () {
      console.log("Office initialized");

      _initializationPublisher.publish();
    };
  }

  onOfficeInitialized(): void {

    OneNote.run(async context => {

      const nb = context.application.getActiveNotebook();
      nb.load();

      await context.sync().then(async context => {
        console.log(`${nb.id}`);
      });
    });
  }

  initFabric() {
    var CommandButtonElements = document.querySelectorAll(".ms-CommandButton");
    for (var i = 0; i < CommandButtonElements.length; i++) {
      new fabric["CommandButton"](CommandButtonElements[i]);
    }
    var CommandBarElements = document.querySelectorAll(".ms-CommandBar");
    for (var i = 0; i < CommandBarElements.length; i++) {
      new fabric["CommandBar"](CommandBarElements[i]);
    }
  }
}
