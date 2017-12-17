import { Injectable } from "@angular/core";

import * as si from "socket.io-client";

@Injectable()
export class ConnectionService {
    url = "http://::1:1337";
    connection: SocketIOClient.Socket;

    constructor() {
        this.connection = si.connect(this.url, { autoConnect: true });
        this.connection.on('connection', () => {
            console.log("connected");
            console.log(this.connection);
        });
        this.connection.on('error', m => console.log(m));
    }

    AddListener(callback: (message: string) => void): void {
        console.log(this.connection);
        this.connection.addEventListener("blast", callback);
    }

    Send(message: string): void {
        this.connection.emit("blast", message);
    }
}
