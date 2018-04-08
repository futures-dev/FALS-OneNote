import { Injectable } from "@angular/core";

import * as si from "socket.io-client";
import * as settings from "config";
import { Listener } from "Service/Socket/Scenario";
import { deserialize } from "Service/Fals/Serialization";

@Injectable()
export class ConnectionService {
  connection: SocketIOClient.Socket;

  /*
    TODO: OFFICE CREDENTIALS
  */
  static userId = "studentA@gmail.com";

  constructor() {
    this.connection = si.connect(settings.SOCKET_URL, {
      upgrade: false,
      transports: ["polling"],
      query: {
        userId: ConnectionService.userId,
      },
    });
    this.connection.on("connection", () => {
      console.log("connected");
      console.log(this.connection);
    });
    this.connection.on("error", m => console.log(m));
  }

  AddListener(event: string, callback: Listener): Listener {
    let listener = message => callback(deserialize(message));
    this.connection.addEventListener(event, listener);
    return listener;
  }

  RemoveListener(event: string, callback: Listener): void {
    this.connection.removeEventListener(event, callback);
  }

  Send(event: string, data: any): void {
    console.log("Send " + event + ". " + JSON.stringify(data));
    this.connection.emit(event, data);
  }
}
