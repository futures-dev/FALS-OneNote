import * as socketio from 'socket.io'
import * as express from 'express'
import * as http from 'http'
import { Request, Response } from 'express';
import { Client } from './Socket/Client';

let app = express();
let server = new http.Server(app);
let io = socketio(server);

//chat_app.use(express.static(__dirname + '/node_modules'));

//#region GET

/*
app.get('/', (req: Request, res:Response)=>{
    res.send("HELLO!");
});
*/

//#region POST

//#region SOCKET

let clients: {[id: string]: Client} = { };

io.on('connection', (socket: SocketIO.Socket)=>{
    let client = clients[socket.client.id] = new Client(socket.client, socket.handshake);

    io.to(socket.client.id).emit("message", "hi from server");
    foo(socket.client.id);
})

async function foo(id:string){
    await delay(500);
    io.emit("message", "broadcast");
    io.to(id).emit("message", "hi from server");
    await foo(id);
}

//#region: Listen

server.listen(3003, ()=>{
    console.log("Listening on port 3003");
});