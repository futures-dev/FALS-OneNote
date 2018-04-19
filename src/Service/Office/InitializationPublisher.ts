import { Injectable, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { OneNoteAuth } from "Service/Office/Auth/OneNoteAuth";

@Injectable()
export class InitializationPublisher {
  constructor(private onenote: OneNoteAuth) {}

  code?: string;

  publish(code?: string): void {
    this.code = code;
    this._initialized.complete();
  }

  executeAfterInit(callback: () => void): void {
    if (this._initialized.isStopped) {
      callback();
      return;
    }

    this._initialized.subscribe(null, null, callback);
  }

  private readonly _initialized: Subject<boolean> = new Subject();
}
