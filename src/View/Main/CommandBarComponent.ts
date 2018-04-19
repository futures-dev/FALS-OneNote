import { Component, OnInit } from "@angular/core";
import { OneNoteAuth } from "Service/Office/Auth/OneNoteAuth";
import { Router } from "@angular/router";
import { InitializationPublisher } from "Service/Office/InitializationPublisher";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "command-bar",
  templateUrl: "View/Main/CommandBar.html",
})
export class CommandBarComponent implements OnInit {
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

  commandBarStyle: BehaviorSubject<any> = new BehaviorSubject({});

  logout() {
    this.onenote.logout();
    this.initializationPublisher.executeAfterInit(() =>
      this.onenote.tryLogin()
    );
  }

  public enabled = this.onenote.isAuth;

  ngOnInit(): void {}
}
