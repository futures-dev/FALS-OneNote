import { Component, OnInit, Input, Output } from '@angular/core';

import {ConnectionService} from 'Service/Socket/Connection'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { EventEmitter } from '@angular/core';

@Component({
    selector: 'socket',
    templateUrl: 'View/Socket/Socket.html',
    providers: [ConnectionService]
})
export class SocketComponent implements OnInit {

    Input : string;

    Output : Subject<string> = new Subject();

    InputChanged(val : string) : void{
        this.Output.next(val);
    }

    constructor(
        private ConnectionService : ConnectionService
    ) {
        console.log("SocketComponent ctor");
     }

    ngOnInit() {
        this.ConnectionService.AddListener(q => this.InputChanged(q));
    }
}