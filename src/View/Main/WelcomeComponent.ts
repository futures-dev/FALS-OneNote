import {
  Component,
  OnInit,
  AfterViewInit,
  EventEmitter,
  AfterContentInit,
} from "@angular/core";
import { OneNoteAuth } from "Service/Office/Auth/OneNoteAuth";
import { InitializationPublisher } from "Service/Office/InitializationPublisher";
import { BehaviorSubject } from "rxjs";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "welcome",
  templateUrl: "View/Main/Welcome.html",
})
export class WelcomeComponent implements AfterContentInit {
  constructor(
    private onenote: OneNoteAuth,
    private initializationPublisher: InitializationPublisher
  ) {
    console.log("welcome ctor");
  }

  public isAuth = new EventEmitter<boolean>(true);

  qqq = new EventEmitter<string>();

  login() {
    this.initializationPublisher.executeAfterInit(() =>
      this.onenote.tryLogin()
    );
  }

  t1 = `<header class="ms-welcome__header ms-bgColor-neutralLighter ms-u-fadeIn500">
  <img width="90" height="90" src="assets/logo-filled.png" alt="FALS-OneNote" title="FALS-OneNote" />  
  <div>
      <button (click)="login()">Войти</button>
  </div>
</header>`;
  t2 = `<header class="ms-welcome__header ms-bgColor-neutralLighter ms-u-fadeIn500">
  <img width="90" height="90" src="assets/logo-filled.png" alt="FALS-OneNote" title="FALS-OneNote" />
  <h1 class="ms-fontSize-su ms-fontWeight-light ms-fontColor-neutralPrimary">Welcome</h1>
  </header>`;

  // GODDAMN CRUTCH

  ngAfterContentInit(): void {
    this.qqq.emit(this.t2);
    this.onenote.isAuth.subscribe(q => {
      console.log("Welcome: auth = " + q);
      //this.qqq.emit(q ? this.t2 : this.t1);
      this.queue.push(q);
      window.setTimeout(() => this.popQueue(), 1000);
    });
  }

  private popQueue() {
    const b = this.queue.shift();
    console.log("settimeout " + b);
    if (b !== undefined) {
      this.qqq.emit(b ? this.t2 : this.t1);
      if (this.queue.length > 0) {
        window.setTimeout(() => this.popQueue(), 1000);
      }
    }
  }

  private readonly queue = [];
}
