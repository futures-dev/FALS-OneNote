import { Component, OnInit, Input, Output } from "@angular/core";

import { ConnectionService } from "Service/Socket/Connection";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { EventEmitter } from "@angular/core";
import { Listener } from "Service/Socket/Listener";

@Component({
  selector: "socket",
  templateUrl: "View/Socket/Socket.html",
  providers: [],
})
export class SocketComponent implements OnInit {
  Input: string = "";
  Event: string = "";

  Output: Subject<string> = new Subject();

  private eventListener: Listener<any>;
  private eventListened: string;

  EventChanged(event: string): void {
    if (this.eventListener && this.eventListened) {
      this.ConnectionService.RemoveListener(
        this.eventListened,
        this.eventListener
      );
    }
    this.eventListened = event;
    this.ConnectionService.AddListener(event, s =>
      this.Output.next(JSON.stringify(s))
    ).subscribe();
  }

  Emit(): void {
    let w = this.Input.indexOf(" ");
    console.log(this.Input.slice(0, w));
    console.log(this.Input.slice(w + 1));
    this.ConnectionService.Send(
      this.Input.slice(0, w),
      JSON.parse(this.Input.slice(w + 1))
    );
  }

  constructor(private ConnectionService: ConnectionService) {
    console.log("SocketComponent ctor");
  }

  ngOnInit() {}
}
