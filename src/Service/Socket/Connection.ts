import { Injectable } from "@angular/core";

import * as si from "socket.io-client";

@Injectable()
export class ConnectionService {
    url = "http://localhost:3003";
    connection: SocketIOClient.Socket;

    constructor() {
        this.connection = si.connect(this.url,{upgrade:false, transports:['polling']});
        this.connection.on('connection', () => {
            console.log("connected");
            console.log(this.connection);
        });
        this.connection.on('error', m => console.log(m));
    }

    AddListener(callback: (message: string) => void): void {
        console.log(this.connection);
        this.connection.addEventListener("message", callback);
    }

    Send(message: string): void {
        this.connection.emit("message", message);
    }
}
