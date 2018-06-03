import { Injectable } from "@angular/core";

import * as si from "socket.io-client";
import * as settings from "config";
import { deserialize } from "Service/Fals/Serialization";
import { Listener } from "Service/Socket/Listener";
import { InitializationPublisher } from "Service/Office/InitializationPublisher";
import { OneNoteAuth } from "Service/Office/Auth/OneNoteAuth";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class ConnectionService {
  connection: SocketIOClient.Socket;

  constructor(oneNote: OneNoteAuth) {
    console.log("ConnectionService hopes to be singleton");
    const email = oneNote.email.getValue();
    if (email) {
      this.init(email);
    } else {
      oneNote.email.subscribe(email => {
        if (!this.isInit && email) {
          this.init(email);
        }
      });
    }
  }

  isInit: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  init(email: string) {
    this.isInit.next(true);
    this.connection = si.connect(settings.SOCKET_URL, {
      upgrade: false,
      transports: ["polling"],
      query: {
        userId: email,
      },
    });
    this.connection.on("connection", () => {
      console.log("connected");
      console.log(this.connection);
    });
    this.connection.on("error", m => console.log(m));
  }

  AddListener(event: string, callback: Listener<any>) {
    return this.isInit.first(q => !!q).map(() => {
      console.log("AddListener " + event);
      let listener = message => {
        console.log("Received " + event);
        console.log(message);
        callback(deserialize(message));
      };
      this.connection.addEventListener(event, listener);
      return listener;
    });
  }

  RemoveListener(event: string, callback: Listener<any>): void {
    this.isInit.first(q => !!q).subscribe(() => {
      this.connection.removeEventListener(event, callback);
    });
  }

  Send(event: string, data: any): void {
    this.isInit.first(q => !!q).subscribe(() => {
      console.log("Send " + event + ". " + JSON.stringify(data));
      this.connection.emit(event, data);
    });
  }
}
