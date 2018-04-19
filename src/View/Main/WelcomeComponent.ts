import { Component, OnInit } from "@angular/core";
import { OneNoteAuth } from "Service/Office/Auth/OneNoteAuth";
import { InitializationPublisher } from "Service/Office/InitializationPublisher";

@Component({
  selector: "welcome",
  templateUrl: "View/Main/Welcome.html",
})
export class WelcomeComponent implements OnInit {
  constructor(
    private onenote: OneNoteAuth,
    private initializationPublisher: InitializationPublisher
  ) {}

  enabled = this.onenote.isAuth;

  login() {
    this.initializationPublisher.executeAfterInit(() =>
      this.onenote.tryLogin()
    );
  }

  ngOnInit(): void {}
}
