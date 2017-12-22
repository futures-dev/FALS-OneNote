import { Component, OnInit, Input, Output } from '@angular/core';

import {ConnectionService} from 'Service/Socket/Connection'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { EventEmitter } from '@angular/core/src/event_emitter';

@Component({
    selector: 'socket',
    templateUrl: 'View/Socket/Socket.html',
    providers: [ConnectionService]
})
export class SocketComponent implements OnInit {

    @Input()
    Input : string;

    @Input()
    Output : Subject<string> = new Subject();

    @Output()
    InputChanged(val : string) : void{
        this.Output.next(val);
    }

    @Output()
    OutputChanged(val : string) : void{
        console.log(val);
    }

    constructor(
        private ConnectionService : ConnectionService
    ) {
        console.log("SocketComponent ctor");
     }

    ngOnInit() {      
        this.Output.subscribe(this.OutputChanged);
        this.ConnectionService.AddListener(q => this.InputChanged(q));
    }
}