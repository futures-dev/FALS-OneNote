import {
  Component,
  OnInit,
  AfterViewInit,
  EventEmitter,
  AfterContentInit,
  ChangeDetectorRef,
} from "@angular/core";
import { OneNoteAuth } from "Service/Office/Auth/OneNoteAuth";
import { InitializationPublisher } from "Service/Office/InitializationPublisher";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/Observable";
import { LoginState } from "View/Main/LoginState";

@Component({
  selector: "welcome",
  templateUrl: "View/Main/Welcome.html",
})
export class WelcomeComponent implements AfterContentInit {
  constructor(
    private onenote: OneNoteAuth,
    private initializationPublisher: InitializationPublisher,
    private ref: ChangeDetectorRef
  ) {
    initializationPublisher.executeAfterInit(() => {
      this.onenote.isAuth.subscribe(iaAuth => this.updateState());
      this.updateState();
    });
  }

  updateState() {
    this.state.next(
      this.onenote.isAuth ? LoginState.Ready : LoginState.NeedLogin
    );
    try {
      this.ref.detectChanges();
    } catch {}
  }

  login() {
    this.initializationPublisher.executeAfterInit(() =>
      this.onenote.tryLogin()
    );
  }

  state: BehaviorSubject<LoginState> = new BehaviorSubject<LoginState>(
    LoginState.LoadingOffice
  );
  StateEnum: typeof LoginState = LoginState;

  ngAfterContentInit(): void {}

  q: boolean;
}
