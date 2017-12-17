import { Injectable, Output } from "@angular/core";
import { EventEmitter } from "@angular/core/src/event_emitter";
import { Subject } from "rxjs/Subject";

@Injectable()
export class InitializationPublisher {
    constructor() {}

    publish(): void {
        this._initialized.complete();
    }

    subscribe(callback: () => void): void {
        if (this._initialized.isStopped) {
            callback();
        }

        this._initialized.subscribe(null, null, callback);
    }

    private readonly _initialized: Subject<boolean> = new Subject();
}
