import { Component, OnInit, AfterViewInit } from "@angular/core";
import { OneNoteAuth } from "Service/Office/Auth/OneNoteAuth";
import { Router } from "@angular/router";
import { InitializationPublisher } from "Service/Office/InitializationPublisher";
import { BehaviorSubject } from "rxjs";
declare var fabric: any;

@Component({
  selector: "command-bar",
  templateUrl: "View/Main/CommandBar.html",
})
export class CommandBarComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.initFabric();
  }

  constructor(
    private onenote: OneNoteAuth,
    private initializationPublisher: InitializationPublisher
  ) {
    this.enabled.subscribe(en => {
      const dict = {};
      if (!en) {
        dict["display"] = "none";
      }
      this.commandBarStyle.next(dict);
    });
  }

  dropdownClass: BehaviorSubject<any> = new BehaviorSubject({
    ".is-open": true,
  });
  commandBarStyle: BehaviorSubject<any> = new BehaviorSubject({});

  logout() {
    this.dropdownClick();

    this.onenote.logout();
    this.initializationPublisher.executeAfterInit(() =>
      this.onenote.tryLogin()
    );
  }

  dropdownClick() {
    this.dropdownClass.next({ ".is-open": false });
  }

  public enabled = this.onenote.isAuth;

  ngOnInit(): void {}

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
