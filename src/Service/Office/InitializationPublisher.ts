import { Injectable, Output } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs/Subject";
import * as settings from "config";

@Injectable()
export class InitializationPublisher {
  constructor() {
    if (settings.NO_OFFICE) {
      this._initialized.complete();
    }
  }

  publish(): void {
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
